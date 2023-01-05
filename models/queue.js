const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queueSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service_provider",
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  nowServing: {
    type: Number,
    default: 0,
  },
  nextServing: {
    type: Number,
    default: 0,
  },
  bookCount: {
    type: Number,
    hidden: true,
  },
});

const Queue = mongoose.model("queue", queueSchema);

module.exports = Queue;
