import User from '../models/user.js';

export const getUserDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // Get the data that you want to send for the dashboard
        res.json(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
