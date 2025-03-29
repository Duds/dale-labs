import Card from '../models/bowTieCards.js';

export const getCardReview = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.json(card);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

export const updateCardReview = async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(card);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
