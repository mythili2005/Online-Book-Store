const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, type } = req.body;
  if (type === "admin") {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, type: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({ token });
    } else {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }
  } else {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, type: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send("User loggedin s");
  }
});

module.exports = router;
