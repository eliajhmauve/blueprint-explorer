import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import BodyGraph from '@/components/BodyGraph';
import { generateReport } from '@/lib/reportGenerator';
import { HumanDesignChart } from '@/data/humanDesignData';
import ReactMarkdown from 'react-markdown';

const ReportPage = () => {
  const navigate = useNavigate();
  const [chart, setChart] = useState<HumanDesignChart | null>(null);
  const [report, setReport] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const savedChart = localStorage.getItem('currentChart');
    if (savedChart) {
      const parsedChart = JSON.parse(savedChart);
      // Convert date string back to Date object
      parsedChart.createdAt = new Date(parsedChart.createdAt);
      setChart(parsedChart);
      
      // Generate report
      setTimeout(() => {
        const generatedReport = generateReport(parsedChart);
        setReport(generatedReport);
        setIsGenerating(false);
        
        // Save to history
        saveToHistory(parsedChart, generatedReport);
      }, 1000);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const saveToHistory = (chartData: HumanDesignChart, reportContent: string) => {
    const history = JSON.parse(localStorage.getItem('chartHistory') || '[]');
    const newEntry = {
      id: chartData.id,
      createdAt: chartData.createdAt.toISOString(),
      situation: chartData.situation,
      typeName: chartData.type.name,
      profileName: chartData.profile.name,
      definedCenters: chartData.definedCenters,
      activeGates: chartData.activeGates,
      activeChannels: chartData.activeChannels,
      report: reportContent
    };
    
    // Keep only last 20 entries
    const updatedHistory = [newEntry, ...history].slice(0, 20);
    localStorage.setItem('chartHistory', JSON.stringify(updatedHistory));
  };

  const handleDownload = () => {
    if (report) {
      const blob = new Blob([report], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `人類圖解析報告_${new Date().toLocaleDateString('zh-TW')}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleNewAnalysis = () => {
    navigate('/');
  };

  if (!chart) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/30 sticky top-0 z-10 bg-background/80 backdrop-blur">
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
            解析報告
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              className="text-muted-foreground hover:text-primary"
            >
              <BookOpen className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={isGenerating}
              className="text-muted-foreground hover:text-primary"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar with Chart */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card rounded-xl p-6 sacred-border sticky top-28">
                <h3 className="text-lg font-serif text-foreground mb-4 text-center">人體圖</h3>
                <BodyGraph
                  definedCenters={chart.definedCenters}
                  activeGates={chart.activeGates}
                  activeChannels={chart.activeChannels}
                  size="sm"
                  animated={false}
                />
                
                <div className="mt-6 space-y-2 text-sm border-t border-border/30 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">類型</span>
                    <span className="text-primary">{chart.type.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">角色</span>
                    <span className="text-foreground">{chart.profile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">權威</span>
                    <span className="text-foreground">{chart.authority.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">定義</span>
                    <span className="text-foreground">{chart.definition.name}</span>
                  </div>
                </div>

                <Button
                  onClick={handleNewAnalysis}
                  variant="outline"
                  className="w-full mt-6 border-border/50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  新的分析
                </Button>
              </div>
            </motion.div>

            {/* Report Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-xl p-6 md:p-8 sacred-border">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">正在生成解析報告...</p>
                    <p className="text-xs text-muted-foreground/50 mt-2">結合能量中心的訊息，解讀靈魂運作的結構</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl md:text-3xl font-serif text-primary glow-text mb-6 mt-0 pb-4 border-b border-border/30">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-serif text-foreground mt-8 mb-4 flex items-center gap-2">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-serif text-primary/90 mt-6 mb-3">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-foreground font-medium">
                            {children}
                          </strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary/50 pl-4 italic text-foreground/80 my-6 bg-primary/5 py-3 pr-4 rounded-r">
                            {children}
                          </blockquote>
                        ),
                        ul: ({ children }) => (
                          <ul className="space-y-2 my-4 list-none">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{children}</span>
                          </li>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-border/30 px-4 py-2 text-left text-foreground bg-muted/20">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-border/30 px-4 py-2 text-muted-foreground">
                            {children}
                          </td>
                        ),
                        hr: () => (
                          <hr className="border-border/30 my-8" />
                        ),
                        em: ({ children }) => (
                          <em className="text-muted-foreground/80 not-italic">
                            {children}
                          </em>
                        ),
                      }}
                    >
                      {report}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
