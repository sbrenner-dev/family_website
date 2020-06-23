const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    password:{
        type: String
    },
    birthday:{
        type: Date
    }
});

let User = mongoose.model('User', UserSchema);
module.exports = User;