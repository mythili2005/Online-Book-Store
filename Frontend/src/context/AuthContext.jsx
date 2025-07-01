import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      _id: parsed._id || parsed.id, // ✅ Normalize on load too
    };
  }
  return null;
});


const login = (userData) => {
  const normalizedUser = {
    ...userData,
    _id: userData._id || userData.id, // ✅ Ensure _id is present
  };

  localStorage.setItem("user", JSON.stringify(normalizedUser));
  setUser(normalizedUser);
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
