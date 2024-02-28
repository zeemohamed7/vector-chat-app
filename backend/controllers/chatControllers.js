
const express = require('express')
const dotenv = require('dotenv')
const asyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel')
const User = require("../models/userModel");


const app = express()

// Fetching one-on-one chat
const accessChat = asyncHandler(async (req, res) => {
    const {userId} = req.body

 // If userId not passed
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

// If chat exists with this user id, return chat
  // Find chat with:
  const chat = await Chat.findOne({
    isGroupChat: false, // Should not be a group chat
    users: { $all: [req.user._id, userId] }, // Both users must be present in the chat
  })
    .populate('users', '-password')
    .populate('latestMessage.sender');

  if (chat) {
    // Chat already exists, send the chat
    res.json(chat);
  } else {
        // Create the chat
        let chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };

        // Store chat in DB

        try {
            // create chat in db
            const createdChat = await Chat.create(chatData);

            // return the new chat to user
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
              "users",
              "-password"
            );
            
            res.status(200).json(FullChat);
          } catch (error) {
            res.status(400);
            throw new Error(error.message);
          }
        }
})

module.exports = {accessChat}