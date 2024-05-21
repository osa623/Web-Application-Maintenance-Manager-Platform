// routes/fundRoutes.js (Example to adjust both AdoptionFund and DonationFund)
const express = require('express');
const router = express.Router();
const AdoptionFund = require('../models/Adoptionfund');
const DonationFund = require('../models/Donationfund');
const TotalFund = require('../models/Totalfund');

// Function to update the total fund
async function updateTotalFund() {
    const adoption = await AdoptionFund.findOne().sort({ date: -1 }) || { adoptionFund: 0 };
    const donation = await DonationFund.findOne().sort({ date: -1 }) || { donationFund: 0 };
    const totalAmount = (adoption.adoptionFund || 0) + (donation.donationFund || 0);

    const totalFund = new TotalFund({ totalAmount });
    await totalFund.save();
}

// Example POST route for AdoptionFund
router.post('/adoptionfund/add', async (req, res) => {
    try {
        const { date, adoptionFund } = req.body;
        const fund = new AdoptionFund({ date, adoptionFund });
        await fund.save();
        await updateTotalFund();  // Update the total fund
        res.json({ message: "Adoption fund added and total updated." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example POST route for DonationFund
router.post('/donationfund/add', async (req, res) => {
    try {
        const { date, donationFund } = req.body;
        const fund = new DonationFund({ date, donationFund });
        await fund.save();
        await updateTotalFund();  // Update the total fund
        res.json({ message: "Donation fund added and total updated." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
