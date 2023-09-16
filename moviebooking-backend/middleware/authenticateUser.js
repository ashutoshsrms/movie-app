const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization'); // Assuming token is passed in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken.userId; // Attach the user ID to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
};
