import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetch(`https://online-book-store-backend-qtuz.onrender.com/api/orders/${user._id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to fetch orders", err));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="mb-2">
                <p className="font-semibold text-blue-800">
                  Order ID: #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-2 space-y-1">
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-right font-medium text-gray-800">
                Total: ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
