const chats = require('../backend/data/data');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


const connectDB = require('./config/db')

const app = express();
dotenv.config();
connectDB()

// Telling backend to accept JSON data from frontend
app.use(express.json())

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}.`.yellow));

app.get('/', (req, res) => {
  res.send('hello');
});


app.use('/api/user', userRoutes)

