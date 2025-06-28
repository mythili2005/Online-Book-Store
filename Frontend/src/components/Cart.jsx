import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="relative">
      <span className="bg-blue-600 text-white px-2 py-1 rounded">
        Cart ({cart.length})
      </span>
    </Link>
  );
};

export default Cart;
