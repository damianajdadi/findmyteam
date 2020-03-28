const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    team_id: String,
    sport_id: String,
    position_id: String,
    city: String,
    notes: String
}, {
    versionKey: false
});

module.exports = mongoose.model("Offers", offerSchema, "offers");