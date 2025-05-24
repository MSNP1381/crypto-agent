
import React, { useEffect, useState } from "react";
import { fetchCurrentAnalysis, refreshAnalysis, AnalysisData } from "@/lib/api";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import MarketAnalysis from "@/components/MarketAnalysis";
import AnalysisSkeleton from "@/components/AnalysisSkeleton";
import { toast } from "sonner";

const Dashboard = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalysisData = async () => {
    try {
      setIsLoading(true);
      const result = await fetchCurrentAnalysis();
      setData(result);
    } catch (error) {
      console.error("Failed to load analysis data:", error);
      toast.error("Could not load analysis data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshAnalysis = async () => {
    try {
      setIsLoading(true);
      const result = await refreshAnalysis();
      setData(result);
    } catch (error) {
      console.error("Failed to refresh analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysisData();
  }, []);

  return (
    <div className="min-h-screen bg-crypto-background text-slate-100 overflow-x-hidden">
      <div className="container mx-auto px-4 py-6">
        <Header 
          lastUpdated={data?.lastUpdated || "Loading..."}
          onRefresh={handleRefreshAnalysis}
          isLoading={isLoading}
        />

        {isLoading && !data ? (
          <AnalysisSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <NewsSection news={data?.news || []} />
            </div>
            <div className="lg:col-span-2">
              <MarketAnalysis content={data?.marketAnalysis || ""} />
            </div>
          </div>
        )}
        
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Crypto View Analyzer | Powered by OpenRouter & AI</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
