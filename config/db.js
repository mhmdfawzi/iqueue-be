import 'dotenv/config'

const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect("mongodb+srv://fawzyDBA:sSf2arswcUJEEiOG@cluster0.z0xh7fp.mongodb.net/?retryWrites=true&w=majority", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "iqueue"
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
