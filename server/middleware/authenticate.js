var {User} = require('./../models/user');


var authenticate = (req, res, next) => {        // next will be used by the middleware else it will get stuck
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            // res.status(401).send();
            return Promise.reject(); // same as above but better coding. this takes us directly to the catch block, function  stops executing and goes to catch block
        }

        req.user = user;  // will modify the req properties  of calling entity when middleare is called
        req.token = token; // will modify the req properties  of calling entity when middleare is called
        next();  // so the code of the calling function executes 
    }).catch((e) => {
        res.status(401).send();  //return that authentication failed. this catch block catches the reject case of findByToken method
        // we dont call next, we dont go to the calling function since auth failed
    });

};

module.exports = {authenticate};
