import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ReviewForm from "./ReviewForm";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/books/${id}`)
      .then((res) => {
        setBook(res.data.book);
        setReviews(res.data.reviews || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleReviewSubmit = (reviewText) => {
    // This is a placeholder, adapt to your API
    const newReview = { text: reviewText };
    setReviews((prev) => [...prev, newReview]);
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <img src={book.coverImage} alt={book.title} className="w-48 h-64 object-cover mb-4 mx-auto" />
      <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-2">by {book.author}</p>
      <p className="mb-4">{book.description || "No description available."}</p>
      <p className="font-bold mb-4">₹{book.price}</p>
      <button
        onClick={() => addToCart(book._id)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      <h3 className="text-xl font-bold mt-8 mb-2">Reviews</h3>
      <ul className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <li key={index} className="border-b py-2">{rev.text}</li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <ReviewForm onSubmitReview={handleReviewSubmit} />
    </div>
  );
};

export default BookDetails;
