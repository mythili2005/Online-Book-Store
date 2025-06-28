import React, { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
