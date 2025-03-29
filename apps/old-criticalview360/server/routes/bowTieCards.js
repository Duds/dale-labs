// routes/bowTieCards.js

const express = require('express');
const router = express.Router();
const bowTieCardController = require('../controllers/bowTieCardController');
const authenticate = require('../middleware/authenticate');

// Create a new Bow Tie Card
router.post('/', authenticate, bowTieCardController.createBowTieCard);

// Get a specific Bow Tie Card
router.get('/:id', authenticate, bowTieCardController.getBowTieCard);

// Update a specific Bow Tie Card
router.put('/:id', authenticate, bowTieCardController.updateBowTieCard);

// Delete a specific Bow Tie Card
router.delete('/:id', authenticate, bowTieCardController.deleteBowTieCard);

module.exports = router;
