require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

// Generate a token using user_id
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id, // Add the MongoDB user ID to the payload
      email: user.email, // Include email if necessary
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

// Verify the token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
