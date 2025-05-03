import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(RadialLinearScale, Title, Tooltip, Legend, Filler);

export const PolarAreaChart = () => {
  const options = {};
  const polarAreaData = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
        ],
      },
    ],
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <PolarArea options={options} data={polarAreaData} />
    </div>
  );
};
