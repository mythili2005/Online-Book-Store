import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
    <p className="mb-4">Oops! The page you’re looking for does not exist.</p>
    <Link to="/" className="text-blue-600 underline">Go Home</Link>
  </div>
);

export default NotFound;
