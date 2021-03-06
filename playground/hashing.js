const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err,salt) => {
//     bcrypt.hash(password, salt, (err,hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword1 = '$2a$10$hG/c7gssM5JOFTmItrwZkO3kTVCaQbBtv5/tenlgdKn5N8vXC95W6';

var hashedPassword2 = '$2a$10$0UtPOFTm7tiqfRPmF9tZ5ub.1/kyTNrbj/skNEmeBBPP6lERZDQBi';

bcrypt.compare(password, hashedPassword1, (err,res) => {
    console.log(res);
});

bcrypt.compare(password, hashedPassword2, (err,res) => {
    console.log(res);
});

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

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);