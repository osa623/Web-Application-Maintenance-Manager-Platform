const express = require('express');
const router = express.Router();
const RequestForm = require('../models/RequestForm');
const Fund = require('../models/Fund');

// POST endpoint to create a new request form
router.post("/add", async (req, res) => {
    const { events, date, totalAmount } = req.body;
    const newRequestForm = new RequestForm({ events, date, totalAmount });
    try {
        await newRequestForm.save();
        res.status(201).json({ message: "Request form added successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to retrieve all request forms
router.get("/all", async (req, res) => {
    try {
        const requestForms = await RequestForm.find();
        res.json(requestForms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT endpoint to accept a request form
router.put("/accept/:id", async (req, res) => {
    try {
        const requestForm = await RequestForm.findById(req.params.id);
        if (!requestForm) {
            return res.status(404).json({ message: "Request form not found" });
        }

        if (requestForm.status !== 'Pending') {
            return res.status(400).json({ message: "Request form is already processed" });
        }

        const totalFund = await Fund.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$amount" } } }]);

        if (!totalFund || totalFund.length === 0) {
            return res.status(400).json({ message: "Total fund not found" });
        }

        const totalAmount = totalFund[0].totalAmount;

        if (totalAmount < requestForm.totalAmount) {
            console.error('Insufficient funds to accept this request. Total fund:', totalAmount, 'Requested amount:', requestForm.totalAmount);
            return res.status(400).json({ message: "Insufficient funds to accept this request." });
        }

        // Update the total amount in the fund
        const remainingAmount = totalAmount - requestForm.totalAmount;
        await Fund.updateOne({}, { $inc: { amount: -requestForm.totalAmount } });

        requestForm.status = 'Accepted';
        await requestForm.save();
        res.json({ message: "Request form accepted and total funds updated successfully." });
    } catch (error) {
        console.error('Error when accepting request:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// PUT endpoint to decline a request form
router.put("/decline/:id", async (req, res) => {
    try {
        const requestForm = await RequestForm.findById(req.params.id);
        if (!requestForm) {
            return res.status(404).json({ message: "Request form not found" });
        }

        requestForm.status = 'Declined';
        await requestForm.save();
        res.json({ message: "Request form declined." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
