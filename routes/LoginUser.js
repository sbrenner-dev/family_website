const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

let User = require("../models/User");

router.head("/login/:basicuser", function(req, res) {
    let basicuser = JSON.parse(req.params.basicuser);
    User.findOne({ username: basicuser.username }, function(err, doc) {
        if (!err && doc) {
            return doc;
        } else {
            return null;
        }
    }).then(doc => {
        if (doc != null) {
            bcrypt.compare(basicuser.password, doc.password).then(result => {
                if (result) {
                    // this part can be changed depending on if new information is needed
                    if (doc.email === undefined) {
                        res.sendStatus(301);
                    } else {
                        res.sendStatus(200);
                    }
                } else {
                    res.sendStatus(401);
                }
            });
        } else {
            res.sendStatus(404);
        }
    });
})

module.exports = router;