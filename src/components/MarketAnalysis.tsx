
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarkdownRenderer from "./MarkdownRenderer";
import { ChartBar, TrendingUp, Bitcoin, Star } from "lucide-react";
import MarketChart from "./MarketChart";

interface MarketAnalysisProps {
  content: string;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ content }) => {
  // Extract chart data from markdown content if available
  const extractChartData = () => {
    // Simple regex to find any chart data in the content
    const chartDataMatch = content.match(/```chart\n([\s\S]*?)\n```/);
    if (chartDataMatch && chartDataMatch[1]) {
      try {
        return JSON.parse(chartDataMatch[1]);
      } catch (e) {
        console.error("Failed to parse chart data:", e);
        return null;
      }
    }
    return null;
  };

  // Parse the content to find cryptocurrency analysis sections
  const parseCryptoSections = () => {
    // Look for sections that start with A., B., C. which typically denote cryptocurrencies
    const regex = /(A|B|C)\.\s+([^\n(]+)\s*\(([^\)]+)\)([\s\S]*?)(?=(?:A|B|C)\.\s+[^\n(]+|\d+\.\s+|$)/g;
    const matches = Array.from(content.matchAll(regex));
    
    return matches.map(match => {
      const [fullMatch, letter, name, symbol, details] = match;
      return {
        letter,
        name: name.trim(),
        symbol,
        details: details.trim()
      };
    });
  };

  const chartData = extractChartData();
  const cryptoSections = useMemo(() => parseCryptoSections(), [content]);

  // Get the icon for a cryptocurrency symbol
  const getCryptoIcon = (symbol: string) => {
    if (symbol.includes("BTC")) return <Bitcoin className="text-crypto-yellow" />;
    return <Star className="text-crypto-green" />;
  };

  // Get background color class based on letter
  const getCardColor = (letter: string) => {
    switch(letter) {
      case "A": return "border-l-4 border-l-crypto-yellow";
      case "B": return "border-l-4 border-l-crypto-blue";
      case "C": return "border-l-4 border-l-crypto-purple";
      default: return "";
    }
  };

  return (
    <Card className="bg-crypto-card border-crypto-card shadow-lg">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <CardTitle className="flex items-center text-xl text-white gap-2">
          <ChartBar className="text-crypto-green" />
          Market Analysis & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 overflow-auto max-h-[800px] prose prose-invert max-w-none">
        {chartData && (
          <div className="mb-6">
            <MarketChart data={chartData} />
          </div>
        )}
        
        {/* Main analysis content before crypto sections */}
        <div className="mb-6">
          <MarkdownRenderer 
            content={content.split(/A\.\s+[^\n(]+\s*\([^\)]+\)/)[0]} 
            className="text-white leading-relaxed"
          />
        </div>
        
        {/* Individual cryptocurrency sections */}
        {cryptoSections.length > 0 && (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <TrendingUp className="text-crypto-green" />
              Top Cryptocurrencies to Buy This Week
            </h2>
            
            {cryptoSections.map((section, index) => (
              <Card 
                key={index} 
                className={`bg-crypto-card border-crypto-card shadow-md ${getCardColor(section.letter)}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg gap-2">
                    {getCryptoIcon(section.symbol)}
                    {section.name} ({section.symbol})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MarkdownRenderer content={section.details} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Final sections after crypto analysis */}
        {cryptoSections.length > 0 && (
          <div className="mt-6">
            <MarkdownRenderer 
              content={content.split(/C\.\s+[^\n(]+\s*\([^\)]+\)/)[1] || ""} 
              className="text-white leading-relaxed"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketAnalysis;
