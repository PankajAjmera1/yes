const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  monthlyIncome: Number,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);