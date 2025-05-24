
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAnalysisById, AnalysisData } from "@/lib/api";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import MarketAnalysis from "@/components/MarketAnalysis";
import AnalysisSkeleton from "@/components/AnalysisSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const AnalysisDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnalysisData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const result = await fetchAnalysisById(id);
        if (result) {
          setData(result);
        } else {
          toast.error("Analysis not found");
          navigate("/history");
        }
      } catch (error) {
        console.error("Failed to load analysis data:", error);
        toast.error("Could not load analysis data");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysisData();
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-crypto-background text-slate-100 overflow-x-hidden">
      <div className="container mx-auto px-4 py-6">
        <Header 
          lastUpdated={data?.lastUpdated || ""}
          onRefresh={() => {}}
          isLoading={false}
          showRefreshButton={false}
        />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Historical Analysis</h1>
            <p className="text-slate-400">
              {data ? `Analysis from ${new Date(data.lastUpdated).toLocaleDateString()}` : "Loading analysis..."}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/history")}
            className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back to History
          </Button>
        </div>

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

export default AnalysisDetails;
