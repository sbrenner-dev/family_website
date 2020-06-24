const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../db/db");
const fs = require("fs");

let PostMessage = require("../models/PostMessage");

router.post("/new_board_message/:post", function(req, res) {

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

    // send emails

    db.db.collection("users").find({}).toArray((err, array) => {
        if (!err) {
            array.forEach(user => {
                try {
                    if (user.email !== undefined && user.email_notifs && user.username !== req.cookies.username) {
                        fs.readFile("/mnt/c/Development/Servers/Passwords/EmailPassword.txt", (error, data) => {
                            if (error) throw error;
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

                            var mailOptions = {
                                from: "brennoconfamilyserver@gmail.com",
                                to: user.email,
                                subject: "[Family Server] " + req_post.title,
                                text: req_post.contents + "\nBy " + req_post.post_username
                            };

                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        });
                    }
                } catch (e) {}
            });
        }
    });

});

module.exports = router;