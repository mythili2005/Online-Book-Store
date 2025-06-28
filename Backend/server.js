var express = require('express');
var mongodb = require('mongoose');
var denv = require('dotenv');
var Book = require('./models/Book')
var app = express();
app.use(express.json())
denv.config();
const PORT = 3001;

mongodb.connect(process.env.MONGO_URI).then( ()=>{
    console.log("Mongodb connected successfully");
}).catch(()=>{
    console.log("Check Mongodb connection string");
})


app.post('/api/books',async(req,res)=>{
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

app.get('/api/getbooks',async(req,res)=>{
    try{
    var allBookRecords = await Book.find()
        res.json(allBookRecords);
        console.log("All data are fetched")
    }
    catch(error){
        console.log(error);
    }
});

// route
app.put('/api/update-books/:id',async (req, res) => {
  try {
    const { title, author } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/api/delete/:id',async(req,res)=>{
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
				 
app.listen(PORT,()=>console.log
		(`Backend is connected at http://localhost:${PORT}`));