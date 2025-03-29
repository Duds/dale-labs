// user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bowTieCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BowTieCard'
  }],
});

module.exports = mongoose.model('User', UserSchema);
