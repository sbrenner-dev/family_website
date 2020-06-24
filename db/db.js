const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

let db = mongoose.connection;

fs.readFile("/mnt/c/Development/Servers/Passwords/FamilyServer.txt", (error, data) => {
    if (error) throw error;
    let pass = data.toString();

    const databaseURI = "mongodb+srv://samuelbrenner:" + pass + "@cluster0-mesbk.mongodb.net/FamilyServer?retryWrites=true&w=majority"

    mongoose.connect(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on("error", function(err) {
        console.log("Mongoose Error: ", err);
    });

    db.once("open", function() {
        console.log("Mongoose connection successful.");
    });
});

module.exports = db;