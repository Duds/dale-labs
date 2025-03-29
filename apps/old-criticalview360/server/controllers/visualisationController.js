import Card from '../models/bowTieCards.js';

export const getCardVisualisation = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        // Generate the visualisation based on the card
        res.json(card);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
