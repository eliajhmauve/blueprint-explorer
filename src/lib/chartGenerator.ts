import { 
  HumanDesignChart, 
  humanDesignTypes, 
  profiles, 
  authorities, 
  definitions,
  incarnationCrossTypes,
  channels,
  gates,
  energyCenters
} from '@/data/humanDesignData';

// 隨機選取陣列元素
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 隨機選取多個不重複元素
const randomElements = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 根據類型決定定義中心
const getDefinedCentersForType = (typeId: string): string[] => {
  const allCenters = energyCenters.map(c => c.id);
  
  switch (typeId) {
    case 'manifestor':
      // 顯示者：喉嚨連結到動力中心，但薦骨未定義
      return randomElements(
        allCenters.filter(c => c !== 'sacral'),
        Math.floor(Math.random() * 3) + 3
      );
    case 'generator':
    case 'manifesting-generator':
      // 生產者：薦骨必定被定義
      const genCenters = ['sacral', ...randomElements(
        allCenters.filter(c => c !== 'sacral'),
        Math.floor(Math.random() * 3) + 2
      )];
      return genCenters;
    case 'projector':
      // 投射者：薦骨未定義，可能有其他定義
      return randomElements(
        allCenters.filter(c => c !== 'sacral'),
        Math.floor(Math.random() * 3) + 2
      );
    case 'reflector':
      // 反映者：沒有定義中心
      return [];
    default:
      return randomElements(allCenters, Math.floor(Math.random() * 4) + 2);
  }
};

// 根據定義中心找出可能的通道
const getActiveChannelsForCenters = (definedCenters: string[]): string[] => {
  const activeChannels: string[] = [];
  
  channels.forEach(channel => {
    const [center1, center2] = channel.centers;
    if (definedCenters.includes(center1) && definedCenters.includes(center2)) {
      if (Math.random() > 0.5) {
        activeChannels.push(channel.id);
      }
    }
  });

  return activeChannels;
};

// 根據通道取得啟動閘門
const getActiveGatesForChannels = (activeChannels: string[]): number[] => {
  const activeGates = new Set<number>();
  
  activeChannels.forEach(channelId => {
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      activeGates.add(channel.gates[0]);
      activeGates.add(channel.gates[1]);
    }
  });

  // 加入一些額外的單獨閘門
  const extraGates = Math.floor(Math.random() * 6) + 2;
  const availableGates = gates.filter(g => !activeGates.has(g.id));
  randomElements(availableGates, extraGates).forEach(g => activeGates.add(g.id));

  return Array.from(activeGates).sort((a, b) => a - b);
};

// 根據類型決定合適的權威
const getAuthorityForType = (typeId: string, definedCenters: string[]): typeof authorities[0] => {
  if (typeId === 'reflector') {
    return authorities.find(a => a.id === 'lunar')!;
  }

  // 根據定義的中心決定權威
  if (definedCenters.includes('solar')) {
    return authorities.find(a => a.id === 'emotional')!;
  }
  if (definedCenters.includes('sacral') && (typeId === 'generator' || typeId === 'manifesting-generator')) {
    return authorities.find(a => a.id === 'sacral')!;
  }
  if (definedCenters.includes('spleen')) {
    return authorities.find(a => a.id === 'splenic')!;
  }
  if (definedCenters.includes('heart')) {
    return randomElement([
      authorities.find(a => a.id === 'ego-projected')!,
      authorities.find(a => a.id === 'ego-manifested')!
    ]);
  }
  if (definedCenters.includes('g')) {
    return authorities.find(a => a.id === 'self-projected')!;
  }
  
  return authorities.find(a => a.id === 'mental')!;
};

// 決定能量定義類型
const getDefinitionType = (definedCenters: string[], activeChannels: string[]): typeof definitions[0] => {
  if (definedCenters.length === 0) {
    return definitions.find(d => d.id === 'none')!;
  }
  
  // 簡化邏輯：根據定義中心數量和通道數量估算
  const connectionRatio = activeChannels.length / Math.max(definedCenters.length - 1, 1);
  
  if (connectionRatio >= 0.8) {
    return definitions.find(d => d.id === 'single')!;
  } else if (connectionRatio >= 0.5) {
    return definitions.find(d => d.id === 'split')!;
  } else if (connectionRatio >= 0.3) {
    return definitions.find(d => d.id === 'triple-split')!;
  } else {
    return definitions.find(d => d.id === 'quadruple-split')!;
  }
};

// 生成輪迴交叉
const generateIncarnationCross = (): { type: typeof incarnationCrossTypes[0]; gates: [number, number, number, number] } => {
  const crossType = randomElement(incarnationCrossTypes);
  const crossGates = randomElements(gates, 4).map(g => g.id) as [number, number, number, number];
  
  return {
    type: crossType,
    gates: crossGates
  };
};

// 生成隨機人類圖
export const generateRandomChart = (situation: string = ''): HumanDesignChart => {
  const type = randomElement(humanDesignTypes);
  const profile = randomElement(profiles);
  const definedCenters = getDefinedCentersForType(type.id);
  const undefinedCenters = energyCenters.map(c => c.id).filter(c => !definedCenters.includes(c));
  const activeChannels = getActiveChannelsForCenters(definedCenters);
  const activeGates = getActiveGatesForChannels(activeChannels);
  const authority = getAuthorityForType(type.id, definedCenters);
  const definition = getDefinitionType(definedCenters, activeChannels);
  const incarnationCross = generateIncarnationCross();

  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    situation,
    type,
    profile,
    authority,
    definition,
    definedCenters,
    undefinedCenters,
    activeGates,
    activeChannels,
    incarnationCross
  };
};

// 根據手動設定生成人類圖
export const createManualChart = (
  situation: string,
  typeId: string,
  profileId: string,
  definedCenterIds: string[],
  activeGateIds: number[]
): HumanDesignChart => {
  const type = humanDesignTypes.find(t => t.id === typeId) || humanDesignTypes[0];
  const profile = profiles.find(p => p.id === profileId) || profiles[0];
  const undefinedCenters = energyCenters.map(c => c.id).filter(c => !definedCenterIds.includes(c));
  
  // 根據啟動閘門找出通道
  const activeChannels: string[] = [];
  channels.forEach(channel => {
    if (activeGateIds.includes(channel.gates[0]) && activeGateIds.includes(channel.gates[1])) {
      activeChannels.push(channel.id);
    }
  });

  const authority = getAuthorityForType(type.id, definedCenterIds);
  const definition = getDefinitionType(definedCenterIds, activeChannels);
  const incarnationCross = generateIncarnationCross();

  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    situation,
    type,
    profile,
    authority,
    definition,
    definedCenters: definedCenterIds,
    undefinedCenters,
    activeGates: activeGateIds,
    activeChannels,
    incarnationCross
  };
};
