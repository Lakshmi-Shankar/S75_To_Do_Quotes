const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('./model/user')


router.post('/register', (req, res) => {
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


// TASK

router.post('/tasks', (req, res) => {
  const { title, status, priority } = req.body;

  if (!title) {
      return res.status(400).json({ error: "Title is required" });
  }

  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority" });
  }

  res.json({ message: "Task created successfully" });
});


module.exports = router;
