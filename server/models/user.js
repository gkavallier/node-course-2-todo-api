const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const _ = require('lodash');


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
    var user = this;
    var access = 'auth';
    var token =  jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
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

var User = mongoose.model('User', UserSchema);

module.exports = {User};