import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { promises as fs } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const port = Number(process.env.PORT || 4173);
let building = false;
let pending = false;

function runBuild() {
  return new Promise((resolve, reject) => {
    building = true;
    const child = spawn(process.execPath, [path.join(root, 'scripts', 'build.mjs')], { stdio: 'inherit' });
    child.on('exit', (code) => {
      building = false;
      if (pending) {
        pending = false;
        runBuild().then(resolve, reject);
      } else if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function safePath(requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0]);
  const relative = decoded.replace(/^\/+/, '');
  return path.join(distDir, relative);
}

async function findFile(requestPath) {
  let candidate = safePath(requestPath);
  try {
    const stat = await fs.stat(candidate);
    if (stat.isDirectory()) candidate = path.join(candidate, 'index.html');
    return candidate;
  } catch {
    if (!path.extname(candidate)) {
      const indexCandidate = path.join(candidate, 'index.html');
      try {
        await fs.access(indexCandidate);
        return indexCandidate;
      } catch {}
    }
    return path.join(distDir, '404.html');
  }
}

await runBuild();

const server = http.createServer(async (request, response) => {
  try {
    const filename = await findFile(request.url || '/');
    const body = await fs.readFile(filename);
    response.writeHead(filename.endsWith('404.html') ? 404 : 200, {
      'Content-Type': mime[path.extname(filename).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(String(error));
  }
});

server.listen(port, () => {
  console.log(`Local site: http://localhost:${port}`);
  console.log('Edit files in src/. The site rebuilds automatically.');
});

try {
  watch(srcDir, { recursive: true }, () => {
    if (building) pending = true;
    else runBuild().catch((error) => console.error(error));
  });
} catch {
  console.log('Automatic file watching is unavailable. Restart npm run dev after edits.');
}
