const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// TASK

const Task = require("../model/tasks");

// Create a new task with created_by field
router.post('/tasks', async (req, res) => {
  try {
      const { title, status, priority, created_by } = req.body;

      // Basic validation
      if (!title) return res.status(400).json({ error: "Title is required" });

      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(status)) return res.status(400).json({ error: "Invalid status" });

      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority)) return res.status(400).json({ error: "Invalid priority" });

      // Check if created_by is a valid ObjectId
      if (!created_by || !mongoose.Types.ObjectId.isValid(created_by)) {
          return res.status(400).json({ error: "Invalid user ID format" });
      }

      const newTask = new Task({
          title,
          status,
          priority,
          created_by: new mongoose.Types.ObjectId(created_by), // Ensure ObjectId format
      });

      await newTask.save();
      res.status(201).json({ message: "Task created successfully", task: newTask });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error", err: err.message });
  }
});


router.get('/tasks', async (req, res) => {
  try {
      console.log("✅ Query Params:", req.query);  // 🟢 Log the received query params

      const { created_by } = req.query;
      
      if (!created_by) {
          return res.status(400).json({ error: "❌ Missing created_by parameter" });
      }

      console.log("✅ Received created_by:", created_by);  // 🟢 Log the received ID

      // 🛠️ Ensure `created_by` is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(created_by)) {
          return res.status(400).json({ error: "❌ Invalid user ID format" });
      }

      const tasks = await Task.find({ created_by: new mongoose.Types.ObjectId(created_by) });
      
      console.log("✅ Found Tasks:", tasks);  // 🟢 Log fetched tasks

      res.json(tasks);
  } catch (err) {
      console.error("🚨 Error fetching tasks:", err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});







module.exports = router;
