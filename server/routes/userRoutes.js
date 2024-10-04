const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// CREATE user
router.post('/', async (req, res) => {
    const { name, age, hobbies } = req.body;
    try {
        const newUser = new User({ name, age, hobbies });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE user
router.put('/:id', async (req, res) => {
    const { name, age, hobbies } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, age, hobbies }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
