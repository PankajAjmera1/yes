const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String, // Handled by passport-local-mongoose
    isFaculty: { type: Boolean, required: true },
    aadharNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
