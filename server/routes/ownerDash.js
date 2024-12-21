require("dotenv").config();
const express = require("express");
const ownerDash = express.Router();
//const User = require("../models/user");
const Owner = require("../models/owner");
//const Bookings = require("../models/bookingScema");
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");

const authenticateOwner = (req, res, next) => {
  const ownerToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!ownerToken) {
    return res
      .status(400)
      .json({ message: "Unauthorized credential, Access denied" });
  }

  try {
    const decode = verifyOwnerToken(ownerToken);
    req.owner = decode;
    next();
  } catch (err) {
    console.error("Token verification failed:", err); // log the error for better debugging
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

ownerDash.get("/owner/dash", authenticateOwner, async (req, res) => {
  try {
    const ownerId = req.owner.owner_id;
    const admin = await Owner.findOne({ _id: ownerId });

    if (!admin) {
      return res.status(400).json({ message: "No such user exists!" });
    }

    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching owner data:", err); // log the error for better debugging
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = ownerDash;
