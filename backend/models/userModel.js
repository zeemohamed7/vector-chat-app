const mongoose = require("mongoose");

const uerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    emai: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = Message;
