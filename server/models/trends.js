const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrendsSchema = new Schema({
    mood: {
        type: String,
        unique: true
    }
    //how you make relations in mongo
    // comment: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
});
const Trends = mongoose.model("Trends", TrendsSchema);

module.exports = Trends;