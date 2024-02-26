const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
  },
  { timestamps: true }
);


// Match password functionality 
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
// Before saving, ..encrypt password
userSchema.pre('save', async function (next) {
  // If password is not modified, next()
  if (!this.isModified) {
    next()
  } 
  // Generate a new salt
  const salt = await bcrypt.genSalt(10)
  // Hash password with the salt
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);
module.exports = User;
