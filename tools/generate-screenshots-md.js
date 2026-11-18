// Genereert screenshots.md uit assets/js/content.js
// Gebruik: node tools/generate-screenshots-md.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'assets/js/content.js'), 'utf8');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src + '\nthis.CONFIG=CONFIG;this.MODULES=MODULES;', ctx);
const { CONFIG, MODULES } = ctx;
const exists = f => fs.existsSync(path.join(root, f));
const box = f => (exists(f) ? '[x]' : '[ ]');
let md = `# Screenshots en media checklist\n\nZet elk bestand in de map \`img/\` met **exact** deze bestandsnaam (PNG, bij voorkeur 1600 px breed). De site toont het automatisch; zolang het bestand ontbreekt, zie je een placeholder met deze beschrijving.\n\nDeze lijst wordt gegenereerd met \`node tools/generate-screenshots-md.js\` (vinkjes = bestand staat al in de repo).\n\n`;
md += `## Algemeen\n\n| | Bestand | Wat moet erop te zien zijn |\n|---|---|---|\n`;
md += `| ${box('img/cegeka-logo.png')} | \`img/cegeka-logo.png\` | Officieel Cegeka-logo (gekleurde versie) voor de header en het certificaat. Favicon: \`img/cegeka-icon.png\`. |\n`;
md += `| ${box(CONFIG.caseVideo)} | \`${CONFIG.caseVideo}\` | De casevideo van Mark, de Hardware Manager (MP4, H.264). Module 0, stap 1. |\n`;
md += `| ${box('img/skills-mappenstructuur.png')} | \`img/skills-mappenstructuur.png\` | Skills-pagina: de Explorer in VS Code met .claude/skills/${CONFIG.skills.standards.folder}/SKILL.md. |\n\n`;
let n = 0;
for (const m of MODULES) {
  md += `## Module ${m.number} – ${m.title}\n\n| | Bestand | Stap | Wat moet erop te zien zijn |\n|---|---|---|---|\n`;
  for (const s of m.steps) {
    if (!s.img) continue; n++;
    md += `| ${box('img/' + s.img.file)} | \`img/${s.img.file}\` | ${s.title} | ${s.img.caption} |\n`;
  }
  md += '\n';
}
md += `---\n\nTotaal: ${n + 1} screenshots, 1 logo en 1 video.\n\n**Tips**\n\n- Gebruik een schone demo-omgeving zonder klantnamen of persoonsgegevens.\n- Verberg tokens, wachtwoorden en tenant-ID's (blur of crop).\n- Zoom VS Code in (Ctrl + =) zodat tekst leesbaar is op de site.\n- Markeer de belangrijkste knop of regel eventueel met een kader in Cegeka Blue (#00C7F9).\n`;
fs.writeFileSync(path.join(root, 'screenshots.md'), md);
console.log('screenshots.md geschreven:', n + 1, 'screenshots');
