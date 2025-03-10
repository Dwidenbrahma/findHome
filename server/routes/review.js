const express = require("express");
const review = express.Router();
const Home = require("../models/homeSchema");

review.post("/review", async (req, res) => {
  try {
    const id = req.body.house._id;
    const data = req.body;

    const toPush = {
      user: data.user,
      comment: data.comment,
      date: data.date,
    };

    const result = await Home.findByIdAndUpdate(
      id,
      {
        $push: { reviews: toPush }, // Add new review to the array
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Home not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

module.exports = review;
