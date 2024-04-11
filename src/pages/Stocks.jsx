import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For routing
import { stocksDataWithPrice } from '../data/testData';
import {
  getWatchlistFromCookies,
  setWatchlistInCookies,
} from '../data/watchlistUtils';

const Stocks = () => {
  const data = stocksDataWithPrice;
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToWatchlist = (stock) => {
    setWatchlist([...watchlist, stock]);
    setWatchlistInCookies(watchlist); // Update cookies with new watchlist
    // console.log(`Added ${stock.Symbol} to watchlist`);
  };

  useEffect(() => {
    const retrievedWatchlist = getWatchlistFromCookies();
    if (retrievedWatchlist) {
      setWatchlist(retrievedWatchlist);
    }
  }, []);

  // Search functionality (basic example, can be improved)
  const filteredStocks = data.filter((stock) => stock['Company Name'].toLowerCase().includes(searchQuery.toLowerCase()));

  const currentStocks = filteredStocks.slice(
    (currentPage - 1) * stocksPerPage,
    currentPage * stocksPerPage,
  );

  const pageCount = Math.ceil(filteredStocks.length / stocksPerPage);

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search Stocks..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="stocks-table">
        {' '}
        {/* Added class name for table */}
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Details</th>
            <th>Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {currentStocks.map((stock) => (
            <tr key={stock.Symbol}>
              <td>{stock['Company Name']}</td>
              <td>{stock.Industry}</td>
              <td>{stock.Symbol}</td>
              <td>{stock.price}</td>
              <td>
                <Link to={`/stock-details/${stock.Symbol}`}>Details</Link>
              </td>
              <td>
                <button type="button" onClick={() => addToWatchlist(stock)}>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(pageCount)].map((_, index) => (
          <button
            type="button"
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stocks;
