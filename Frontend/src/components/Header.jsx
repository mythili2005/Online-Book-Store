import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ redirect to home
  };


  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">BOOKSMART</Link>
      </h1>
      <nav className="flex gap-4 items-center">
        {user?.type === "admin" && (
          <Link to="/admin">Dashboard</Link>
        )}
        <Link to="/books">Books</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
