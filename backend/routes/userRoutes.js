const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../model/user')
const bcrypt = require("bcrypt"); // Use this if you hash passwords
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;


router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const newUser = new User({
      name,email,password
    })
    await newUser.save()
    res.json({ message: "User registered successfully" });
});




// ✅ **Get All Users (GET)**
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// ✅ **Get Single User by ID (GET)**
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// ✅ **Update User (PUT)**
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ✅ **Delete User (DELETE)**
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});




//  LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validations
  if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
  }

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // For plain-text passwords only
      if (user.password !== password) {
          return res.status(401).json({ error: "Invalid credentials" });
      }

      const payload = {
        username: user.email
      }

      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});

      // Set cookie
      res.cookie("Token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: false,
      });

      res.status(200).json({ message: "Login successful" });

  } catch (err) {
      res.status(500).json({ error: "Server error", err });
  }
});

//  LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;