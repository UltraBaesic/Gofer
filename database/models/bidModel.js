const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  errandId: {
    type: String,
    required: true
  },
  bidder: {
    type: String,
    required: true
  },
  errandPoster: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Bid', bidSchema);