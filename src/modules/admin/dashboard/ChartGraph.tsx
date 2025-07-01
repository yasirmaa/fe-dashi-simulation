import { BubbleChart } from '@/components/molecules/chart/BubbleChart';
import { DoughnutChart } from '@/components/molecules/chart/DoughnutChart';
import { LineChart } from '@/components/molecules/chart/LineChart';
import { PieChart } from '@/components/molecules/chart/PieChart';
import { PolarAreaChart } from '@/components/molecules/chart/PolarAreaChart';
import { RadarChart } from '@/components/molecules/chart/RadarChart';
import { ScatterChart } from '@/components/molecules/chart/ScatterChart';

export const ChartGraph = () => {
  return (
    <div className="grid grid-cols-2 gap-8 w-full h-full">
      {/* <LineChart /> */}
      {/* <BarChart /> */}
      <PieChart />
      <DoughnutChart />
      <PolarAreaChart />
      <RadarChart />
      <ScatterChart />
      <BubbleChart />
    </div>
  );
};
