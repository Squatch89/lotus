const express = require('express');
const htmlRouter =  express.Router();

htmlRouter.get("/", function(req, res) {
    res.send("woooo it works")
});

module.exports =htmlRouter;