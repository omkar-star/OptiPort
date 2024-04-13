import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { chartData } from '../data/testData';

const StockChart = ({ stockData }) => {
  const [series, setSeries] = useState([]);
  const [options] = useState({
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false, // Adjust for data label visibility
    },
    markers: {
      size: 0,
    },
    title: {
      text: stockData, // Chart title
      align: 'left',
    },
    xaxis: {
      type: 'datetime', // For datetime-based x-axis
      tooltip: {
        shared: false,
        y: {
          formatter(val) {
            return val.toFixed(2); // Formatting for tooltip y-values
          },
        },
      },
    },
    yaxis: {
      labels: {
        formatter(val) {
          return val.toFixed(2); // Formatting for y-axis values
        },
      },
      title: {
        text: 'Price', // Y-axis title
      },
    },
  });

  useEffect(() => {
    const processedData = chartData.all_data.map((day) => ({
      x: new Date(day.Date), // Convert date string to Date object
      y: day.Close, // Use 'Close' price for this example (adjust as needed)
    }));

    setSeries([
      {
        name: chartData.name,
        data: processedData,
      },
    ]);
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default StockChart;
