// models/AdoptionFund.js
const mongoose = require('mongoose');
const TotalFund = require('./Totalfund');

const AdoptionFundSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now, required: true },
    adoptionFund: { type: Number, required: true }
});

AdoptionFundSchema.post('save', function(doc, next) {
    updateTotalFund();
    next();
});

module.exports = mongoose.model('AdoptionFund', AdoptionFundSchema);

async function updateTotalFund() {
    const totalDonation = await mongoose.model('DonationFund').aggregate([
        { $group: { _id: null, total: { $sum: "$donationFund" } } }
    ]);
    const totalAdoption = await mongoose.model('AdoptionFund').aggregate([
        { $group: { _id: null, total: { $sum: "$adoptionFund" } } }
    ]);
    const totalAmount = (totalDonation[0]?.total || 0) + (totalAdoption[0]?.total || 0);
    await TotalFund.findOneAndUpdate({}, { totalAmount }, { upsert: true });
}
