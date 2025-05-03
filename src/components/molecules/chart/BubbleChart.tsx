import { Bubble } from 'react-chartjs-2';
export const BubbleChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bubble Chart',
        position: 'bottom' as const,
      },
    },
  };

  const dataBubble = {
    datasets: [
      {
        label: 'First Dataset',
        data: [
          {
            x: 20,
            y: 30,
            r: 15,
          },
          {
            x: 40,
            y: 10,
            r: 10,
          },
        ],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <div className="w-full h-72 flex justify-center items-center">
      <Bubble options={options} data={dataBubble} />
    </div>
  );
};
