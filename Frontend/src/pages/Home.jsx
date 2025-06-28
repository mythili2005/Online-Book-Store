import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to My Book Store 📚</h1>
    <p className="mb-4">Find your next favorite book.</p>
    <Link to="/books" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Browse Books
    </Link>
  </div>
);

export default Home;
