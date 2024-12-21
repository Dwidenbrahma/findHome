const express = require("express");
const Booking = require("../models/bookingScema"); // Ensure the model name is correct
const { verifyToken } = require("../controllers/jwtHelper");

const homeBooking = express.Router();

homeBooking.post("/reserve/:id", async (req, res) => {
  const { startDate, endDate } = req.body;
  const houseId = req.params.id; // House ID from the route parameter

  // Check if all required fields are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  // Get the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Decode and verify JWT token
    const decoded = verifyToken(token); // Assuming verifyToken function returns the decoded payload
    const userId = decoded.userId; // Extract userId from the token

    // Create a new booking
    const booking = new Booking({
      house: houseId, // House ID from the route parameter
      renter: userId, // User ID from the decoded token
      startDate,
      endDate,
      totalPrice: calculatePrice(startDate, endDate), // Assuming you have a function to calculate total price
    });

    await booking.save(); // Save the booking to the database

    // Send a success response
    res.status(201).json({ message: "Booking reserved successfully", booking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while reserving the booking" });
  }
});

// A utility function to calculate price based on start and end dates
const calculatePrice = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end - start); // Get the time difference in milliseconds
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

  const pricePerDay = 100; // Assume a fixed price per day
  return pricePerDay * dayDiff;
};

module.exports = homeBooking;
