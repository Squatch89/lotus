const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require("morgan");
const db = require("./models");
const axios = require('axios');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'public')));


// commented out until mongo is set up to reduce terminal tabs required to run project in development
mongoose.Promise = Promise;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect("mongodb://localhost/lotusDB", {
        useMongoClient: true
    });
}

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

app.post("/signup", (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.User.findOne({username})
        .then((user) => {
            if(user)
                return res.status(409).json({error: "User already exist"});

            const create_user = new db.User({
                username,
                password: hash
            });
            create_user.save((err) => {
                if(err)
                    return err;
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg:"Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });
});




app.post("/signin", (req, res) => {
    const {username, password} = req.body;

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



app.get('/user', verifyCookie, (req, res) => {
    res.json({msg:"Happy to be here"});
});

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

module.exports = app;
