const express = require('express');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const Candidate = require('../models/Candidate');

const router = express.Router();

router.post('/candidates', [authenticate, authorizeRole('admin')], async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/candidates/:candidateId', [authenticate, authorizeRole('admin')], async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, req.body, { new: true });
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/candidates/:candidateId', [authenticate, authorizeRole('admin')], async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.candidateId);
        res.json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
