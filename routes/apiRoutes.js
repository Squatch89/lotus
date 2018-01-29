const express = require('express');
const apiRouter =  express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const db = require("../models");

const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
        data:{
            _id,
            username
        }
    }, 'someone');
    return token;
};

const generateTimeToken = (time) => {
    const timeToken = jwt.sign({
        exp: time,
        data: {
            mood: "mood timeout"
        }
    }, 'sometime');
    return timeToken;
};

const setTimeCookie = (time) => {
    document.cookie = 'cookie=time;expires='+time+';path=/';
    res.cookie('nextMood', true)
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
            res.status(401).json({error:"Access Denied"});
        } else{
            next();
        }
    });

};

apiRouter.post('/mood', (req, res) => {
    console.log("Got the post!");
    const {username, mood} = req.body;
    console.log(username);
    console.log(mood);
    
    db.Trends.create({mood:mood})
        .then((dbTrend) => {
            console.log("first .then");
            return db.User.findOneAndUpdate({username: username}, {$addToSet: {mood: dbTrend._id}}, {new: true});
        })
        .then((dbUser) => {
            console.log("mood logged");

            // res.json(dbUser);

            // generates token for tracking mood logs
            const beginningOfDay = moment(Date.now()).startOf('day');
            const nextDay = beginningOfDay.add(1,'days').unix();
            console.log(nextDay);
            const timeToken = generateTimeToken(nextDay);
            res.cookie("timeToken", timeToken);
            res.status(200).json({msg:"User mood is stored"});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({err:"Connection error"});
        });
});

apiRouter.get('/mood/trends/:username', (req, res) => {
    
    console.log("received get request");
    console.log(req.params.username);
    
    db.User.findOne({username: req.params.username})
        .populate("mood")
        .then((userTrends) => {
            console.log(userTrends.mood);
            res.json(userTrends.mood);
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });
});

apiRouter.get('/mood/trends/prevweek/:username', (req, res) => {
    console.log("received get request");
    console.log(req.params.username);
   
    db.User.findOne({username: req.params.username})
        .populate("mood")
        .then((prevWeek) => {
            console.log(prevWeek.mood);
            res.send(prevWeek.mood);
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        })
       
});

apiRouter.get('/user', verifyCookie, (req, res) => {
    res.json({msg:"Happy to be here"});
});

module.exports =apiRouter;