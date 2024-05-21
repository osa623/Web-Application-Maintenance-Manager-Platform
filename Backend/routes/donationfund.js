const express = require('express');
const router = express.Router();
const DonationFund = require('../models/Donationfund');

router.post('/add', async (req, res) => {
    try {
        const { date, donationFund } = req.body;
        const newDonationFund = new DonationFund({
            date,
            donationFund
        });
        await newDonationFund.save();
        res.status(201).json(newDonationFund);
    } catch (error) {
        res.status(400).json({ message: "Error creating donation fund", error: error.message });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const funds = await DonationFund.find();
        res.json(funds);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving donation funds", error: error.message });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const fund = await DonationFund.findById(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: "Donation fund not found" });
        }
        res.json(fund);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donation fund", error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { date, donationFund } = req.body;
        const updatedFund = await DonationFund.findByIdAndUpdate(req.params.id, {
            date,
            donationFund
        }, { new: true, runValidators: true });
        if (!updatedFund) {
            return res.status(404).json({ message: "Donation fund not found" });
        }
        res.json(updatedFund);
    } catch (error) {
        res.status(400).json({ message: "Error updating donation fund", error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await DonationFund.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Donation fund not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting donation fund", error: error.message });
    }
});

module.exports = router;
