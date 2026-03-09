import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation = ({ onComplete }: OpeningAnimationProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const phases = [300, 800, 1200, 1600, 2000];
    phases.forEach((time, index) => {
      setTimeout(() => setPhase(index + 1), time);
    });
    setTimeout(onComplete, 2500);
  }, [onComplete]);

  const centers = [
    { id: 'head', cx: 200, cy: 60, label: '頭頂' },
    { id: 'ajna', cx: 200, cy: 110, label: '阿賈那' },
    { id: 'throat', cx: 200, cy: 170, label: '喉嚨' },
    { id: 'g', cx: 200, cy: 240, label: 'G中心' },
    { id: 'heart', cx: 150, cy: 240, label: '意志' },
    { id: 'spleen', cx: 130, cy: 310, label: '脾' },
    { id: 'sacral', cx: 200, cy: 340, label: '薦骨' },
    { id: 'solar', cx: 270, cy: 310, label: '情緒' },
    { id: 'root', cx: 200, cy: 410, label: '根部' },
  ];

  const connections = [
    { from: 'head', to: 'ajna' },
    { from: 'ajna', to: 'throat' },
    { from: 'throat', to: 'g' },
    { from: 'g', to: 'heart' },
    { from: 'g', to: 'sacral' },
    { from: 'heart', to: 'spleen' },
    { from: 'spleen', to: 'sacral' },
    { from: 'sacral', to: 'root' },
    { from: 'sacral', to: 'solar' },
    { from: 'solar', to: 'throat' },
  ];

  const getCenter = (id: string) => centers.find(c => c.id === id);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center cosmic-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sacred Geometry Background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <svg width="600" height="600" viewBox="0 0 600 600" className="text-primary">
            {/* Outer circle */}
            <motion.circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
            {/* Hexagram */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.line
                key={i}
                x1={300 + 200 * Math.cos((angle * Math.PI) / 180)}
                y1={300 + 200 * Math.sin((angle * Math.PI) / 180)}
                x2={300 + 200 * Math.cos(((angle + 120) * Math.PI) / 180)}
                y2={300 + 200 * Math.sin(((angle + 120) * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Human Design Body Graph */}
        <motion.svg
          width="400"
          height="500"
          viewBox="0 0 400 500"
          className="relative z-10"
        >
          {/* Connections */}
          {connections.map((conn, i) => {
            const from = getCenter(conn.from);
            const to = getCenter(conn.to);
            if (!from || !to) return null;
            return (
              <motion.line
                key={`conn-${i}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke="hsl(42 85% 55% / 0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 3 ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
          })}

          {/* Energy Centers */}
          {centers.map((center, i) => (
            <motion.g key={center.id}>
              {/* Glow effect */}
              <motion.circle
                cx={center.cx}
                cy={center.cy}
                r="28"
                fill="none"
                stroke="hsl(42 85% 55%)"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase >= 2 ? { 
                  scale: [0, 1.2, 1], 
                  opacity: [0, 0.8, 0.3]
                } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                filter="url(#glow)"
              />
              {/* Main center */}
              <motion.circle
                cx={center.cx}
                cy={center.cy}
                r="20"
                fill="hsl(240 25% 8%)"
                stroke="hsl(42 85% 55%)"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase >= 2 ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              />
              {/* Center label */}
              <motion.text
                x={center.cx}
                y={center.cy + 4}
                textAnchor="middle"
                fill="hsl(42 85% 55%)"
                fontSize="8"
                fontFamily="Noto Sans TC"
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
              >
                {center.label}
              </motion.text>
            </motion.g>
          ))}

          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </motion.svg>

        {/* Title */}
        <motion.div
          className="absolute bottom-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-serif text-primary glow-text"
          >
            人類圖復盤學習
          </motion.h1>
          <motion.p
            className="mt-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={phase >= 5 ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            探索生命設計的藍圖
          </motion.p>
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/50"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2, 
              delay: Math.random() * 1,
              repeat: Infinity 
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningAnimation;
