const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Temporary data(fake database)

let tasks = [
    { id: 1, title: "Study React", completed: false },
    { id: 2, title: "Revise DSA", completed: true }
];

// Route: Get all tasks
app.get("/api/tasks", (req,res) => {
    res.json(tasks);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

