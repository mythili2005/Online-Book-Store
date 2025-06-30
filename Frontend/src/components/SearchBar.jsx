// SearchBar.js
import React from "react";

const SearchBar = ({ filters, setFilters }) => {
  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={filters.search}
        onChange={handleSearch}
        placeholder="Search books by title..."
        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
      <div className="absolute right-3 top-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;