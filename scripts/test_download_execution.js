const cp = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userProfile = 'C:\\Users\\Sidharth\\.gemini\\antigravity\\scratch\\edge-debug-profile3';

async function run() {
  const edgeProc = cp.spawn(edge, [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--guest',
    '--remote-debugging-port=9228',
    `--user-data-dir=${userProfile}`,
    '--disable-gpu',
    '--window-size=1440,900',
    'http://localhost:3000/expeditions/exp-43-iae'
  ]);

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://localhost:9228/json/list');
      const json = await res.json();
      if (json && json.length > 0) {
        targets = json;
        break;
      }
    } catch (e) {}
  }

  if (!targets) {
    console.error('Failed to connect');
    edgeProc.kill();
    return;
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

  // Find the download button on the expedition detail page
  const result = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const dlBtn = buttons.find(b => b.textContent.includes('Download Expedition Report'));
        if (!dlBtn) return { success: false, reason: 'Button not found' };
        
        let clicked = false;
        // Hook into URL.createObjectURL to spy on generated blob
        let blobSize = 0;
        let blobType = '';
        const origCreate = URL.createObjectURL;
        URL.createObjectURL = (blob) => {
          blobSize = blob.size;
          blobType = blob.type;
          return origCreate(blob);
        };

        dlBtn.click();
        return { success: true, blobSize, blobType };
      })()
    `,
    returnByValue: true
  });

  console.log('Expedition Detail Page Download Test Result:', result?.result?.value);

  ws.close();
  edgeProc.kill();
}

run().catch(console.error);
