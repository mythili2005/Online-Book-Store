import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterSidebar = ({ filters, setFilters }) => {
  
    const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);

    const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handlePriceChange = (value) => {
    setPriceRange(value);
    setFilters({ 
      ...filters, 
      minPrice: value[0], 
      maxPrice: value[1] 
    });
  };

  return (
    <div className="w-64 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Category */}
      <label className="block mb-2">Category</label>
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Science">Science</option>
      </select>

      {/* Author */}
      <label className="block mb-2">Author</label>
      <input
        type="text"
        name="author"
        value={filters.author}
        onChange={handleChange}
        placeholder="Author name"
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Price Range Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={handlePriceChange}
            trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
            handleStyle={{
              borderColor: '#3b82f6',
              backgroundColor: '#fff',
              borderWidth: 2,
              width: 18,
              height: 18,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>₹0</span>
            <span>₹1000</span>
          </div>
        </div>
    </div>
  );
};

export default FilterSidebar;
