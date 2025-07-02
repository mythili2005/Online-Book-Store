var denv = require('dotenv');
denv.config();
var express = require('express');
var mongodb = require('mongoose');
var cors =  require('cors');
var authRoutes = require('./routes/auth.js');
var bookRoutes = require('./routes/book.js');
var cartRoutes = require('./routes/cart.js');
var orderRoutes = require('./routes/order.js');
var paymentRoutes = require('./routes/payment.js');
var app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use('/api', authRoutes);
app.use('/api',bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api/payment', paymentRoutes);


mongodb.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then( ()=>{
    console.log("Mongodb connected successfully");
}).catch(()=>{
    console.log("Check Mongodb connection string");
})

				 
app.listen(PORT,()=>console.log
		(`Backend is connected at http://localhost:${PORT}`));