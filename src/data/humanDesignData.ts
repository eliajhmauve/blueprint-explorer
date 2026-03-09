// 人類圖核心數據結構

// 九大能量中心
export interface EnergyCenter {
  id: string;
  name: string;
  englishName: string;
  description: string;
  theme: string;
  definedMeaning: string;
  undefinedMeaning: string;
}

export const energyCenters: EnergyCenter[] = [
  {
    id: 'head',
    name: '頭頂中心',
    englishName: 'Head Center',
    description: '靈感與壓力的源頭',
    theme: '靈感、問題、疑惑',
    definedMeaning: '有穩定的靈感來源，能夠承受思考的壓力',
    undefinedMeaning: '容易被他人的問題與疑惑所影響，需要分辨哪些問題值得思考'
  },
  {
    id: 'ajna',
    name: '阿賈那中心',
    englishName: 'Ajna Center',
    description: '概念化與心智處理',
    theme: '思考、分析、理解',
    definedMeaning: '有固定的思考方式，能夠持續專注於心智活動',
    undefinedMeaning: '思維開放靈活，能從多角度理解事物，但可能缺乏心智確定性'
  },
  {
    id: 'throat',
    name: '喉嚨中心',
    englishName: 'Throat Center',
    description: '表達與行動的中心',
    theme: '溝通、表達、顯化',
    definedMeaning: '有穩定的表達方式，能夠將想法轉化為行動',
    undefinedMeaning: '表達方式多變，需要等待正確時機才能有效表達'
  },
  {
    id: 'g',
    name: 'G中心',
    englishName: 'G Center',
    description: '身份與方向的中心',
    theme: '身份、方向、愛',
    definedMeaning: '有穩定的自我認同感，知道自己的人生方向',
    undefinedMeaning: '身份認同較為流動，需要在正確的環境中才能找到方向'
  },
  {
    id: 'heart',
    name: '意志中心',
    englishName: 'Heart/Ego Center',
    description: '意志力與物質世界',
    theme: '意志、承諾、價值',
    definedMeaning: '有穩定的意志力，能夠信守承諾',
    undefinedMeaning: '意志力起伏不定，不適合做出長期承諾，需要休息恢復'
  },
  {
    id: 'sacral',
    name: '薦骨中心',
    englishName: 'Sacral Center',
    description: '生命力與回應的中心',
    theme: '生命力、工作、性能量',
    definedMeaning: '有強大的生命能量，適合透過回應來做決定',
    undefinedMeaning: '能量需要被管理，不適合長時間工作，需要知道何時停止'
  },
  {
    id: 'spleen',
    name: '脾中心',
    englishName: 'Spleen Center',
    description: '直覺與免疫系統',
    theme: '直覺、健康、安全',
    definedMeaning: '有穩定的直覺判斷力，身體免疫系統較強',
    undefinedMeaning: '直覺敏感但不穩定，需要注意健康，可能過度執著於安全感'
  },
  {
    id: 'solar',
    name: '情緒中心',
    englishName: 'Solar Plexus',
    description: '情緒波動與覺察',
    theme: '情緒、感受、慾望',
    definedMeaning: '有情緒波動週期，需要等待情緒清明才做重要決定',
    undefinedMeaning: '容易感受他人情緒，需要學會分辨哪些情緒屬於自己'
  },
  {
    id: 'root',
    name: '根部中心',
    englishName: 'Root Center',
    description: '壓力與驅動力',
    theme: '壓力、腎上腺素、動力',
    definedMeaning: '有穩定的內在驅動力，能夠處理壓力',
    undefinedMeaning: '容易感受外界壓力，需要學會不被壓力推動做決定'
  }
];

// 人類圖類型
export interface HumanDesignType {
  id: string;
  name: string;
  englishName: string;
  percentage: string;
  strategy: string;
  signature: string;
  notSelfTheme: string;
  description: string;
}

export const humanDesignTypes: HumanDesignType[] = [
  {
    id: 'manifestor',
    name: '顯示者',
    englishName: 'Manifestor',
    percentage: '約 9%',
    strategy: '告知',
    signature: '平靜',
    notSelfTheme: '憤怒',
    description: '天生的啟動者，能夠獨立行動並影響他人。需要告知周圍的人自己的行動，以減少阻力。'
  },
  {
    id: 'generator',
    name: '生產者',
    englishName: 'Generator',
    percentage: '約 37%',
    strategy: '等待回應',
    signature: '滿足',
    notSelfTheme: '挫折',
    description: '擁有強大的生命力，是世界的建造者。需要等待外界刺激後，透過薦骨回應來做決定。'
  },
  {
    id: 'manifesting-generator',
    name: '顯示生產者',
    englishName: 'Manifesting Generator',
    percentage: '約 33%',
    strategy: '等待回應，然後告知',
    signature: '滿足',
    notSelfTheme: '挫折與憤怒',
    description: '結合顯示者與生產者的特質，動作快速，但需要先回應再行動。'
  },
  {
    id: 'projector',
    name: '投射者',
    englishName: 'Projector',
    percentage: '約 20%',
    strategy: '等待邀請',
    signature: '成功',
    notSelfTheme: '苦澀',
    description: '天生的引導者，能夠看見他人的能量運作方式。需要被認可與邀請才能發揮才能。'
  },
  {
    id: 'reflector',
    name: '反映者',
    englishName: 'Reflector',
    percentage: '約 1%',
    strategy: '等待月亮週期',
    signature: '驚喜',
    notSelfTheme: '失望',
    description: '稀有的類型，沒有固定能量中心，能夠反映環境的健康狀態。需要等待整個月亮週期做重要決定。'
  }
];

// 人生角色
export interface Profile {
  id: string;
  name: string;
  lines: [number, number];
  theme: string;
  description: string;
}

export const profiles: Profile[] = [
  { id: '1-3', name: '1/3 研究殉道者', lines: [1, 3], theme: '透過探索與試錯來學習', description: '需要深入研究，並透過實際經驗來驗證知識。' },
  { id: '1-4', name: '1/4 研究機會者', lines: [1, 4], theme: '建立穩固基礎並影響網絡', description: '需要深入研究，並透過人際網絡來傳遞知識。' },
  { id: '2-4', name: '2/4 隱士機會者', lines: [2, 4], theme: '天賦與社交影響力', description: '擁有天生才華，需要被召喚才能發揮，透過人際關係發展。' },
  { id: '2-5', name: '2/5 隱士異端者', lines: [2, 5], theme: '天賦與實際解決方案', description: '擁有天生才華，能夠提供實際的解決方案。' },
  { id: '3-5', name: '3/5 殉道異端者', lines: [3, 5], theme: '實驗與實際智慧', description: '透過試錯學習，能夠提供經過驗證的解決方案。' },
  { id: '3-6', name: '3/6 殉道典範者', lines: [3, 6], theme: '經驗與智慧成長', description: '前半生透過試錯學習，後半生成為有智慧的典範。' },
  { id: '4-1', name: '4/1 機會研究者', lines: [4, 1], theme: '網絡與深度研究', description: '透過人際網絡來建立機會，需要深入研究作為基礎。' },
  { id: '4-6', name: '4/6 機會典範者', lines: [4, 6], theme: '人際影響與長遠智慧', description: '透過人際關係影響他人，逐漸成為生活的典範。' },
  { id: '5-1', name: '5/1 異端研究者', lines: [5, 1], theme: '實際解決方案與研究基礎', description: '能夠提供實際解決方案，需要深入研究作為支撐。' },
  { id: '5-2', name: '5/2 異端隱士者', lines: [5, 2], theme: '實際解決與天生才華', description: '能夠提供解決方案，但需要獨處時間來充電。' },
  { id: '6-2', name: '6/2 典範隱士者', lines: [6, 2], theme: '智慧典範與天賦', description: '人生分為三階段，最終成為智慧典範，同時保有天生才華。' },
  { id: '6-3', name: '6/3 典範殉道者', lines: [6, 3], theme: '智慧與持續實驗', description: '透過經驗累積智慧，一生持續透過試錯來學習。' }
];

// 內在權威
export interface Authority {
  id: string;
  name: string;
  englishName: string;
  description: string;
  decisionProcess: string;
}

export const authorities: Authority[] = [
  {
    id: 'emotional',
    name: '情緒權威',
    englishName: 'Emotional Authority',
    description: '以情緒波動為決策基礎',
    decisionProcess: '需要等待情緒波動過去，在情緒清明時才做重要決定。'
  },
  {
    id: 'sacral',
    name: '薦骨權威',
    englishName: 'Sacral Authority',
    description: '以薦骨回應為決策基礎',
    decisionProcess: '透過「嗯哼」或「嗯嗯」的聲音回應來做決定。'
  },
  {
    id: 'splenic',
    name: '脾臟權威',
    englishName: 'Splenic Authority',
    description: '以直覺為決策基礎',
    decisionProcess: '信任當下的直覺判斷，這種直覺只會出現一次。'
  },
  {
    id: 'ego-projected',
    name: '自我投射權威',
    englishName: 'Ego Projected Authority',
    description: '以意志中心為決策基礎',
    decisionProcess: '透過聽自己說話來理解內心真正的意願。'
  },
  {
    id: 'ego-manifested',
    name: '自我顯化權威',
    englishName: 'Ego Manifested Authority',
    description: '以意志中心為決策基礎',
    decisionProcess: '信任自己的意志力與承諾能力。'
  },
  {
    id: 'self-projected',
    name: '自我投射權威',
    englishName: 'Self-Projected Authority',
    description: '以G中心為決策基礎',
    decisionProcess: '透過與他人對話，聽自己說出真實的方向。'
  },
  {
    id: 'mental',
    name: '環境權威',
    englishName: 'Mental/Environment Authority',
    description: '以環境為決策參考',
    decisionProcess: '需要與信任的人討論，在正確的環境中做決定。'
  },
  {
    id: 'lunar',
    name: '月亮週期權威',
    englishName: 'Lunar Authority',
    description: '以月亮週期為決策基礎',
    decisionProcess: '需要等待完整的月亮週期（約29天）來做重大決定。'
  }
];

// 能量定義
export interface Definition {
  id: string;
  name: string;
  englishName: string;
  description: string;
}

export const definitions: Definition[] = [
  { id: 'single', name: '單一定義', englishName: 'Single Definition', description: '所有定義中心都彼此連結，能量流動順暢，自給自足。' },
  { id: 'split', name: '分裂定義', englishName: 'Split Definition', description: '定義中心分為兩個區域，需要透過他人或行星過境來連結。' },
  { id: 'triple-split', name: '三重分裂', englishName: 'Triple Split', description: '定義中心分為三個區域，需要多人或多種能量來連結。' },
  { id: 'quadruple-split', name: '四重分裂', englishName: 'Quadruple Split', description: '定義中心分為四個區域，需要豐富的人際互動。' },
  { id: 'none', name: '無定義', englishName: 'No Definition', description: '反映者專屬，沒有固定的能量中心被定義。' }
];

// 輪迴交叉類型
export interface IncarnationCrossType {
  id: string;
  name: string;
  englishName: string;
  description: string;
}

export const incarnationCrossTypes: IncarnationCrossType[] = [
  { id: 'right-angle', name: '右角度交叉', englishName: 'Right Angle Cross', description: '個人命運導向，專注於個人生命旅程的體驗。' },
  { id: 'left-angle', name: '左角度交叉', englishName: 'Left Angle Cross', description: '跨個人命運，透過與他人的互動來完成生命使命。' },
  { id: 'juxtaposition', name: '對角交叉', englishName: 'Juxtaposition Cross', description: '固定命運，具有特定的人生軌跡與使命。' }
];

// 36條通道
export interface Channel {
  id: string;
  name: string;
  gates: [number, number];
  centers: [string, string];
  theme: string;
  description: string;
}

export const channels: Channel[] = [
  { id: '1-8', name: '啟發通道', gates: [1, 8], centers: ['g', 'throat'], theme: '創意表達', description: '具有獨特的創造力，能夠啟發他人。' },
  { id: '2-14', name: '脈動通道', gates: [2, 14], centers: ['g', 'sacral'], theme: '方向與財富', description: '知道自己的方向，具有創造財富的能量。' },
  { id: '3-60', name: '突變通道', gates: [3, 60], centers: ['sacral', 'root'], theme: '突變能量', description: '能夠帶來突變與改變，需要適當的時機。' },
  { id: '4-63', name: '邏輯通道', gates: [4, 63], centers: ['ajna', 'head'], theme: '邏輯懷疑', description: '具有邏輯思維能力，能夠質疑並尋找答案。' },
  { id: '5-15', name: '韻律通道', gates: [5, 15], centers: ['sacral', 'g'], theme: '生命韻律', description: '具有自然的生活韻律，能夠與萬物和諧共處。' },
  { id: '6-59', name: '親密通道', gates: [6, 59], centers: ['solar', 'sacral'], theme: '生育與親密', description: '具有深度親密連結的能力，生育與創造力。' },
  { id: '7-31', name: '領導通道', gates: [7, 31], centers: ['g', 'throat'], theme: '領導力', description: '具有民主式的領導能力，能夠引導集體方向。' },
  { id: '9-52', name: '專注通道', gates: [9, 52], centers: ['sacral', 'root'], theme: '專注力', description: '具有深度專注的能力，能夠長時間投入細節工作。' },
  { id: '10-20', name: '覺醒通道', gates: [10, 20], centers: ['g', 'throat'], theme: '自我覺醒', description: '具有在當下覺醒的能力，活出真實的自我。' },
  { id: '10-34', name: '探索通道', gates: [10, 34], centers: ['g', 'sacral'], theme: '探索生命', description: '具有探索生命的強大能量，活出自我。' },
  { id: '10-57', name: '完美通道', gates: [10, 57], centers: ['g', 'spleen'], theme: '完美形式', description: '追求生命的完美形式，具有直覺的智慧。' },
  { id: '11-56', name: '好奇通道', gates: [11, 56], centers: ['ajna', 'throat'], theme: '尋求經驗', description: '具有說故事的能力，渴望經歷並分享人生體驗。' },
  { id: '12-22', name: '開放通道', gates: [12, 22], centers: ['throat', 'solar'], theme: '社交開放', description: '具有社交魅力，能夠在正確的情緒狀態下表達。' },
  { id: '13-33', name: '浪子通道', gates: [13, 33], centers: ['g', 'throat'], theme: '記憶與見證', description: '具有收集與傳承智慧的能力。' },
  { id: '16-48', name: '才華通道', gates: [16, 48], centers: ['throat', 'spleen'], theme: '天賦才華', description: '具有展現才華的能量，需要足夠的深度。' },
  { id: '17-62', name: '理解通道', gates: [17, 62], centers: ['ajna', 'throat'], theme: '組織邏輯', description: '具有組織與表達細節的能力。' },
  { id: '18-58', name: '批判通道', gates: [18, 58], centers: ['spleen', 'root'], theme: '完美追求', description: '具有改進與完善事物的能力。' },
  { id: '19-49', name: '敏感通道', gates: [19, 49], centers: ['root', 'solar'], theme: '情感敏感', description: '對他人需求敏感，能夠建立或打破關係。' },
  { id: '20-34', name: '魅力通道', gates: [20, 34], centers: ['throat', 'sacral'], theme: '即時行動', description: '能夠在當下採取行動，展現強大的個人魅力。' },
  { id: '20-57', name: '腦波通道', gates: [20, 57], centers: ['throat', 'spleen'], theme: '直覺表達', description: '能夠即時表達直覺的洞見。' },
  { id: '21-45', name: '金錢通道', gates: [21, 45], centers: ['heart', 'throat'], theme: '物質掌控', description: '具有掌控物質資源的能力。' },
  { id: '23-43', name: '建構通道', gates: [23, 43], centers: ['throat', 'ajna'], theme: '獨特洞見', description: '具有獨特的思維方式，能夠帶來新的觀點。' },
  { id: '24-61', name: '覺知通道', gates: [24, 61], centers: ['ajna', 'head'], theme: '神秘覺知', description: '具有深度思考與神秘覺知的能力。' },
  { id: '25-51', name: '啟蒙通道', gates: [25, 51], centers: ['g', 'heart'], theme: '競爭啟蒙', description: '透過競爭與挑戰來達到啟蒙。' },
  { id: '26-44', name: '投降通道', gates: [26, 44], centers: ['heart', 'spleen'], theme: '記憶傳遞', description: '具有傳遞經驗與推銷的能力。' },
  { id: '27-50', name: '保存通道', gates: [27, 50], centers: ['sacral', 'spleen'], theme: '照顧保存', description: '具有照顧與維護的本能。' },
  { id: '28-38', name: '掙扎通道', gates: [28, 38], centers: ['spleen', 'root'], theme: '生命掙扎', description: '願意為了有意義的事物而掙扎。' },
  { id: '29-46', name: '發現通道', gates: [29, 46], centers: ['sacral', 'g'], theme: '承諾發現', description: '能夠全然投入並發現人生的意義。' },
  { id: '30-41', name: '識別通道', gates: [30, 41], centers: ['solar', 'root'], theme: '情感夢想', description: '具有渴望與夢想的能量，帶來新的體驗。' },
  { id: '32-54', name: '轉化通道', gates: [32, 54], centers: ['spleen', 'root'], theme: '驅動轉化', description: '具有野心與轉化的能量。' },
  { id: '34-57', name: '力量通道', gates: [34, 57], centers: ['sacral', 'spleen'], theme: '直覺力量', description: '具有強大的直覺生存本能。' },
  { id: '35-36', name: '短暫通道', gates: [35, 36], centers: ['throat', 'solar'], theme: '經驗追求', description: '渴望新的經驗，追求人生的完整體驗。' },
  { id: '37-40', name: '社群通道', gates: [37, 40], centers: ['solar', 'heart'], theme: '社群支持', description: '具有建立與維護社群的能力。' },
  { id: '39-55', name: '情緒通道', gates: [39, 55], centers: ['root', 'solar'], theme: '情緒波動', description: '具有深度的情緒能量，帶來創造力。' },
  { id: '42-53', name: '成熟通道', gates: [42, 53], centers: ['sacral', 'root'], theme: '完成週期', description: '能夠開始並完成生命週期。' },
  { id: '47-64', name: '抽象通道', gates: [47, 64], centers: ['ajna', 'head'], theme: '抽象思維', description: '具有理解生命經驗意義的能力。' }
];

// 64個閘門
export interface Gate {
  id: number;
  name: string;
  iching: string;
  center: string;
  theme: string;
}

export const gates: Gate[] = [
  { id: 1, name: '自我表達', iching: '乾', center: 'g', theme: '創意的自我表達' },
  { id: 2, name: '接受方向', iching: '坤', center: 'g', theme: '接受更高指引的方向' },
  { id: 3, name: '困難開始', iching: '屯', center: 'sacral', theme: '創新與開始的挑戰' },
  { id: 4, name: '年輕愚昧', iching: '蒙', center: 'ajna', theme: '邏輯思考的公式' },
  { id: 5, name: '等待', iching: '需', center: 'sacral', theme: '普遍的韻律與等待' },
  { id: 6, name: '衝突', iching: '訟', center: 'solar', theme: '情緒的親密' },
  { id: 7, name: '軍隊', iching: '師', center: 'g', theme: '領導的角色' },
  { id: 8, name: '團結', iching: '比', center: 'throat', theme: '貢獻的創意表達' },
  { id: 9, name: '小的馴服', iching: '小畜', center: 'sacral', theme: '專注的能量' },
  { id: 10, name: '踩踏', iching: '履', center: 'g', theme: '自我行為' },
  { id: 11, name: '和平', iching: '泰', center: 'ajna', theme: '和平的想法' },
  { id: 12, name: '靜止', iching: '否', center: 'throat', theme: '謹慎的表達' },
  { id: 13, name: '傾聽', iching: '同人', center: 'g', theme: '收集經驗的傾聽者' },
  { id: 14, name: '富有的財產', iching: '大有', center: 'sacral', theme: '財富與力量' },
  { id: 15, name: '謙遜', iching: '謙', center: 'g', theme: '極端與人性的愛' },
  { id: 16, name: '熱情', iching: '豫', center: 'throat', theme: '技能的表達' },
  { id: 17, name: '跟隨', iching: '隨', center: 'ajna', theme: '意見與邏輯思考' },
  { id: 18, name: '糾正', iching: '蠱', center: 'spleen', theme: '對模式的挑戰' },
  { id: 19, name: '接近', iching: '臨', center: 'root', theme: '對資源的需求' },
  { id: 20, name: '當下', iching: '觀', center: 'throat', theme: '當下的覺醒' },
  { id: 21, name: '咬緊', iching: '噬嗑', center: 'heart', theme: '控制的意志' },
  { id: 22, name: '優雅', iching: '賁', center: 'solar', theme: '開放的情緒表達' },
  { id: 23, name: '剝落', iching: '剝', center: 'throat', theme: '同化與解釋' },
  { id: 24, name: '返回', iching: '復', center: 'ajna', theme: '理性化思考' },
  { id: 25, name: '無辜', iching: '無妄', center: 'g', theme: '普遍的愛' },
  { id: 26, name: '馴服力量', iching: '大畜', center: 'heart', theme: '自我主義者' },
  { id: 27, name: '滋養', iching: '頤', center: 'sacral', theme: '照顧的本能' },
  { id: 28, name: '偉大', iching: '大過', center: 'spleen', theme: '生命的掙扎' },
  { id: 29, name: '深淵', iching: '坎', center: 'sacral', theme: '承諾的能量' },
  { id: 30, name: '緊抓', iching: '離', center: 'solar', theme: '識別的渴望' },
  { id: 31, name: '影響', iching: '咸', center: 'throat', theme: '民主領導' },
  { id: 32, name: '持久', iching: '恆', center: 'spleen', theme: '持續的本能' },
  { id: 33, name: '退隱', iching: '遯', center: 'throat', theme: '隱私與記憶' },
  { id: 34, name: '強大', iching: '大壯', center: 'sacral', theme: '力量的能量' },
  { id: 35, name: '進展', iching: '晉', center: 'throat', theme: '改變的渴望' },
  { id: 36, name: '暗化光明', iching: '明夷', center: 'solar', theme: '危機的情緒' },
  { id: 37, name: '家庭', iching: '家人', center: 'solar', theme: '友誼與家庭' },
  { id: 38, name: '對立', iching: '睽', center: 'root', theme: '戰士的抗爭' },
  { id: 39, name: '障礙', iching: '蹇', center: 'root', theme: '挑釁的能量' },
  { id: 40, name: '解脫', iching: '解', center: 'heart', theme: '孤獨與意志' },
  { id: 41, name: '減少', iching: '損', center: 'root', theme: '幻想的能量' },
  { id: 42, name: '增加', iching: '益', center: 'sacral', theme: '成長與完成' },
  { id: 43, name: '突破', iching: '夬', center: 'ajna', theme: '洞見的突破' },
  { id: 44, name: '相遇', iching: '姤', center: 'spleen', theme: '警覺的本能' },
  { id: 45, name: '聚集', iching: '萃', center: 'throat', theme: '國王/女王' },
  { id: 46, name: '推進', iching: '升', center: 'g', theme: '身體的機運' },
  { id: 47, name: '壓迫', iching: '困', center: 'ajna', theme: '實現的思維' },
  { id: 48, name: '井', iching: '井', center: 'spleen', theme: '深度的本能' },
  { id: 49, name: '革命', iching: '革', center: 'solar', theme: '革命的情緒' },
  { id: 50, name: '鼎', iching: '鼎', center: 'spleen', theme: '價值的本能' },
  { id: 51, name: '震動', iching: '震', center: 'heart', theme: '競爭的意志' },
  { id: 52, name: '靜止', iching: '艮', center: 'root', theme: '靜止的能量' },
  { id: 53, name: '發展', iching: '漸', center: 'root', theme: '開始週期' },
  { id: 54, name: '嫁女', iching: '歸妹', center: 'root', theme: '野心的驅動' },
  { id: 55, name: '豐盛', iching: '豐', center: 'solar', theme: '情緒精神' },
  { id: 56, name: '旅人', iching: '旅', center: 'throat', theme: '刺激的表達' },
  { id: 57, name: '溫和', iching: '巽', center: 'spleen', theme: '直覺的清晰' },
  { id: 58, name: '喜悅', iching: '兌', center: 'root', theme: '生命力的喜悅' },
  { id: 59, name: '渙散', iching: '渙', center: 'sacral', theme: '親密的能量' },
  { id: 60, name: '限制', iching: '節', center: 'root', theme: '接受限制' },
  { id: 61, name: '內在真理', iching: '中孚', center: 'head', theme: '神秘的壓力' },
  { id: 62, name: '小的超越', iching: '小過', center: 'throat', theme: '細節的表達' },
  { id: 63, name: '已完成', iching: '既濟', center: 'head', theme: '懷疑的壓力' },
  { id: 64, name: '未完成', iching: '未濟', center: 'head', theme: '困惑的壓力' }
];

// 人類圖完整結構
export interface HumanDesignChart {
  id: string;
  createdAt: Date;
  situation: string;
  type: HumanDesignType;
  profile: Profile;
  authority: Authority;
  definition: Definition;
  definedCenters: string[];
  undefinedCenters: string[];
  activeGates: number[];
  activeChannels: string[];
  incarnationCross: {
    type: IncarnationCrossType;
    gates: [number, number, number, number];
  };
}
