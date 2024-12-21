const express = require("express");
const jwt = require("jsonwebtoken");
const ownerRegistraion = express.Router();
const Owner = require("../models/owner");
const ownerprofile = require("../middleware/ownerProfileUpload");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SALTED = 10;

ownerRegistraion.post(
  "/list/register",
  ownerprofile.single("profileImage"),
  async (req, res) => {
    try {
      let { name, email, password, phone } = req.body;
      const profileImage = req.file ? req.file.path : null;

      let isExist = Owner.findOne({ email });
      if (!isExist) {
        return res
          .status(400)
          .json({ message: " email id is already exist", success: "failed" });
      }

      const hashPassword = await bcrypt.hash(password, SALTED);

      const newOwner = new Owner({
        name,
        email,
        password: hashPassword,
        profileImage,
        phone,
      });

      newOwner.save();
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ messgae: `Internal Server Error ${err}` });
    }
  }
);

module.exports = ownerRegistraion;
