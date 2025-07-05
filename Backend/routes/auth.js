const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require('googleapis');
const User = require("../models/User.js");

const router = express.Router();

function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_CLIENT_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    redirect_uri: REDIRECT_URI 
  });
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  console.log(code);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();
    console.log('User info:', data);

    let user = await User.findOne({ email: data.email });
    if (!user) {
      user = new User({
        name: data.name,
        email: data.email,
        password: "",
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.redirect(`https://online-book-store-frontend-azure.vercel.app/google-auth?token=${token}`);
  } catch (err) {
    console.error("OAuth call error",err);
    res.status(500).send("Google Auth Failed");
  }
});

// Signup
router.post("/signup", async (req, res) => {
    try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
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
      return res.json({
        user: {
          name: "Admin",
          email,
          type: "admin"
        },
        token
      });
    } else {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }
  } else {
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, type: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          type: "user"
        },
        token
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
});


module.exports = router;
