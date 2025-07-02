import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Admin = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: 0,
    category: "",
    description: "",
    coverImage: "",
    stock: 0
  });
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    if (user?.type === "admin") {
      fetchBooks();
    }
  }, [user]);

  const handleAddBook = async () => {
    try {
      if (!newBook.title || !newBook.author || !newBook.price || !newBook.category || !newBook.description || !newBook.coverImage || newBook.stock === undefined) {
        alert("Please fill in all the fields.");
        return;
      }

      await api.post("/books", newBook);
      fetchBooks();
      setNewBook({
        title: "",
        author: "",
        price: 0,
        category: "",
        description: "",
        coverImage: "",
        stock: 0
      });
      setSuccessMessage("Book added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleUpdateBook = async () => {
    try {
      await api.put(`/books/${editingBook._id}`, editingBook);
      setEditingBook(null);
      fetchBooks();
      setSuccessMessage("Book updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  if (user?.type !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100 text-center max-w-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-6">You don't have permission to view this page</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Admin Dashboard</h1>

      {/* Add/Edit Book Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">
          {editingBook ? "Edit Book" : "Add New Book"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Book Title"
              value={editingBook ? editingBook.title : newBook.title}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, title: e.target.value })
                  : setNewBook({ ...newBook, title: e.target.value })
              }
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              placeholder="Author Name"
              value={editingBook?.author || newBook.author}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, author: e.target.value })
                  : setNewBook({ ...newBook, author: e.target.value })
              }
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              placeholder="Price"
              value={editingBook?.price || newBook.price}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, price: e.target.value })
                  : setNewBook({ ...newBook, price: e.target.value })
              }
              className="appearance-none[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={editingBook?.category || newBook.category}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, category: e.target.value })
                  : setNewBook({ ...newBook, category: e.target.value })
              }
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Biography">Biography</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={editingBook?.coverImage || newBook.coverImage}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, coverImage: e.target.value })
                  : setNewBook({ ...newBook, coverImage: e.target.value })
              }
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              value={editingBook?.stock || newBook.stock}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, stock: e.target.value })
                  : setNewBook({ ...newBook, stock: e.target.value })
              }
              className="appearance-none[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Book Description"
              value={editingBook?.description || newBook.description}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, description: e.target.value })
                  : setNewBook({ ...newBook, description: e.target.value })
              }
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          {editingBook ? (
            <>
              <button
                onClick={handleUpdateBook}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Update Book
              </button>
              <button
                onClick={() => setEditingBook(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAddBook}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Book
            </button>
          )}
        </div>
      </div>
      {successMessage && (
  <div className="mb-6 p-4 rounded bg-green-100 text-green-800 border border-green-200 font-medium">
    {successMessage}
  </div>
)}

      {/* Books List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Books List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{book.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setEditingBook(book);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;