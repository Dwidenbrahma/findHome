const express = require("express");
const homePost = express.Router();
const homeUpload = require("../middleware/homeUpload");
const Home = require("../models/homeSchema");

homePost.post("/posthome", (req, res) => {
  homeUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    console.log("Form Data:", req.body);
    console.log("Uploaded Files:", req.files);

    try {
      const {
        title,
        description,
        location,
        city,
        state,
        country,
        type,
        price,
        bedrooms,
        bathrooms,
        guests,
        amenities = "",

        owner_id,
        availability = null,
      } = req.body;

      // Check for required fields
      if (
        !title ||
        !description ||
        !location ||
        !city ||
        !state ||
        !country ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !guests ||
        !amenities ||
        !owner_id
      ) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields." });
      }

      // Handle file paths for images
      const images = req.files ? req.files.map((file) => file.path) : [];
      console.log(amenities);
      const newHome = new Home({
        title,
        description,
        location,
        city,
        state,
        country,
        type,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        guests: Number(guests),
        amenities,

        images,
        owner: owner_id,
        availability,
        // Check if coordinates exist
      });

      await newHome.save();
      console.log("Successfully inserted");
      res
        .status(201)
        .json({ message: "Home successfully posted", home: newHome });
    } catch (error) {
      console.error("Error saving home:", error);
      res.status(500).json({ message: error.message });
    }
  });
});

module.exports = homePost;
