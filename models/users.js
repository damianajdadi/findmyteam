const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    type: String,
    name: String,
    surname: String,
    phone: Number,
    sport: String,
    position: String,
    dominantLeg: String,
    age: Number,
    experience: String,
    city: String,
    category: String
}, {
    versionKey: false
});

module.exports = mongoose.model("User", userSchema, "users");