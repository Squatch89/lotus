const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const db = require("../models");
const moment = require('moment');

const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
        data: {
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
            if (user) {
                return res.status(409).json({error: "User already exists"});
            }
            
            const create_user = new db.User({
                username,
                password: hash
            });
            create_user.save((err, user) => {
                if (err) {
                    return err;
                }
                
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
});

apiRouter.post("/signin", (req, res) => {
    const {username, password} = req.body;
    
    console.log("Got the post!!");
    
    db.User.findOne({username})
        .then((user) => {
            if (bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "User is signed in"});
            } else {
                res.status(400).json({error: 'Password does not match'});
            }
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
    
});

const verifyCookie = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, 'awesome', (err, decoded) => {
        if (err) {
            res.status(401).json({error: "No Access buddy"});
        } else {
            next();
        }
    });
    
};

apiRouter.post('/mood', (req, res) => {
    console.log("Got the post!");
    const {username, year, month, day, mood} = req.body;
    console.log(username);
    console.log(mood);
    console.log(year);
    console.log(month);
    console.log(day);
    
    //checks to see if a user exits
    db.User.findOne({username: username})
        .then((userData) => {
            console.log(userData.mood.length);
            //checks to see if a user has any moods logged yet
            if (userData.mood.length > 0) {
                db.User.findOne({username: username})
                    .populate("mood")
                    .then((userTrends) => {
                        const lastPostDate = moment(userTrends.mood[userTrends.mood.length - 1].date);
                        
                        //checks to see if a user has logged a mood today
                        if (lastPostDate.year() === year && lastPostDate.month() === month && lastPostDate.date() === day) {
                            console.log("you've already made a post today");
                            res.send(true);
                        }
                        else {
                            //if a user has not logged a mood today then allow them to log a mood
                            console.log("you make post!");
                            db.Trends.create({mood: mood})
                                .then((dbTrend) => {
                                    console.log("first .then");
                                    return db.User.findOneAndUpdate({username: username}, {$addToSet: {mood: dbTrend._id}}, {new: true});
                                })
                                .then((dbUser) => {
                                    console.log("mood logged");
                                    res.send(true);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(400).json({err: "Connection error"});
                                });
                        }
                        // res.json(userTrends.mood);
                    })
                    .catch((err) => {
                        console.log("didn't populate mood data correctly");
                        res.status(400).json({err: "Connection error"});
                    });
            }
            else {
                //if a user has not logged their first ever mood let them log a mood
                if (mood === "no") {
                    res.send(false);
                }
                else {
                    db.Trends.create({mood: mood})
                        .then((dbTrend) => {
                            console.log("first .then");
                            return db.User.findOneAndUpdate({username: username}, {$addToSet: {mood: dbTrend._id}}, {new: true});
                        })
                        .then((dbUser) => {
                            console.log("mood logged");
                            res.json(dbUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({err: "Connection error"});
                        });
                }
            }
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
            res.status(400).json({err: "Connection error"});
        });
});

apiRouter.get('/mood/trends/prevdata/:username', (req, res) => {
    console.log("received get request");
    console.log(req.params.username);
    
    db.User.findOne({username: req.params.username})
        .populate("mood")
        .then((prevData) => {
            console.log(prevData.mood);
            res.send(prevData.mood);
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        })
    
});

apiRouter.get('/user', verifyCookie, (req, res) => {
    res.json({msg: "Happy to be here"});
});

module.exports = apiRouter;




