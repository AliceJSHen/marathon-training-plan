const STORAGE_KEY = 'marathon-sub3hr-2026-v1';
const RACE_DATE = '2026-09-20';
const TRAIN_START = '2026-05-01';
let progress = {};
try { progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) {}

function todayISO() {
  const t = new Date();
  return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
}
function toISO(dateStr) {
  if (!dateStr) return '';
  const [m,d] = dateStr.split('/');
  return `2026-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
}
function pk(wid, idx) { return `w${wid}-${idx}`; }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }

// Tab switching
function switchTab(name) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
}

// Build overview page
function buildOverview() {
  const today = todayISO();
  const race = new Date(RACE_DATE+'T07:00:00+08:00');
  const days = Math.max(0, Math.ceil((race - new Date()) / 864e5));
  document.getElementById('cd-days').textContent = days;
  const totalWeeks = WEEKS.length;
  const weeksIn = WEEKS.filter(w => {
    const isos = w.days.filter(d=>d.date).map(d=>toISO(d.date));
    return isos.length && isos[0] <= today;
  }).length;
  document.getElementById('cd-weeks').textContent = `${weeksIn}/${totalWeeks}`;

  // Today banner
  let todayDay = null, todayWeek = null;
  for (const w of WEEKS) {
    for (const d of w.days) {
      if (toISO(d.date) === today) { todayDay = d; todayWeek = w; break; }
    }
    if (todayDay) break;
  }
  const banner = document.getElementById('today-banner');
  if (todayDay) {
    document.getElementById('tb-label').textContent = `今日訓練 · W${todayWeek.id}`;
    document.getElementById('tb-icon').textContent = todayDay.icon;
    document.getElementById('tb-title').textContent = todayDay.title;
    document.getElementById('tb-detail').textContent = todayDay.detail;
    banner.style.display = 'block';
  } else if (today < TRAIN_START) {
    document.getElementById('tb-label').textContent = '訓練尚未開始';
    document.getElementById('tb-icon').textContent = '⏰';
    document.getElementById('tb-title').textContent = '即將從 05/01 開始';
    document.getElementById('tb-detail').textContent = '';
    banner.style.display = 'block';
  } else if (today > RACE_DATE) {
    document.getElementById('tb-label').textContent = '比賽已結束';
    document.getElementById('tb-icon').textContent = '🎉';
    document.getElementById('tb-title').textContent = '辛苦了！';
    document.getElementById('tb-detail').textContent = '';
    banner.style.display = 'block';
  }

  // Progress ring
  let totalDays = 0, doneDays = 0;
  WEEKS.forEach(w => {
    w.days.forEach((d, i) => {
      if (d.cat !== 'travel' || d.date) { totalDays++; if (progress[pk(w.id, i)]) doneDays++; }
    });
  });
  const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;
  document.getElementById('ring-pct').textContent = pct + '%';
  const circle = document.getElementById('ring-circle');
  const circ = 2 * Math.PI * 52;
  circle.style.strokeDasharray = circ;
  circle.style.strokeDashoffset = circ * (1 - pct / 100);

  // Phase timeline
  const phases = [
    {key:'base',label:'🟢 基礎建立',dates:'W1-W4 · 05/01–05/28'},
    {key:'aero',label:'🔵 有氧發展',dates:'W5-W8 · 05/29–06/29'},
    {key:'build',label:'🟡 強化期',dates:'W9-W14 · 06/30–08/10'},
    {key:'peak',label:'🟠 高峰期',dates:'W14-W16 · 08/04–08/31'},
    {key:'taper',label:'🔴 減量備賽',dates:'W17-W19 · 09/01–09/20'},
  ];
  const tlEl = document.getElementById('phase-timeline');
  tlEl.innerHTML = phases.map(p => {
    let status = '';
    const pWeeks = WEEKS.filter(w => w.phase === p.key);
    const firstISO = pWeeks.length ? toISO(pWeeks[0].days.find(d=>d.date)?.date||'') : '';
    const lastW = pWeeks[pWeeks.length-1];
    const lastDays = lastW?.days.filter(d=>d.date) || [];
    const lastISO = lastDays.length ? toISO(lastDays[lastDays.length-1].date) : '';
    let cls = '';
    if (lastISO && lastISO < today) { cls = 'done'; status = '✅'; }
    else if (firstISO && firstISO <= today && (!lastISO || lastISO >= today)) { cls = 'current'; status = '進行中'; }
    return `<div class="tl-item ${cls}">
      <div class="tl-dot" style="background:${PHASE_DOTS[p.key]}"></div>
      <div class="tl-info"><div class="tl-phase">${p.label}</div><div class="tl-dates">${p.dates}</div></div>
      <div class="tl-status" style="color:${PHASE_DOTS[p.key]}">${status}</div></div>`;
  }).join('');
}

// Build schedule page
function buildSchedule() {
  const container = document.getElementById('week-list');
  const today = todayISO();
  container.innerHTML = WEEKS.map(w => {
    const [bg, fg] = (PHASE_COLORS[w.phase]||'#f5f5f7|#1d1d1f').split('|');
    const travelCls = w.travel ? ' travel' : '';
    const dayRows = w.days.map((d, i) => {
      const cs = CAT_STYLES[d.cat] || CAT_STYLES.rest;
      const iso = toISO(d.date);
      const checked = progress[pk(w.id, i)] ? 'checked' : '';
      let rowCls = '';
      if (iso === today) rowCls = 'today';
      else if (iso && iso < today && !progress[pk(w.id, i)]) rowCls = 'past';
      if (progress[pk(w.id, i)]) rowCls += ' done';
      return `<div class="day-row ${rowCls}" style="--cat-color:${cs.color};--cat-bg:${cs.bg}">
        <label class="day-row-inner">
          <input type="checkbox" ${checked} onchange="onCheck(${w.id},${i},this)">
          <div class="d-dow"><div class="d-dow-name">${d.dow||''}</div><div class="d-dow-date">${d.date||''}</div></div>
          <div class="d-icon">${d.icon}</div>
          <div class="d-content">
            <div class="d-title-row"><span class="d-title">${d.title}</span>
              <span class="d-cat" style="background:${cs.bg};color:${cs.color}">${CAT_LABELS[d.cat]||''}</span></div>
            ${d.detail?`<div class="d-detail">${d.detail}</div>`:''}
          </div>
        </label></div>`;
    }).join('');

    const done = w.days.filter((d,i) => progress[pk(w.id,i)]).length;
    const total = w.days.length;
    const barPct = total ? (done/total*100) : 0;
    const isCurrent = w.days.some(d => toISO(d.date) === today);

    return `<div class="week-card${travelCls}" id="wcard-${w.id}">
      <div class="week-header${isCurrent?' current':''}" onclick="toggleWeek(${w.id})" id="wh-${w.id}">
        <div class="wh-week">W${w.id}</div>
        <div class="wh-phase" style="background:${bg};color:${fg}">${w.phaseLabel}</div>
        <div class="wh-info"><div class="wh-title">${w.note||''}</div><div class="wh-dates">${w.dates}</div></div>
        <div class="wh-right"><div class="wh-km">${w.km}</div>
          <div class="wh-bar"><div class="wh-bar-fill" style="width:${barPct}%" id="bar-${w.id}"></div></div></div>
        <div class="wh-caret">▾</div>
      </div>
      <div class="week-body" id="wb-${w.id}">${dayRows}
        ${w.note?`<div class="week-note">💡 ${w.note}</div>`:''}
      </div></div>`;
  }).join('');

  // Auto-expand current week
  const cw = WEEKS.find(w => w.days.some(d => toISO(d.date) === today));
  if (cw) toggleWeek(cw.id);
}

function toggleWeek(id) {
  const body = document.getElementById('wb-'+id);
  const header = document.getElementById('wh-'+id);
  body.classList.toggle('open');
  header.classList.toggle('expanded');
}

function onCheck(wid, idx, cb) {
  progress[pk(wid, idx)] = cb.checked;
  save();
  updateBars();
  buildOverview();
  const row = cb.closest('.day-row');
  row.classList.toggle('done', cb.checked);
}

function updateBars() {
  WEEKS.forEach(w => {
    const done = w.days.filter((d,i) => progress[pk(w.id,i)]).length;
    const bar = document.getElementById('bar-'+w.id);
    if (bar) bar.style.width = (done/w.days.length*100)+'%';
  });
}

function resetAll() {
  if (!confirm('確定要清除所有打勾紀錄？')) return;
  progress = {};
  save();
  buildSchedule();
  buildOverview();
}

function jumpToCurrent() {
  switchTab('schedule');
  const today = todayISO();
  const cw = WEEKS.find(w => w.days.some(d => toISO(d.date) === today));
  if (cw) {
    const body = document.getElementById('wb-'+cw.id);
    const header = document.getElementById('wh-'+cw.id);
    if (!body.classList.contains('open')) { body.classList.add('open'); header.classList.add('expanded'); }
    document.getElementById('wcard-'+cw.id).scrollIntoView({behavior:'smooth',block:'start'});
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildOverview();
  buildSchedule();
  switchTab('overview');
});
