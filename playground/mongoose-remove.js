const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove (removes multiple records)
// removes all records from db - get nothing back only how many removed
// Todo.remove({}).then((result) => {
//     console.log(result);
// });
// find one and remove it  - remove the very first one and remove it. returns removed data

// Todo.findOneAndRemove
Todo.findOneAndRemove(_id: '5aa812acb6df0ba3b6963909').then((todo) => {
    console.log(todo);
});


// remove the specific one with the specific ID
Todo.findByIdAndRemove('5aa812acb6df0ba3b6963909').then((todo) => {
    console.log(todo);
});