import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import BodyGraph from '@/components/BodyGraph';
import { createManualChart } from '@/lib/chartGenerator';
import { humanDesignTypes, profiles, energyCenters, gates } from '@/data/humanDesignData';

const ManualMode = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('generator');
  const [selectedProfile, setSelectedProfile] = useState<string>('1-3');
  const [definedCenters, setDefinedCenters] = useState<string[]>(['sacral', 'throat']);
  const [activeGates, setActiveGates] = useState<number[]>([34, 20]);

  const toggleCenter = (centerId: string) => {
    setDefinedCenters(prev => 
      prev.includes(centerId) 
        ? prev.filter(c => c !== centerId)
        : [...prev, centerId]
    );
  };

  const toggleGate = (gateId: number) => {
    setActiveGates(prev => 
      prev.includes(gateId) 
        ? prev.filter(g => g !== gateId)
        : [...prev, gateId]
    );
  };

  const handleAnalyze = () => {
    const situation = localStorage.getItem('currentSituation') || '';
    const chart = createManualChart(situation, selectedType, selectedProfile, definedCenters, activeGates);
    localStorage.setItem('currentChart', JSON.stringify(chart));
    navigate('/report');
  };

  // Calculate active channels based on selected gates
  const getActiveChannels = () => {
    const channelDefs = [
      { id: '1-8', gates: [1, 8] },
      { id: '20-34', gates: [20, 34] },
      { id: '10-20', gates: [10, 20] },
      { id: '10-34', gates: [10, 34] },
      // Add more as needed
    ];
    return channelDefs
      .filter(ch => activeGates.includes(ch.gates[0]) && activeGates.includes(ch.gates[1]))
      .map(ch => ch.id);
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
            人類圖復盤模式
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-muted-foreground">
              手動設定人類圖元素，進行案例復盤分析
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Settings Panel */}
            <motion.div
              className="lg:col-span-2 glass-card rounded-xl p-6 sacred-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-serif text-foreground mb-6">設定人類圖元素</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Type Selection */}
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">類型</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {humanDesignTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.englishName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Profile Selection */}
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">人生角色</label>
                  <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map(profile => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Centers Selection */}
              <div className="mt-6">
                <label className="text-sm text-muted-foreground block mb-3">定義中心（點擊選擇）</label>
                <div className="flex flex-wrap gap-2">
                  {energyCenters.map(center => (
                    <button
                      key={center.id}
                      onClick={() => toggleCenter(center.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        definedCenters.includes(center.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {definedCenters.includes(center.id) && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {center.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gates Selection */}
              <div className="mt-6">
                <label className="text-sm text-muted-foreground block mb-3">
                  啟動閘門（點擊選擇）
                  <span className="ml-2 text-xs text-primary">已選 {activeGates.length} 個</span>
                </label>
                <ScrollArea className="h-48 rounded-lg border border-border/30 p-3">
                  <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
                    {gates.map(gate => (
                      <button
                        key={gate.id}
                        onClick={() => toggleGate(gate.id)}
                        className={`w-9 h-9 rounded text-sm font-medium transition-all ${
                          activeGates.includes(gate.id)
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'
                        }`}
                        title={`${gate.name} - ${gate.theme}`}
                      >
                        {gate.id}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              className="glass-card rounded-xl p-6 sacred-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-serif text-foreground mb-4 text-center">預覽</h3>
              
              <BodyGraph
                definedCenters={definedCenters}
                activeGates={activeGates}
                activeChannels={getActiveChannels()}
                size="sm"
                animated={false}
              />

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">類型</span>
                  <span className="text-primary">{humanDesignTypes.find(t => t.id === selectedType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">角色</span>
                  <span className="text-foreground">{profiles.find(p => p.id === selectedProfile)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">定義中心</span>
                  <span className="text-foreground">{definedCenters.length} 個</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">啟動閘門</span>
                  <span className="text-foreground">{activeGates.length} 個</span>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                生成解析報告
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManualMode;
