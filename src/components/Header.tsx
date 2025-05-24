
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface HeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
  isLoading: boolean;
  showRefreshButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  lastUpdated, 
  onRefresh, 
  isLoading,
  showRefreshButton = true
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-700/50">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <TrendingIcon className="text-crypto-yellow" />
          <span>Crypto View Analyzer</span>
        </h1>
        <p className="text-slate-400 mt-1">
          AI-powered cryptocurrency market analysis and recommendations
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {showRefreshButton && (
          <>
            <div className="text-right text-sm">
              <div className="text-slate-400">Last Updated:</div>
              <div className="font-medium text-white">{lastUpdated || "Never"}</div>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <Button 
              variant="outline" 
              onClick={onRefresh} 
              disabled={isLoading}
              className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white flex items-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Updating..." : "Update Analysis"}
            </Button>
          </>
        )}
        <Button
          variant="outline"
          asChild
          className="bg-crypto-card hover:bg-crypto-background border-slate-700 text-white flex items-center gap-2"
        >
          <Link to="/history">
            <History size={16} />
            History
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Crypto trending icon component
const TrendingIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    width="36" 
    height="36" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Header;
