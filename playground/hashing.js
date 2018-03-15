const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// commented out in order to use jsonwebtoken instead. below records use crypto-js
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message : ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('data wasnt changed.');
// } else  {
//     console.log('data was changed, dont trust!')
// }

// below equivalent with jsonwebtoken

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);