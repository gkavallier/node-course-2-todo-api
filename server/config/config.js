var env = process.env.NODE_ENV || 'development'; // if production, this will be set to 'production'

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; 
} else if (enf === 'production') {
    process.env.MONGODB_URI =  'mongodb://giorgos:paok@ds211309.mlab.com:11309/node-todo-api';
}