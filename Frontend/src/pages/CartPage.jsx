import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, clearCart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: "", phone: "", line: "", pincode: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!user) {
    alert("Please login to proceed.")
    navigate("/login");
    return;
  }
    if (!address.name || !address.phone || !address.line || !address.pincode)
      return alert("Please fill in all address fields.");

    try {
      const order = await fetch("http://localhost:3001/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      }).then((res) => res.json());

      if (!order?.id) return alert("Failed to create order.");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "BookSmart Checkout",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          const res = await fetch("http://localhost:3001/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              cartItems: cart,
              totalAmount: total,
              address,
            }),
          });

          clearCart();
          navigate("/orders");
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
    } catch (err) {
      console.error(err);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative">
        {/* ✅ Orders Button - Top Right */}
        {user && (
          <div className="absolute top-6 right-6">
            <button
              onClick={() => navigate("/orders")}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-lg border border-blue-300 shadow-sm transition"
            >
              View Orders
            </button>
          </div>
        )}

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
              to="/books"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium"
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
                  className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:shadow-sm"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600 mt-1">₹{item.price} each</div>
                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="w-8 h-8 border border-blue-200 text-blue-700 rounded-lg"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 border border-blue-200 text-blue-700 rounded-lg"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-4 text-sm text-red-600 hover:underline"
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

            {/* Total & Address */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
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
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
              {["name", "phone", "line", "pincode"].map((field) => (
  <input
    key={field}
    type={field === "phone" || field === "pincode" ? "number" : "text"}
    required
    placeholder={
      field === "line"
        ? "Street Address"
        : field === "pincode"
        ? "Pincode"
        : field === "phone"
        ? "Phone Number"
        : `Enter ${field}`
    }
    className="appearance-none[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] w-full mb-3 px-4 py-3 border border-gray-200 rounded-lg"
    value={address[field]}
    onChange={(e) =>
      setAddress({
        ...address,
        [field]: field === "phone" || field === "pincode"
          ? e.target.value.replace(/\D/g, "")
          : e.target.value,
      })
    }
    inputMode={field === "phone" || field === "pincode" ? "numeric" : "text"}
  />
))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-medium"
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
