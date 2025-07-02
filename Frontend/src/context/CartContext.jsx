import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Enrich minimal items from DB with book details
  const enrichCartItems = async (items) => {
    const enriched = await Promise.all(
      items.map(async (item) => {
        try {
          const res = await axios.get(`https://online-book-store-backend-qtuz.onrender.com/api/books/${item.bookId}`);
          return { ...res.data, quantity: item.quantity };
        } catch {
          return null;
        }
      })
    );
    return enriched.filter((item) => item);
  };

  // Load cart from DB when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user?._id) {
        setLoadingCart(true);
        try {
          const res = await axios.get(`https://online-book-store-backend-qtuz.onrender.com/api/cart/${user._id}`);
          const enriched = await enrichCartItems(res.data.items || []);
          setCart(enriched);
        } catch (err) {
          console.error("❌ Cart load failed:", err);
          setCart([]);
        } finally {
          setCartLoaded(true);
          setLoadingCart(false);
        }
      } else {
        setCart([]);
        setCartLoaded(false);
      }
    };
    loadCart();
  }, [user]);

  // Save to DB after cart is loaded and updated
  useEffect(() => {
    if (!cartLoaded || loadingCart || !user?._id) return;

    const minimalCart = cart.map((item) => ({
      bookId: item._id,
      quantity: item.quantity,
    }));

    axios
      .post("https://online-book-store-backend-qtuz.onrender.com/api/cart", {
        userId: user._id,
        items: minimalCart,
      })
      .then(() =>
        console.log(cart.length > 0 ? "✅ Cart updated in DB" : "🗑️ Cart cleared in DB")
      )
      .catch((err) => console.error("❌ Cart update failed:", err));
  }, [cart, user, cartLoaded, loadingCart]);

  // Add book to cart
  const addToCart = (book, quantity = 1) => {
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

  // Decrease quantity of a book
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove book from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    if (user?._id) {
      axios
        .post("https://online-book-store-backend-qtuz.onrender.com/api/cart", {
          userId: user._id,
          items: [],
        })
        .then(() => console.log("🗑️ Cart cleared manually in DB"))
        .catch((err) => console.error("❌ Manual cart clear failed:", err));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
