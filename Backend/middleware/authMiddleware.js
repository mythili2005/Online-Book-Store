const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json("No token provided!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token!");

    // FIX ✅ — check type, not isAdmin
    if (user.type === "admin") {
      req.user = user;
      next();
    } else {
      return res.status(403).json("Access denied: admin only!");
    }
  });
};

module.exports = { verifyAdmin };
