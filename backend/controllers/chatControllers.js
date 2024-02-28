
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
    let chat = await Chat.findOne({
    isGroup: false, // Should not be a group chat
    users: { $all: [req.user._id, userId] }, // Both users must be present in the chat
  });
  console.log(chat)
  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name picture email",
  });
  
  if (chat) {
    console.log("CHAT ALREADY EXISTS")
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

const fetchChats = asyncHandler(async (req, res) => {
    try {
        // Look through all chats that contains user that is logged in
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

module.exports = {accessChat, fetchChats}