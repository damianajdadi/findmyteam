const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    team_id: String,
    team: Object,
    sport: Object,
    position: Object,
    city: String,
    notes: String
}, {
    versionKey: false
});

module.exports = mongoose.model("Offers", offerSchema, "offers");