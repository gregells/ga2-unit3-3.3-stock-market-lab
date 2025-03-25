import React from 'react';
import { useState, useEffect } from 'react';
import StockCard from './StockCard'

export default function PortfolioContainer({ portfolio, sellStock }) {
  const [ totalValue, setTotalValue ] = useState(0);

  useEffect(function() {
    const sum = portfolio.reduce((acc, curr) => acc += curr.price, 0);
    setTotalValue(sum);
  }, [portfolio])

  return (
    <div>
      <h2>My Portfolio - ${ totalValue.toFixed(2) }</h2>
      { /* render the stocks in the user's portfolio using the StockCard component */ }
      { portfolio.map((stock, index) => <StockCard stock={stock} buy={false} sellStock={sellStock} key={index} />) }
    </div>
  );
}
