const express = require("express");
const router = express.Router();

let User = require("../models/User");

router.patch("/email/:new_info", (req, res) => {
    let update = JSON.parse(req.params.new_info);

    User.findOne({ username: update.username }, (err, doc) => {
        if (err) {
            res.sendStatus(500);
        } else if (!doc) {
            res.sendStatus(404);
        } else {
            doc.email = update.email;
            doc.email_notifs = update.email_notifs;
            doc.save();
            res.status(200).send(doc);
        }
    });
});

module.exports = router;