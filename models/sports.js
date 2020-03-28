const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sportSchema = new Schema({
    name: String,
    positions: Object
}, {
    versionKey: false
});

module.exports = mongoose.model("Sport", sportSchema, "sports");