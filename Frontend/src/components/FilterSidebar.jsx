import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Biography",
  "History",
  "Fantasy",
  "Mystery",
  "Romance",
  "Self-Help",
  "Business",
  "Children",
];

const defaultFilters = {
  search: "",
  category: "",
  author: "",
  minPrice: 0,
  maxPrice: 1000,
};

const FilterSidebar = ({ setFilters }) => {
  const [localFilters, setLocalFilters] = useState(defaultFilters);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setLocalFilters({
      ...localFilters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleApply = () => {
    // Send local filters up
    setFilters(localFilters);

    // Reset local filters immediately
    setLocalFilters(defaultFilters);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="w-64">
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Category */}
        <label className="block mb-2">Category</label>
        <select
          name="category"
          value={localFilters.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Author */}
        <label className="block mb-2">Author</label>
        <input
          type="text"
          name="author"
          value={localFilters.author}
          onChange={handleChange}
          placeholder="Author name"
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Price Range */}
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <Slider
          range
          min={0}
          max={1000}
          value={priceRange}
          onChange={handlePriceChange}
          trackStyle={{ backgroundColor: "#3b82f6", height: 4 }}
          handleStyle={{
            borderColor: "#3b82f6",
            backgroundColor: "#fff",
            borderWidth: 2,
            width: 18,
            height: 18,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          railStyle={{ backgroundColor: "#e5e7eb", height: 4 }}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>₹0</span>
          <span>₹1000</span>
        </div>

        <button
          onClick={handleApply}
          className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded text-sm font-medium transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
