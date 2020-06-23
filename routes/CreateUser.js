const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

let User = require("../models/User");

const salt_rounds = 10;

router.post("/new_user/:user", function (req, res) {
    let req_user = JSON.parse(req.params.user);

    let found = false;

    User.findOne({username: req_user.username}, function (error, doc) {
        if (!error && doc) {
            return true;
        } else {
            return false;
        }
    }).then(found => {
        if (!found) {
            bcrypt.genSalt(salt_rounds, function (err, salt) {
                bcrypt.hash(req_user.password, salt, function(err, hash) {
        
                    let new_user = new User({
                        username: req_user.username,
                        firstname: req_user.firstname,
                        lastname: req_user.lastname,
                        password: hash,
                        birthday: req_user.birthday
                    });
                
                    new_user.save((error, document) => {
                        if (error) {
                            res.sendStatus(500);
                        } else {
                            res.status(200).send(document);
                        }
                    });
                });
            });
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;