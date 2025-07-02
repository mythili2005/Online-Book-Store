// src/pages/GoogleAuthHandler.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const GoogleAuthHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const normalizedUser = {
          _id: decoded.id || decoded._id,
          name: decoded.name,
          email: decoded.email,
          type: decoded.type || "user",
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        login(normalizedUser);
        navigate("/");
      } catch (err) {
        console.error("Invalid token from Google:", err);
        navigate("/login");
      }
    } else {
      navigate("/");
    }
  }, [login, navigate]);

  return <div className="text-center mt-10">Logging you in with Google...</div>;
};

export default GoogleAuthHandler;
