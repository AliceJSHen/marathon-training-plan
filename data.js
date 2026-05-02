// 20-week training data for sub-3hr half marathon
// W1 05/04(Mon) → W20 09/20(Sun) = exactly 20 weeks
const WEEKS = [
  { id:1, phase:'base', phaseLabel:'基礎建立', dates:'05/04–05/10', km:'~14',
    note:'全部用 Zone 2 慢跑建立習慣',
    days:[
      {dow:'一',date:'05/04',cat:'rest',icon:'😴',title:'完全休息',detail:'輕度伸展'},
      {dow:'二',date:'05/05',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'三',date:'05/06',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'05/07',cat:'easy',icon:'🏃',title:'跑走交替 3 km',detail:'跑 3 min / 走 1 min'},
      {dow:'五',date:'05/08',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'05/09',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'日',date:'05/10',cat:'long',icon:'🛤️',title:'☀️ 長跑 5 km',detail:'Zone 1-2・晨跑'}
    ]},
  { id:2, phase:'base', phaseLabel:'基礎建立', dates:'05/11–05/17', km:'~17',
    note:'穩定跑量，找到 Zone 2 體感',
    days:[
      {dow:'一',date:'05/11',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'05/12',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'三',date:'05/13',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'05/14',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'五',date:'05/15',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'05/16',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'日',date:'05/17',cat:'long',icon:'🛤️',title:'☀️ 長跑 6 km',detail:'Zone 2・晨跑'}
    ]},
  { id:3, phase:'base', phaseLabel:'基礎建立', dates:'05/18–05/24', km:'~21',
    note:'跑量穩步提升',
    days:[
      {dow:'一',date:'05/18',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'05/19',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'05/20',cat:'strength',icon:'💪',title:'居家 A 套 + 核心',detail:'瑜伽墊 30 min'},
      {dow:'四',date:'05/21',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'五',date:'05/22',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'05/23',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'日',date:'05/24',cat:'long',icon:'🛤️',title:'☀️ 長跑 8 km',detail:'Zone 2・晨跑'}
    ]},
  { id:4, phase:'base', phaseLabel:'基礎建立', dates:'05/25–05/31', km:'~12', deload:true,
    note:'⬇️ 減量週：身體吸收前三週訓練',
    days:[
      {dow:'一',date:'05/25',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'05/26',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'三',date:'05/27',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'05/28',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'五',date:'05/29',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'05/30',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'日',date:'05/31',cat:'long',icon:'🛤️',title:'☀️ 長跑 6 km',detail:'Zone 2・晨跑'}
    ]},
  { id:5, phase:'aero', phaseLabel:'有氧發展', dates:'06/01–06/07', km:'~25',
    note:'開始拉長距離',
    days:[
      {dow:'一',date:'06/01',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'06/02',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'06/03',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'06/04',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'06/05',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'06/06',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'日',date:'06/07',cat:'long',icon:'🛤️',title:'☀️ 長跑 10 km',detail:'Zone 2・晨跑'}
    ]},
  { id:6, phase:'aero', phaseLabel:'有氧發展', dates:'06/08–06/14', km:'~28',
    note:'長跑突破 10 km',
    days:[
      {dow:'一',date:'06/08',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'06/09',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'06/10',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'06/11',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'06/12',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'06/13',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'日',date:'06/14',cat:'long',icon:'🛤️',title:'☀️ 長跑 12 km',detail:'Zone 2・晨跑'}
    ]},
  { id:7, phase:'aero', phaseLabel:'有氧發展', dates:'06/15–06/21', km:'~32',
    note:'導入節奏跑',
    days:[
      {dow:'一',date:'06/15',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'06/16',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'06/17',cat:'strength',icon:'💪',title:'居家 A 套 + 核心',detail:'瑜伽墊 30 min'},
      {dow:'四',date:'06/18',cat:'tempo',icon:'⚡',title:'☀️ 節奏跑 6 km',detail:'暖身 1.5km + 節奏 3km + 緩和 1.5km'},
      {dow:'五',date:'06/19',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'06/20',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'日',date:'06/21',cat:'long',icon:'🛤️',title:'☀️ 長跑 14 km',detail:'Zone 2・晨跑'}
    ]},
  { id:8, phase:'aero', phaseLabel:'有氧發展', dates:'06/22–06/28', km:'~4-10', travel:true,
    note:'🌴 泰國旅行週：6/22 出發–6/29 回',
    days:[
      {dow:'一',date:'06/22',cat:'travel',icon:'✈️',title:'出發泰國',detail:'能跑就在飯店健身房 20-30 min'},
      {dow:'二',date:'06/23',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'多走路逛市場'},
      {dow:'三',date:'06/24',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'能跑就跑，不能跑就走'},
      {dow:'四',date:'06/25',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'走行程即可'},
      {dow:'五',date:'06/26',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'享受美食與風景'},
      {dow:'六',date:'06/27',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'能跑就跑，不能跑就走'},
      {dow:'日',date:'06/28',cat:'travel',icon:'🌴',title:'泰國旅行',detail:'多走路就是很好的有氧'}
    ]},
  { id:9, phase:'build', phaseLabel:'強化期', dates:'06/29–07/05', km:'~23',
    note:'⬆️ 旅行後過渡週：找回跑感',
    days:[
      {dow:'一',date:'06/29',cat:'travel',icon:'✈️',title:'從泰國回來',detail:'休息，整理行李'},
      {dow:'二',date:'06/30',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'找回跑感'},
      {dow:'三',date:'07/01',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'07/02',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'07/03',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'07/04',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'日',date:'07/05',cat:'long',icon:'🛤️',title:'☀️ 長跑 10 km',detail:'重建節奏・晨跑'}
    ]},
  { id:10, phase:'build', phaseLabel:'強化期', dates:'07/06–07/12', km:'~36',
    note:'導入節奏跑質量課',
    days:[
      {dow:'一',date:'07/06',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'07/07',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'07/08',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'07/09',cat:'tempo',icon:'⚡',title:'☀️ 節奏跑 8 km',detail:'暖身 2km + 節奏 5km Z3 + 緩和 1km'},
      {dow:'五',date:'07/10',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'07/11',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'日',date:'07/12',cat:'long',icon:'🛤️',title:'☀️ 長跑 16 km',detail:'Zone 2・晨跑'}
    ]},
  { id:11, phase:'build', phaseLabel:'強化期', dates:'07/13–07/19', km:'~38',
    note:'導入間歇跑',
    days:[
      {dow:'一',date:'07/13',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'07/14',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'07/15',cat:'strength',icon:'💪',title:'居家 A 套 + 核心',detail:'瑜伽墊 30 min'},
      {dow:'四',date:'07/16',cat:'interval',icon:'🔥',title:'☀️ 間歇跑',detail:'暖身 2km + 6×800m Z4 休90s + 緩和 1km'},
      {dow:'五',date:'07/17',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'07/18',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'日',date:'07/19',cat:'long',icon:'🛤️',title:'☀️ 長跑 18 km',detail:'Zone 2・晨跑・里程碑！'}
    ]},
  { id:12, phase:'build', phaseLabel:'強化期', dates:'07/20–07/26', km:'~22', deload:true,
    note:'⬇️ 減量週',
    days:[
      {dow:'一',date:'07/20',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'07/21',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'07/22',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'07/23',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'07/24',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'07/25',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'日',date:'07/26',cat:'long',icon:'🛤️',title:'☀️ 長跑 12 km',detail:'Zone 2・晨跑'}
    ]},
  { id:13, phase:'build', phaseLabel:'強化期', dates:'07/27–08/02', km:'~37',
    note:'配速跑練習',
    days:[
      {dow:'一',date:'07/27',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'07/28',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'07/29',cat:'strength',icon:'💪',title:'居家 A 套 + 肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'07/30',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 9 km',detail:'暖身 2km + 目標配速 6km + 緩和 1km'},
      {dow:'五',date:'07/31',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'08/01',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'日',date:'08/02',cat:'long',icon:'🛤️',title:'☀️ 長跑 16 km',detail:'後 5km 加速至目標配速・晨跑'}
    ]},
  { id:14, phase:'peak', phaseLabel:'高峰期', dates:'08/03–08/09', km:'~42',
    note:'⭐ 關鍵週：完成 20 km！',
    days:[
      {dow:'一',date:'08/03',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'08/04',cat:'easy',icon:'🏃',title:'輕鬆跑 7 km',detail:'Zone 2'},
      {dow:'三',date:'08/05',cat:'strength',icon:'💪',title:'居家 A 套肌力',detail:'瑜伽墊 25 min'},
      {dow:'四',date:'08/06',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 9 km',detail:'暖身 2km + 目標配速 6km + 緩和 1km'},
      {dow:'五',date:'08/07',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'08/08',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'日',date:'08/09',cat:'long',icon:'🏁',title:'☀️ 長跑 20 km',detail:'最長一次！🎉'}
    ]},
  { id:15, phase:'peak', phaseLabel:'高峰期', dates:'08/10–08/23', km:'彈性', travel:true,
    note:'🏝️ 綠島旅行：潛水＝交叉訓練，enjoy！',
    days:[
      {dow:'',date:'',cat:'travel',icon:'🏝️',title:'綠島潛水/浮潛',detail:'算交叉訓練！游泳對心肺很好'},
      {dow:'',date:'',cat:'travel',icon:'🏃',title:'建議：隔天慢跑 20-30 min',detail:'綠島環島一圈約 18 km，跑一段風景超美'},
      {dow:'',date:'',cat:'travel',icon:'💪',title:'有空做 A 套',detail:'不需要每次'},
      {dow:'',date:'',cat:'travel',icon:'🚶',title:'最低限度',detail:'每天潛水＋走路就夠了'}
    ]},
  { id:16, phase:'peak', phaseLabel:'高峰期', dates:'08/24–08/30', km:'~30',
    note:'⬆️ 旅行後過渡週：找回陸地跑感',
    days:[
      {dow:'一',date:'08/24',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'08/25',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'找回陸地跑感'},
      {dow:'三',date:'08/26',cat:'stretch',icon:'🧘',title:'居家 B 套伸展',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'08/27',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km + 大步跑',detail:'4×100m strides'},
      {dow:'五',date:'08/28',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'08/29',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'日',date:'08/30',cat:'long',icon:'🛤️',title:'☀️ 長跑 14 km',detail:'不追速度，重建節奏'}
    ]},
  { id:17, phase:'taper', phaseLabel:'減量備賽', dates:'08/31–09/06', km:'~31',
    note:'開始減量，保持銳利',
    days:[
      {dow:'一',date:'08/31',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/01',cat:'easy',icon:'🏃',title:'輕鬆跑 6 km',detail:'Zone 2'},
      {dow:'三',date:'09/02',cat:'strength',icon:'💪',title:'居家 A 套（輕量）',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'09/03',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 8 km',detail:'暖身 1.5km + 目標配速 5km + 緩和 1.5km'},
      {dow:'五',date:'09/04',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'09/05',cat:'easy',icon:'🏃',title:'輕鬆跑 4 km',detail:'Zone 2'},
      {dow:'日',date:'09/06',cat:'long',icon:'🛤️',title:'☀️ 長跑 13 km',detail:'Zone 2・晨跑'}
    ]},
  { id:18, phase:'taper', phaseLabel:'減量備賽', dates:'09/07–09/13', km:'~24',
    note:'跑量大降，腿會覺得癢——正常',
    days:[
      {dow:'一',date:'09/07',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'二',date:'09/08',cat:'easy',icon:'🏃',title:'輕鬆跑 5 km',detail:'Zone 2'},
      {dow:'三',date:'09/09',cat:'stretch',icon:'🧘',title:'居家 B 套（輕量）',detail:'瑜伽墊 20 min'},
      {dow:'四',date:'09/10',cat:'tempo',icon:'⚡',title:'☀️ 配速跑 6 km',detail:'暖身 1.5km + 目標配速 3km + 緩和 1.5km'},
      {dow:'五',date:'09/11',cat:'rest',icon:'😴',title:'休息',detail:''},
      {dow:'六',date:'09/12',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'日',date:'09/13',cat:'long',icon:'🛤️',title:'☀️ 長跑 10 km',detail:'Zone 2・晨跑'}
    ]},
  { id:19, phase:'taper', phaseLabel:'減量備賽', dates:'09/14–09/20', km:'~15',
    note:'🏆 比賽週！信任你的訓練',
    days:[
      {dow:'一',date:'09/14',cat:'easy',icon:'🏃',title:'輕鬆跑 3 km',detail:'Zone 2'},
      {dow:'二',date:'09/15',cat:'rest',icon:'😴',title:'完全休息',detail:''},
      {dow:'三',date:'09/16',cat:'easy',icon:'🏃',title:'輕慢跑 2 km + 大步跑',detail:'2×100m strides・喚醒腿'},
      {dow:'四',date:'09/17',cat:'rest',icon:'☕',title:'完全休息',detail:'好好睡覺'},
      {dow:'五',date:'09/18',cat:'rest',icon:'☕',title:'完全休息',detail:'準備物資'},
      {dow:'六',date:'09/19',cat:'rest',icon:'☕',title:'完全休息 + 賽前準備',detail:'碳水補給・早睡'},
      {dow:'日',date:'09/20',cat:'race',icon:'🏁',title:'🏆 比賽日 21.1 km',detail:'@ ~8:30/km・目標 sub-3:00'},
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
