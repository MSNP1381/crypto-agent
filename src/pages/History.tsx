
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalysisHistory } from "@/lib/api";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { formatDistance } from "date-fns";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  date: string;
  summary: string;
}

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        // This will be replaced by actual API call when implemented on server
        const result = await fetchAnalysisHistory();
        setHistoryItems(result);
      } catch (error) {
        console.error("Failed to load history:", error);
        toast.error("Could not load analysis history");
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
      return dateStr;
    }
  };

  // Filter items based on search term
  const filteredItems = historyItems.filter(item => 
    item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(item.date).toLocaleDateString().includes(searchTerm)
  );
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-background text-slate-100 overflow-x-hidden">
      <div className="container mx-auto px-4 py-6">
        <Header
          lastUpdated=""
          onRefresh={() => {}}
          isLoading={false}
          showRefreshButton={false}
        />

        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Analysis History</h1>
            <p className="text-slate-400">View and access previous market analyses</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search analysis..."
                className="py-2 pl-10 pr-4 w-full md:w-64 rounded bg-crypto-card border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-crypto-card border-crypto-card shadow-lg animate-pulse-slow">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {currentItems.length > 0 ? (
              <div className="grid gap-4">
                {currentItems.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-crypto-card border-crypto-card shadow-lg hover:border-crypto-primary transition-all cursor-pointer"
                    onClick={() => navigate(`/analysis/${item.id}`)}
                  >
                    <CardHeader className="border-b border-slate-700/50 pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-white">Analysis for {new Date(item.date).toLocaleDateString()}</CardTitle>
                        <div className="flex items-center text-sm text-slate-400">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-slate-300">{item.summary}</p>
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/analysis/${item.id}`);
                          }}
                          className="text-xs bg-transparent hover:bg-slate-700 border-slate-600 text-slate-300"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-crypto-card border-crypto-card shadow-lg">
                <CardContent className="py-8 text-center">
                  {searchTerm ? (
                    <p className="text-slate-400">No analysis matching "{searchTerm}" found.</p>
                  ) : (
                    <p className="text-slate-400">No analysis history found.</p>
                  )}
                  <Button 
                    onClick={() => navigate("/")}
                    className="mt-4 bg-crypto-primary hover:bg-crypto-primary/90"
                  >
                    Generate a New Analysis
                  </Button>
                </CardContent>
              </Card>
            )}

            {filteredItems.length > itemsPerPage && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Crypto View Analyzer | Powered by OpenRouter & AI</p>
        </footer>
      </div>
    </div>
  );
};

export default History;
