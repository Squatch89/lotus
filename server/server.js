const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require("morgan");
const db = require("./models");
const axios = require('axios');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: '{YOUR-AUTH0-DOMAIN}',
    algorithms: ['RS256']
});







//commented out until mongo is set up to reduce terminal tabs required to run project in development
// mongoose.Promise = Promise;
//
// if (process.env.MONGODB_URI) {
//     mongoose.connect(process.env.MONGODB_URI);
// }
// else {
//     mongoose.connect("mongodb://localhost/lotudDB", {
//         useMongoClient: true
//     });
// }

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
