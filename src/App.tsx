import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RandomMode from "./pages/RandomMode";
import ManualMode from "./pages/ManualMode";
import ReportPage from "./pages/ReportPage";
import HistoryPage from "./pages/HistoryPage";
import ViewHistoryReport from "./pages/ViewHistoryReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/blueprint-explorer">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/random" element={<RandomMode />} />
          <Route path="/manual" element={<ManualMode />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/view-history" element={<ViewHistoryReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
