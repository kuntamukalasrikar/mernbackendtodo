// controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const { emailAddress, password } = req.body;

      // Check if the email address is already taken
      const existingUser = await User.findOne({ emailAddress });
      if (existingUser) {
        return res.status(400).json({ message: "Email address already taken" });
      }

      // Create a new user
      const newUser = new User({ emailAddress, password });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { emailAddress, password } = req.body;

      // Find the user by email address
      const user = await User.findOne({ emailAddress });
      if (!user) {
        return res.status(401).json({ message: "Invalid email address or password" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email address or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  logout: (req, res) => {
    // You can implement logout logic if needed
    res.json({ message: "Logout successful" });
  },
};

module.exports = authController;
