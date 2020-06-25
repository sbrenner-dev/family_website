const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../db/db");
const fs = require("fs");

let PostMessage = require("../models/PostMessage");
let Encoder = require("../public/scripts/Encoder");

router.post("/new_board_message/:post", function(req, res) {

    // actual post

    let req_post = JSON.parse(req.params.post);

    let post = new PostMessage({
        post_username: req_post.post_username,
        title: req_post.title,
        contents: req_post.contents,
        post_time: req_post.post_time,
    });

    post.save((err, doc) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).send(doc);
        }
    });

    // send emails - associated with post action but not response status, so put after

    db.db.collection("users").find({}).toArray((err, array) => {
        if (!err) {
            fs.readFile("/mnt/c/Development/Servers/Passwords/EmailPassword.txt", (err, data) => {
                if (!err) {
                    array.forEach(user => {
                        if (user.email !== undefined && user.email_notifs && user.username !== req.cookies.username) {
                            if (err) throw err;
                            let pass = data.toString();
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                secure: true,
                                requireTLS: true,
                                auth: {
                                    user: "brennoconfamilyserver@gmail.com",
                                    pass: pass,
                                }
                            });

                            let e = new Encoder();

                            var mailOptions = {
                                from: "brennoconfamilyserver@gmail.com",
                                to: user.email,
                                subject: "[Family Server] " + e.decode(req_post.title),
                                text: e.decode(req_post.contents) + "\nBy " + req_post.post_username
                            };

                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Email to " + user.email);
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;