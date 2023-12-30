// routes/todo.js
const express = require("express");
const router = express.Router();
const { getAllTodo, postCreateTodo, putUpdateTodo, deleteTodo } = require("../controllers/todo");

// Use middleware to check authentication (you need to implement this)
const { authenticateUser } = require("../middleware/auth");

router.get("/", authenticateUser, getAllTodo);
router.post("/", authenticateUser, postCreateTodo);
router.put("/:id", authenticateUser, putUpdateTodo);
router.delete("/:id", authenticateUser, deleteTodo);

module.exports = router;
