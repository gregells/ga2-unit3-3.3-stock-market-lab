import React, { Component, useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StockContainer from './components/StockContainer';
import PortfolioContainer from './components/PortfolioContainer';
import './index.css'

export default function App() {
  const [ allStocks, setAllStocks ] = useState([]);
  const [ stocks, setStocks ] = useState([]);
  const [ portfolio, setPortfolio ] = useState([]);
  const [ sortOrder, setSortOrder ] = useState('');
  const [ filter, setFilter ] = useState('All');

  useEffect(function() {
    async function getStocks() {
      await fetch('http://localhost:3001/stocks')
        .then((res) => res.json())
        .then((data) => {
          setAllStocks(data);
          setStocks(data);
        });
    }
    getStocks();
  }, []);
  
  useEffect(function() {
    let sortedFilteredStocks = [...allStocks];
    if (filter !== 'All') {
      sortedFilteredStocks = sortedFilteredStocks.filter(stock => stock.type === filter);
      console.log('A filter has been applied...');
    }
    if (sortOrder === 'Alphabetically') {
      sortedFilteredStocks.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        if (nameA === nameB) return 0;
      });
      console.log('sorting alphabetically');
    }
    if (sortOrder === 'Price') {
      sortedFilteredStocks.sort((a, b) => b.price - a.price);
      console.log('sorting by Price');
    }
    setStocks(sortedFilteredStocks);
  }, [sortOrder, filter, allStocks]);
  

  function buyStock(stock) {
    const newPortfolio = [...portfolio];
    // If the stock already exists in the portfolio, exit the function:
    if (newPortfolio.find(element => element.name === stock.name)) return;
    // Otherwise push it to the array and update the state:
    newPortfolio.push(stock);
    setPortfolio(newPortfolio);
  }
  
  function sellStock(stock) {
    const newPortfolio = [...portfolio];
    // Find the index of the stock:
    const index = newPortfolio.findIndex(element => element.name === stock.name);
    // Then remove that stock from the portfolio and update the state:
    newPortfolio.splice(index, 1);
    setPortfolio(newPortfolio);
  }

  return (
    <main>
      <Header />
      <div className="row justify-content-center">
        <SearchBar sortOrder={sortOrder} setSortOrder={setSortOrder} filter={filter} setFilter={setFilter} />
      </div>
      {/* <div className="row justify-content-center">
        <span>Sort by: &nbsp;</span>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" inputId="radio1" value="Alphabetically" checked={sortOrder === "Alphabetically"} onChange={(e) => setSortOrder(e.target.value)} />
          <label className="form-check-label" htmlFor="radio1">
            Alphabetically
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" inputId="radio2" value="Price" checked={sortOrder === "Price"} onChange={(e) => setSortOrder(e.target.value)} />
          <label className="form-check-label" htmlFor="radio2">
            Price
          </label>
        </div>
      </div> */}
      <div className="row">
        <div className="col-6">
          <StockContainer stocks={stocks} buyStock={buyStock} />
        </div>
        <div className="col-6">
          <PortfolioContainer portfolio={portfolio} sellStock={sellStock} />
        </div>
      </div>
    </main>
  );
}

