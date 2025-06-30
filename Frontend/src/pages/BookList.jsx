// BookList.js
import React, { useState, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchAllBooks } from "../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchAllBooks(filters);
      setBooks(data);
    };
    getBooks();
  }, [filters]);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      <div className="flex-1">
        <div className="sticky top-0 z-10 bg-white pb-4">
          <SearchBar filters={filters} setFilters={setFilters} />
        </div>
        
        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700">No books found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;