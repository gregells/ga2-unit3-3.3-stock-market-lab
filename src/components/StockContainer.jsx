import React from 'react';
import StockCard from './StockCard';

export default function StockContainer({ stocks, buyStock }) {
  return (
    <div>
      <h2>Stocks</h2>
      { /* render the list of stocks here using the StockCard component */ }
      { stocks.map((stock, index) => <StockCard stock={stock} buy={true} buyStock={buyStock} key={index} />) }
    </div>
  );
}
