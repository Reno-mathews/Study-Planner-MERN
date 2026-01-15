const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

const Task = require("./models/Task");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


// Route: Get all tasks
app.get("/api/tasks", authMiddleware, async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Route: Add a task
app.post("/api/tasks", authMiddleware, async (req,res) => {
    const newTask = new Task({
        title: req.body.title,
        subject: req.body.subject,
        completed: false,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
});

// Route: Complete a task

app.patch("/api/tasks/:id", authMiddleware, async (req,res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        return res.status(404).json({ message: "Task not found" });
    }
        task.completed = !task.completed;
        const updatedTask = await task.save();

        res.json(updatedTask);
    
});

// Route: Delete a task
app.delete("/api/tasks/:id", authMiddleware, async (req,res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted"});
});


// Register Route
app.post("/api/auth/register", authMiddleware, async (req,res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists "});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/api/auth/login", async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials "});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

