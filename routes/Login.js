const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
    if (req.cookies.username === undefined) {
        res.status(200).sendFile(path.resolve("public/html/login_page.html"));
    } else {
        res.status(200).redirect("http://192.168.1.19:3000/home");
    }
});

module.exports = router;