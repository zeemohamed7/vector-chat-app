const chats = require('../backend/data/data');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatsRoutes = require('./routes/chatsRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bodyParser = require('body-parser')


const connectDB = require('./config/db')




// Telling backend to accept JSON data from frontend

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use('/', userRoutes)
app.use('/', chatsRoutes)



// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}.`.yellow));

app.get('/', (req, res) => {
  res.send('hello');
});



