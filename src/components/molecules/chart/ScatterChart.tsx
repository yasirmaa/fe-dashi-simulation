import { Scatter } from 'react-chartjs-2';
export const ScatterChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Scatter Chart',
        position: 'bottom' as const,
      },
    },
  };
  const dataScatter = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 0.5,
            y: 5.5,
          },
        ],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <Scatter data={dataScatter} options={options} />
    </div>
  );
};
