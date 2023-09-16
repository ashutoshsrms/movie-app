const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // userid: { type: Number, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isLoggedIn: { type: Boolean, default: false },
  // uuid: { type: String },
  // accesstoken: { type: String },
  coupens: [{ type: String }], 
  bookingRequests: [{ type: String }] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
