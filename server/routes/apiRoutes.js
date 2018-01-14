const express = require('express');
const apiRouter =  express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const db = require("../models");


apiRouter.get("/", function(req, res) {
    res.send("woooo it works")
});

const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
        data:{
            _id,
            username
        }
    }, 'awesome');
    return token;
};

apiRouter.post("/signup", (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.User.findOne({username})
        .then((user) => {
            if(user) {
                return res.status(409).json({error: "User already exists"});
            }

            const create_user = new db.User({
                username,
                password: hash
            });
            create_user.save((err,user) => {
                if(err) {
                    return err;
                }

                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg:"Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });
});




apiRouter.post("/signin", (req, res) => {
    const {username, password} = req.body;

    console.log("Got the post!!");

    db.User.findOne({username})
        .then((user) => {
            if(bcrypt.compareSync(password, user.password)){
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg:"User is signed in"});
            } else{
                res.status(400).json({error:'Password does not match'});
            }
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });

});


const verifyCookie = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, 'awesome', (err, decoded) => {
        if(err){
            res.status(401).json({error:"No Access buddy"});
        } else{
            next();
        }
    });

};



apiRouter.get('/user', verifyCookie, (req, res) => {
    res.json({msg:"HapiRoutery to be here"});
});

module.exports =apiRouter;