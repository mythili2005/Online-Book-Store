const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token || req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (decoded.type !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyAdmin };