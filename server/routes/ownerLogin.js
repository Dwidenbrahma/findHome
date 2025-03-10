const express = require("express");
const jwtOwner = require("jsonwebtoken");
const OwnerLogin = express.Router();
const Owner = require("../models/owner");
const bcrypt = require("bcryptjs");
require("dotenv").config();

OwnerLogin.post("/owner/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body); // Logging request body

    const ownerData = await Owner.findOne({ email });

    if (!ownerData) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, ownerData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const ownerToken = jwtOwner.sign(
      { owner_id: ownerData._id, email: ownerData.email },
      process.env.JWT_SECRET2
    );

    res.send({ ownerToken });
  } catch (error) {
    console.error("Error during login:", error); // Logging error
    res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
});

module.exports = OwnerLogin;
