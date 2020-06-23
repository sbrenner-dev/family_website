const express = require("express");
const router = express.Router();

let PostMessage = require("../models/PostMessage");

router.delete("/delete_board_message/:title", (req, res) => {
    let title = req.params.title;

    PostMessage.findOneAndDelete({title: title}, (err, doc) => {
        if (err) {
            res.sendStatus(500);
        } else if (!doc) {
            res.sendStatus(401);
        } else {
            res.status(200).send(doc);
        }
    });
});

module.exports = router;