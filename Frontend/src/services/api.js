import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Update if your backend URL is different
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

export const fetchAllBooks = async () => {
  try {
    const res = await api.get("/books");
    return res.data; // Array of books
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};


export default api;
