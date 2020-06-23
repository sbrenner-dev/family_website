const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

let filename = path.join(__dirname, "../DBPassword.txt");

fs.readFile(filename, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

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