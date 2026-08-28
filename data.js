// 訓練資料：2026/08/27 → 2026/10/25（9 週）
// 兩場 21.1 km：09/20 跑走完賽、10/25 主場
//
// 設計原則（因應：膝蓋正前方痛 3.5km、6:30 配速已達 Zone 5）
// 1. 控制變數是「體感」不是配速——課表只寫時間，不寫配速數字
// 2. 節拍器 170 是每一堂跑步課的必要條件，不是選配
// 3. 長跑用時間上限，膝蓋一有感覺就停
// 4. 膝蓋專項肌力排在不跑步的日子（三/五），不佔用三個跑步日
const WEEKS = [
  { id:1, phase:'base', phaseLabel:'重建期', dates:'08/27–08/30', km:'~80 分',
    note:'課表只寫時間，不寫配速。唯一的判準是「能不能講完一句完整的話」',
    days:[
      {dow:'四',date:'08/27',cat:'easy',icon:'🏃',title:'輕鬆跑 30 分',detail:'🎵 170・跑 4 分 / 走 1 分・能講完整句子就對了・不要看配速'},
      {dow:'五',date:'08/28',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:'臀中肌為主・菜單見 Guide 頁「膝蓋專區」'},
      {dow:'六',date:'08/29',cat:'stretch',icon:'🧘',title:'居家 B 套伸展 20 min',detail:'鬆開髖與小腿，為明天長跑做準備'},
      {dow:'日',date:'08/30',cat:'long',icon:'🛤️',title:'☀️ 長跑 50 分',detail:'🎵 170・跑 4 走 1・約 5–6 km・時間到或膝蓋有感覺，先到的就停'}
    ]},
  { id:2, phase:'base', phaseLabel:'重建期', dates:'08/31–09/06', km:'~150 分',
    note:'第一次把長跑推到 80 分。跑段慢到「無聊」的程度才是對的強度',
    days:[
      {dow:'一',date:'08/31',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/01',cat:'easy',icon:'🏃',title:'輕鬆跑 35 分',detail:'🎵 170・跑 4 走 1・講得完整句就繼續，講不完就走'},
      {dow:'三',date:'09/02',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:'側躺抬腿・蚌殼式・單腿橋式是核心三動作'},
      {dow:'四',date:'09/03',cat:'easy',icon:'🏃',title:'輕鬆跑 35 分 + 大步跑',detail:'🎵 170・結束前 4×15 秒大步跑（唯一可以跑快的地方）'},
      {dow:'五',date:'09/04',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:'下階要慢，全程盯著膝蓋不可以往內倒'},
      {dow:'六',date:'09/05',cat:'rest',icon:'🚶',title:'輕鬆走 30 分',detail:'不是跑・純粹累積站著的時間，對膝蓋零風險'},
      {dow:'日',date:'09/06',cat:'long',icon:'🛤️',title:'☀️ 長跑 80 分',detail:'🎵 170・跑 4 走 1・約 8–9 km・上週 50 分沒事才做這次'}
    ]},
  { id:3, phase:'base', phaseLabel:'重建期', dates:'09/07–09/13', km:'~195 分',
    note:'⭐ 彩排週：9/13 完全比照比賽——跑 4 走 1、全套裝備、練補給。跑滿 120 分看距離',
    days:[
      {dow:'一',date:'09/07',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/08',cat:'easy',icon:'🏃',title:'輕鬆跑 35 分',detail:'🎵 170・跑 4 走 1・跟比賽同一個節奏'},
      {dow:'三',date:'09/09',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:'臀部撐得住，膝蓋才不會內倒'},
      {dow:'四',date:'09/10',cat:'easy',icon:'🏃',title:'輕鬆跑 40 分',detail:'🎵 170・跑 4 走 1'},
      {dow:'五',date:'09/11',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'六',date:'09/12',cat:'rest',icon:'😴',title:'完全休息',detail:'明天是關鍵日，今天養腿'},
      {dow:'日',date:'09/13',cat:'long',icon:'🛤️',title:'☀️ 長跑 120 分 · 全套彩排',detail:'🎵 170・跑 4 走 1（比照比賽）・目標 13.2 km 以上・穿比賽全套裝備・練補給'}
    ]},
  { id:4, phase:'peak', phaseLabel:'首戰', dates:'09/14–09/20', km:'~245 分',
    note:'🏁 9/20 跑走完賽。關門 3.5 小時，跑 4 走 1，預估 3:10–3:20——時間很夠',
    days:[
      {dow:'一',date:'09/14',cat:'easy',icon:'🏃',title:'輕鬆跑 30 分',detail:'🎵 170・很慢・讓腿從彩排恢復'},
      {dow:'二',date:'09/15',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'三',date:'09/16',cat:'easy',icon:'🏃',title:'輕慢跑 20 分 + 大步跑',detail:'🎵 170・2×15 秒・喚醒腿，絕對不要練到累'},
      {dow:'四',date:'09/17',cat:'rest',icon:'☕',title:'完全休息',detail:'開始把睡眠補足'},
      {dow:'五',date:'09/18',cat:'strength',icon:'🦵',title:'膝蓋專項（輕量）',detail:'只做臀部三個動作・不做下階與靜蹲'},
      {dow:'六',date:'09/19',cat:'rest',icon:'☕',title:'完全休息 + 賽前準備',detail:'碳水吃飽・別吃沒吃過的東西・早睡'},
      {dow:'日',date:'09/20',cat:'race',icon:'🏁',title:'🏁 首戰 21.1 km · 跑走完賽',detail:'🎵 170 全程・跑 4 走 1・關門 3.5 小時・膝蓋痛就加長走段，不要停下不動'}
    ]},
  { id:5, phase:'aero', phaseLabel:'賽後恢復', dates:'09/21–09/27', km:'~25 分',
    note:'⬇️ 這週幾乎不跑。21.1 km 對現在的你是很大的一擊，恢復比訓練重要',
    days:[
      {dow:'一',date:'09/21',cat:'rest',icon:'😴',title:'完全休息',detail:'賽後第一天什麼都不要做'},
      {dow:'二',date:'09/22',cat:'rest',icon:'🚶',title:'輕鬆走 20–30 分',detail:'促進循環・絕對不要跑'},
      {dow:'三',date:'09/23',cat:'stretch',icon:'🧘',title:'居家 B 套伸展 20 min',detail:'輕柔就好，不要拉到痛'},
      {dow:'四',date:'09/24',cat:'rest',icon:'🚶',title:'輕鬆走 30 分',detail:'還是不要跑'},
      {dow:'五',date:'09/25',cat:'strength',icon:'🦵',title:'膝蓋專項（輕量）',detail:'完全沒有痠痛才做，有就跳過'},
      {dow:'六',date:'09/26',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'日',date:'09/27',cat:'easy',icon:'🏃',title:'慢跑 25 分',detail:'🎵 170・跑 4 走 1・任何一步覺得痛就改用走的'}
    ]},
  { id:6, phase:'aero', phaseLabel:'賽後恢復', dates:'09/28–10/04', km:'~165 分',
    note:'重新建量。經過 9/20，你的身體已經跟一個月前完全不同了',
    days:[
      {dow:'一',date:'09/28',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/29',cat:'easy',icon:'🏃',title:'輕鬆跑 35 分',detail:'🎵 170・跑 5 走 1'},
      {dow:'三',date:'09/30',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'四',date:'10/01',cat:'easy',icon:'🏃',title:'輕鬆跑 40 分 + 大步跑',detail:'🎵 170・4×15 秒大步跑'},
      {dow:'五',date:'10/02',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'六',date:'10/03',cat:'rest',icon:'🚶',title:'輕鬆走 30 分',detail:''},
      {dow:'日',date:'10/04',cat:'long',icon:'🛤️',title:'☀️ 長跑 90 分',detail:'🎵 170・跑 6 走 1・約 10–11 km'}
    ]},
  { id:7, phase:'build', phaseLabel:'主場強化', dates:'10/05–10/11', km:'~205 分',
    note:'加入節奏段。判準一樣是體感：能講短句、但講不完長句',
    days:[
      {dow:'一',date:'10/05',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/06',cat:'easy',icon:'🏃',title:'輕鬆跑 40 分',detail:'🎵 170・跑 6 走 1'},
      {dow:'三',date:'10/07',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'四',date:'10/08',cat:'tempo',icon:'⚡',title:'☀️ 節奏跑 45 分',detail:'🎵 170・暖身 15 分 + 節奏 2×8 分（能講短句不能講長句）+ 緩和 10 分'},
      {dow:'五',date:'10/09',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'六',date:'10/10',cat:'rest',icon:'🚶',title:'輕鬆走 30 分',detail:''},
      {dow:'日',date:'10/11',cat:'long',icon:'🛤️',title:'☀️ 長跑 120 分',detail:'🎵 170・跑 6 走 1・約 14–15 km'}
    ]},
  { id:8, phase:'build', phaseLabel:'主場強化', dates:'10/12–10/18', km:'~235 分',
    note:'⭐ 最高峰週：10/18 的 150 分是本季最長的一次',
    days:[
      {dow:'一',date:'10/12',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/13',cat:'easy',icon:'🏃',title:'輕鬆跑 40 分',detail:'🎵 170・跑 9 走 1（比賽節奏）'},
      {dow:'三',date:'10/14',cat:'strength',icon:'🦵',title:'膝蓋專項 15 min',detail:''},
      {dow:'四',date:'10/15',cat:'tempo',icon:'⚡',title:'☀️ 節奏跑 45 分',detail:'🎵 170・暖身 15 分 + 節奏 2×10 分 + 緩和 8 分'},
      {dow:'五',date:'10/16',cat:'stretch',icon:'🧘',title:'居家 B 套伸展 20 min',detail:'這週五六都養腿，把狀態留給週日'},
      {dow:'六',date:'10/17',cat:'rest',icon:'😴',title:'完全休息',detail:'明天是本季最長的一天'},
      {dow:'日',date:'10/18',cat:'long',icon:'🏁',title:'☀️ 長跑 150 分',detail:'🎵 170・跑 9 走 1・約 17–18 km・完整補給演練・跑完就贏一半了 🎉'}
    ]},
  { id:9, phase:'taper', phaseLabel:'減量備賽', dates:'10/19–10/25', km:'~255 分',
    note:'🏆 主場週！跑量大降，腿會覺得癢想跑——正常，忍住',
    days:[
      {dow:'一',date:'10/19',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/20',cat:'easy',icon:'🏃',title:'輕鬆跑 35 分',detail:'🎵 170・跑 9 走 1'},
      {dow:'三',date:'10/21',cat:'rest',icon:'☕',title:'完全休息',detail:'這週睡飽比任何練習都重要'},
      {dow:'四',date:'10/22',cat:'easy',icon:'🏃',title:'輕慢跑 25 分 + 大步跑',detail:'🎵 170・4×15 秒・喚醒腿'},
      {dow:'五',date:'10/23',cat:'rest',icon:'☕',title:'完全休息',detail:'準備裝備・多喝水'},
      {dow:'六',date:'10/24',cat:'rest',icon:'☕',title:'完全休息 + 賽前準備',detail:'碳水吃飽・早睡・複習跑走節奏'},
      {dow:'日',date:'10/25',cat:'race',icon:'🏁',title:'🏆 主場 21.1 km · 目標破 9/20',detail:'🎵 170 全程・跑走比例依 9/20 的實際經驗調整'}
    ]},
];

const PHASE_COLORS = {
  base:'#e0f2fe|#075985', aero:'#dcfce7|#14532d',
  build:'#fef3c7|#78350f', peak:'#fed7aa|#9a3412',
  taper:'#e9d5ff|#5b21b6', race:'#1d1d1f|#fff'
};
const PHASE_DOTS = {base:'#0ea5e9',aero:'#22c55e',build:'#f59e0b',peak:'#f97316',taper:'#8b5cf6'};
const CAT_STYLES = {
  rest:{color:'#64748b',bg:'#f8fafc'}, easy:{color:'#16a34a',bg:'#f0fdf4'},
  long:{color:'#0891b2',bg:'#ecfeff'}, tempo:{color:'#ea580c',bg:'#fff7ed'},
  interval:{color:'#7c3aed',bg:'#faf5ff'}, strength:{color:'#7c3aed',bg:'#faf5ff'},
  stretch:{color:'#0891b2',bg:'#f0f9ff'}, travel:{color:'#d97706',bg:'#fffbeb'},
  race:{color:'#dc2626',bg:'#fef2f2'}
};
const CAT_LABELS = {
  rest:'休息', easy:'輕鬆跑', long:'長距離跑', tempo:'質量跑',
  interval:'間歇跑', strength:'肌力', stretch:'伸展', travel:'旅行', race:'比賽日'
};
