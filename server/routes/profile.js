const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    res.json(req.user);
});

router.put('/profile/password', authenticate, async (req, res) => {
    try {
        const { password } = req.body;
        req.user.password = password;
        await req.user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
