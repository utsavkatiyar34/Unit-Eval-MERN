const { query } = require("express");
const Todo = require("../database/todo");

async function addTodo(req,res) {
  let taskName = req.body.taskName;
  let  status= req.body.status;
  let  tag = req.body.tag;

  const todo = await Todo.findOne({
    taskName,
    status,
    tag
  });

  if (todo) {
    return res.status(400).send({
      status: "error",
      message: "Task already registered",
    });
  }

  await Todo.create({
    taskName,
    status,
    tag
  });

  return res.status(200).send({
    status: "Successful",
    message: "Task registered successfully.",
  });
}
async function getTodo(req,res) {
    const todos=await Todo.find();
    return res.status(200).send(todos);
}
 
async function deleteTodo(req,res) {
    const todos=await Todo.findOneAndDelete({ _id: req.params.id });
     return res.status(200).send(todos);
} 
module.exports = {
    getTodo,
    addTodo,
    deleteTodo
  };