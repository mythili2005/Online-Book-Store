import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ To show error message

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      console.log("JWT Token from Google:", token);

      // Optional: clear the token from URL
      window.history.replaceState({}, document.title, "/");

      // Navigate to home or dashboard
      navigate("/");
    }
  }, [navigate]);

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/signup", {
        name,
        email,
        password,
      });
      console.log(res.data);
      setError(""); // clear any previous error
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // backend error
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">BookSmart</h1>
        <p className="text-center text-gray-600 mb-6">
          Unlock your next favorite read!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
            />
          </div>

          {/* ✅ Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-gray-500 text-sm">or</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <a href=" http://localhost:3001/api/google">
          <button
            onClick={() => console.log("Google Signup")}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg font-medium border border-blue-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.126-0.123-1.648h-9.877z" />
            </svg>
            Continue with Google
          </button>
        </a>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
