import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Pie = ({ watchlistData }) => {
  // const series = watchlistData.map((item) => item.price);
  const series = watchlistData.map((stock) => parseFloat(stock.price.replace(/₹|[^0-9.]/g, '')));
  const labels = watchlistData.map((item) => item.Symbol);

  const options = {
    chart: {
      width: 500,
      type: 'pie',
    },
    labels,
    title: {
      text: 'Assets Allocation', // Set your desired title here
      align: 'center', // Optional: control title alignment (default: 'left')
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="watchlist-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={500}
      />
    </div>
  );
};

export default Pie;
