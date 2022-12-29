const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  reserver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  queue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "queue",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  no: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.model(
  "reservation",
  reservationSchema
);

module.exports = Reservation;
