// 訓練資料：2026/08/27 → 2026/10/25（9 週）
// 兩場 21.1 km：09/20 首戰演練、10/25 主場 sub-3
// 每週 3 次跑步（二/四/日），週日晨跑為長跑
const WEEKS = [
  { id:1, phase:'base', phaseLabel:'重建期', dates:'08/27–08/30', km:'~11',
    note:'從 4 km 重新開始。配速刻意放慢到 7:30——比你跑得動的還慢，這是故意的',
    days:[
      {dow:'四',date:'08/27',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'7:30/km・不要跑 6:30，今天的重點是「跑完還很輕鬆」'},
      {dow:'五',date:'08/28',cat:'rest',icon:'😴',title:'休息',detail:'走路 20 分也算數'},
      {dow:'六',date:'08/29',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min・鬆開髖與小腿，為明天長跑做準備'},
      {dow:'日',date:'08/30',cat:'long',icon:'🛤️',title:'☀️ 長跑 7 km',detail:'跑 9 分 / 走 1 分・跑段 7:45/km・全程要能講長句子'}
    ]},
  { id:2, phase:'base', phaseLabel:'重建期', dates:'08/31–09/06', km:'~21',
    note:'第一次把長跑推過 10 km。跑走節奏從第 1 公里就開始，不是累了才走',
    days:[
      {dow:'一',date:'08/31',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/01',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2・7:30/km'},
      {dow:'三',date:'09/02',cat:'rest',icon:'😴',title:'休息',detail:'走路或伸展，看疲勞決定'},
      {dow:'四',date:'09/03',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km + 大步跑',detail:'4×100m strides・喚醒腿部彈性，不是衝刺'},
      {dow:'五',date:'09/04',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'09/05',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'日',date:'09/06',cat:'long',icon:'🛤️',title:'☀️ 長跑 11 km',detail:'跑 9 / 走 1・帶水・跑不完就走完，不要棄'}
    ]},
  { id:3, phase:'base', phaseLabel:'重建期', dates:'09/07–09/13', km:'~25',
    note:'⭐ 彩排週：9/13 這天把比賽當天的所有事完整演練一遍',
    days:[
      {dow:'一',date:'09/07',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/08',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'09/09',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min・臀與核心是長跑的保險'},
      {dow:'四',date:'09/10',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2・最後 1 km 提到 7:30 感受一下目標配速'},
      {dow:'五',date:'09/11',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'09/12',cat:'rest',icon:'😴',title:'完全休息',detail:'明天是關鍵日，今天養腿'},
      {dow:'日',date:'09/13',cat:'long',icon:'🛤️',title:'☀️ 長跑 14 km · 全套彩排',detail:'穿比賽當天的鞋襪衣・跑 9 / 走 1・練補給・10 km 後不對就停'}
    ]},
  { id:4, phase:'peak', phaseLabel:'首戰演練', dates:'09/14–09/20', km:'~28',
    note:'🏁 9/20 首戰。目標不是拚時間，是把 21.1 km 的流程完整走過一次',
    days:[
      {dow:'一',date:'09/14',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'很慢・讓腿從 14 km 恢復'},
      {dow:'二',date:'09/15',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'三',date:'09/16',cat:'easy',icon:'🏃',title:'輕慢跑 3 km + 大步跑',detail:'2×100m strides・喚醒腿，絕對不要練到累'},
      {dow:'四',date:'09/17',cat:'rest',icon:'☕',title:'完全休息',detail:'開始把睡眠補足'},
      {dow:'五',date:'09/18',cat:'rest',icon:'☕',title:'完全休息',detail:'準備裝備・多喝水'},
      {dow:'六',date:'09/19',cat:'rest',icon:'☕',title:'完全休息 + 賽前準備',detail:'碳水吃飽・別吃沒吃過的東西・早睡'},
      {dow:'日',date:'09/20',cat:'race',icon:'🏁',title:'🏁 首戰 21.1 km',detail:'跑 9 分 / 走 1 分・跑段 7:45–8:00・目標 2:50・這是演練不是決賽'}
    ]},
  { id:5, phase:'aero', phaseLabel:'賽後恢復', dates:'09/21–09/27', km:'~10',
    note:'⬇️ 賽後校準週：依 9/20 的實際狀況調整。腿還酸就整週只走路，不要逞強',
    days:[
      {dow:'一',date:'09/21',cat:'rest',icon:'😴',title:'完全休息',detail:'賽後第一天什麼都不要做'},
      {dow:'二',date:'09/22',cat:'rest',icon:'🚶',title:'走路 30 分',detail:'促進循環，不要跑'},
      {dow:'三',date:'09/23',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min・輕柔就好'},
      {dow:'四',date:'09/24',cat:'easy',icon:'🏃',title:'慢跑 4 km',detail:'超慢・任何一步覺得痛就停下來改用走的'},
      {dow:'五',date:'09/25',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'09/26',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'日',date:'09/27',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'這不是長跑・只是確認身體回來了'}
    ]},
  { id:6, phase:'aero', phaseLabel:'賽後恢復', dates:'09/28–10/04', km:'~23',
    note:'重新建量。經過 9/20 之後，你的基礎已經跟一個月前完全不同了',
    days:[
      {dow:'一',date:'09/28',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/29',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'09/30',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'10/01',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'10/02',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'10/03',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'日',date:'10/04',cat:'long',icon:'🛤️',title:'☀️ 長跑 12 km',detail:'跑 9 / 走 1・找回長跑手感'}
    ]},
  { id:7, phase:'build', phaseLabel:'主場強化', dates:'10/05–10/11', km:'~29',
    note:'開始練「目標配速」。sub-3 只需要 8:30/km，你要練到覺得它慢得不可思議',
    days:[
      {dow:'一',date:'10/05',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/06',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'10/07',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'10/08',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 7 km',detail:'暖身 2km + 目標配速 3km @ 7:45 + 緩和 2km'},
      {dow:'五',date:'10/09',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'10/10',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'日',date:'10/11',cat:'long',icon:'🛤️',title:'☀️ 長跑 16 km',detail:'跑 9 / 走 1・最後 3 km 試著不走完成'}
    ]},
  { id:8, phase:'build', phaseLabel:'主場強化', dates:'10/12–10/18', km:'~31',
    note:'⭐ 最高峰週：18 km。跑完這天，21.1 km 就只是「再多 3 公里」而已',
    days:[
      {dow:'一',date:'10/12',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/13',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'10/14',cat:'strength',icon:'💪',title:'居家 A 套 + 核心',detail:'瑜伽墊 30 min'},
      {dow:'四',date:'10/15',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 7 km',detail:'暖身 2km + 目標配速 4km @ 7:45 + 緩和 1km'},
      {dow:'五',date:'10/16',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'10/17',cat:'rest',icon:'😴',title:'完全休息',detail:'養腿，明天是本季最長的一天'},
      {dow:'日',date:'10/18',cat:'long',icon:'🏁',title:'☀️ 長跑 18 km',detail:'最長一次！跑完就贏一半了 🎉・完整補給演練'}
    ]},
  { id:9, phase:'taper', phaseLabel:'減量備賽', dates:'10/19–10/25', km:'~30',
    note:'🏆 主場週！跑量大降，腿會覺得癢想跑——正常，忍住',
    days:[
      {dow:'一',date:'10/19',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'10/20',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'10/21',cat:'rest',icon:'☕',title:'完全休息',detail:'這週睡飽比任何練習都重要'},
      {dow:'四',date:'10/22',cat:'easy',icon:'🏃',title:'輕慢跑 4 km + 大步跑',detail:'4×100m strides・喚醒腿'},
      {dow:'五',date:'10/23',cat:'rest',icon:'☕',title:'完全休息',detail:'準備裝備・多喝水'},
      {dow:'六',date:'10/24',cat:'rest',icon:'☕',title:'完全休息 + 賽前準備',detail:'碳水吃飽・早睡・複習跑走節奏'},
      {dow:'日',date:'10/25',cat:'race',icon:'🏁',title:'🏆 主場 21.1 km · sub-3',detail:'跑 9 分 / 走 1 分・跑段 7:30–7:45・目標 2:40–2:50'}
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
