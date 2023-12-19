// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  creditCardNumber: {
    type: String,
    required: true,
    maxlength: 16,
  },
  cvv: {
    type: String,
    required: true,
    maxlength: 3,
  },
  cardExpiry: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
