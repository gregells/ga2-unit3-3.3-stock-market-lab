import React from 'react'

export default function StockCard({ stock, buy, buyStock, sellStock }) {
  function handleBuy() {
    buyStock(stock);
  }

  function handleSell() {
    sellStock(stock);
  }
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{stock.name}</h5>
        <p className="card-text">${stock.price}</p>
        <p className="card-text">{stock.ticker}</p>
        { /* use a ternary to display a BUY or SELL button */}
        { buy ?
        <button onClick={handleBuy}>BUY</button>
        :
        <button onClick={handleSell}>SELL</button>
      }
      </div>
    </div>
  );
}
