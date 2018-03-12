var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use the built-in  promise library as opposed to some 3rd party one
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };