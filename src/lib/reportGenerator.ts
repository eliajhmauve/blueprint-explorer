import { HumanDesignChart, energyCenters, gates, channels } from '@/data/humanDesignData';

// 智慧金句庫
const wisdomQuotes = [
  "生命不是要找尋自己，而是要創造自己。",
  "當你活出真實的自己，宇宙就會為你開路。",
  "每個能量中心都是一扇通往自我理解的門。",
  "策略與權威是通往內在智慧的鑰匙。",
  "不要試圖成為別人，你的設計就是你的禮物。",
  "等待的藝術，是信任生命的流動。",
  "在正確的時機，一切都會自然發生。",
  "你不需要去追尋，只需要回應生命的邀請。",
  "每一個閘門都是一種獨特的天賦。",
  "當你停止抗拒自己的設計，平靜自然來臨。"
];

// 寓言故事庫
const parables: Record<string, string> = {
  'manifestor': `
**老鷹與森林的寓言**

從前有一隻老鷹，牠天生就有翱翔天際的能力。然而，牠從小在雞群中長大，以為自己也是一隻雞。

有一天，老鷹學會了「告知」—在行動之前，牠開始向其他雞說明自己要做什麼。奇怪的是，當牠開始這樣做，其他雞不再攻擊牠，反而開始配合牠。

最終，老鷹展開了翅膀，飛向了天空。牠終於明白：自己天生就是啟動者，不需要等待許可，只需要讓周圍的人知道自己的方向。

**啟示**：顯示者天生具有啟動的能量，當你學會告知而非請求，阻力自然消失。
`,
  'generator': `
**泉水與河流的寓言**

在深山之中，有一口永不枯竭的泉水。這口泉水每天都有源源不斷的清水湧出，但它不知道該往哪個方向流。

有一天，一位智者來到泉邊，他說：「泉水啊，你不需要決定方向，只需要回應地形。當有低窪處出現，你自然就知道該往哪裡流。」

泉水開始等待，果然，當雨季來臨，地形改變，泉水自然而然地匯成了河流，滋養了整片山谷。

**啟示**：生產者擁有強大的生命能量，但這能量需要透過回應來引導。不要主動發起，等待生命向你提問。
`,
  'manifesting-generator': `
**蜂鳥的寓言**

森林裡有一隻蜂鳥，牠不像其他鳥一樣直線飛行，而是在空中跳躍、盤旋、忽快忽慢。其他鳥常常嘲笑牠：「你飛得真沒效率！」

蜂鳥很困惑，直到有一天，牠遇見了一位花神。花神說：「親愛的蜂鳥，你的設計本來就是這樣。你會跳過一些步驟，你會改變方向，但最終你總是能找到最甜美的花蜜。」

從此，蜂鳥不再質疑自己的方式，而是享受這種獨特的飛行節奏。

**啟示**：顯示生產者需要接受自己「跳步驟」的特質，這不是缺陷，而是天賦。
`,
  'projector': `
**燈塔的寓言**

海邊有一座燈塔，它每晚都會發出明亮的光芒。但燈塔很沮喪，因為它無法像船一樣航行到遠方。

一位老船長對燈塔說：「你不需要航行，你的光芒就是你的價值。當船需要你的時候，它們自然會朝你駛來。你只需要在那裡，準備好你的光。」

燈塔終於明白，它的角色不是追逐，而是等待被看見、被邀請。

**啟示**：投射者的能量在於引導他人，但這需要被認可與邀請。等待是一種智慧，不是被動。
`,
  'reflector': `
**月亮與湖泊的寓言**

有一個湖泊，它的水面清澈無比，能夠完美地反映天空的一切。白天它反映太陽，夜晚它反映月亮和星星。

其他湖泊問它：「你為什麼沒有自己的顏色？」

它回答：「我的天賦就是反映。透過我，天空能夠看見自己。而我，需要等待整個月亮週期，才能看清楚什麼是真正重要的。」

**啟示**：反映者是環境的鏡子，你能夠感知他人無法感知的事物。等待月亮週期，讓時間帶來清晰。
`
};

// 生成完整的解析報告
export const generateReport = (chart: HumanDesignChart): string => {
  const definedCenterDetails = chart.definedCenters.map(centerId => {
    const center = energyCenters.find(c => c.id === centerId);
    return center ? `- **${center.name}**：${center.definedMeaning}` : '';
  }).filter(Boolean).join('\n');

  const undefinedCenterDetails = chart.undefinedCenters.map(centerId => {
    const center = energyCenters.find(c => c.id === centerId);
    return center ? `- **${center.name}**：${center.undefinedMeaning}` : '';
  }).filter(Boolean).join('\n');

  const activeGateDetails = chart.activeGates.slice(0, 8).map(gateId => {
    const gate = gates.find(g => g.id === gateId);
    return gate ? `- **閘門 ${gate.id}（${gate.name}）**：${gate.theme}，對應易經「${gate.iching}」卦` : '';
  }).filter(Boolean).join('\n');

  const activeChannelDetails = chart.activeChannels.slice(0, 5).map(channelId => {
    const channel = channels.find(c => c.id === channelId);
    return channel ? `- **${channel.name}（${channel.id}）**：${channel.description}` : '';
  }).filter(Boolean).join('\n');

  const parable = parables[chart.type.id] || parables['generator'];
  const randomQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];

  const situationAnalysis = chart.situation ? `
## 現況背景分析

根據您描述的現況：「${chart.situation}」

結合您的人類圖設計，我們可以看到以下的能量運作模式：

作為一位 **${chart.type.name}**，您的生命策略是「**${chart.type.strategy}**」。在面對目前的處境時，這意味著您需要${chart.type.id === 'generator' || chart.type.id === 'manifesting-generator' ? '等待外界的刺激，透過薦骨的回應來判斷哪些事物值得投入能量' : chart.type.id === 'projector' ? '等待被認可與邀請，而不是主動推銷自己的能力' : chart.type.id === 'manifestor' ? '在行動前告知周圍的人您的計劃，以減少阻力' : '給自己足夠的時間，等待整個月亮週期來做重大決定'}。

您的 **${chart.authority.name}** 告訴我們，在做重要決定時，${chart.authority.decisionProcess}

這種能量運作方式意味著：在您目前的生活情境中，最重要的不是急於行動，而是找到與您內在設計和諧共振的節奏。

` : '';

  return `
# 🌟 人類圖解析報告

---

## 基本設計概覽

| 項目 | 內容 |
|------|------|
| **類型** | ${chart.type.name}（${chart.type.englishName}） |
| **人生角色** | ${chart.profile.name} |
| **內在權威** | ${chart.authority.name} |
| **能量定義** | ${chart.definition.name} |
| **輪迴交叉** | ${chart.incarnationCross.type.name} |

---

## 🌌 生命類型解析

### ${chart.type.name}的能量本質

${chart.type.description}

**策略**：${chart.type.strategy}

當您遵循這個策略生活時，您會感受到「**${chart.type.signature}**」——這是您活出真實自我的標誌。

**非自己主題**：${chart.type.notSelfTheme}

當您感受到「${chart.type.notSelfTheme}」時，這是一個信號，表示您可能正在違背自己的設計，需要回到策略與權威的引導。

在全人類中，${chart.type.name}約佔 ${chart.type.percentage}。您擁有這種獨特的能量運作方式，這是宇宙賦予您的特殊禮物。

---

## 👤 人生角色解讀

### ${chart.profile.name}

您的人生角色是 **${chart.profile.name}**，由第 ${chart.profile.lines[0]} 爻和第 ${chart.profile.lines[1]} 爻組成。

**生命主題**：${chart.profile.theme}

${chart.profile.description}

人生角色代表您在社會中學習、成長與互動的方式。第 ${chart.profile.lines[0]} 爻是您的意識面，是您有意識地表達的特質；第 ${chart.profile.lines[1]} 爻是您的無意識面，是他人更容易看見的您。

---

## 🔮 內在權威

### ${chart.authority.name}

您的內在權威是 **${chart.authority.name}**，這代表您做決定時最可靠的內在指引系統。

${chart.authority.decisionProcess}

**如何運用內在權威**：

在面對重要決定時，不要依賴頭腦的分析或他人的意見。您的身體有它自己的智慧。${chart.authority.id === 'emotional' ? '給自己時間經歷完整的情緒波動，在情緒回到中性點時做決定。' : chart.authority.id === 'sacral' ? '注意您的薦骨回應——那個「嗯哼」或「嗯嗯」的聲音會告訴您真相。' : chart.authority.id === 'splenic' ? '信任您的第一直覺，它只會出現一次，不要等待確認。' : '透過與信任的人對話，聽聽自己說出什麼。'}

---

## 💫 九大能量中心分析

### 定義中心（${chart.definedCenters.length} 個）

定義的能量中心代表您穩定、可靠的能量來源。這些是您天生具備的特質，不會因環境改變。

${definedCenterDetails || '（反映者沒有定義的能量中心，這是您獨特的設計）'}

### 未定義中心（${chart.undefinedCenters.length} 個）

未定義的能量中心是您的智慧學校。透過這些開放的中心，您能夠感受他人的能量，並從中獲得深刻的洞見。

${undefinedCenterDetails}

---

## ⚡ 啟動閘門

以下是您人類圖中啟動的閘門，每個閘門都對應《易經》六十四卦的一個卦象，代表一種特定的人類潛能：

${activeGateDetails || '（根據您的設計，特定閘門將在此呈現）'}

每個閘門都是您靈魂設計的一部分。當您理解這些閘門的能量，您就更能理解自己的天賦與挑戰。

---

## 🌊 通道與能量流動

通道是連結兩個能量中心的完整能量路徑。當通道被啟動，能量就會在兩個中心之間流動，創造出特定的生命主題。

${activeChannelDetails || '（根據您的設計，您可能沒有完整的通道，或通道資訊將在此呈現）'}

---

## 🔄 能量定義模式

您的能量定義是：**${chart.definition.name}**

${chart.definition.description}

${chart.definition.id === 'single' ? '作為單一定義，您的能量是自給自足的。您不需要依賴他人來感到完整，但這並不意味著孤獨，而是意味著您可以獨立運作。' : chart.definition.id === 'split' ? '作為分裂定義，您可能會感到內在有某種拉扯或渴望。這是正常的——您的設計需要透過正確的關係或環境來橋接這個分裂。' : '您的能量定義需要豐富的人際互動和環境變化來運作。這是您設計的一部分，接受它而不是抗拒它。'}

---

## ✨ 輪迴交叉

您的輪迴交叉是：**${chart.incarnationCross.type.name}**

閘門組合：${chart.incarnationCross.gates.join('、')}

${chart.incarnationCross.type.description}

輪迴交叉代表您此生的生命使命與靈魂主題。這不是需要「完成」的任務，而是當您活出真實的自己時，自然會展現的生命軌跡。

${situationAnalysis}

---

## 📖 靈性寓言

${parable}

---

## 💎 智慧金句

> 「${randomQuote}」

---

## 🌟 總結與建議

親愛的靈魂，您的人類圖揭示了一個獨特而美麗的設計。作為一位 **${chart.type.name}**，您的生命之旅是關於「**${chart.type.strategy}**」的實踐。

以下是給您的三個核心建議：

1. **信任您的權威**：在做重要決定時，回到您的 ${chart.authority.name}。頭腦是好的僕人，但不是好的主人。

2. **尊重您的設計**：您的未定義中心不是弱點，而是智慧的入口。不要試圖「修復」或「強化」它們。

3. **等待正確的時機**：${chart.type.id === 'generator' || chart.type.id === 'manifesting-generator' ? '當薦骨說「是」時，全力投入；當它說「不」時，尊重這個回應。' : chart.type.id === 'projector' ? '等待被認可的邀請。您的能量是寶貴的，值得被正確地珍視。' : chart.type.id === 'manifestor' ? '行動前告知，不是請求許可，而是清除阻力。' : '給自己一個完整的月亮週期，讓清晰自然浮現。'}

---

*此報告由「福星何大師」人類圖復盤學習系統生成*

*報告生成時間：${chart.createdAt.toLocaleString('zh-TW')}*
`;
};
