import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement);

interface DataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export const LineChart = (props: DataProps) => {
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
  const lineData = {
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
    <div className="w-full  h-72 flex justify-center items-center">
      <Line data={lineData} options={options} />
    </div>
  );
};
