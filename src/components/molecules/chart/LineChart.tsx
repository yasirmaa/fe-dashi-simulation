import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement } from 'chart.js';
import { dataDummyChart } from '@/constant/data-dummy-chart';

ChartJS.register(LinearScale, PointElement, LineElement);

export const LineChart = () => {
  const chartData = {
    labels: dataDummyChart.map((d) => d.year),
    datasets: [
      {
        label: 'Count',
        data: dataDummyChart.map((d) => d.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <div className="w-full  h-72 flex justify-center items-center">
      <Line data={chartData} options={options} />
    </div>
  );
};
