import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Update if your backend URL is different
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ token is stored separately
  if (token) {
    config.headers.token = token;
  }
  return config;
});


export const fetchBookById = async (id) => {
  try {
    const res = await api.get(`/books/${id}`);
    return res.data; // The single book data
  } catch (err) {
    console.error("Error fetching book:", err);
    return null;
  }
};

export const fetchAllBooks = async (filters) => {
  try {
    const res = await api.get("/books", { params: filters });
    return res.data;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};


export default api;
