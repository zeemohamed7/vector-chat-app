const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName : {type: String, trim: true},
    isGroup: { type: Boolean, default: false },
    users: [
      { 
        type: mongoose.Schema.Types.ObjectId, // refer to db with id
        ref: "User" //refer to user model
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
    

  },
  {
    timestamps: true
  }
)

const Chat = mongoose.model("Chat", chatModel); // create model from schema

module.exports = Chat;

// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin