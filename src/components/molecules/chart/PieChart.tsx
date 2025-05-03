import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { dataDummyChart } from '@/constant/data-dummy-chart';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, Filler);

export const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart',
        position: 'top' as const,
      },
    },
  };
  const pieData = {
    labels: dataDummyChart.map((data) => data.year),
    datasets: [
      {
        label: 'Count',
        data: dataDummyChart.map((data) => data.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 20, 0.2)',
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <Pie options={options} data={pieData} />
    </div>
  );
};
