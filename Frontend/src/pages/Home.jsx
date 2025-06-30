import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  // Stats about the bookstore
  const stats = [
    { value: "1000+", label: "Books Available" },
    { value: "24/7", label: "Instant Access" },
    { value: "20+", label: "Categories" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl shadow-lg mb-12">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
          Welcome to My Book Store 📚
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover your next literary adventure in our carefully curated collection.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/books"
            className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 transform hover:scale-105"
          >
            Browse Books
          </Link>
          <a
            href="#about"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
          Why Choose Our Book Store?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Advanced Search",
              description: "Find exactly what you want with our powerful filters and search tools."
            },
            {
              title: "Instant Downloads",
              description: "Get your books immediately after purchase with no waiting."
            },
            {
              title: "Read Anywhere",
              description: "Access your library on all devices, anytime, anywhere."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>



      {/* Stats Section */}
      <div className="bg-blue-800 text-white p-12 rounded-xl mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">About Our Book Store</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4 text-lg">
              We're passionate about connecting readers with books they'll love. Our carefully curated collection spans all genres and interests, from timeless classics to the latest bestsellers.
            </p>
            <p className="mb-4">
              Our advanced filtering system lets you find books by price, author, category, or popularity. Adjust the price range with an intuitive slider or search by title or author with instant results.
            </p>
          </div>
          <div>
            <p className="mb-4">
              We believe book shopping should be simple, smart, and joyful. That's why we've created a seamless experience from discovery to download.
            </p>
            <p>
              Start exploring today and get your next adventure delivered to your device in seconds! Our team is constantly updating our collection to bring you the best reading experience possible.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 bg-blue-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Ready to Start Reading?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of happy readers who found their next favorite book with us.
        </p>
        <Link
          to="/books"
          className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
        >
          Explore Our Collection
        </Link>
      </div>
    </div>
  );
};

export default Home;