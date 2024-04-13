/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Pie from '../components/Pie';
import {
  getWatchlistFromCookies,
  optimizeWatchlist,
} from '../data/watchlistUtils';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [optimizedWatchlist, setOptimizedWatchlist] = useState([]);

  const handleOptimize = async () => {
    try {
      const optimizedData = optimizeWatchlist(watchlist);
      // console.log(optimizedData);
      setOptimizedWatchlist(optimizedData);
    } catch (error) {
      console.error('Error optimizing watchlist:', error);
    }
  };

  useEffect(() => {
    const retrievedWatchlist = getWatchlistFromCookies();
    if (retrievedWatchlist) {
      setWatchlist(retrievedWatchlist);
    }
    // console.log(optimizedWatchlist);
    handleOptimize();
  }, [watchlist]);

  return (
    <>
      <div className="table-container">
        <Table />
      </div>
      <div className="optimize-button">
        <button
          onClick={() => {
					  handleOptimize();
          }}
          type="button"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Optimize
        </button>
      </div>
      <div className="watchlist-chart">
        {optimizedWatchlist.length > 0 && (
        <Pie watchlistData={optimizedWatchlist} />
        )}
      </div>
    </>
  );
};

export default Watchlist;
