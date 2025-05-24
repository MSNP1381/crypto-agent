
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalysisSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* News Section Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Market Analysis Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-60" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Market Outlook */}
            <div>
              <Skeleton className="h-5 w-72 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            
            {/* Selection Methodology */}
            <div>
              <Skeleton className="h-5 w-60 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            
            {/* Cryptocurrency Analysis */}
            <div>
              <Skeleton className="h-5 w-64 mb-3" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisSkeleton;
