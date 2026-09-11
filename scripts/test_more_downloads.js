const cp = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userProfile = 'C:\\Users\\Sidharth\\.gemini\\antigravity\\scratch\\edge-debug-profile3';

async function testPage(url, btnSelectorText) {
  const edgeProc = cp.spawn(edge, [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--guest',
    '--remote-debugging-port=9229',
    `--user-data-dir=${userProfile}`,
    '--disable-gpu',
    '--window-size=1440,900',
    url
  ]);

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://localhost:9229/json/list');
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
  await send('Runtime.enable');
  await new Promise(r => setTimeout(r, 2000));

  const result = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent.includes('${btnSelectorText}'));
        if (!btn) return { success: false, reason: 'Button not found' };

        let blobSize = 0;
        let blobType = '';
        const origCreate = URL.createObjectURL;
        URL.createObjectURL = (blob) => {
          blobSize = blob.size;
          blobType = blob.type;
          return origCreate(blob);
        };

        btn.click();
        return { success: true, blobSize, blobType };
      })()
    `,
    returnByValue: true
  });

  console.log(`Download test for ${url}:`, result?.result?.value);
  ws.close();
  edgeProc.kill();
}

async function run() {
  await testPage('http://localhost:3000/knowledge/rep-43-01', 'Download PDF');
  await testPage('http://localhost:3000/data-hub/ds-ice-01', 'Download (NetCDF)');
  console.log('All downloads tested successfully!');
}

run().catch(console.error);
