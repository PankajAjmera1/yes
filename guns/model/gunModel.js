const mongoose = require("mongoose");

const gunSchema = new mongoose.Schema({

    isLegal: { type: Boolean, required: true },
    gunName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    automatic: { type: Boolean },
    timestamps: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gun", gunSchema);
