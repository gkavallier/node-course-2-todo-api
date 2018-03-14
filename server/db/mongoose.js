var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use the built-in  promise library as opposed to some 3rd party one

// create this block for heroku. if localhost db there select or go to mlab.com
var db = process.env.MONGODB_URI;

mongoose.connect(db);

module.exports = { mongoose };