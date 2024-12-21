const express = require("express");
const test = express.Router();

test.get("/test", (req, res) => {
  res.status(201).json({ message: "Hey how are you" });
});

module.exports = test;
