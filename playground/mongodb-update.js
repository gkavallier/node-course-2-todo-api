// const MongoClient = require('mongodb').MongoClient; //(below struct is eqiuvalent)
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

  
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5aa537c8c84e037c0b76e704')
    // }, {
    //     $set: {
    //         completed: true
    //         }
    // }, {
    //     returnOriginal: false
    // }).then ((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aa50a6567c99b1bdc276edb')
    }, {
        $set: {
            name: 'Giorgos'
            }, 
        $inc: {age: 1}
            
    }, {
        returnOriginal: false
    }).then ((result) => {
        console.log(result);
    });



    //db.close();
});