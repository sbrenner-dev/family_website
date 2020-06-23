const mongoose = require('mongoose');
const databaseURI = "mongodb+srv://samuelbrenner:Q8aGT682tyjEKb@@cluster0-mesbk.mongodb.net/FamilyServer?retryWrites=true&w=majority"

mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

module.exports = db;