// watchlistUtils.js

export const getWatchlistFromCookies = () => {
  try {
    const cookieData = document.cookie
      .split(';')
      .find((c) => c.startsWith('watchlist='));
    if (cookieData) {
      return JSON.parse(cookieData.substring(10)); // Parse watchlist data from cookie
    }
  } catch (error) {
    console.error('Error getting watchlist from cookies:', error);
  }
  return [];
};

export const setWatchlistInCookies = (watchlist) => {
  try {
    const serializedData = JSON.stringify(
      watchlist.map((stock) => ({
        // Modify here
        'Company Name': stock['Company Name'],
        Industry: stock.Industry,
        Symbol: stock.Symbol,
        price: stock.price,
      })),
    );
    document.cookie = `watchlist=${serializedData}; path=/;`; // Set cookie with watchlist data
  } catch (error) {
    console.error('Error setting watchlist in cookies:', error);
  }
};

export const optimizeWatchlist = (watchlist) => {
  // Temp Logic for Optimizing watch list
  const optimizedWatchlist = [];
  const stockMap = new Map();

  watchlist.forEach((stock) => {
    const { Symbol, price } = stock;
    const existingStock = stockMap.get(Symbol);

    if (existingStock) {
      existingStock.price = (existingStock.price + price) / 2; // Average price
    } else {
      stockMap.set(Symbol, { Symbol, price });
    }
  });

  optimizedWatchlist.push(...stockMap.values());
  return optimizedWatchlist;
};
