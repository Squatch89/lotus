const express = require('express');
const apiRouter =  express.Router();

apiRouter.get("/user/", function(req, res) {
    // res.send("woooo it works");
    
    res.json([{
        id: 1,
        username: "Gene"
    }]);
});

apiRouter.get("/user/trends", function(req, res) {
    // res.send("woooo it works")
    res.json([{
        id: 1,
        username: "Gene"
    }, {
        id: 2,
        username: "Julie"
    }]);
});

module.exports = apiRouter;