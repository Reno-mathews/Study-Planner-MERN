const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary data(fake database)

let tasks = [
    { id: 1, title: "Study React", completed: false },
    { id: 2, title: "Revise DSA", completed: true }
];

mongoose.connect(process.env.MONGO_URI)
// Route: Get all tasks
app.get("/api/tasks", (req,res) => {
    res.json(tasks);
});

// Route: Add a task
app.post("/api/tasks", (req,res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        subject: req.body.subject,
        completed: false,
    };

    tasks.push(newTask);
    res.json(newTask);
});

// Route: Complete a task

app.patch("/api/tasks/:id", (req,res) => {
    const id = Number(req.params.id);

    const task = tasks.find((t) => t.id === id);

    if(!task) {
        return res.status(404).json({ message: "Task not found"});
    }

    task.completed = !task.completed; // toggle
    res.json(task);
});

// Route: Delete a task
app.delete("/api/tasks/:id", (req,res) => {
    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found"});
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted"});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

