import { promises as fs } from 'node:fs';
import path from 'node:path';
import { srcDir, distDir, basePath, deployedOrigin, url, canonical, loadCollection } from './lib/context.mjs';
import { aboutPage, workPage, writingPage, hobbiesPage, contactPage, casePage, postPage, hobbyPage, genericPage, notFoundPage } from './lib/pages.mjs';

async function writeRoute(route, html) {
  let target;
  if (route === '/') target = path.join(distDir, 'index.html');
  else if (route.endsWith('.html')) target = path.join(distDir, route.replace(/^\//, ''));
  else target = path.join(distDir, route.replace(/^\//, ''), 'index.html');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html, 'utf8');
}

async function copyAssets() {
  const from = path.join(srcDir, 'assets');
  const to = path.join(distDir, 'assets');
  await fs.mkdir(to, { recursive: true });
  for (const filename of await fs.readdir(from)) {
    await fs.copyFile(path.join(from, filename), path.join(to, filename));
  }
}

function makeSitemap(routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${canonical(route)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

async function build() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
  await copyAssets();

  const work = await loadCollection('work');
  const writing = await loadCollection('writing');
  const hobbies = await loadCollection('hobbies');
  const pages = await loadCollection('pages');
  const routes = ['/', '/work/', '/writing/', '/hobbies/', '/contact/'];

  await writeRoute('/', aboutPage());
  await writeRoute('/work/', workPage(work));
  await writeRoute('/writing/', writingPage(writing));
  await writeRoute('/hobbies/', hobbiesPage(hobbies));
  await writeRoute('/contact/', contactPage());

  for (const entry of work) {
    const route = `/work/${entry.data.slug}/`;
    routes.push(route);
    await writeRoute(route, casePage(entry));
  }
  for (const entry of writing) {
    const route = `/writing/${entry.data.slug}/`;
    routes.push(route);
    await writeRoute(route, postPage(entry));
  }
  for (const entry of hobbies) {
    const route = `/hobbies/${entry.data.slug}/`;
    routes.push(route);
    await writeRoute(route, hobbyPage(entry));
  }
  for (const entry of pages) {
    const route = `/${entry.data.slug}/`;
    if (routes.includes(route)) throw new Error(`Page slug conflicts with an existing route: ${route}`);
    routes.push(route);
    await writeRoute(route, genericPage(entry));
  }

  await writeRoute('/404.html', notFoundPage());
  await fs.writeFile(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${canonical('/sitemap.xml')}\n`, 'utf8');
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), makeSitemap(routes), 'utf8');
  await fs.writeFile(path.join(distDir, '.nojekyll'), '', 'utf8');

  console.log(`Built ${routes.length} routes in ${distDir}`);
  console.log(`Base path: ${basePath || '/'}`);
  console.log(`Canonical origin: ${deployedOrigin}`);
}

await build();
