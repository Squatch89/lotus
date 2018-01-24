const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrendsSchema = new Schema({
    mood: {
        type: String
    },
    date: { type: Date, default: Date.now },
});
const Trends = mongoose.model("Trends", TrendsSchema);

module.exports = Trends;