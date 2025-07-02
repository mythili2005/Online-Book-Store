// BookCard.js
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => (
  <Link to={`/books/${book._id}`} className="group">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
      <div className="relative pt-[150%] overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-blue-700 font-bold">₹{book.price}</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {book.category}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default BookCard;