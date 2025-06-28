import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded p-4 shadow flex flex-col items-center">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-32 h-40 mb-4 object-cover"
        />
      </Link>
      <Link to={`/books/${book._id}`} className="font-bold mb-2 hover:underline">
        {book.title}
      </Link>
      <p className="text-gray-700 mb-1">by {book.author}</p>
      <p className="font-semibold mb-3">₹{book.price}</p>
      <button
        onClick={() => addToCart(book._id)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
