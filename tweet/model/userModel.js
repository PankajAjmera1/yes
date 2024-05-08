const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true }, // Changed 'type' to 'age'
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    address: { // Added 'address' as an object with a 'location' property
        location: { type: String, required: true } // Assuming 'location' is a mandatory field
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
