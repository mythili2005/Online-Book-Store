import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../services/api";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-700">Book not found</h3>
        <Link 
          to="/books" 
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 p-4 flex justify-center bg-gray-50">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-auto max-h-96 w-full object-contain"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">
                ₹{book.price}
              </span>
              {book.stock > 0 ? (
                <span className="ml-2 text-sm text-green-600">In Stock ({book.stock})</span>
              ) : (
                <span className="ml-2 text-sm text-red-600">Out of Stock</span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              {book.description || "No description available."}
            </p>

            <div className="mb-6">
              <span className="text-sm font-medium text-gray-900">Category: </span>
              <span className="text-sm text-gray-600">{book.category || "Uncategorized"}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition">
                Add to Cart
              </button>
              {book.downloadLink && (
                <a 
                  href={book.downloadLink} 
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-medium transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/books"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to all books
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;