import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookDetails from "./components/BookDetails";
import Home from "./pages/Home.jsx";
import BookList from "./pages/BookList.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";


function App() {
  return (

    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/orders" element={<OrdersPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
