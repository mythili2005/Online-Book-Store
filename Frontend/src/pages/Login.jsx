import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      login(data.user); // Or adjust according to your backend response
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
