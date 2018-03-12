var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use the built-in  promise library as opposed to some 3rd party one
mongoose.connect('mongodb://localhost:27017/TodoApp');

//create mongoose model so mongoose knows how to store data

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo ',doc);
// }, (e) => {
//     console.log('Unable to save Todo');
// });


// var otherTodo = new Todo({
//     text: 'Something to do'
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save ', e);
// });

// user model 
// email property require it - trim it - set type - set minlength of 1
// create a new user

var user = new User({
    email: '   paparas@paparas.net  '
});

user.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save ',e );
});
