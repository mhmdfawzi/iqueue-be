const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
  name: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  long: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  createdBy: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ServiceProvider = mongoose.model(
  "service_provider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
