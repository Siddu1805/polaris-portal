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
    '--remote-debugging-port=9223',
    `--user-data-dir=${userProfile}`,
    '--disable-gpu',
    '--window-size=1440,960',
    'http://localhost:3000'
  ]);

  // wait for debugging endpoint to become ready
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://localhost:9223/json/list');
      const json = await res.json();
      if (json && json.length > 0) {
        targets = json;
        break;
      }
    } catch (e) {}
  }

  if (!targets || !targets[0]) {
    console.error('Could not connect to Edge debugger');
    edgeProc.kill();
    return;
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to page:', pageTarget.webSocketDebuggerUrl);

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

  // Enable Page & DOM
  await send('Page.enable');
  await send('DOM.enable');

  // Wait for page to render fully
  await new Promise(r => setTimeout(r, 2500));

  const sections = [
    { name: 'section_hero_top.png', scrollY: 0 },
    { name: 'section_polar_explorer_map.png', scrollY: 780 },
    { name: 'section_featured_expeditions.png', scrollY: 1550 },
    { name: 'section_latest_research.png', scrollY: 2300 },
    { name: 'section_polar_stories.png', scrollY: 2950 },
    { name: 'section_media_and_classroom.png', scrollY: 3700 },
    { name: 'section_workflow_stages.png', scrollY: 4350 },
    { name: 'section_studio_flagship.png', scrollY: 4950 },
  ];

  for (const s of sections) {
    console.log(`Scrolling to Y=${s.scrollY} for ${s.name}...`);
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${s.scrollY});`
    });
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
  console.log('Section screenshots finished!');
}

run().catch(console.error);
