var env = process.env.NODE_ENV || 'development'; // if production, this will be set to 'production'
console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; 
} else if (enf === 'production') {
    process.env.MONGODB_URI =  'mongodb://giorgos:paok@ds211309.mlab.com:11309/node-todo-api';
}
 
const {ObjectID} = require('mongodb');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
         console.log('ID not valid', id);
         return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo} ); 
    }, (e) => {
        res.status(400).send();
    });

});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);  // allows specific properties to be picked and passed ot target obhect while protecting others
    if (!ObjectID.isValid(id)) {
         console.log('ID not valid', id);
         return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then ((todo) => {//set body in object and prefer the new one than the original  
        if (!todo ) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch ((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`started server at port ${port}...`);
});

module.exports = {app};
 