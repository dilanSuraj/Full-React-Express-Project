const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4001;

//Attach to express router to do routes
const todoRoutes = express.Router();

//Model
let Todo = require('./todo.model');

//Middleware

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log('Mongo DB connection established successfully')
});

//End points:-handle get
todoRoutes.route('/').get(function (req, res) {


    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);

        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {

    let id = req.params.id;
    Todo.findById(id, function (err, todos) {

        res.json(todos);

    });
});

//End points:-handle post
todoRoutes.route('/add').post(function (req, res) {

    let todo = new Todo(req.body);

    todo.save()
        .then(todo => {
            res.status(200).json({'json': 'todo added successfully'})
        })
        .catch(err => {
            res.status(404).send('add new todo failed');
        })
});

todoRoutes.route('/update/:id').post(function (req, res) {

    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('data not found');

        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
                .catch(err => {
                    res.status(404).send('updated not successful!');
                });

        }

    });

});


app.use('/todos', todoRoutes);

app.listen(PORT, function () {
    console.log('Server is listening to the port 4001');
});
