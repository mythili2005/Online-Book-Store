import api from "./api";

export const loginUser = async (credentials) => {
  const res = await api.post("/login", credentials);
  return res.data;
};

export const signupUser = async (userData) => {
  const res = await api.post("/signup", userData);
  return res.data;
};
