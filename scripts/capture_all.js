const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\Sidharth\\.gemini\\antigravity\\brain\\739dd33c-849f-48a2-968e-a805359b6631\\screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  { name: 'home_desktop.png', url: 'http://localhost:3000', width: 1440, height: 900 },
  { name: 'home_hero_map.png', url: 'http://localhost:3000', width: 1440, height: 1400 },
  { name: 'home_tablet.png', url: 'http://localhost:3000', width: 768, height: 1024 },
  { name: 'home_mobile.png', url: 'http://localhost:3000', width: 390, height: 844 },
  { name: 'studio_desktop.png', url: 'http://localhost:3000/studio', width: 1440, height: 900 },
  { name: 'knowledge_desktop.png', url: 'http://localhost:3000/knowledge', width: 1440, height: 900 },
];

for (const target of targets) {
  const outFile = path.join(outDir, target.name);
  console.log(`Capturing ${target.name} (${target.width}x${target.height})...`);
  try {
    cp.execFileSync(edge, [
      '--headless=new',
      '--disable-gpu',
      `--window-size=${target.width},${target.height}`,
      `--screenshot=${outFile}`,
      target.url
    ], { timeout: 30000 });
    const stat = fs.statSync(outFile);
    console.log(`Saved ${target.name} (${stat.size} bytes)`);
  } catch (err) {
    console.error(`Error capturing ${target.name}:`, err.message);
  }
}

console.log('All captures complete.');
