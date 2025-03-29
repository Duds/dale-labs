// controllers/bowTieCardController.js

const BowTieCard = require('../models/bowTieCard');

exports.createBowTieCard = async (req, res) => {
  try {
    const newBowTieCard = new BowTieCard(req.body);
    const savedBowTieCard = await newBowTieCard.save();

    res.json(savedBowTieCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBowTieCard = async (req, res) => {
  try {
    const bowTieCard = await BowTieCard.findById(req.params.id);

    if (!bowTieCard) {
      return res.status(404).json({ message: 'Bow Tie Card not found' });
    }

    res.json(bowTieCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBowTieCard = async (req, res) => {
  try {
    const updatedBowTieCard = await BowTieCard.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBowTieCard) {
      return res.status(404).json({ message: 'Bow Tie Card not found' });
    }

    res.json(updatedBowTieCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBowTieCard = async (req, res) => {
  try {
    const deletedBowTieCard = await BowTieCard.findByIdAndDelete(req.params.id);

    if (!deletedBowTieCard) {
      return res.status(404).json({ message: 'Bow Tie Card not found' });
    }

    res.json({ message: 'Bow Tie Card deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
