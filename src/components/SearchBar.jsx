import React from 'react';

export default function SearchBar({ sortOrder, setSortOrder, filter, setFilter }) {
  // bind the radio inputs' checked prop to boolean state variables
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={sortOrder === "Alphabetically"} onChange={(e) => setSortOrder(e.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={sortOrder === "Price"} onChange={(e) => setSortOrder(e.target.value)}/>
        Price
      </label>
      <br/>
      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}
