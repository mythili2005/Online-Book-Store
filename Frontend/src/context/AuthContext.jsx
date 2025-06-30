import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      setUser(null); // fallback
    }
  }, []);

  // ✅ Save to localStorage on login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
