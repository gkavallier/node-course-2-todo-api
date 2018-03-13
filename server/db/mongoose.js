var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use the built-in  promise library as opposed to some 3rd party one

// create this block for heroku. if localhost db there select or go to mlab.com
let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://giorgos:paok@ds211309.mlab.com:11309/node-todo-api'
};

mongoose.connect(process.env.PORT ?  db.mlab : db.localhost);

module.exports = { mongoose };