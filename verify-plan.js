#!/usr/bin/env node
/**
 * 課表檢查器 —— 改完 data.js 之後跑一次。
 *
 *   node verify-plan.js
 *
 * 檢查 data.js 本身的一致性，以及它與 app.js 的對應關係。
 * 有問題會列出來並以非 0 結束，沒問題印「全部檢查通過」。
 *
 * 取代舊的 gen_dates.py（那個只印一份參考日曆，不檢查真正的資料）。
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const YEAR = 2026;                       // 課表跨 08/27 → 10/25，同一年
const DOW = ['日', '一', '二', '三', '四', '五', '六'];
const RUN_CATS = ['easy', 'long', 'tempo', 'interval', 'race'];
const RACE_MINUTES = 195;                // 比賽日以預估完賽 3:15 計入週總量

const errors = [];
const fail = m => errors.push(m);

// ---- 載入 data.js（classic script，用 indirect eval 取出 const） --------
// 可傳入別的路徑，方便拿改壞的副本測試檢查器本身
const dataPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(DIR, 'data.js');
const dataSrc = fs.readFileSync(dataPath, 'utf8');
(0, eval)(dataSrc + ';globalThis.__W=WEEKS;globalThis.__C=CAT_STYLES;');
const { __W: WEEKS, __C: CAT_STYLES } = globalThis;

// ---- 從 app.js 抽出常數（不能 eval，它需要 document） -------------------
const appSrc = fs.readFileSync(path.join(DIR, 'app.js'), 'utf8');
const trainStart = (appSrc.match(/TRAIN_START\s*=\s*'([\d-]+)'/) || [])[1];
const phasesBlock = (appSrc.match(/const PHASES = \[([\s\S]*?)\];/) || [])[1] || '';
const phaseOrder = [...phasesBlock.matchAll(/key:\s*'(\w+)'/g)].map(m => m[1]);

// ---- 逐週檢查 ----------------------------------------------------------
let prev = null;
const seenPhases = [];

for (const w of WEEKS) {
  let mins = 0, runDays = 0;

  for (const d of w.days) {
    const [mm, dd] = d.date.split('/');
    const day = new Date(YEAR, +mm - 1, +dd);

    if (DOW[day.getDay()] !== d.dow)
      fail(`W${w.id} ${d.date}：標成「週${d.dow}」，實際是週${DOW[day.getDay()]}`);

    if (prev) {
      const gap = (day - prev) / 864e5;
      if (gap !== 1) fail(`W${w.id} ${d.date}：與前一天相隔 ${gap} 天（應連續）`);
    }
    prev = day;

    if (!CAT_STYLES[d.cat]) fail(`W${w.id} ${d.date}：未知分類 '${d.cat}'`);

    if (RUN_CATS.includes(d.cat)) {
      runDays++;

      if (!d.detail.includes('🎵'))
        fail(`W${w.id} ${d.date}「${d.title}」：跑步課缺少 🎵 170 標記`);

      const pace = `${d.title} ${d.detail}`.match(/\d:\d{2}\s*\/?\s*km/);
      if (pace)
        fail(`W${w.id} ${d.date}：出現配速 '${pace[0]}'——課表應只寫時間與體感`);

      const m = (d.title.match(/(\d+)\s*分/) || [])[1];
      if (m) mins += +m;
      else if (d.cat === 'race') mins += RACE_MINUTES;
      else fail(`W${w.id} ${d.date}「${d.title}」：跑步課沒寫時間長度`);
    }

    if (d.cat === 'long' && !/走\s*1|停/.test(d.detail))
      fail(`W${w.id} ${d.date}：長跑缺少跑走比例或中止規則`);
  }

  if (runDays > 3) fail(`W${w.id}：排了 ${runDays} 次跑步（每週上限 3 次）`);

  const label = +(w.km.match(/(\d+)/) || [0, 0])[1];
  const off = Math.abs(label - mins) > 10;
  if (off) fail(`W${w.id}：週總量標示 ${w.km}，實際 ${mins} 分`);

  if (!seenPhases.includes(w.phase)) seenPhases.push(w.phase);

  console.log(
    `W${String(w.id).padStart(2)} ${w.dates}  ${w.days.length}d  ` +
    `跑步 ${runDays} 次  標示 ${w.km.padEnd(8)} 實際 ${String(mins).padStart(3)} 分  ` +
    `[${w.phase}]${off ? '  <-- 不符' : ''}`
  );
}

// ---- data.js 與 app.js 的對應 ------------------------------------------
const firstDate = WEEKS[0].days[0].date.replace('/', '-');
if (trainStart !== `${YEAR}-${firstDate}`)
  fail(`app.js 的 TRAIN_START=${trainStart}，但課表從 ${YEAR}-${firstDate} 開始`);

for (const p of seenPhases)
  if (!phaseOrder.includes(p)) fail(`data.js 用了階段 '${p}'，但 app.js 的 PHASES 沒有它`);

const expected = phaseOrder.filter(p => seenPhases.includes(p));
if (seenPhases.join() !== expected.join())
  fail(`階段順序不符：課表是 ${seenPhases.join(' → ')}，app.js PHASES 是 ${expected.join(' → ')}`);

// 同一階段的週次必須連續（否則階段軸的起訖日期會算錯）
const blocks = [];
for (const w of WEEKS) if (blocks.at(-1) !== w.phase) blocks.push(w.phase);
if (blocks.length !== new Set(blocks).size)
  fail(`同一階段的週次被拆開了：${blocks.join(' → ')}`);

// ---- 摘要 --------------------------------------------------------------
const longs = WEEKS.flatMap(w => w.days
  .filter(d => d.cat === 'long' || d.cat === 'race')
  .map(d => `${d.date}:${(d.title.match(/(\d+)\s*分/) || [, '賽'])[1]}`));
console.log('\n長跑/比賽遞增：', longs.join(' → '));

const races = WEEKS.flatMap(w => w.days.filter(d => d.cat === 'race').map(d => d.date));
console.log('比賽日：', races.join('、') || '（無）');

const strength = WEEKS.map(w => w.days.filter(d => d.cat === 'strength').length);
console.log('每週膝蓋專項：', strength.join(' '), `（共 ${strength.reduce((a, b) => a + b)} 次）`);

const ratios = [...dataSrc.matchAll(/跑 (\d) 走 1/g)].map(m => m[1]);
console.log('跑走比例分佈：', [...new Set(ratios)].map(r => `跑${r}走1 ×${ratios.filter(x => x === r).length}`).join('、'));

console.log('\n' + (errors.length
  ? `發現 ${errors.length} 個問題：\n` + errors.map(e => '  ✗ ' + e).join('\n')
  : '全部檢查通過'));

process.exit(errors.length ? 1 : 0);
