import axios from "axios";

const api = axios.create({
  baseURL: "https://online-book-store-backend-qtuz.onrender.com/api", // Update if your backend URL is different
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

export const fetchAllBooks = async (filters, page = 1, limit = 20) => {
  try {
    const params = { ...filters, page, limit };
    const res = await api.get("/books", { params });
    return res.data; // { books, total }
  } catch (err) {
    console.error("Error fetching books:", err);
    return { books: [], total: 0 }; // Return same structure as your useEffect expects
  }
};



export default api;
