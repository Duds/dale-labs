// bowTieCards.js
const mongoose = require('mongoose');

const bowTieCardSchema = new mongoose.Schema({
  hazard: { type: String, required: true },
  causes: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  preventativeControls: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  mitigatingControls: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  consequences: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('BowTieCard', bowTieCardSchema);
