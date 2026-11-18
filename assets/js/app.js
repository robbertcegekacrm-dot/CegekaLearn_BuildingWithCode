/* =========================================================================
   App-logica: routing, sidebar, voortgang (localStorage), kopieerknoppen,
   badges, confetti en certificaat. Inhoud staat in content.js.
   ========================================================================= */
(function () {
  'use strict';

  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Opslag ---------- */
  const defaults = { done: {}, badges: {}, name: '', open: {} };
  let state = defaults;
  try { state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {}); } catch (e) { /* opslag niet beschikbaar */ }
  const save = () => { try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); } catch (e) { /* negeer */ } };

  /* ---------- Afgeleide data ---------- */
  const STEPS = [];
  MODULES.forEach(m => m.steps.forEach((s, i) => STEPS.push(Object.assign({}, s, { module: m, index: i }))));
  const FILE_CACHE = {};
  const PROMPT = Object.fromEntries(PROMPTS.map(p => [p.id, p]));
  const COUNTED = STEPS.filter(s => !s.module.info);
  const TASK_MODULES = MODULES.filter(m => !m.info);
  const moduleDone = m => m.steps.filter(s => state.done[s.id]).length;
  const isComplete = m => !m.info && moduleDone(m) === m.steps.length;
  const totalDone = () => COUNTED.filter(s => state.done[s.id]).length;

  /* ---------- Tip ---------- */
  const tipBox = (text, label = 'Tip') => `
    <aside class="tip" aria-label="Tip">
      <img src="img/cegeka-icon.png" alt="" class="tip-icon" onerror="this.remove()">
      <div><span class="tip-label">${esc(label)}</span>${text}</div>
    </aside>`;

  /* ---------- Bouwstenen ---------- */
  const COPY_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  const copyBtn = label => `<button type="button" class="copy-btn" data-copy aria-label="Kopieer ${esc(label)}">${COPY_ICON}<span>Kopieer</span></button>`;

  const codeBlock = (code, label) => `
    <div class="code">
      <div class="code-head"><span>${esc(label || 'Terminal')}</span>${copyBtn(label || 'commando')}</div>
      <pre><code>${esc(code)}</code></pre>
    </div>`;

  const promptBlock = (id, withTip = true) => {
    const p = PROMPT[id];
    if (!p) return '';
    return `
    <div class="code prompt">
      <div class="code-head"><span>Prompt · ${esc(p.title)} · ${esc(p.where)}</span>${copyBtn('prompt ' + p.title)}</div>
      <pre><code>${esc(p.text)}</code></pre>
    </div>
    ${withTip ? `<div class="prompt-tip"><strong>Waarom dit werkt:</strong> ${esc(p.tip)}</div>` : ''}`;
  };

  const CAMERA = '<svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  const shot = img => !img ? '' : `
    <figure class="shot">
      <img src="img/${esc(img.file)}" alt="${esc(img.caption)}" loading="lazy" onerror="this.closest('figure').classList.add('missing')">
      <div class="ph">${CAMERA}<strong>Screenshot volgt</strong><code>img/${esc(img.file)}</code><span class="ph-desc">${esc(img.caption)}</span></div>
      <figcaption>${esc(img.caption)}</figcaption>
    </figure>`;

  const videoSlot = () => `
    <div class="video">
      <video controls preload="metadata" src="${esc(CONFIG.caseVideo)}" onerror="this.closest('.video').classList.add('missing')"></video>
      <div class="ph">
        <div class="play-icon"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="#000"/></svg></div>
        <strong>Introvideo volgt</strong><code>${esc(CONFIG.caseVideo)}</code>
        <span>Introductie: maak kennis met Mark, de nieuwe Hardware Manager van Cegeka.</span>
      </div>
    </div>`;

  const renderAction = a => {
    if (typeof a === 'string') return `<li>${a}</li>`;
    let html = `<li>${a.text || ''}`;
    if (a.code) html += codeBlock(a.code, a.lang === 'markdown' ? 'CLAUDE.md' : a.lang === 'text' ? 'Structuur' : 'Terminal');
    if (a.codes) html += a.codes.map(c => codeBlock(c.code, c.label)).join('');
    if (a.prompt) html += promptBlock(a.prompt);
    if (a.copyfile) {
      const sk = CONFIG.skills[a.copyfile] || CONFIG[a.copyfile];
      html += `<p style="margin:10px 0 4px"><button type="button" class="btn primary small" data-copyfile="${esc(sk.file)}">${COPY_ICON} Kopieer ${esc(sk.name.charAt(0).toLowerCase() + sk.name.slice(1))}</button>${a.view ? '' : ' <a href="#skills" style="font-size:.9rem;margin-left:8px">Wat staat erin?</a>'}</p>`;
      if (a.view) html += `<details class="skill-view"><summary>Bekijk ${esc(sk.name.charAt(0).toLowerCase() + sk.name.slice(1))}</summary><div class="code prompt"><div class="code-head"><span>${esc(sk.name)}</span>${copyBtn(sk.name)}</div><pre><code data-skillsrc="${esc(sk.file)}">Laden...</code></pre></div></details>`;
    }
    return html + '</li>';
  };

  /* ---------- Sidebar ---------- */
  function renderSidebar(activeStepId, activePage) {
    const activeModule = activeStepId ? STEPS.find(s => s.id === activeStepId).module.id : null;
    const links = [['trainingen', '#trainingen', 'Alle trainingen'], ['home', '#start', 'Overzicht'], ['skills', '#skills', 'Skills'], ['prompts', '#prompts', 'Voorbeeldprompts'], ['woordenlijst', '#woordenlijst', 'Woordenlijst'], ['certificaat', '#certificaat', 'Certificaat']];
    let html = `<ul class="sb-links">${links.map(([k, h, t]) => `<li><a href="${h}" class="${activePage === k ? 'active' : ''}">${t}</a></li>`).join('')}</ul>`;
    html += MODULES.map(m => {
      const open = m.id === activeModule || state.open[m.id];
      const done = moduleDone(m);
      return `
      <div class="sb-module${open ? ' open' : ''}${isComplete(m) ? ' complete' : ''}" data-module="${m.id}">
        <button type="button" aria-expanded="${!!open}">
          <svg class="sb-chevron" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3"/></svg>
          <span>${m.number}. ${esc(m.title)}</span>
          <span class="sb-count">${m.info ? '' : `${done}/${m.steps.length}`}</span>
        </button>
        <ul class="sb-steps">
          ${m.steps.map(s => `<li><a href="#${s.id}" class="${s.id === activeStepId ? 'active' : ''}" ${s.id === activeStepId ? 'aria-current="page"' : ''}><span class="sb-dot${m.info ? ' info' : state.done[s.id] ? ' done' : ''}"></span><span>${esc(s.title)}</span></a></li>`).join('')}
        </ul>
      </div>`;
    }).join('');
    $('#sidebarInner').innerHTML = html;
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', a.dataset.nav === activePage));
  }

  function updateProgress() {
    const pct = Math.round(totalDone() / COUNTED.length * 100);
    $('#progressFill').style.width = pct + '%';
    $('#progressLabel').textContent = `${pct}% klaar · ${totalDone()} van ${COUNTED.length} stappen`;
    $('#progress').setAttribute('aria-valuenow', pct);
  }

  /* ---------- Pagina's ---------- */
  function renderHome() {
    const pct = Math.round(totalDone() / COUNTED.length * 100);
    const next = totalDone() ? COUNTED.find(s => !state.done[s.id]) : STEPS[0];
    return `
    <section class="hero">
      <div>
        <h1>${esc(CONFIG.title)}</h1>
        <p>Bouw in één sessie een complete Dataverse-oplossing voor Mark, de Hardware Manager. Eerst een bouwplan, daarna bouwen met Claude Code, de PAC CLI en de Cegeka skills.</p>
        <div class="hero-stats">
          <span class="pill">${MODULES.length} modules</span>
          <span class="pill">${COUNTED.length} stappen</span>
          <span class="pill">${pct}% klaar</span>
        </div>
        <a class="btn primary" href="#${next ? next.id : STEPS[0].id}" style="border-color:#000;background:#fff">${totalDone() ? 'Ga verder' : 'Start de training'} →</a>
      </div>
    </section>
    ${tipBox(totalDone() === COUNTED.length
      ? 'Je bent klaar! Vergeet je certificaat niet op te halen.'
      : 'Vink elke stap af met <em>Markeer als klaar</em>. Rond je een module af, dan krijg je een badge.')}
    <h2>Modules</h2>
    <div class="cards">
      ${MODULES.map(m => {
        if (m.info) return `<a class="card" href="#${m.steps[0].id}">
          <span class="card-num">Module ${m.number}</span>
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.intro)}</p>
          <div class="card-foot"><span>${m.steps.length} onderdelen om te lezen</span></div>
        </a>`;
        const d = moduleDone(m), p = Math.round(d / m.steps.length * 100);
        return `<a class="card${isComplete(m) ? ' complete' : ''}" href="#${(m.steps.find(s => !state.done[s.id]) || m.steps[0]).id}">
          <span class="card-num">Module ${m.number}</span>
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.intro)}</p>
          <div class="card-bar"><span style="width:${p}%"></span></div>
          <div class="card-foot"><span>${d}/${m.steps.length} stappen</span><span>${isComplete(m) ? 'Badge behaald' : ''}</span></div>
        </a>`;
      }).join('')}
    </div>
    <h2>Jouw badges</h2>
    ${badgesHtml()}
    <h2>Wat heb je nodig?</h2>
    <ul>
      <li>De voorbereiding uit de handleiding <a href="${esc(CONFIG.prepGuideUrl)}" target="_blank" rel="noopener">Aan de slag met Claude Code in VS Code</a>: licentie, VS Code, Node.js, Git, Claude Code, GitHub en een werkmap buiten OneDrive</li>
      <li>De Power Platform Tools-extensie in VS Code (module 1)</li>
      <li>Een Power Platform dev-omgeving met maker-rechten</li>
      <li>De Cegeka skills (zie <a href="#skills">Skills</a>) en het transcript van de intake met Mark (module 2)</li>
    </ul>
    <p class="no-print"><button type="button" class="btn ghost small" id="resetBtn">Voortgang wissen</button></p>`;
  }

  const badgesHtml = () => `<div class="badges">${TASK_MODULES.map(m => `
      <div class="badge${isComplete(m) ? ' earned' : ''}" title="${esc(m.badge)}">
        <div class="badge-medal">${m.number}</div>${esc(m.badge)}
      </div>`).join('')}</div>`;

  function renderStep(step) {
    const m = step.module;
    const i = STEPS.indexOf(STEPS.find(s => s.id === step.id));
    const prev = STEPS[i - 1], next = STEPS[i + 1];
    const intro = step.index === 0 && m.tip ? tipBox(esc(m.tip)) : '';
    return `
    <nav class="breadcrumb" aria-label="Kruimelpad"><a href="#start">Overzicht</a> / Module ${m.number}: ${esc(m.title)}</nav>
    <h1>${esc(step.title)}</h1>
    <div class="meta">
      <span class="pill blue">Module ${m.number} · ${m.info ? 'onderdeel' : 'stap'} ${step.index + 1} van ${m.steps.length}</span>
      ${state.done[step.id] ? '<span class="pill green">Klaar</span>' : ''}
    </div>
    ${intro}
    ${step.index === 0 ? `<p>${esc(m.intro)}</p>` : ''}
    ${m.info ? '' : `<div class="box goal"><h3>Doel</h3><p>${step.goal}</p></div>`}
    ${step.tip ? tipBox(esc(step.tip), step.tipLabel || 'Tip') : ''}
    ${step.video ? videoSlot() : ''}
    ${m.info ? '' : '<h2>Wat ga je doen?</h2>'}
    ${step.lead ? `<p>${step.lead}</p>` : ''}
    <ol class="todo${m.info ? ' plain' : ''}">${step.do.map(renderAction).join('')}</ol>
    ${shot(step.img)}
    ${m.info ? '' : `<div class="box check"><h3>Controleer</h3><p>${step.check}</p></div>
    <details class="box help"><summary>Hulp nodig?</summary><div class="help-body"><p>${step.help}</p></div></details>`}
${m.info ? '' : `    <div class="done-row">
      <label class="done-toggle"><input type="checkbox" id="doneBox" data-step="${step.id}" ${state.done[step.id] ? 'checked' : ''}> Markeer als klaar</label>
      ${next ? `<a class="btn primary small" href="#${next.id}" id="nextQuick">Volgende stap →</a>` : `<a class="btn primary small" href="#certificaat">Naar je certificaat →</a>`}
    </div>`}
    <div class="pager">
      ${prev ? `<a class="btn ghost" href="#${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#${next.id}">${esc(next.title)} →</a>` : ''}
    </div>`;
  }

  function renderSkills() {
    const s = CONFIG.skills;
    const card = (sk, desc, uses, modules, where) => `
      <article class="skill-card">
        <h2>${esc(sk.name)}</h2>
        <div class="skill-uses">${modules.map(m => `<span class="pill purple">Module ${m}</span>`).join('')}</div>
        <p>${desc}</p>
        <h3>Wanneer gebruik je hem?</h3>
        <ul>${uses.map(u => `<li>${u}</li>`).join('')}</ul>
        <h3>Waar zet je hem?</h3>
        ${where}
        <p style="margin-top:14px"><button type="button" class="btn primary small" data-copyfile="${esc(sk.file)}">${COPY_ICON} Kopieer de skill</button></p>
        <details class="skill-view">
          <summary>Bekijk de skill</summary>
          <div class="code"><div class="code-head"><span>SKILL.md</span>${copyBtn('skill')}</div><pre><code data-skillsrc="${esc(sk.file)}">Laden...</code></pre></div>
        </details>
      </article>`;
    return `
    <nav class="breadcrumb"><a href="#start">Overzicht</a> / Skills</nav>
    <h1>De Cegeka skills</h1>
    <p>Een skill is een <code>SKILL.md</code>-bestand met instructies en best practices die Claude automatisch gebruikt als ze relevant zijn. Cegeka heeft er twee: de building plan skill gebruik je in de chat om het bouwplan te maken, de building standards skill zet je in je project zodat Claude Code volgens de Cegeka-standaarden bouwt.</p>
    ${tipBox('Zie de skills als het vakmanschap van Cegeka in een bestand. Zonder skills bouwt Claude ook, maar mét skills bouwt Claude zoals wij dat afspreken.')}
    ${card(s.plan,
      'Helpt Copilot of Claude om van klantinput (transcripten, notities, Work IQ) een gestructureerd bouwplan te maken: datamodel, relaties, security, app, flows en acceptatiecriteria, met aannames en open vragen apart.',
      ['In module 2, als je het bouwplan maakt in Copilot of Claude chat.', 'Niet in Claude Code: in je project heb je alleen het bouwplan zelf nodig (docs/building-plan.md).'],
      [2],
      '<p>In de chat, niet in je project. Kopieer de skill en plak hem bovenaan je bericht in Claude of Copilot, samen met je input (module 2, stap 2).</p>')}
    ${card(s.standards,
      'Legt de Cegeka bouwstandaarden vast voor Power Platform en Dataverse: projectstructuur en CLAUDE.md, naamgeving en publisher prefix, hoe Claude verbinding maakt met een omgeving en de publisher en solution aanmaakt, security roles, connection references en environment variables, deployen via de PAC CLI en de manier van reviewen en committen. Daardoor hoef jij geen commando\'s te kennen: je vraagt het Claude in gewone taal.',
      ['In module 3, als Claude het project klaarzet en CLAUDE.md maakt.', 'In module 4, als Claude verbinding maakt met Dataverse en de solution aanmaakt.', 'In module 5 en 6, bij elke bouwstap, de review en de deploy.'],
      [3, 4, 5, 6],
      '<p>In je project. In module 3 maak je in de Explorer een nieuw bestand op dit pad en plak je de skill erin:</p><div class="path-box">.claude/skills/' + esc(s.standards.folder) + '/SKILL.md</div>')}
    <h2>Zo staat de skill in je project</h2>
    <p>Je maakt in de Explorer van VS Code een nieuw bestand met het volledige pad hieronder. VS Code maakt de mappen er vanzelf bij. Dit is het resultaat:</p>
    ${codeBlock('.claude/\n  skills/\n    ' + s.standards.folder + '/\n      SKILL.md', 'Structuur')}
    ${shot({ file: 'skills-mappenstructuur.png', caption: 'De Explorer in VS Code met .claude/skills/' + s.standards.folder + '/SKILL.md.' })}`;
  }

  function renderPrompts() {
    return `
    <nav class="breadcrumb"><a href="#start">Overzicht</a> / Voorbeeldprompts</nav>
    <h1>Voorbeeldprompts</h1>
    <p>Alle prompts uit de training op één plek. Kopieer, pas aan waar <code>[haken]</code> staan en plak in Copilot, Claude of Claude Code.</p>
    <div class="toc">${PROMPTS.map(p => `<a href="#prompts" data-jump="p-${p.id}">${esc(p.title)}</a>`).join('')}</div>
    ${PROMPTS.map(p => `
      <section class="prompt-entry" id="p-${p.id}">
        <h2>${esc(p.title)}</h2>
        <div class="meta"><span class="pill blue">${esc(p.where)}</span><span class="pill">Module ${p.module}</span></div>
        ${promptBlock(p.id)}
      </section>`).join('')}`;
  }

  function renderGlossary() {
    return `
    <nav class="breadcrumb"><a href="#start">Overzicht</a> / Woordenlijst</nav>
    <h1>Woordenlijst</h1>
    <p>De begrippen die je in deze training tegenkomt.</p>
    <input type="search" class="search" id="glossSearch" placeholder="Zoek een begrip..." aria-label="Zoek in de woordenlijst">
    <dl class="glossary" id="glossList">
      ${GLOSSARY.map(g => `<div data-term="${esc((g.term + ' ' + g.def).toLowerCase())}"><dt>${esc(g.term)}</dt><dd>${g.def}</dd></div>`).join('')}
    </dl>`;
  }

  function renderCert() {
    const all = totalDone() === COUNTED.length;
    const doneMods = TASK_MODULES.filter(isComplete).length;
    const date = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    return `
    <nav class="breadcrumb"><a href="#start">Overzicht</a> / Certificaat</nav>
    <h1>Certificaat</h1>
    ${tipBox(all
      ? 'Gefeliciteerd! Je hebt alle modules afgerond. Vul je naam in en download je certificaat.'
      : 'Je kunt je certificaat altijd downloaden. Wat je hebt afgerond, staat erop met een vinkje.')}
    <div class="cert-form no-print">
      <label for="certName" style="font-weight:700">Je naam</label>
      <input id="certName" type="text" placeholder="Vul je naam in" value="${esc(state.name)}" autocomplete="name">
      <button type="button" class="btn primary" id="certDownload">Download certificaat</button>
    </div>
    <p class="no-print" id="certMsg" hidden style="font-size:.9rem"></p>
    <div class="certificate" id="certificate">
      <img src="img/cert-illustratie.jpg" alt="" class="cert-illustration" onerror="this.remove()">
      <img src="img/cegeka-logo.png" alt="Cegeka" class="cert-logo" onerror="this.remove()">
      <div class="cert-kicker">Certificaat van deelname</div>
      <div class="cert-title">${all ? 'Gefeliciteerd!' : 'Goed bezig!'}</div>
      <div>Hierbij verklaren wij dat</div>
      <div class="cert-name" id="certNameOut">${esc(state.name || 'Jouw naam')}</div>
      <div>${all ? 'de training heeft afgerond' : 'heeft deelgenomen aan de training'}</div>
      <p class="cert-course">${esc(CONFIG.title)}</p>
      <div>${all ? 'en met Claude Code, de PAC CLI en de Cegeka skills een complete Dataverse-oplossing heeft gebouwd.' : `en daarvan ${doneMods} van de ${TASK_MODULES.length} modules heeft afgerond.`}</div>
      <ul class="cert-list">${TASK_MODULES.map(m => `<li class="${isComplete(m) ? 'done' : ''}"><span class="cert-check" aria-hidden="true"></span>${esc(m.certLabel)}<span class="sr-only">${isComplete(m) ? ' (afgerond)' : ' (nog niet afgerond)'}</span></li>`).join('')}</ul>
      <div class="cert-foot">
        <div><strong>Datum</strong><br>${date}</div>
        <div class="cert-tagline">shaping digital together</div>
      </div>
    </div>`;
  }

  /* Certificaat als PNG tekenen */
  function loadImg(src) {
    return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  }
  async function certificateBlob() {
    try { await document.fonts.ready; } catch (e) { /* ok */ }
    const W = 1600, H = 1131, c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d'), F = "'Nunito Sans', 'Segoe UI', sans-serif";
    const all = totalDone() === COUNTED.length;
    const doneMods = TASK_MODULES.filter(isComplete).length;
    x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
    x.save(); x.beginPath(); x.rect(40, 40, W - 80, H - 80); x.clip();
    x.fillStyle = '#E5F9FE';
    x.beginPath(); x.arc(W - 100, 80, 240, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(100, H - 80, 170, 0, Math.PI * 2); x.fill();
    x.restore();
    x.strokeStyle = '#000'; x.lineWidth = 4; x.strokeRect(40, 40, W - 80, H - 80);
    x.fillStyle = '#00C7F9'; x.fillRect(40, H - 52, W - 80, 12);
    const ill = await loadImg('img/cert-illustratie.jpg');
    if (ill) { x.save(); x.globalAlpha = 0.9; x.drawImage(ill, 80, 70, 230, 230); x.restore(); }
    const logo = await loadImg('img/cegeka-logo.png');
    if (logo) { const h = 70, w = logo.width * h / logo.height; x.drawImage(logo, (W - w) / 2, 100, w, h); }
    x.textAlign = 'center';
    const t = (txt, y, size, weight, color, spacing) => {
      x.font = `${weight} ${size}px ${F}`; x.fillStyle = color;
      if (spacing && 'letterSpacing' in x) x.letterSpacing = spacing; x.fillText(txt, W / 2, y);
      if ('letterSpacing' in x) x.letterSpacing = '0px';
    };
    t('CERTIFICAAT VAN DEELNAME', 230, 22, 800, '#0095BB', '4px');
    t(all ? 'Gefeliciteerd!' : 'Goed bezig!', 310, 64, 800, '#000');
    t('Hierbij verklaren wij dat', 375, 28, 400, '#3D3D3D');
    const name = state.name || 'Jouw naam';
    t(name, 455, 64, 800, '#632064');
    x.font = `800 64px ${F}`; const nw = Math.max(420, x.measureText(name).width + 60);
    x.fillStyle = '#00C7F9'; x.fillRect((W - nw) / 2, 478, nw, 5);
    t(all ? 'de training heeft afgerond' : 'heeft deelgenomen aan de training', 540, 28, 400, '#3D3D3D');
    t(CONFIG.title, 600, 38, 800, '#000');
    t(all ? 'en met Claude Code, de PAC CLI en de Cegeka skills een complete Dataverse-oplossing heeft gebouwd.'
          : `en daarvan ${doneMods} van de ${TASK_MODULES.length} modules heeft afgerond.`, 655, 26, 400, '#3D3D3D');
    const colX = [230, 850], rowH = 62, y0 = 715, perCol = Math.ceil(TASK_MODULES.length / 2);
    TASK_MODULES.forEach((m, i) => {
      const cx = colX[Math.floor(i / perCol)], cy = y0 + (i % perCol) * rowH, ok = isComplete(m);
      x.beginPath(); x.arc(cx, cy, 16, 0, Math.PI * 2);
      if (ok) {
        x.fillStyle = '#632064'; x.fill();
        x.strokeStyle = '#fff'; x.lineWidth = 4; x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath(); x.moveTo(cx - 7, cy + 1); x.lineTo(cx - 2, cy + 6); x.lineTo(cx + 8, cy - 6); x.stroke();
      } else {
        x.fillStyle = '#F1F1F1'; x.fill(); x.lineWidth = 2; x.strokeStyle = '#B8B8B8'; x.setLineDash([5, 4]); x.stroke(); x.setLineDash([]);
      }
      x.textAlign = 'left'; x.textBaseline = 'middle';
      x.font = `${ok ? 700 : 400} 21px ${F}`; x.fillStyle = ok ? '#000' : '#7A7A7A';
      const lines = []; let line = '';
      m.certLabel.split(' ').forEach(w => { const t2 = line ? line + ' ' + w : w; if (x.measureText(t2).width > 500 && line) { lines.push(line); line = w; } else line = t2; });
      lines.push(line);
      const lh = 25, top = cy - (lines.length - 1) * lh / 2;
      lines.forEach((l, k) => x.fillText(l, cx + 30, top + k * lh + 1));
      x.textBaseline = 'alphabetic';
    });
    const date = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    x.textAlign = 'left'; x.font = `800 22px ${F}`; x.fillStyle = '#000'; x.fillText('Datum', 110, 980);
    x.font = `400 22px ${F}`; x.fillStyle = '#3D3D3D'; x.fillText(date, 110, 1012);
    x.textAlign = 'right'; x.font = `700 24px ${F}`; x.fillStyle = '#00647D'; x.fillText('shaping digital together', W - 110, 1012);
    return new Promise(res => c.toBlob(res, 'image/png'));
  }
  async function downloadCertificate(btn) {
    const msg = $('#certMsg'); msg.hidden = true;
    btn.disabled = true;
    const label = btn.textContent; btn.textContent = 'Bezig...';
    const filename = `certificaat-${(state.name || 'deelnemer').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'deelnemer'}.png`;
    try {
      const blob = await certificateBlob();
      let saved = false;
      if (window.claude && typeof window.claude.use === 'function') {
        const dl = await window.claude.use('downloads');
        if (dl) { await dl.save({ filename, data: blob }); saved = true; }
      }
      if (!saved) {
        const url = URL.createObjectURL(blob), a = document.createElement('a');
        a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
    } catch (err) {
      msg.textContent = 'Downloaden is niet gelukt. Probeer het opnieuw, of maak een screenshot van je certificaat.';
      msg.hidden = false;
    }
    btn.disabled = false; btn.textContent = label;
  }

  /* ---------- Startpagina met trainingen ---------- */
  const ICONS = {
    database: '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="7.5" ry="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 18.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    globe: '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
  };

  function renderLanding() {
    const pct = Math.round(totalDone() / COUNTED.length * 100);
    return `
    <section class="landing-hero">
      <div class="landing-hero-inner">
        <span class="landing-kicker">Cegeka trainingen</span>
        <h1><span class="grad">Agentic bouwen</span> in het Power Platform</h1>
        <p>Leer stap voor stap hoe je met een coding agent oplossingen bouwt in het Power Platform: van intake en bouwplan tot een werkende, geteste oplossing.</p>
        <a class="btn primary" href="#start">Start met de eerste training →</a>
      </div>
    </section>
    <section class="landing-body">
      <h2>Kies je training</h2>
      <p class="landing-intro">Elke training volgt dezelfde aanpak: plan eerst, bouw daarna, en jij houdt de regie.</p>
      <div class="training-grid">
        ${TRAININGS.map(t => {
          const inner = `
            <div class="training-icon">${ICONS[t.icon] || ''}</div>
            <span class="training-sub">${esc(t.subtitle)}</span>
            <h3>${esc(t.title)}</h3>
            <p>${esc(t.description)}</p>
            <div class="training-tags">${t.tags.map(g => `<span>${esc(g)}</span>`).join('')}</div>
            ${t.active
              ? `<div class="training-progress"><div class="card-bar"><span style="width:${pct}%"></span></div><span>${pct}% klaar</span></div>
                 <span class="btn primary small training-cta">${totalDone() ? 'Ga verder' : 'Start training'} →</span>`
              : '<span class="training-soon">Binnenkort beschikbaar</span>'}`;
          return t.active
            ? `<a class="training-card" href="${esc(t.href)}"><span class="pill green training-status">Beschikbaar</span>${inner}</a>`
            : `<div class="training-card soon" aria-disabled="true"><span class="pill training-status">Binnenkort</span>${inner}</div>`;
        }).join('')}
      </div>
      <p class="landing-tagline">shaping digital together</p>
    </section>`;
  }

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, '').replace(/^stap\//, '');
    const page = hash, id = hash;
    const main = $('#main');
    let active = 'home', stepId = null;

    if (STEPS.find(s => s.id === id)) {
      stepId = id; active = null;
      main.innerHTML = renderStep(STEPS.find(s => s.id === id));
    } else if (page === 'skills') { active = 'skills'; main.innerHTML = renderSkills(); }
    else if (page === 'prompts') { active = 'prompts'; main.innerHTML = renderPrompts(); }
    else if (page === 'woordenlijst') { active = 'woordenlijst'; main.innerHTML = renderGlossary(); }
    else if (page === 'certificaat') { active = 'certificaat'; main.innerHTML = renderCert(); }
    else if (page === 'start') { main.innerHTML = renderHome(); }
    else { active = 'trainingen'; main.innerHTML = renderLanding(); }
    const landing = active === 'trainingen';
    document.body.classList.toggle('landing', landing);
    $('#brandTitle').textContent = landing ? 'Trainingen' : CONFIG.title;

    document.querySelectorAll('[data-skillsrc]').forEach(async el => {
      const f = el.dataset.skillsrc;
      try { el.textContent = FILE_CACHE[f] || (FILE_CACHE[f] = await (await fetch(f)).text()); }
      catch (err) { el.textContent = 'De skill kon niet worden geladen.'; }
    });
    renderSidebar(stepId, active);
    updateProgress();
    closeMenu();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    const t = stepId ? STEPS.find(s => s.id === stepId).title : ({ skills: 'Skills', prompts: 'Voorbeeldprompts', woordenlijst: 'Woordenlijst', certificaat: 'Certificaat' }[active] || 'Overzicht');
    document.title = landing ? 'Cegeka trainingen | Agentic bouwen in het Power Platform' : `${t} | ${CONFIG.title}`;
  }

  /* ---------- Interactie ---------- */
  function toggleDone(id, checked) {
    const step = STEPS.find(s => s.id === id);
    const wasComplete = isComplete(step.module);
    if (checked) state.done[id] = true; else delete state.done[id];
    save();
    renderSidebar(id, null);
    updateProgress();
    const pills = $('.meta');
    if (pills) {
      const p = pills.querySelector('.pill.green');
      if (checked && !p) pills.insertAdjacentHTML('beforeend', '<span class="pill green">Klaar</span>');
      if (!checked && p) p.remove();
    }
    if (!wasComplete && isComplete(step.module)) celebrate(step.module);
  }

  function celebrate(m) {
    state.badges[m.id] = true; save();
    const all = totalDone() === COUNTED.length;
    const toast = $('#toast');
    toast.innerHTML = `<div class="badge-medal">${m.number}</div><div><strong>Badge behaald: ${esc(m.badge)}</strong><br>${all ? 'Alle modules klaar! Haal je certificaat op.' : `Module ${m.number} – ${esc(m.title)} is afgerond.`}</div>`;
    toast.hidden = false;
    clearTimeout(celebrate.t);
    celebrate.t = setTimeout(() => { toast.hidden = true; }, 5000);
    confetti(all ? 260 : 140);
  }

  function confetti(n) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = $('#confetti'), ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const colors = ['#00C7F9', '#80E3FC', '#0095BB', '#632064', '#F04B4C', '#000000'];
    const parts = Array.from({ length: n }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35,
      vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    const start = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach(p => {
        p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (t - start < 3500) requestAnimationFrame(frame); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })(start);
  }

  async function copyText(btn) {
    const pre = btn.closest('.code').querySelector('pre');
    const text = pre.innerText.replace(/\n$/, '');
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    btn.classList.add('copied'); btn.querySelector('span').textContent = 'Gekopieerd';
    setTimeout(() => { btn.classList.remove('copied'); btn.querySelector('span').textContent = 'Kopieer'; }, 1800);
  }

  [...Object.values(CONFIG.skills), CONFIG.transcript].forEach(sk => fetch(sk.file).then(r => r.ok ? r.text() : null).then(t => { if (t) FILE_CACHE[sk.file] = t; }).catch(() => {}));

  async function copyFile(btn) {
    const label = btn.innerHTML;
    try {
      const txt = FILE_CACHE[btn.dataset.copyfile] || await (await fetch(btn.dataset.copyfile)).text();
      await navigator.clipboard.writeText(txt);
      btn.textContent = 'Gekopieerd';
    } catch (err) { btn.textContent = 'Kopiëren lukt niet'; }
    setTimeout(() => { btn.innerHTML = label; }, 1800);
  }

  function openMenu() { $('#sidebar').classList.add('open'); $('#scrim').hidden = false; $('#menuBtn').setAttribute('aria-expanded', 'true'); }
  function closeMenu() { $('#sidebar').classList.remove('open'); $('#scrim').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }

  document.addEventListener('click', e => {
    const copy = e.target.closest('[data-copy]');
    if (copy) return copyText(copy);
    const modBtn = e.target.closest('.sb-module > button');
    if (modBtn) {
      const mod = modBtn.parentElement, id = mod.dataset.module;
      const open = !mod.classList.contains('open');
      mod.classList.toggle('open', open); modBtn.setAttribute('aria-expanded', open);
      state.open[id] = open; save();
      return;
    }
    const jump = e.target.closest('[data-jump]');
    if (jump) { e.preventDefault(); const el = document.getElementById(jump.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
    if (e.target.id === 'certDownload') { downloadCertificate(e.target); return; }
    const sc = e.target.closest('[data-copyfile]');
    if (sc) { copyFile(sc); return; }
    if (e.target.id === 'resetBtn') {
      const b = e.target;
      if (b.dataset.armed) { state = Object.assign({}, defaults, { done: {}, badges: {}, open: {} }); save(); route(); }
      else { b.dataset.armed = '1'; b.textContent = 'Klik nogmaals om alles te wissen'; setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = 'Voortgang wissen'; } }, 4000); }
    }
  });

  document.addEventListener('change', e => {
    if (e.target.id === 'doneBox') toggleDone(e.target.dataset.step, e.target.checked);
  });

  document.addEventListener('input', e => {
    if (e.target.id === 'certName') {
      state.name = e.target.value.trim(); save();
      $('#certNameOut').textContent = state.name || 'Jouw naam';
    }
    if (e.target.id === 'glossSearch') {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#glossList > div').forEach(d => { d.hidden = q && !d.dataset.term.includes(q); });
    }
  });

  $('#menuBtn').addEventListener('click', () => ($('#sidebar').classList.contains('open') ? closeMenu() : openMenu()));
  $('#scrim').addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  window.addEventListener('hashchange', route);
  route();
})();
