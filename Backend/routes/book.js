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

router.get('/getBooks', async (req, res) => {
  const { category, author, minPrice, maxPrice, search } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (author) filter.author = new RegExp(author, 'i');
  if (search) filter.title = new RegExp(search, 'i');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route
router.put('/update-book/:id', verifyAdmin, async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/delete/:id',async(req,res)=>{
    try {
    const book = await Book.findOneAndDelete({id: Number(req.params.id)});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;