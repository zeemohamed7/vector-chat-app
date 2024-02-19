import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chats() {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      console.log(response)
      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.message}</div>
      ))}
    </div>
  );
}