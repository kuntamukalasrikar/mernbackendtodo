// controllers/todo.js
const Todo = require("../models/todo");

// Get all tasks for the logged-in user
exports.getAllTodo = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Create a new task for the logged-in user
exports.postCreateTodo = async (req, res) => {
  try {
    const newTask = new Todo({ ...req.body, user: req.user.userId });
    const data = await newTask.save();
    res.json({ message: "Task added successfully", data });
  } catch (err) {
    res.status(400).json({ message: "Failed to add task", error: err.message });
  }
};

// Update a task for the logged-in user
exports.putUpdateTodo = async (req, res) => {
  try {
    const data = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", data });
  } catch (err) {
    res.status(400).json({ message: "Failed to update task", error: err.message });
  }
};

// Delete a task for the logged-in user
exports.deleteTodo = async (req, res) => {
  try {
    const data = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", data });
  } catch (err) {
    res.status(404).json({ message: "Task not found", error: err.message });
  }
};
