import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shuffle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BodyGraph from '@/components/BodyGraph';
import { generateRandomChart } from '@/lib/chartGenerator';
import { HumanDesignChart } from '@/data/humanDesignData';

const RandomMode = () => {
  const navigate = useNavigate();
  const [chart, setChart] = useState<HumanDesignChart | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateNewChart();
  }, []);

  const generateNewChart = () => {
    setIsGenerating(true);
    const situation = localStorage.getItem('currentSituation') || '';
    
    setTimeout(() => {
      const newChart = generateRandomChart(situation);
      setChart(newChart);
      setIsGenerating(false);
    }, 500);
  };

  const handleAnalyze = () => {
    if (chart) {
      // Save chart to localStorage for the report page
      localStorage.setItem('currentChart', JSON.stringify(chart));
      navigate('/report');
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首頁
          </Button>
          <h1 className="text-xl font-serif text-primary glow-text">
            隨機人類圖生成
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-muted-foreground">
              系統已為您生成一個隨機的人類圖結構，用於復盤訓練
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Body Graph */}
            <motion.div
              className="glass-card rounded-xl p-6 sacred-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-serif text-foreground mb-4 text-center">
                人體圖
              </h3>
              {chart && (
                <BodyGraph
                  definedCenters={chart.definedCenters}
                  activeGates={chart.activeGates}
                  activeChannels={chart.activeChannels}
                  size="md"
                  animated={!isGenerating}
                />
              )}
            </motion.div>

            {/* Chart Info */}
            <motion.div
              className="glass-card rounded-xl p-6 sacred-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-serif text-foreground mb-6">
                基本設計
              </h3>
              
              {chart && (
                <div className="space-y-4">
                  <InfoRow label="類型" value={`${chart.type.name} (${chart.type.englishName})`} highlight />
                  <InfoRow label="人生角色" value={chart.profile.name} />
                  <InfoRow label="內在權威" value={chart.authority.name} />
                  <InfoRow label="能量定義" value={chart.definition.name} />
                  <InfoRow label="策略" value={chart.type.strategy} />
                  <InfoRow label="非自己主題" value={chart.type.notSelfTheme} />
                  
                  <div className="border-t border-border/30 pt-4 mt-4">
                    <p className="text-xs text-muted-foreground mb-2">定義中心</p>
                    <div className="flex flex-wrap gap-2">
                      {chart.definedCenters.map(center => (
                        <span key={center} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {center}
                        </span>
                      ))}
                      {chart.definedCenters.length === 0 && (
                        <span className="text-xs text-muted-foreground">無（反映者）</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4">
                    <p className="text-xs text-muted-foreground mb-2">啟動閘門</p>
                    <div className="flex flex-wrap gap-2">
                      {chart.activeGates.slice(0, 12).map(gate => (
                        <span key={gate} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                          {gate}
                        </span>
                      ))}
                      {chart.activeGates.length > 12 && (
                        <span className="text-xs text-muted-foreground">+{chart.activeGates.length - 12}</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4">
                    <p className="text-xs text-muted-foreground mb-2">活躍通道</p>
                    <div className="flex flex-wrap gap-2">
                      {chart.activeChannels.map(channel => (
                        <span key={channel} className="text-xs bg-secondary/30 text-secondary-foreground px-2 py-1 rounded">
                          {channel}
                        </span>
                      ))}
                      {chart.activeChannels.length === 0 && (
                        <span className="text-xs text-muted-foreground">無</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4">
                    <p className="text-xs text-muted-foreground mb-2">輪迴交叉</p>
                    <p className="text-sm text-foreground">
                      {chart.incarnationCross.type.name}
                      <span className="text-muted-foreground ml-2">
                        ({chart.incarnationCross.gates.join(', ')})
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="outline"
              onClick={generateNewChart}
              disabled={isGenerating}
              className="border-border/50 hover:border-primary/50"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              重新生成
            </Button>
            <Button
              onClick={handleAnalyze}
              disabled={!chart || isGenerating}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              生成解析報告
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm ${highlight ? 'text-primary font-medium' : 'text-foreground'}`}>{value}</span>
  </div>
);

export default RandomMode;
