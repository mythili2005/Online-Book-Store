const express = require("express");
var Book = require('../models/Book');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/books', verifyAdmin, async(req,res)=>{
    try{
        var newBook = new Book(req.body);
        newBook.save()
        console.log(req.body);
        console.log("Book added successfully")
        res.status(200).send("Book added successfully");
    }
    catch(error)
    {
        console.log(error)
    }
})

router.get('/books', async (req, res) => {
  const {
    category,
    author,
    minPrice = 0,
    maxPrice = 1000,
    search,
    page = 1,
    limit = 20,
  } = req.query;

  let filter = {};

  if (category) filter.category = category;
  if (author) filter.author = new RegExp(author, 'i');
  if (search) filter.title = new RegExp(search, 'i');
  filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };

  try {
    const skip = (page - 1) * limit;

    const books = await Book.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.json({ books, total });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Get single book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});


// route
router.put('/books/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, author, price, category, description, coverImage, stock } = req.body;
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { 
        title,
        author,
        price,
        category,
        description,
        coverImage,
        stock
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE - Delete book (Admin only)
router.delete('/books/:id', verifyAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;