const mongoose = require('mongoose');

const FundSchema = new mongoose.Schema({
    fundSource: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Funds', FundSchema);
