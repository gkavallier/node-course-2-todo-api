const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos} ); // we pass an object with array instead of array to be flex for future
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
         console.log('ID not valid', id);
         return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo} ); 
    }, (e) => {
        res.status(400).send();
    });

});


// Todo.findById({
//         _id: id
// }).then((todo) => {
//         if (!todo) {
//             return" console.log('ID not found');
//         }
//         console.log('Todo by id', todo);
// }).catch ((e) => console.log(e));

app.listen(3000, () => {
    console.log('started server on port 3000...');
});

module.exports = {app};
