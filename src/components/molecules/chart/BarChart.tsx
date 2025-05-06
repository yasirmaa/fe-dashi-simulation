import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';

ChartJS.register(BarElement);

interface DataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export const BarChart = (props: DataProps) => {
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
        text: 'Chart.js Bar Chart',
        position: 'bottom' as const,
      },
    },
  };
  const barData = {
    labels: props.labels.map((data) => data),
    datasets: props.datasets.map((data) => ({
      label: data.label,
      data: data.data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    })),
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <Bar options={options} data={barData} />
    </div>
  );
};
