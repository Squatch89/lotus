const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const db = require("../models");

// generates json web token
const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
        data: {
            _id,
            username
        }
    }, 'someone');
    return token;
};

// signup post to create new user
apiRouter.post("/signup", (req, res) => {
    const {username, password} = req.body;
    username = username.toLowerCase();
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

// signin post
apiRouter.post("/signin", (req, res) => {
    const {username, password} = req.body;
    
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

// verifies cookies from login
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

// posts a daily mood
apiRouter.post('/daily/mood', (req,res) => {
    const {username, year, month, day, mood} = req.body;
    db.Trends.create({mood: mood})
        .then((dbTrend) => {
            return db.User.findOneAndUpdate({username: username}, {$addToSet: {mood: dbTrend._id}}, {new: true});
        })
        .then((dbUser) => {
            res.send(true);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({err: "Connection error"});
        });
});

// checks for daily mood
apiRouter.post('/mood', (req, res) => {
    const {username, year, month, day} = req.body;

    //checks to see if a user exits
    db.User.findOne({username: username})
        .then((userData) => {
            //checks to see if a user has any moods logged yet
            if (userData.mood.length > 0) {
                db.User.findOne({username: username})
                    .populate("mood")
                    .then((userTrends) => {
                        const lastPostDate = moment(userTrends.mood[userTrends.mood.length - 1].date);

                        
                        //checks to see if a user has logged a mood today
                        if (lastPostDate.year() === year && lastPostDate.month() === month && lastPostDate.date() === day) {
                            res.send(true);
                        }
                        else {
                            //if a user has not logged a mood today then allow them to log a mood
                            res.send(false);
                        }
                        // res.json(userTrends.mood);
                    })
                    .catch((err) => {
                        console.log("didn't populate mood data correctly");
                        res.status(400).json({err: "Connection error"});
                    });
            }
            else {
               res.send(false);
            }
        });
    
    
});

// gets trends data
apiRouter.get('/mood/trends/:username', (req, res) => {
    
    db.User.findOne({username: req.params.username})
        .populate("mood")
        .then((userTrends) => {
            res.json(userTrends.mood);
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
});

// gets previous trends data
apiRouter.get('/mood/trends/prevdata/:username', (req, res) => {
    
    db.User.findOne({username: req.params.username})
        .populate("mood")
        .then((prevData) => {
            res.send(prevData.mood);
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        })
    
});

apiRouter.get('/user', verifyCookie, (req, res) => {
    res.json({msg: "Cookie verified"});
});

module.exports = apiRouter;




