const express = require('express');
const cors = require('cors');
const app = express();
const port = 7000;

const connectDb = require("./database/index")
const { register, login } = require('./controllers/auth');
const {getTodo,addTodo,deleteTodo}=require('./controllers/activity')

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

app.post('/register', register);
app.post('/login', login);
app.get('/gettoDo', getTodo);
app.post('/addtodo', addTodo);
app.delete('/todo/:id',deleteTodo)
connectDb().then(() => {
    app.listen(port, () => {
        console.log("Server is running on port 7000");
    })
}).catch((err) => {
    console.log(err);
})