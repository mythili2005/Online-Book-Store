// src/pages/Login.jsx
import React, { useState, } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("https://online-book-store-backend-qtuz.onrender.com/api/login", {
      email,
      password,
      type,
    });

    const userData = res.data.user || res.data;
console.log("User data:", userData);
console.log("Token:", res.data.token);

    // ✅ Save token and user info
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    localStorage.setItem("user", JSON.stringify(userData));
    login(userData);

    alert("Login successful!");
    navigate("/");
  } catch (err) {
    console.error(err);
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Login failed. Please try again.");
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-full bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">BookSmart</h1>
        <p className="text-center text-gray-600 mb-6">Unlock knowledge with every page you turn</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Admin?</label>
            <input
              type="checkbox"
              checked={type === "admin"}
              onChange={() => setType(type === "admin" ? "user" : "admin")}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
