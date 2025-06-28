import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books")
      .then(res => {
        const cartBooks = res.data.filter(book => cart.includes(book._id));
        setBooks(cartBooks);
      })
      .catch(err => console.error(err));
  }, [cart]);

  const total = books.reduce((sum, book) => sum + book.price, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {books.map(book => (
        <div key={book._id} className="border p-4 rounded mb-2 flex justify-between">
          <span>{book.title}</span>
          <span>₹{book.price}</span>
        </div>
      ))}
      <h3 className="mt-4 text-xl font-bold">Total: ₹{total}</h3>
      <button
        onClick={clearCart}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
