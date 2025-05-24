
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/lib/api";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDistance } from "date-fns";

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
      return dateStr;
    }
  };

  return (
    <Card className="bg-crypto-card border-crypto-card shadow-lg">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <CardTitle className="flex items-center text-xl text-white gap-2">
          <span className="text-crypto-primary text-2xl">📰</span>
          Latest Crypto News
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="border-b border-slate-700/50 pb-4 last:border-0">
              <h3 className="font-medium text-white mb-2">{item.title}</h3>
              <div className="flex justify-between items-center text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{formatDate(item.date)}</span>
                </div>
                <Button 
                  variant="link" 
                  asChild 
                  className="text-crypto-primary p-0 h-auto flex items-center gap-1"
                >
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Read more <ArrowRight size={14} />
                  </a>
                </Button>
              </div>
            </div>
          ))}
          
          {news.length === 0 && (
            <div className="text-center py-6 text-slate-400">
              No recent news available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
