import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signupUser } from "../services/auth";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      const data = await signupUser(userData);
      login(data.user); // Or adjust according to your backend response
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default Signup;
