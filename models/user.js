// user.js
const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "basic",
    enum : ['manager','owner','admin','basic'],
    required: true,
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service_provider",
    required: false,
  },
  queue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "queue",
    required: false,
  },
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
