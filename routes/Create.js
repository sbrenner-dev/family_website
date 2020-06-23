const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/create", function (req, res) {
    res.status(200).sendFile(path.resolve("public/html/create_account.html"))
});

module.exports = router;