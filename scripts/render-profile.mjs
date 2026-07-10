import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(resolve(root, 'profile-surface.json'), 'utf8'));

const themes = {
  light: {
    background: '#f5f3ff',
    panel: '#ffffff',
    border: '#ded8f6',
    accent: '#7257e8',
    text: '#17152b',
    muted: '#6d6887',
    glow: '#ddd5ff'
  },
  dark: {
    background: '#11101c',
    panel: '#181624',
    border: '#302b48',
    accent: '#a992ff',
    text: '#f4f1ff',
    muted: '#aaa4c3',
    glow: '#46377c'
  }
};

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const card = (item, x) => `<g transform="translate(${x} 174)">
    <rect width="330" height="132" rx="18" fill="${palette.panel}" stroke="${palette.border}"/>
    <text x="24" y="33" class="label">${escapeXml(item.label)}</text>
    <text x="24" y="70" class="value">${escapeXml(item.name)}</text>
    <text x="24" y="101" class="detail">${escapeXml(item.detail)}</text>
  </g>`;

const render = (name) => {
  palette = themes[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="390" viewBox="0 0 1120 390" role="img" aria-labelledby="title description">
  <title id="title">Angus Uelsmann public system surface</title>
  <desc id="description">Current public work, products and writing by Angus Uelsmann.</desc>
  <defs>
    <radialGradient id="glow" cx="88%" cy="0%" r="70%">
      <stop offset="0" stop-color="${palette.glow}" stop-opacity=".72"/>
      <stop offset="1" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <style>
      text { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .eyebrow, .label, .footer { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .eyebrow { fill: ${palette.accent}; font-size: 14px; font-weight: 700; letter-spacing: 2.2px; }
      .headline { fill: ${palette.text}; font-size: 29px; font-weight: 700; }
      .label { fill: ${palette.accent}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; }
      .value { fill: ${palette.text}; font-size: 18px; font-weight: 700; }
      .detail { fill: ${palette.muted}; font-size: 14px; }
      .footer { fill: ${palette.muted}; font-size: 11px; letter-spacing: .65px; }
    </style>
  </defs>
  <rect width="1120" height="390" rx="26" fill="${palette.background}"/>
  <rect width="1120" height="390" rx="26" fill="url(#glow)"/>
  <rect x="1" y="1" width="1118" height="388" rx="25" fill="none" stroke="${palette.border}"/>
  <circle cx="56" cy="56" r="7" fill="${palette.accent}"/>
  <text x="78" y="61" class="eyebrow">${escapeXml(data.eyebrow)}</text>
  <text x="48" y="126" class="headline">${escapeXml(data.title)}</text>
  ${card(data.surface, 48)}
  ${card(data.currentBuild, 395)}
  ${card(data.latestThought, 742)}
  <line x1="48" y1="340" x2="1072" y2="340" stroke="${palette.border}"/>
  <text x="48" y="369" class="footer">${escapeXml(data.footer)}</text>
</svg>
`;
};

let palette;
await mkdir(resolve(root, 'assets'), { recursive: true });
for (const name of Object.keys(themes)) {
  await writeFile(resolve(root, `assets/system-surface-${name}.svg`), render(name), 'utf8');
}
