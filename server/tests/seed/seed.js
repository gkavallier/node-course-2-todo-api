// const expect = require('expect');
// const request = require('supertest');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

// const {app} = require('./../server');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];


const populateTodos  = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());

};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        // Promise.all([userOne, userTwo]).then (()=> { //promiseall makes callback to go to then only when all promises in array resolve
        //                                         // in our case then fires only after both userOne and userTwo promises resove
        // })
        return Promise.all([userOne, userTwo]) // same as above but better syntax

    }).then(() => done());
    
};

module.exports = {todos, populateTodos, users, populateUsers};