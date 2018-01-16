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

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

module.exports = app;
