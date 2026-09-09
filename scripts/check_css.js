const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const cssLinks = data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('CSS link tags found:', cssLinks);
    const nextCss = data.match(/\/static\/css\/[a-zA-Z0-9_.-]+\.css/gi) || [];
    console.log('Next CSS files:', nextCss);
  });
});
