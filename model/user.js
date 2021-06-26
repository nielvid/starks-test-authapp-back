const mongoose = require("mongoose");

const UserSchema =  mongoose.Schema;

const user = new UserSchema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
   token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("users", user);

module.exports = users;

