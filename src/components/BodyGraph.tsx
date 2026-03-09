import { motion } from 'framer-motion';
import { energyCenters, channels } from '@/data/humanDesignData';

interface BodyGraphProps {
  definedCenters: string[];
  activeGates: number[];
  activeChannels: string[];
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const BodyGraph = ({ 
  definedCenters, 
  activeGates, 
  activeChannels,
  size = 'md',
  animated = true 
}: BodyGraphProps) => {
  const dimensions = {
    sm: { width: 200, height: 250 },
    md: { width: 320, height: 400 },
    lg: { width: 400, height: 500 }
  };

  const { width, height } = dimensions[size];
  const scale = width / 400;

  const centerPositions: Record<string, { cx: number; cy: number }> = {
    head: { cx: 200, cy: 60 },
    ajna: { cx: 200, cy: 120 },
    throat: { cx: 200, cy: 190 },
    g: { cx: 200, cy: 270 },
    heart: { cx: 140, cy: 270 },
    spleen: { cx: 120, cy: 350 },
    sacral: { cx: 200, cy: 370 },
    solar: { cx: 280, cy: 350 },
    root: { cx: 200, cy: 450 },
  };

  const channelPaths: Record<string, { from: string; to: string }> = {
    '1-8': { from: 'g', to: 'throat' },
    '2-14': { from: 'g', to: 'sacral' },
    '3-60': { from: 'sacral', to: 'root' },
    '4-63': { from: 'ajna', to: 'head' },
    '5-15': { from: 'sacral', to: 'g' },
    '6-59': { from: 'solar', to: 'sacral' },
    '7-31': { from: 'g', to: 'throat' },
    '9-52': { from: 'sacral', to: 'root' },
    '10-20': { from: 'g', to: 'throat' },
    '10-34': { from: 'g', to: 'sacral' },
    '10-57': { from: 'g', to: 'spleen' },
    '11-56': { from: 'ajna', to: 'throat' },
    '12-22': { from: 'throat', to: 'solar' },
    '13-33': { from: 'g', to: 'throat' },
    '16-48': { from: 'throat', to: 'spleen' },
    '17-62': { from: 'ajna', to: 'throat' },
    '18-58': { from: 'spleen', to: 'root' },
    '19-49': { from: 'root', to: 'solar' },
    '20-34': { from: 'throat', to: 'sacral' },
    '20-57': { from: 'throat', to: 'spleen' },
    '21-45': { from: 'heart', to: 'throat' },
    '23-43': { from: 'throat', to: 'ajna' },
    '24-61': { from: 'ajna', to: 'head' },
    '25-51': { from: 'g', to: 'heart' },
    '26-44': { from: 'heart', to: 'spleen' },
    '27-50': { from: 'sacral', to: 'spleen' },
    '28-38': { from: 'spleen', to: 'root' },
    '29-46': { from: 'sacral', to: 'g' },
    '30-41': { from: 'solar', to: 'root' },
    '32-54': { from: 'spleen', to: 'root' },
    '34-57': { from: 'sacral', to: 'spleen' },
    '35-36': { from: 'throat', to: 'solar' },
    '37-40': { from: 'solar', to: 'heart' },
    '39-55': { from: 'root', to: 'solar' },
    '42-53': { from: 'sacral', to: 'root' },
    '47-64': { from: 'ajna', to: 'head' },
  };

  const getCenterColor = (centerId: string, isDefined: boolean) => {
    if (!isDefined) return 'hsl(240 20% 20%)';
    const colors: Record<string, string> = {
      head: 'hsl(280 60% 50%)',
      ajna: 'hsl(200 70% 45%)',
      throat: 'hsl(160 70% 40%)',
      g: 'hsl(45 90% 45%)',
      heart: 'hsl(0 70% 50%)',
      sacral: 'hsl(25 85% 50%)',
      spleen: 'hsl(160 50% 35%)',
      solar: 'hsl(320 70% 50%)',
      root: 'hsl(15 70% 40%)',
    };
    return colors[centerId] || 'hsl(42 85% 55%)';
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 400 500`}
      className="mx-auto"
    >
      {/* Background glow */}
      <defs>
        <filter id="centerGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="channelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(42 85% 55%)" />
          <stop offset="100%" stopColor="hsl(280 70% 50%)" />
        </linearGradient>
      </defs>

      {/* Draw all possible connections (faint) */}
      {Object.entries(channelPaths).map(([channelId, path]) => {
        const from = centerPositions[path.from];
        const to = centerPositions[path.to];
        const isActive = activeChannels.includes(channelId);
        
        return (
          <motion.line
            key={channelId}
            x1={from.cx}
            y1={from.cy}
            x2={to.cx}
            y2={to.cy}
            stroke={isActive ? 'url(#channelGradient)' : 'hsl(240 20% 15%)'}
            strokeWidth={isActive ? 4 : 1}
            initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: isActive ? 0.3 : 0 }}
            style={{ filter: isActive ? 'url(#centerGlow)' : 'none' }}
          />
        );
      })}

      {/* Energy Centers */}
      {energyCenters.map((center, index) => {
        const pos = centerPositions[center.id];
        const isDefined = definedCenters.includes(center.id);
        const color = getCenterColor(center.id, isDefined);

        return (
          <motion.g key={center.id}>
            {/* Glow for defined centers */}
            {isDefined && (
              <motion.circle
                cx={pos.cx}
                cy={pos.cy}
                r="35"
                fill={color}
                opacity={0.2}
                initial={animated ? { scale: 0 } : { scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                filter="url(#centerGlow)"
              />
            )}
            {/* Main shape - using different shapes for visual variety */}
            {center.id === 'head' || center.id === 'ajna' ? (
              // Triangle for head centers
              <motion.polygon
                points={`${pos.cx},${pos.cy - 25} ${pos.cx - 22},${pos.cy + 15} ${pos.cx + 22},${pos.cy + 15}`}
                fill={isDefined ? color : 'hsl(240 25% 8%)'}
                stroke={isDefined ? color : 'hsl(240 20% 25%)'}
                strokeWidth="2"
                initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
            ) : center.id === 'g' ? (
              // Diamond for G center
              <motion.polygon
                points={`${pos.cx},${pos.cy - 28} ${pos.cx + 28},${pos.cy} ${pos.cx},${pos.cy + 28} ${pos.cx - 28},${pos.cy}`}
                fill={isDefined ? color : 'hsl(240 25% 8%)'}
                stroke={isDefined ? color : 'hsl(240 20% 25%)'}
                strokeWidth="2"
                initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
            ) : (
              // Square for other centers
              <motion.rect
                x={pos.cx - 24}
                y={pos.cy - 24}
                width="48"
                height="48"
                rx="4"
                fill={isDefined ? color : 'hsl(240 25% 8%)'}
                stroke={isDefined ? color : 'hsl(240 20% 25%)'}
                strokeWidth="2"
                initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
            )}
            {/* Center name */}
            <motion.text
              x={pos.cx}
              y={pos.cy + 4}
              textAnchor="middle"
              fill={isDefined ? 'hsl(240 30% 5%)' : 'hsl(240 10% 60%)'}
              fontSize="10"
              fontWeight="500"
              fontFamily="Noto Sans TC"
              initial={animated ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
            >
              {center.name.replace('中心', '')}
            </motion.text>
          </motion.g>
        );
      })}
    </svg>
  );
};

export default BodyGraph;
