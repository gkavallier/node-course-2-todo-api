const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const bcrypt = require('bcryptjs');


//create mongoose model so mongoose knows how to store data

var UserSchema = new mongoose.Schema({
        email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator:  validator.isEmail ,  
            message: '{VALUE} is not a valid email'
        }
    }, 
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});


// arrow functions don't bind this keyword thats why we use classical function
//
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject(); // creates object taking mongoose user var with only the available properties existing
    
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;     // instance methods (small letters) called with the individual document
    var access = 'auth';
    var token =  jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    // user.tokens.push({access,token});
    // push method above also works for me but for later versions of mongo concat method below works only
    user.tokens = user.tokens.concat([{
        access: access, 
        token: token
    }]);
    return user.save().then(() => {
        return token; // returning value not function in promise because this will be used by anoter then in server
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            // tokens: {
            //     token: token
            // }
            tokens: { token }   // better ES6 syntax
        }
    });
};

// statics instead of method returns a model method as opposed to instance method (must se what it means)

UserSchema.statics.findByToken = function(token) {
    var User = this; //  model methods get called with the model as the "this" binding
    var decoded;  //decoded initially undefined because we need to use (below) the try block in case of error so to catch it

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise ((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject(); // this simplifies the code above doing exactly the same thing. we need to return a reject promise to be taken by the then/catch block of the original caller in server.js
    }
    return User.findOne({
        '_id': decoded._id,    // quotes here not necessary needed but do so for consistency with below
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this; //  model methods get called with the model as the "this" binding
   
    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        // bcrypt.compare uses callbacks. if we want to use promises we use below syntax
        return new Promise((resolve, reject) => {

            bcrypt.compare(password,user.password, (err,res) => {

                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

// .pre is a mongoose middleware so this runs code before an event - this time the save event

UserSchema.pre('save', function (next) {  // classic function because we use the this
    var user = this;
    
    if (user.isModified('password') ) {


        bcrypt.genSalt(10, (err, salt)  => {               // if user password is modified only then hash password. d
            bcrypt.hash(user.password, salt, (err,hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();            // if user password is not modified (e.g. we modified some other property of user e.g. email), dont hash  it (its hashed already)
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};