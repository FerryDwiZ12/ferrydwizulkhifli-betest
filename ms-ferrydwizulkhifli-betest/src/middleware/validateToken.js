const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer,process.env.ACCES_TOKEN_SECRET);

    // Add the decoded user object to the request object
    req.user = decoded;

    // next step
    next();
  } catch (error) {
    // If token verification fails, return an error response
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};

module.exports = verifyToken;
