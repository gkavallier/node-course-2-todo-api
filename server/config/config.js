console.log('======env=====',process.env.NODE_ENV);
var env = process.env.NODE_ENV || 'development'; // if production , this will be set to 'production'
console.log('*******env******', env);

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    });
}
// this is for heroku but I will update with heroku configurationof env variables
// if (env === 'production') {
//     process.env.MONGODB_URI =  'mongodb://giorgos:paok@ds211309.mlab.com:11309/node-todo-api';
//     process.env.JWT_SECRET = "secretkeyforheroku";
// }