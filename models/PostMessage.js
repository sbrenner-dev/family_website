const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostMessageSchema = new Schema({
    post_username: {
        type: String
    },
    title: {
        type: String,
    },
    contents:{
        type: String,
    },
    post_time:{
        type: Date
    }
});

let PostMessage = mongoose.model('PostMessage', PostMessageSchema);
module.exports = PostMessage;