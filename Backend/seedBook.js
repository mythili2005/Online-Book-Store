const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust path if needed
const { faker } = require('@faker-js/faker');
require('dotenv').config(); // Load from .env

// Categories array (12 categories)
const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 
  'Biography', 'History', 'Fantasy', 'Mystery',
  'Romance', 'Self-Help', 'Business', 'Children'
];

// Connect to MongoDB using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  seedBooks(); // Call only after successful connection
})
.catch(err => console.error("❌ MongoDB connection error:", err));

// Generate and insert books
async function seedBooks(count = 120) {
  const books = [];

  for (let i = 0; i < count; i++) {
    books.push({
      title: faker.commerce.productName() + " " +
             faker.helpers.arrayElement(['Book', 'Novel', 'Guide', 'Manual', 'Tales']),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      description: faker.lorem.paragraphs(2),
      price: faker.number.int({ min: 99, max: 999 }),
      category: faker.helpers.arrayElement(categories),
      coverImage: `https://picsum.photos/seed/book-${i}/300/400`,
      stock: faker.number.int({ min: 0, max: 50 }),
    });
  }

  try {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log(`✅ Seeded ${count} books.`);
  } catch (err) {
    console.error("❌ Error seeding books:", err);
  } finally {
    mongoose.connection.close();
  }
}
