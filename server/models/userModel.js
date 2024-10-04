const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
