// models/TotalFund.js
const mongoose = require('mongoose');

const TotalFundSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('TotalFund', TotalFundSchema);
