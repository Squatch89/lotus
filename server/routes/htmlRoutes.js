const express = require('express');
const htmlRouter =  express.Router();

htmlRouter.get("/home", function(req, res) {
    // res.send("woooo it works");
    
    res.json([{
        id: 1,
        username: "Gene"
    }]);
});

module.exports =htmlRouter;