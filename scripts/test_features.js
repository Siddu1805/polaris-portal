const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\Sidharth\\.gemini\\antigravity\\brain\\739dd33c-849f-48a2-968e-a805359b6631\\screenshots';
const userProfile = 'C:\\Users\\Sidharth\\.gemini\\antigravity\\scratch\\edge-debug-profile3';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Starting Edge headless browser...');
  const edgeProc = cp.spawn(edge, [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--guest',
    '--remote-debugging-port=9227',
    `--user-data-dir=${userProfile}`,
    '--disable-gpu',
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://localhost:9227/json/list');
      const json = await res.json();
      if (json && json.length > 0) {
        targets = json;
        break;
      }
    } catch (e) {}
  }

  if (!targets) {
    console.error('Could not connect to Edge debugger');
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

  console.log('Waiting for homepage to hydrate...');
  await new Promise(r => setTimeout(r, 2000));

  // Check launcher button exists
  const launcherCheck = await send('Runtime.evaluate', {
    expression: `!!document.querySelector('button[aria-label="Open Polaris Expedition Assistant"]')`
  });
  console.log('Expedition Assistant launcher button found:', launcherCheck?.result?.value);

  // Capture desktop with launcher button visible
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'home_with_assistant_launcher.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved home_with_assistant_launcher.png');

  // Click the launcher button to open the chat panel
  console.log('Opening Expedition Assistant chat modal...');
  await send('Runtime.evaluate', {
    expression: `document.querySelector('button[aria-label="Open Polaris Expedition Assistant"]')?.click()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // Capture open chat modal on desktop
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'assistant_open_desktop.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved assistant_open_desktop.png');

  // Send query "Which expedition studied sea ice?" by clicking suggested chip
  console.log('Interacting with chat: clicking "Which expedition studied sea ice?" chip...');
  await send('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const chip = buttons.find(b => b.textContent.includes('Which expedition studied sea ice?'));
      if (chip) chip.click();
    `
  });

  // Wait for response to generate
  await new Promise(r => setTimeout(r, 2500));

  // Check if Download Report button appeared in the response
  const downloadCheck = await send('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const dl = buttons.find(b => b.textContent.includes('Download Report'));
      dl ? true : false;
    `
  });
  console.log('Download Report button rendered in chat response:', downloadCheck?.result?.value);

  // Capture chat response screenshot
  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'assistant_sea_ice_response.png'), Buffer.from(shot3.data, 'base64'));
  console.log('Saved assistant_sea_ice_response.png');

  // Switch to mobile viewport (390x844) to test responsiveness
  console.log('Testing mobile viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 1000));

  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'assistant_open_mobile.png'), Buffer.from(shot4.data, 'base64'));
  console.log('Saved assistant_open_mobile.png');

  ws.close();
  edgeProc.kill();
  console.log('Browser tests completed successfully!');
}

run().catch(console.error);
