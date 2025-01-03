const express = require('express');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const Candidate = require('../models/Candidate');

const router = express.Router();

router.get('/candidates', authenticate, async (req, res) => {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
});

router.post('/vote/:candidateId', [authenticate, authorizeRole('voter')], async (req, res) => {
    try {
        if (req.user.voted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        const candidate = await Candidate.findById(req.params.candidateId);
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

        candidate.votes += 1;
        await candidate.save();

        req.user.voted = true;
        await req.user.save();

        res.json({ message: 'Vote cast successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/vote/count', authenticate, async (req, res) => {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
});

module.exports = router;
