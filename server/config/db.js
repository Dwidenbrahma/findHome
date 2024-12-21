require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
     const dbUrl = process.env.MY_ONLINEDB;
    //const dbUrl = process.env.DATABASE_URL;
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
