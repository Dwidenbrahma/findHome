const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Attach user info to request object
    next(); // Call the next middleware or route handler
  });
};

module.exports = authenticateToken;
