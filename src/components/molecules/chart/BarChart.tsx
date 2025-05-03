import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { dataDummyChart } from '@/constant/data-dummy-chart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

export const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
        position: 'bottom' as const,
      },
    },
  };
  const barData = {
    labels: dataDummyChart.map((data) => data.year),
    datasets: [
      {
        label: 'Count',
        data: dataDummyChart.map((data) => data.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <Bar options={options} data={barData} />
    </div>
  );
};
