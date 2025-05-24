
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataPoint {
  date: string;
  value: number | null;
  prediction: number;
  [key: string]: string | number | null | undefined;
}

interface MarketChartProps {
  data: {
    type?: string;
    title?: string;
    dataPoints: ChartDataPoint[];
  };
}

const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
  const { type = "line", title = "Price Prediction", dataPoints } = data;

  // If there's no data, don't render anything
  if (!dataPoints || dataPoints.length === 0) {
    return null;
  }

  // Find the last non-null value point to draw a reference line
  const lastActualValueIndex = dataPoints.findIndex(point => point.value === null) - 1;
  const lastActualValue = lastActualValueIndex >= 0 ? dataPoints[lastActualValueIndex].value : null;
  
  // Extract all keys except date to determine what lines to draw
  const keys = Object.keys(dataPoints[0]).filter(key => key !== "date");
  
  // Generate colors for different lines
  const lineColors = {
    value: "#16C784", // Green for actual values
    prediction: "#3861FB" // Blue for predictions
  };

  // Format labels for axis
  const formatDateLabel = (label: string) => {
    try {
      // If it's a full date string
      if (label.includes('-')) {
        const date = new Date(label);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return label; // Otherwise return as is
    } catch (e) {
      return label;
    }
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-crypto-background p-3 border border-crypto-card rounded shadow-lg">
          <p className="text-crypto-secondary font-medium">{formatDateLabel(label)}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: ${item.value?.toLocaleString() || 'N/A'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-crypto-card border border-slate-700/50 shadow-lg mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataPoints}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColors.value} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={lineColors.value} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColors.prediction} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={lineColors.prediction} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f4656" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }} 
              tickFormatter={formatDateLabel}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8' }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#f1f5f9' }} />
            
            {/* Draw a vertical line to separate actual from predicted */}
            {lastActualValueIndex >= 0 && (
              <ReferenceLine 
                x={dataPoints[lastActualValueIndex].date} 
                stroke="#94a3b8" 
                strokeDasharray="3 3"
                label={{ 
                  value: 'Today', 
                  position: 'insideTopRight', 
                  fill: '#94a3b8'
                }} 
              />
            )}
            
            {/* Actual values line */}
            <Area 
              type="monotone" 
              dataKey="value" 
              name="Actual Price"
              stroke={lineColors.value}
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
              dot={{ stroke: lineColors.value, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Prediction line */}
            <Area 
              type="monotone" 
              dataKey="prediction" 
              name="Predicted Price"
              stroke={lineColors.prediction}
              fillOpacity={0.5}
              fill="url(#colorPrediction)"
              strokeWidth={2}
              dot={{ stroke: lineColors.prediction, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MarketChart;
