const express = require("express");
const router = express.Router();

const db = require("../db/db");

router.get("/get_messages", function (req, res) {
    var dbo = db.db;
    dbo.collection("postmessages").find({}).toArray(function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).send(result);
        }
    })
});

module.exports = router;