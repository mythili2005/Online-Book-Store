import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, clearCart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState({ name: "", phone: "", line: "", pincode: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!user) {
      alert("Please login to proceed with payment.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: total * 100,
      currency: "INR",
      name: "BookSmart Checkout",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        clearCart();
      },
      prefill: {
        name: address.name,
        contact: address.phone,
        email: user.email,
      },
      theme: { color: "#1e40af" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600 mt-1">₹{item.price} each</div>
                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="w-8 h-8 flex items-center justify-center border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 flex items-center justify-center border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-4 text-sm text-red-600 hover:text-red-800 underline transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-medium text-blue-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-blue-800">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full mb-6 py-2 text-red-600 hover:text-red-800 font-medium underline transition-colors"
            >
              Clear Entire Cart
            </button>

            {/* Address Form */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Address</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  placeholder="Street Address"
                  value={address.line}
                  onChange={(e) => setAddress({ ...address, line: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              disabled={!address.name || !address.phone || !address.line || !address.pincode}
            >
              Proceed to Payment (₹{total.toFixed(2)})
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;