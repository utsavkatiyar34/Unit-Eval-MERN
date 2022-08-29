const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    taskName: String,
    status: Boolean,
    tag: String,
}, {
    timestamps: true
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;