const express = require('express');
const router = express.Router();
const Fund = require('../models/Fund');

// POST endpoint to add a new fund entry
router.post("/add", async (req, res) => {
    const { fundSource, date, amount } = req.body;
    try {
        const newFund = new Fund({ fundSource, date, amount });
        await newFund.save();
        res.status(201).json({ message: "Fund entry added successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to retrieve all fund entries
router.get("/getall", async (req, res) => {
    try {
        const funds = await Fund.find({}, 'fundSource amount'); // Select only fundSource and amount fields
        res.json(funds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// GET endpoint to retrieve a specific fund entry by ID
router.get("/get/:id", async (req, res) => {
    try {
        const fund = await Fund.findById(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: "Fund entry not found" });
        }
        res.json(fund);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT endpoint to update a specific fund entry by ID
router.put("/update/:id", async (req, res) => {
    const { fundSource, date, amount } = req.body;
    try {
        const fund = await Fund.findByIdAndUpdate(req.params.id, { fundSource, date, amount }, { new: true });
        if (!fund) {
            return res.status(404).json({ message: "Fund entry not found" });
        }
        res.json({ message: "Fund entry updated successfully", updatedFund: fund });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE endpoint to delete a specific fund entry by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const fund = await Fund.findByIdAndDelete(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: "Fund entry not found" });
        }
        res.json({ message: "Fund entry deleted successfully", deletedFund: fund });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
