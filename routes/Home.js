const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/home", function(req, res) {
    if (req.cookies.username === undefined) {
        res.status(200).redirect("http://192.168.1.19:3000/");
    } else {
        res.status(200).sendFile(path.resolve("public/html/home_page.html"));
    }
})

module.exports = router;