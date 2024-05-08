const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  tweetContent: {
    type: String,
    required: true,
    trim: true
  },
//   username: {
//     type: String,
//     required: true,
//     trim: true
//   },
  likes: {
    type: Number,
    default: 0
  },
  retweets: {
    type: Number,
    default: 0
  }
}, { timestamps: true }); // Adding timestamps option

module.exports = mongoose.model('Tweet', tweetSchema);
