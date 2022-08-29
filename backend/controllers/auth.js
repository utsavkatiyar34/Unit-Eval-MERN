const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../database/user");

const SECRET_KEY = "abgcvgjdyrnd@dndjfvfd *bdshbdc#";

async function register(req, res) {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;

  const user = await User.findOne({
    email,
    name,
    password,
  });

  if (user) {
    return res.status(400).send({
      status: "error",
      message: "User already registered",
    });
  }

  await User.create({
    email,
    name,
    password,
  });

  return res.status(200).send({
    status: "Successful",
    message: "User registered successfully.",
  });
}

async function login(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.status(400).send({
      status: "error",
      message: "User not registered",
    });
  }
  const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY);

  res.status(200).send({
    status: "Successful",
    message: "Login Successful",
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
}

async function getTodo() {}
async function addTodo() {}
module.exports = {
  register,
  login,
  getTodo,
  addTodo
};
