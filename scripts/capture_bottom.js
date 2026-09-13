const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = process.env.BROWSER_PATH || (process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'google-chrome');
const outDir = process.env.SCREENSHOT_OUT_DIR || path.join(__dirname, '../screenshots');
const userProfile = path.join(__dirname, '../.edge-debug-profile');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
if (!fs.existsSync(userProfile)) {
  fs.mkdirSync(userProfile, { recursive: true });
}

async function run() {
  const edgeProc = cp.spawn(edge, [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--guest',
    '--remote-debugging-port=9224',
    `--user-data-dir=${userProfile}`,
    '--disable-gpu',
    '--window-size=1440,960',
    'http://localhost:3000'
  ]);

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://localhost:9224/json/list');
      const json = await res.json();
      if (json && json.length > 0) {
        targets = json;
        break;
      }
    } catch (e) {}
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      cb(data.result);
    }
  };

  await new Promise(resolve => ws.onopen = resolve);
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');
  await new Promise(r => setTimeout(r, 2000));

  const sections = [
    { name: 'section_workflow_stages.png', scrollY: 4800 },
    { name: 'section_studio_flagship.png', scrollY: 5400 }
  ];

  for (const s of sections) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${s.scrollY});` });
    await new Promise(r => setTimeout(r, 800));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot && shot.data) {
      const outPath = path.join(outDir, s.name);
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      console.log(`Captured ${s.name} (${fs.statSync(outPath).size} bytes)`);
    }
  }

  ws.close();
  edgeProc.kill();
  console.log('Done');
}

run().catch(console.error);
