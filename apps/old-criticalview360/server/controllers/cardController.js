import Card from '../models/bowTieCards.js';

export const createNewCard = async (req, res) => {
    try {
        const card = new Card(req.body);
        await card.save();
        res.status(201).json(card);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.json(cards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
