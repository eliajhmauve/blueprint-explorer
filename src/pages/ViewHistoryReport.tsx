import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const ViewHistoryReport = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<string>('');
  const [chartInfo, setChartInfo] = useState<any>(null);

  useEffect(() => {
    const savedReport = localStorage.getItem('viewingReport');
    const savedChart = localStorage.getItem('viewingChart');
    
    if (savedReport && savedChart) {
      setReport(savedReport);
      setChartInfo(JSON.parse(savedChart));
    } else {
      navigate('/history');
    }
  }, [navigate]);

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

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/30 sticky top-0 z-10 bg-background/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/history')}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回紀錄
          </Button>
          <h1 className="text-xl font-serif text-primary glow-text">
            歷史報告
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-muted-foreground hover:text-primary"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {chartInfo && (
            <motion.div
              className="glass-card rounded-xl p-4 mb-6 sacred-border"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-primary font-medium">{chartInfo.type?.name}</span>
                <span className="text-muted-foreground">{chartInfo.profile?.name}</span>
                <span className="text-muted-foreground/70">
                  {new Date(chartInfo.createdAt).toLocaleDateString('zh-TW')}
                </span>
              </div>
            </motion.div>
          )}

          <motion.div
            className="glass-card rounded-xl p-6 md:p-8 sacred-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl md:text-3xl font-serif text-primary glow-text mb-6 mt-0 pb-4 border-b border-border/30">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-serif text-foreground mt-8 mb-4">
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
                }}
              >
                {report}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ViewHistoryReport;
