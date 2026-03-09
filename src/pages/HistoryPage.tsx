import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryEntry {
  id: string;
  createdAt: string;
  situation: string;
  typeName: string;
  profileName: string;
  definedCenters: string[];
  activeGates: number[];
  activeChannels: string[];
  report: string;
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chartHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleViewReport = (entry: HistoryEntry) => {
    // Reconstruct the chart object for the report page
    const chartData = {
      id: entry.id,
      createdAt: entry.createdAt,
      situation: entry.situation,
      type: { name: entry.typeName },
      profile: { name: entry.profileName },
      definedCenters: entry.definedCenters,
      activeGates: entry.activeGates,
      activeChannels: entry.activeChannels,
    };
    
    localStorage.setItem('viewingReport', entry.report);
    localStorage.setItem('viewingChart', JSON.stringify(chartData));
    navigate('/view-history');
  };

  const handleDelete = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('chartHistory', JSON.stringify(updatedHistory));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem('chartHistory');
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
            復盤紀錄庫
          </h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive/70 hover:text-destructive"
                disabled={history.length === 0}
              >
                清除全部
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">確認清除</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  此操作將刪除所有復盤紀錄，無法復原。確定要繼續嗎？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-muted text-foreground border-border">取消</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleClearAll}
                  className="bg-destructive text-destructive-foreground"
                >
                  確認清除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {history.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-xl font-serif text-foreground mb-2">尚無復盤紀錄</h2>
              <p className="text-muted-foreground mb-6">
                開始您的第一次人類圖復盤，探索生命設計的藍圖
              </p>
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
                開始復盤
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground mb-6 text-center">
                共 {history.length} 筆復盤紀錄
              </p>

              <div className="space-y-4">
                {history.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    className="glass-card rounded-xl p-5 sacred-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-serif text-primary">
                            {entry.typeName}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {entry.profileName}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(entry.createdAt).toLocaleDateString('zh-TW', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span>
                            {entry.definedCenters.length} 個定義中心
                          </span>
                          <span>
                            {entry.activeGates.length} 個啟動閘門
                          </span>
                        </div>

                        {entry.situation && (
                          <p className="text-sm text-muted-foreground/70 line-clamp-2">
                            {entry.situation}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(entry)}
                          className="border-border/50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          查看報告
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive/50 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-foreground">刪除紀錄</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                確定要刪除這筆復盤紀錄嗎？此操作無法復原。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-muted text-foreground border-border">取消</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(entry.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                刪除
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
