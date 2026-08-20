import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

const site = JSON.parse(await fs.readFile(path.join(srcDir, 'site.json'), 'utf8'));
const experience = JSON.parse(await fs.readFile(path.join(srcDir, 'data', 'experience.json'), 'utf8'));

const githubRepository = process.env.GITHUB_REPOSITORY || '';
const [githubOwner = '', githubRepo = ''] = githubRepository.split('/');
const explicitSiteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');
let basePath = process.env.BASE_PATH;

if (basePath === undefined) {
  const customDomain = explicitSiteUrl && !explicitSiteUrl.includes('github.io');
  const userSite = githubOwner && githubRepo === `${githubOwner}.github.io`;
  basePath = customDomain || userSite || !githubRepo ? '' : `/${githubRepo}`;
}
basePath = normalizeBase(basePath);

const deployedOrigin = explicitSiteUrl || (
  githubOwner
    ? `https://${githubOwner}.github.io${basePath}`
    : 'http://localhost:4173'
);

function normalizeBase(value) {
  if (!value || value === '/') return '';
  return `/${String(value).replace(/^\/+|\/+$/g, '')}`;
}

function url(route = '/') {
  const normalized = route.startsWith('/') ? route : `/${route}`;
  if (normalized === '/') return `${basePath}/` || '/';
  return `${basePath}${normalized}`.replace(/\/+/g, '/');
}

function canonical(route = '/') {
  const normalized = route.startsWith('/') ? route : `/${route}`;
  return `${deployedOrigin}${normalized === '/' ? '/' : normalized}`;
}

function asset(name) {
  return url(`/assets/${name}`);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseScalar(raw) {
  const value = raw.trim();
  if (!value) return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(',').map((part) => part.trim()).filter(Boolean);
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function parseMarkdownFile(text, filename) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter in ${filename}`);
  const data = {};
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const colon = line.indexOf(':');
    if (colon < 1) throw new Error(`Invalid front matter line in ${filename}: ${line}`);
    data[line.slice(0, colon).trim()] = parseScalar(line.slice(colon + 1));
  }
  return { data, body: match[2].trim(), filename };
}

async function loadCollection(name) {
  const directory = path.join(srcDir, 'content', name);
  const entries = [];
  for (const filename of await fs.readdir(directory)) {
    if (!filename.endsWith('.md') || filename.startsWith('_')) continue;
    const fullPath = path.join(directory, filename);
    const parsed = parseMarkdownFile(await fs.readFile(fullPath, 'utf8'), fullPath);
    if (parsed.data.published === false || parsed.data.draft === true) continue;
    if (!parsed.data.slug) parsed.data.slug = filename.replace(/\.md$/, '');
    entries.push(parsed);
  }
  return entries.sort((a, b) => {
    const orderA = Number(a.data.order ?? 9999);
    const orderB = Number(b.data.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.data.date || '').localeCompare(String(a.data.date || ''));
  });
}

function renderInline(raw = '') {
  let text = escapeHtml(raw);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, source) => {
    const resolved = source.startsWith('/') ? url(source) : source;
    return `<img src="${resolved}" alt="${alt}">`;
  });
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g, (_, label, href) => {
    const resolved = href.startsWith('/') ? url(href) : href;
    return `<a href="${resolved}">${label}</a>`;
  });
  return text;
}

function renderBlocks(body = '') {
  const lines = body.replace(/\r/g, '').split('\n');
  const output = [];
  let paragraph = [];
  let list = [];
  let ordered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    const tag = ordered ? 'ol' : 'ul';
    output.push(`<${tag}>${list.map((item) => `<li>${renderInline(item)}</li>`).join('')}</${tag}>`);
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unorderedMatch || orderedMatch) {
      flushParagraph();
      const nextOrdered = Boolean(orderedMatch);
      if (list.length && ordered !== nextOrdered) flushList();
      ordered = nextOrdered;
      list.push((orderedMatch || unorderedMatch)[1]);
      continue;
    }
    if (trimmed.startsWith('> ')) {
      flushParagraph();
      flushList();
      output.push(`<blockquote>${renderInline(trimmed.slice(2))}</blockquote>`);
      continue;
    }
    if (trimmed === '---') {
      flushParagraph();
      flushList();
      output.push('<hr>');
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return output.join('\n');
}

function renderCaseSections(body = '') {
  const parts = body.split(/^##\s+/m).filter(Boolean);
  return parts.map((part) => {
    const [heading, ...rest] = part.split('\n');
    return `<section><h2>${renderInline(heading.trim())}</h2><div>${renderBlocks(rest.join('\n').trim())}</div></section>`;
  }).join('\n');
}

export { root, srcDir, distDir, site, experience, basePath, deployedOrigin, url, canonical, asset, escapeHtml, loadCollection, renderInline, renderBlocks, renderCaseSections };
