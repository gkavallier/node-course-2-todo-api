require('./config/config.js');

 
const {ObjectID} = require('mongodb');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

app.post('/users', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {   // for some reason deleted the user argument from then because the user although not same value points to same memory location so not to confuse things ??
//        res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user); // return token in header
    }).catch( (e) => {
        res.status(400).send(e);
    });
});

// commented out we are calling the authenticate from separate file
//
// var authenticate = (req, res, next) => {        // next will be used by the middleware else it will get stuck
//     var token = req.header('x-auth');

//     User.findByToken(token).then((user) => {
//         if (!user) {
//             // res.status(401).send();
//             return Promise.reject(); // same as above but better coding. this takes us directly to the catch block, function  stops executing and goes to catch block
//         }

//         req.user = user;  // will modify the req properties  of calling entity when middleare is called
//         req.token = token; // will modify the req properties  of calling entity when middleare is called
//         next();  // so the code of the calling function executes 
//     }).catch((e) => {
//         res.status(401).send();  //return that authentication failed. this catch block catches the reject case of findByToken method
//         // we dont call next, we dont go to the calling function since auth failed
//     });

// };

app.get('/users/me', authenticate, (req, res) => {      //authenticate middleware will be used
    // var token = req.header('x-auth');

    // User.findByToken(token).then((user) => {
    //     if (!user) {
    //         // res.status(401).send();
    //         return Promise.reject(); // same as above but better coding. this takes us directly to the catch block, function  stops executing and goes to catch block
    //     }

    //     res.send(user);
    // }).catch((e) => {
    //     res.status(401).send();  //return that authentication failed. this catch block catches the reject case of findByToken method
    // });

    // code above is replaced by the authenticate middleware defined above which authenticates and then sends the req.user if auth ok
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`started server at port ${port}...`);
});

module.exports = {app};
 