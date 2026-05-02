/* Marathon training app — editorial redesign */

const STORAGE_KEY = 'marathon-sub3hr-2026-v2';
const RACE_DATE = '2026-09-20';
const TRAIN_START = '2026-05-04';

let progress = {};
try { progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) {}

const PHASES = [
  {key:'base',  name:'基礎建立', en:'BASE',     dates:'W1–W4 · 05/04–05/31',  short:'05/04'},
  {key:'aero',  name:'有氧發展', en:'AEROBIC',  dates:'W5–W8 · 06/01–06/28',  short:'06/01'},
  {key:'build', name:'強化期',   en:'BUILD',    dates:'W9–W13 · 06/29–08/02', short:'06/29'},
  {key:'peak',  name:'高峰期',   en:'PEAK',     dates:'W14–W16 · 08/03–08/30',short:'08/03'},
  {key:'taper', name:'減量備賽', en:'TAPER',    dates:'W17–W19 · 08/31–09/20',short:'08/31'},
];

const PHASE_C = {
  base:'var(--c-long)', aero:'var(--c-easy)', build:'var(--c-tempo)',
  peak:'var(--c-race)', taper:'var(--c-int)'
};
const CAT_C = {
  rest:'var(--c-rest)', easy:'var(--c-easy)', long:'var(--c-long)',
  tempo:'var(--c-tempo)', interval:'var(--c-int)', strength:'var(--c-int)',
  stretch:'var(--c-long)', travel:'var(--c-travel)', race:'var(--c-race)'
};
const CAT_LABEL = {
  rest:'REST', easy:'EASY', long:'LONG', tempo:'TEMPO', interval:'INTERVAL',
  strength:'STRENGTH', stretch:'YOGA', travel:'TRAVEL', race:'RACE'
};

function todayISO(){
  const t = new Date();
  return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
}
function toISO(d){ if(!d) return ''; const [m,dd]=d.split('/'); return `2026-${m.padStart(2,'0')}-${dd.padStart(2,'0')}`; }
function pk(w,i){ return `w${w}-${i}`; }
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }

function switchTab(name){
  document.querySelectorAll('.tab-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
  window.scrollTo({top:0});
}

function buildMasthead(){
  const today = todayISO();
  const race = new Date(RACE_DATE+'T07:00:00+08:00');
  const days = Math.max(0, Math.ceil((race - new Date()) / 864e5));
  const totalWeeks = WEEKS.length;
  const weeksIn = WEEKS.filter(w=>{
    const isos = w.days.filter(d=>d.date).map(d=>toISO(d.date));
    return isos.length && isos[0] <= today;
  }).length;
  document.getElementById('cd-days').textContent = days;
  document.getElementById('cd-weeks').textContent = `${weeksIn}/${totalWeeks}`;
}

function buildOverview(){
  const today = todayISO();

  // Today hero
  let todayDay=null, todayWeek=null, todayIdx=-1;
  for (const w of WEEKS){
    for (let i=0;i<w.days.length;i++){
      if (toISO(w.days[i].date) === today){ todayDay = w.days[i]; todayWeek=w; todayIdx=i; break; }
    }
    if (todayDay) break;
  }

  const hero = document.getElementById('today-hero');
  if (todayDay){
    hero.innerHTML = `
      <div class="label-row">
        <span class="eyebrow today-eyebrow">今日 · Week ${todayWeek.id} · ${todayDay.dow||''}</span>
        <span class="pill">${CAT_LABEL[todayDay.cat]||''}</span>
      </div>
      <h1>${todayDay.title}</h1>
      ${todayDay.detail?`<div class="detail">${todayDay.detail}</div>`:''}
      <div class="hero-foot">
        <div class="hero-stats">
          <div class="stat"><span class="v">${todayWeek.km}</span><span class="k">本週總量</span></div>
          <div class="stat"><span class="v">${todayWeek.phaseLabel}</span><span class="k">階段</span></div>
        </div>
        <a class="jump" onclick="jumpToCurrent()">展開本週 →</a>
      </div>
    `;
  } else if (today < TRAIN_START){
    hero.innerHTML = `
      <div class="label-row"><span class="eyebrow today-eyebrow">訓練尚未開始</span></div>
      <h1>計畫即將開始</h1>
      <div class="detail">第一週從 05/04 起跑。先休息、養腿、調整作息。</div>
    `;
  } else {
    hero.innerHTML = `
      <div class="label-row"><span class="eyebrow today-eyebrow">今日無安排</span></div>
      <h1>今天沒安排訓練</h1>
      <div class="detail">查看週計畫追上進度。</div>
    `;
  }

  // Progress
  let totalDays=0, doneDays=0;
  WEEKS.forEach(w=>w.days.forEach((d,i)=>{
    if (d.cat!=='travel' || d.date){ totalDays++; if (progress[pk(w.id,i)]) doneDays++; }
  }));
  const pct = totalDays ? Math.round(doneDays/totalDays*100) : 0;
  document.getElementById('pt-pct').textContent = pct + '%';
  const ringText = document.getElementById('ring-pct-text');
  if (ringText) ringText.textContent = pct + '%';

  // Progress ring
  const ring = document.getElementById('ring-arc');
  if (ring){
    const C = 2 * Math.PI * 42;
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C * (1 - pct/100);
  }

  // Phase track
  const trackEl = document.getElementById('phase-track-bar');
  trackEl.innerHTML = PHASES.map(p=>{
    const pWeeks = WEEKS.filter(w=>w.phase===p.key);
    const pTotal = pWeeks.reduce((s,w)=>s+w.days.filter(d=>d.cat!=='travel'||d.date).length,0);
    const pDone = pWeeks.reduce((s,w)=>s+w.days.filter((d,i)=>(d.cat!=='travel'||d.date) && progress[pk(w.id,i)]).length,0);
    const fillPct = pTotal ? (pDone/pTotal*100) : 0;
    const firstISO = pWeeks.length ? toISO(pWeeks[0].days.find(d=>d.date)?.date||'') : '';
    const lastDays = pWeeks[pWeeks.length-1]?.days.filter(d=>d.date) || [];
    const lastISO = lastDays.length ? toISO(lastDays[lastDays.length-1].date) : '';
    let cls = '';
    if (firstISO && firstISO <= today && (!lastISO || lastISO >= today)) cls='current';
    return `<div class="pt-seg ${cls}" style="--seg-c:${PHASE_C[p.key]}">
      <div class="fill" style="right:${100-fillPct}%"></div>
      <div class="lbl">${p.en}</div>
    </div>`;
  }).join('');

  // Phase list
  const GLYPHS = {
    // 種子 — 基礎建立（從零生長）
    base:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14 V8"/><path d="M8 8 C5 8 4 6 4 4 C6 4 8 5 8 8 Z"/><path d="M8 8 C11 8 12 6 12 4 C10 4 8 5 8 8 Z"/></svg>',
    // 葉 — 有氧發展（呼吸與循環）
    aero:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13 C3 7 7 3 13 3 C13 9 9 13 3 13 Z"/><path d="M3 13 L9 7"/></svg>',
    // 山 — 強化期（爬升）
    build: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13 L6 6 L9 10 L11 7 L14 13 Z"/></svg>',
    // 旗幟 — 高峰期（攻頂）
    peak:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14 V2"/><path d="M4 3 L13 3 L11 6 L13 9 L4 9"/></svg>',
    // 月 — 減量備賽（休養）
    taper: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11 A6 6 0 1 1 12 5 A4 4 0 1 0 12 11 Z"/></svg>',
  };
  const listEl = document.getElementById('phase-list');
  listEl.innerHTML = PHASES.map(p=>{
    const pWeeks = WEEKS.filter(w=>w.phase===p.key);
    const firstISO = pWeeks.length ? toISO(pWeeks[0].days.find(d=>d.date)?.date||'') : '';
    const lastDays = pWeeks[pWeeks.length-1]?.days.filter(d=>d.date) || [];
    const lastISO = lastDays.length ? toISO(lastDays[lastDays.length-1].date) : '';
    let cls='', stat='';
    if (lastISO && lastISO < today){ cls='done'; stat='完成'; }
    else if (firstISO && firstISO <= today){ cls='current'; stat='進行中'; }
    else { stat='未開始'; }
    return `<div class="phase-row ${cls}" style="--seg-c:${PHASE_C[p.key]}">
      <div class="glyph">${GLYPHS[p.key]}</div>
      <div class="name">${p.name}</div>
      <div class="dates">${p.dates}</div>
      <div class="status">${stat}</div>
    </div>`;
  }).join('');
}

function buildSchedule(){
  const container = document.getElementById('week-list');
  const today = todayISO();
  container.innerHTML = WEEKS.map(w=>{
    const segC = PHASE_C[w.phase];
    const isCurrent = w.days.some(d => toISO(d.date) === today);
    const travelCls = w.travel ? ' travel' : '';
    const dayRows = w.days.map((d,i)=>{
      const iso = toISO(d.date);
      const done = !!progress[pk(w.id,i)];
      let rowCls = '';
      if (iso === today) rowCls = 'today';
      else if (iso && iso < today) rowCls = 'past';
      if (done) rowCls += ' done';
      return `<div class="day ${rowCls}" style="--cat-c:${CAT_C[d.cat]}" onclick="onCheck(${w.id},${i},this)">
        <div class="d-check"></div>
        <div class="d-dow">
          <div class="name">${d.dow||'—'}</div>
          <div class="date">${d.date||'—'}</div>
        </div>
        <div class="d-tag"></div>
        <div class="d-content">
          <div class="d-title">${d.title}</div>
          ${d.detail?`<div class="d-detail">${d.detail}</div>`:''}
        </div>
        <div class="d-cat">${CAT_LABEL[d.cat]||''}</div>
      </div>`;
    }).join('');

    const total = w.days.length;
    const done = w.days.filter((d,i)=>progress[pk(w.id,i)]).length;
    const barPct = total ? (done/total*100) : 0;

    const travelBadge = w.travel ? `<span class="travel-badge">Travel</span>` : '';
    return `<div class="week-card${travelCls}${isCurrent?' current':''}" id="wcard-${w.id}">
      <div class="wh" id="wh-${w.id}" onclick="toggleWeek(${w.id})">
        <div class="wh-num"><small>WK</small>${String(w.id).padStart(2,'0')}</div>
        <div class="wh-info">
          <div class="wh-phase" style="--seg-c:${segC}">${travelBadge}${w.phaseLabel}</div>
          <div class="wh-title">${w.note||''}</div>
          <div class="wh-dates">${w.dates}</div>
        </div>
        <div class="wh-right">
          <div class="wh-km">${w.km}</div>
          <div class="wh-bar"><div class="wh-bar-fill" id="bar-${w.id}" style="width:${barPct}%"></div></div>
        </div>
        <div class="wh-caret">▾</div>
      </div>
      <div class="week-body" id="wb-${w.id}">
        <div class="week-body-grid">${dayRows}</div>
        ${w.note?`<div class="week-note">💡 ${w.note}</div>`:''}
      </div>
    </div>`;
  }).join('');

  // Auto expand current
  const cw = WEEKS.find(w=>w.days.some(d=>toISO(d.date)===today));
  if (cw){
    const body = document.getElementById('wb-'+cw.id);
    const head = document.getElementById('wh-'+cw.id);
    if (body && !body.classList.contains('open')){ body.classList.add('open'); head.classList.add('expanded'); }
  }
}

function toggleWeek(id){
  document.getElementById('wb-'+id).classList.toggle('open');
  document.getElementById('wh-'+id).classList.toggle('expanded');
}

function onCheck(wid, idx, row){
  const k = pk(wid, idx);
  progress[k] = !progress[k];
  save();
  row.classList.toggle('done', progress[k]);
  // bar
  const w = WEEKS.find(w=>w.id===wid);
  const done = w.days.filter((d,i)=>progress[pk(wid,i)]).length;
  const bar = document.getElementById('bar-'+wid);
  if (bar) bar.style.width = (done/w.days.length*100)+'%';
  buildOverview();
}

function jumpToCurrent(){
  switchTab('schedule');
  setTimeout(()=>{
    const today = todayISO();
    const cw = WEEKS.find(w=>w.days.some(d=>toISO(d.date)===today));
    if (cw){
      const body = document.getElementById('wb-'+cw.id);
      const head = document.getElementById('wh-'+cw.id);
      if (body && !body.classList.contains('open')){
        body.classList.add('open');
        head.classList.add('expanded');
      }
      const card = document.getElementById('wcard-'+cw.id);
      if (card){
        const y = card.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({top:y, behavior:'smooth'});
      }
    }
  }, 120);
}

function resetAll(){
  if (!confirm('確定要清除所有打勾紀錄？')) return;
  progress = {};
  save();
  buildSchedule();
  buildOverview();
}

/* ===== Tweaks ===== */
const TWEAKS_DEFAULT = /*EDITMODE-BEGIN*/{
  "theme": "editorial",
  "density": "regular",
  "fontSize": 15,
  "accent": "default"
}/*EDITMODE-END*/;

let TWK = {...TWEAKS_DEFAULT};
try {
  const saved = JSON.parse(localStorage.getItem('marathon-tweaks-v2')||'null');
  if (saved) TWK = {...TWK, ...saved};
} catch(e){}

const ACCENTS = {
  default: null,
  cobalt:  '#1d4ed8',
  forest:  '#2d6a4f',
  amber:   '#d97706',
  magenta: '#c026d3',
};

function applyTweaks(){
  document.documentElement.setAttribute('data-theme', TWK.theme);
  document.documentElement.setAttribute('data-density', TWK.density);
  document.documentElement.style.fontSize = TWK.fontSize + 'px';
  if (ACCENTS[TWK.accent]){
    document.documentElement.style.setProperty('--accent', ACCENTS[TWK.accent]);
  } else {
    document.documentElement.style.removeProperty('--accent');
  }
}

function setTweak(k, v){
  TWK[k] = v;
  localStorage.setItem('marathon-tweaks-v2', JSON.stringify(TWK));
  applyTweaks();
  // tell host so it survives reload via file rewrite
  try { window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[k]:v}}, '*'); } catch(e){}
  renderTweaks();
}

function renderTweaks(){
  const panel = document.getElementById('tweaks-body');
  if (!panel) return;
  const themes = [
    {k:'editorial', l:'Editorial'},
    {k:'sport',     l:'Sport'},
    {k:'press',     l:'Press'},
  ];
  const densities = [
    {k:'compact', l:'Compact'},
    {k:'regular', l:'Regular'},
    {k:'comfy',   l:'Comfy'},
  ];
  const accents = ['default','cobalt','forest','amber','magenta'];
  panel.innerHTML = `
    <div class="twk-sec">Theme</div>
    <div class="twk-seg">
      ${themes.map(t=>`<button class="twk-segb${TWK.theme===t.k?' on':''}" onclick="setTweak('theme','${t.k}')">${t.l}</button>`).join('')}
    </div>
    <div class="twk-sec">Density</div>
    <div class="twk-seg">
      ${densities.map(d=>`<button class="twk-segb${TWK.density===d.k?' on':''}" onclick="setTweak('density','${d.k}')">${d.l}</button>`).join('')}
    </div>
    <div class="twk-sec">Accent</div>
    <div class="twk-acc">
      ${accents.map(a=>`<button class="twk-dot${TWK.accent===a?' on':''}" data-a="${a}"
        style="background:${ACCENTS[a]||'var(--accent)'}"
        onclick="setTweak('accent','${a}')" title="${a}"></button>`).join('')}
    </div>
    <div class="twk-sec">Font size <span class="twk-val">${TWK.fontSize}px</span></div>
    <input class="twk-range" type="range" min="13" max="18" step="1" value="${TWK.fontSize}"
      oninput="setTweak('fontSize', +this.value)">
  `;
}

/* host protocol */
let TWEAKS_VISIBLE = false;
function setTweaksVisible(v){
  TWEAKS_VISIBLE = v;
  document.getElementById('tweaks-panel').classList.toggle('open', v);
}
window.addEventListener('message', (e)=>{
  const d = e.data || {};
  if (d.type === '__activate_edit_mode') setTweaksVisible(true);
  if (d.type === '__deactivate_edit_mode') setTweaksVisible(false);
});

/* init */
document.addEventListener('DOMContentLoaded', ()=>{
  applyTweaks();
  buildMasthead();
  buildOverview();
  buildSchedule();
  renderTweaks();
  switchTab('today');
  // signal host AFTER listener is set
  try { window.parent.postMessage({type:'__edit_mode_available'}, '*'); } catch(e){}
});
