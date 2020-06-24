const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: Date
    },
    email: {
        type: String
    },
    email_notifs: {
        type: Boolean
    }
});

let User = mongoose.model('User', UserSchema);
module.exports = User;