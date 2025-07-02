import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../services/api";
import { useCart } from "../context/CartContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [showQuantityBox, setShowQuantityBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { cart, addToCart } = useCart();

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

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleShowQuantity = () => {
    setShowQuantityBox(true);
  };

  const handleAdd = () => {
    const numericQty = parseInt(quantity,10);
    if (!numericQty || numericQty < 1) {
       setErrorMessage("Please enter a valid quantity.");
      return;
    }

    if (numericQty > book.stock) {
      setErrorMessage(`Only ${book.stock} copies available in stock.`);
      return;
    }

    const existingItem = cart.find((item) => item._id === book._id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (numericQty + currentQty > book.stock) {
      setErrorMessage(
        `You already have ${currentQty} in your cart. You can only add ${book.stock - currentQty} more.`
      );
      return;
    }

    addToCart(book, numericQty);
    setSuccessMessage(`${numericQty} ${numericQty === 1 ? 'copy' : 'copies'} added to cart!`);
    setErrorMessage(""); 
    setShowQuantityBox(false);
    setQuantity("1");
    setTimeout(() => {setSuccessMessage("");
      setErrorMessage("");}, 3000);
  };

  const handleCancel = () => {
    setShowQuantityBox(false);
    setQuantity("1");
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 flex justify-center bg-gray-50">
            <img src={book.coverImage} alt={book.title} className="h-auto max-h-96 w-full object-contain" />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">₹{book.price}</span>
              {book.stock > 0 ? (
                <span className="ml-2 text-sm text-green-600">In Stock ({book.stock})</span>
              ) : (
                <span className="ml-2 text-sm text-red-600">Out of Stock</span>
              )}
            </div>
            <p className="mb-6">{book.description || "No description available."}</p>
            <div className="mb-6">
              <span className="text-sm font-medium">Category: </span>
              <span className="text-sm">{book.category || "Uncategorized"}</span>
            </div>

            {book.stock > 0 && (
              <>
                {!showQuantityBox ? (
                  <button
                    onClick={handleShowQuantity}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <label htmlFor="quantity" className="mr-2 text-gray-700">Qty:</label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={book.stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="appearance-none[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] w-20 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                      />
                      <span className="ml-2 text-sm text-gray-500">(Max: {book.stock})</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        onClick={handleAdd}
                      >
                        Add
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
{successMessage && (
  <div className="mt-1 text-green-800">
    {successMessage}
  </div>
)}
{errorMessage && (
  <div className="mt-1 text-red-600">
    {errorMessage}
  </div>
)}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/books" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to all books
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
