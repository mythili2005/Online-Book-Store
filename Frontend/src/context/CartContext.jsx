import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const enrichCartItems = async (items) => {
    console.log("📦 Enriching items:", items);
    const enriched = await Promise.all(items.map(async (item) => {
      console.log("🔍 Fetching book", item.bookId);
      try {
        const res = await axios.get(`http://localhost:3001/api/books/${item.bookId}`);
        return { ...res.data, quantity: item.quantity };
      } catch {
        return null;
      }
    }));
    return enriched.filter((i) => i);
  };

  // Load on login/logout
  useEffect(() => {
    const loadCart = async () => {
      if (user?._id) {
        try {
          const res = await axios.get(`http://localhost:3001/api/cart/${user._id}`);
          const enriched = await enrichCartItems(res.data.items || []);
          console.log("✅ Loaded cart:", enriched);
          setCart(enriched);
        } catch (err) {
          console.error("❌ Cart load failed:", err);
        }
      } else {
        setCart([]);
      }
    };
    loadCart();
  }, [user]);

  // Save after each change
useEffect(() => {
  if (user?._id && cart.length > 0) {
    const minimalCart = cart.map((item) => ({
      bookId: item._id,
      quantity: item.quantity,
    }));

    axios
      .post("http://localhost:3001/api/cart", {
        userId: user._id,
        items: minimalCart,
      })
      .then(() => console.log("✅ Cart updated in DB"))
      .catch((err) => console.error("❌ Update failed:", err));
  } else if (user?._id && cart.length === 0) {
    // Handle clearing cart
    axios
      .post("http://localhost:3001/api/cart", {
        userId: user._id,
        items: [],
      })
      .then(() => console.log("🗑️ Cart cleared in DB"))
      .catch((err) => console.error("❌ Clear failed:", err));
  }
}, [cart, user]);



const addToCart = (book, quantity = 1) => {
  console.log("🛒 addToCart called:", book, quantity);
  setCart((prev) => {
    const existing = prev.find((item) => item._id === book._id);
    if (existing) {
      return prev.map((item) =>
        item._id === book._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    return [...prev, { ...book, quantity }];
  });
};


  const decreaseQuantity = (id) => {
    setCart(prev => prev.map(item =>
      item._id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item._id !== id));

  const clearCart = () => {
    setCart([]);
    if (user?._id) {
      axios.post("http://localhost:3001/api/cart", { userId: user._id, items: [] });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
