import React from 'react';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart';

const StockChartPage = () => {
  const { symbol } = useParams();
  // console.log(`inside StockChartPage: ${symbol}`);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <StockChart stockData={symbol} />
    </div>
  );
};
export default StockChartPage;
