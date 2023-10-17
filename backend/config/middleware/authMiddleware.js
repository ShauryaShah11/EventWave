import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    req.user = decoded; // Now you have access to the user data, including user ID

    // Check if the token is expired
    const expirationTime = new Date(decoded.exp * 1000); // Convert seconds to milliseconds
    if (expirationTime <= new Date()) {
      res.status(401).json({ success: false, message: 'Token has expired.' });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

export { verifyToken };
