const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    type: String,
    name: String,
    surname: String,
    phone: Number,
    sport: Object,
    position: Object,
    dominantLeg: String,
    age: Number,
    experience: String,
    city: String,
}, {
    versionKey: false
});

module.exports = mongoose.model("User", userSchema, "users");