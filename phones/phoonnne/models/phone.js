const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  phoneName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  isIOS: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Phone", phoneSchema);