// const MongoClient = require('mongodb').MongoClient; //(below struct is eqiuvalent)
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5aa494d8e9d2f90d603c1194')
    //     }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unablke to fetch Todos', err);
    // });
  
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
        
    // }, (err) => {
    //     console.log('Unablke to fetch Todos', err);
    // });


    db.collection('Users').find({name: "Giorgos"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
        
    }, (err) => {
        console.log('Unablke to fetch Users', err);
    });

    //db.close();
});
