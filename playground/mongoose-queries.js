const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5aa71a66c4ec446814365e3133';


// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//         _id: id
// }).then((todos) => {
//         console.log('Todos ', todos);
// });

// Todo.findOne({
//         _id: id
// }).then((todo) => {
//         console.log('Todo ', todo);
// });

// Todo.findById({
//         _id: id
// }).then((todo) => {
//         if (!todo) {
//             return" console.log('ID not found');
//         }
//         console.log('Todo by id', todo);
// }).catch ((e) => console.log(e));

User.findById('5aa561379a182f78059e3ffd').then((user) => {
        if (!user) {
            return console.log('User  not found');
        }
        console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});