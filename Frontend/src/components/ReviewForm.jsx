import React, { useState } from "react";

const ReviewForm = ({ onSubmitReview }) => {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() !== "") {
      onSubmitReview(review);
      setReview("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
