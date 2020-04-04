const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applySchema = new Schema({
    offer: Object,
    player: Object,
}, {
    versionKey: false
});

module.exports = mongoose.model("Applies", applySchema, "applies");