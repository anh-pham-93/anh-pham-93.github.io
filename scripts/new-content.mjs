import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const type = process.argv[2];
const title = process.argv.slice(3).join(' ').trim();

if (!['writing', 'work', 'hobby', 'page'].includes(type) || !title) {
  console.error('Usage: node scripts/new-content.mjs <writing|work|hobby|page> "Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const today = new Date().toISOString().slice(0, 10);
let directory;
let content;

if (type === 'writing') {
  directory = path.join(root, 'src', 'content', 'writing');
  content = `---\ntitle: ${title}\nslug: ${slug}\ndescription: Add a one-sentence description.\ndate: ${today}\ndisplayDate: ${today}\nlanguage: English\norder: 1\npublished: false\n---\n## Start here\n\nWrite the first draft here.\n`;
} else if (type === 'work') {
  directory = path.join(root, 'src', 'content', 'work');
  content = `---\ntitle: ${title}\nslug: ${slug}\ncompany: Company\nperiod: Year-Year\nrole: Product Owner\nkicker: Case study\nmeta1: Year-Year\nmeta2: Company\nsummary: Add a concise summary.\norder: 99\npublished: false\nstatus: Draft\n---\n## Context\n\nExplain the situation.\n\n## Problem\n\nExplain what made the problem worth solving.\n\n## Evidence and trade-offs\n\n- Add evidence.\n- Add constraints.\n- Add alternatives considered.\n\n## Outcome and reflection\n\nExplain what changed and what you learned.\n`;
} else if (type === 'hobby') {
  directory = path.join(root, 'src', 'content', 'hobbies');
  content = `---\ntitle: ${title}\nslug: ${slug}\nsubtitle: New interest\nheadline: Add a distinctive headline.\nsummary: Add a short description.\ncta: Explore\nsize: small\ntheme: paper\norder: 99\npublished: false\nsymbol: wave\n---\n## Why it is here\n\nWrite about this interest.\n`;
} else {
  directory = path.join(root, 'src', 'content', 'pages');
  content = `---\ntitle: ${title}\nslug: ${slug}\ndescription: Add a one-sentence description.\nlabel: Page\norder: 99\npublished: false\n---\n## Start here\n\nWrite the page here.\n`;
}

await fs.mkdir(directory, { recursive: true });
const target = path.join(directory, `${slug}.md`);
try {
  await fs.access(target);
  console.error(`File already exists: ${target}`);
  process.exit(1);
} catch {}
await fs.writeFile(target, content, 'utf8');
console.log(`Created ${target}`);
console.log('Set published: true when it is ready to appear on the site.');
