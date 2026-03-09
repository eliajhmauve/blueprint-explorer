import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, Settings, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import OpeningAnimation from '@/components/OpeningAnimation';

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [situation, setSituation] = useState('');

  useEffect(() => {
    // Check if animation was already shown in this session
    const hasShownAnimation = sessionStorage.getItem('animationShown');
    if (hasShownAnimation) {
      setShowAnimation(false);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    sessionStorage.setItem('animationShown', 'true');
  };

  const saveSituation = () => {
    if (situation.trim()) {
      localStorage.setItem('currentSituation', situation);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <OpeningAnimation onComplete={handleAnimationComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen cosmic-bg">
        {/* Header */}
        <header className="py-6 px-4 border-b border-border/30">
          <div className="container mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-serif text-primary glow-text">
                人類圖復盤學習
              </h1>
              <p className="text-xs text-muted-foreground mt-1">by 福星何大師</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/history">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <BookOpen className="w-4 h-4 mr-2" />
                  復盤紀錄
                </Button>
              </Link>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
              探索<span className="text-primary glow-text">生命設計</span>的藍圖
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              每個人都擁有獨特的能量運作方式，人類圖揭示了宇宙能量在人體中的流動。
              透過復盤學習，理解靈魂運作的結構，發現生命角色的道路。
            </p>
          </motion.div>

          {/* Situation Input */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card rounded-xl p-6 md:p-8 sacred-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-serif text-foreground">現況描述</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                描述您目前的人生狀態，作為人類圖解析的重要背景。
                包含工作、家庭、關係、健康、或面臨的重要選擇等。
              </p>
              <Textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="例如：目前在科技公司擔任專案經理，工作壓力較大。最近考慮是否要轉換跑道，同時也在思考人生方向的問題。家庭關係穩定，但感覺缺乏個人成長的空間..."
                className="min-h-[150px] bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2 text-right">
                此描述將用於個人化解析（選填）
              </p>
            </div>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif text-muted-foreground">選擇復盤模式</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Random Mode */}
              <Link 
                to="/random" 
                onClick={saveSituation}
                className="block"
              >
                <motion.div
                  className="glass-card rounded-xl p-8 sacred-border cursor-pointer group h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-6 mx-auto group-hover:bg-secondary/50 transition-colors">
                    <Shuffle className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-serif text-center text-foreground mb-3">
                    隨機人類圖生成
                  </h4>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    系統隨機生成一個完整的人類圖結構，包含能量中心、閘門、通道、類型與人生角色。
                    適合用於<span className="text-primary">復盤訓練</span>，提升解盤能力。
                  </p>
                  <div className="mt-6 flex justify-center">
                    <span className="text-xs text-primary/70 border border-primary/30 rounded-full px-3 py-1">
                      練習模式
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Manual Mode */}
              <Link 
                to="/manual" 
                onClick={saveSituation}
                className="block"
              >
                <motion.div
                  className="glass-card rounded-xl p-8 sacred-border cursor-pointer group h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-6 mx-auto group-hover:bg-secondary/50 transition-colors">
                    <Settings className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-serif text-center text-foreground mb-3">
                    人類圖復盤模式
                  </h4>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    手動設定能量中心、閘門、通道、類型與人生角色。
                    適合用於<span className="text-primary">真實案例復盤</span>，深入研究特定設計。
                  </p>
                  <div className="mt-6 flex justify-center">
                    <span className="text-xs text-accent/70 border border-accent/30 rounded-full px-3 py-1">
                      專業模式
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Wisdom Quote */}
          <motion.div
            className="max-w-2xl mx-auto mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="border-t border-b border-border/30 py-8">
              <p className="text-lg italic text-muted-foreground">
                「當你活出真實的自己，宇宙就會為你開路。」
              </p>
              <p className="text-sm text-primary/70 mt-2">— 人類圖智慧</p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="max-w-4xl mx-auto mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: '九大能量中心', value: '9' },
                { label: '六十四閘門', value: '64' },
                { label: '三十六通道', value: '36' },
                { label: '十二種角色', value: '12' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-lg p-4">
                  <div className="text-2xl font-serif text-primary mb-1">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border/30 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              人類圖復盤學習系統 · 福星何大師 設計
            </p>
            <p className="text-xs text-muted-foreground/50 mt-2">
              探索能量中心的訊息，理解靈魂運作的結構
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
