const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    subject: String,
    completed: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);