import React, { useState, useEffect } from "react";
import api from "../services/api"; // ✅ your custom axios instance

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: 0,
    category: "",
  });

  // ✅ Fetch all books
  const fetchBooks = async () => {
    const res = await api.get("/getBooks");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Add new book
  const handleAddBook = async () => {
    try {
      await api.post("/books", newBook);
      fetchBooks();
      setNewBook({ title: "", author: "", price: 0, category: "" });
    } catch (err) {
      console.error(err);
      alert("Add book failed");
    }
  };

  // ✅ Delete book
  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ Update book (example: change title)
  const handleUpdateBook = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    try {
      await api.put(`/update-book/${id}`, { title: newTitle });
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add new book */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-xl mb-2">Add Book</h2>
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) =>
            setNewBook({ ...newBook, price: Number(e.target.value) })
          }
          className="border p-2 mr-2"
        />
        <input
          placeholder="Category"
          value={newBook.category}
          onChange={(e) =>
            setNewBook({ ...newBook, category: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-800 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List of books */}
      <div>
        <h2 className="text-xl mb-2">Books</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id}>
                <td className="border p-2">{b.title}</td>
                <td className="border p-2">{b.author}</td>
                <td className="border p-2">₹{b.price}</td>
                <td className="border p-2">{b.category}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleUpdateBook(b._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBook(b._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
