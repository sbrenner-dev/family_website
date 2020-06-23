const express = require("express");
const router = express.Router();

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
});

module.exports = router;