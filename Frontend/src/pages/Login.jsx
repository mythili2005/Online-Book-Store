import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", 
      { email,
        password,
        type});
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">BookSmart</h1>
        <p className="text-center text-gray-600 mb-6">
          Open a book, open your mind.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="user">User Login</option>
            <option value="admin">Admin Login</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;