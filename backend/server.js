const chats = require('../backend/data/data');

const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const chatRequested = chats.find(chat => chat.id === parseInt(req.params.id));
  res.send(chatRequested);
});