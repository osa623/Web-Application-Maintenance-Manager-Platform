// models/DonationFund.js
const mongoose = require('mongoose');
const TotalFund = require('./Totalfund');

const DonationFundSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now, required: true },
    donationFund: { type: Number, required: true }
});

DonationFundSchema.post('save', function(doc, next) {
    updateTotalFund();
    next();
});

module.exports = mongoose.model('DonationFund', DonationFundSchema);

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
