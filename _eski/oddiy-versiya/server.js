// Minimal statik server — fayllarni brauzerda ochish uchun.
// Ishga tushirish:  node server.js   →  http://localhost:5173
const { createServer } = require('http');
const { readFile } = require('fs');
const { extname, join, normalize } = require('path');

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };

createServer((req, res) => {
  const p = normalize(join(process.cwd(), decodeURIComponent(req.url.split('?')[0])));
  if (!p.startsWith(process.cwd())) return res.writeHead(403).end('403');
  readFile(p.endsWith('/') || !extname(p) ? join(p, 'index.html') : p, (e, buf) => {
    if (e) return res.writeHead(404).end('404');
    res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buf);
  });
}).listen(5173, () => console.log('http://localhost:5173'));
