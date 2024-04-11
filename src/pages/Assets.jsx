import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For routing
import {
  getWatchlistFromCookies,
  setWatchlistInCookies,
} from '../data/watchlistUtils';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const retrievedWatchlist = getWatchlistFromCookies();
    if (retrievedWatchlist) {
      setWatchlist(retrievedWatchlist);
    }
  }, []);

  const removeFromWatchlist = (stockSymbol) => {
    const updatedWatchlist = watchlist.filter(
      (stock) => stock.Symbol !== stockSymbol,
    );
    setWatchlist(updatedWatchlist);
    setWatchlistInCookies(updatedWatchlist); // Update cookies with new watchlist
  };

  return (
    <div className="table-container">
      <h2>Your Watchlist</h2>
      {/* Check if watchlist has items before rendering */}
      {watchlist.length > 0 ? (
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Details</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => (
              <tr key={stock.Symbol}>
                <td>{stock['Company Name']}</td>
                <td>{stock.Industry}</td>
                <td>{stock.Symbol}</td>
                <td>{stock.price}</td>
                <td>
                  <Link to={`/stock-details/${stock.Symbol}`}>Details</Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromWatchlist(stock.Symbol)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stocks currently in your watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
