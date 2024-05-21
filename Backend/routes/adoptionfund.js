const express = require('express');
const router = express.Router();
const AdoptionFund = require("../models/Adoptionfund");

router.post('/add', async (req, res) => {
    try {
        const { date, adoptionFund } = req.body;
        const newAdoptionFund = new AdoptionFund({
            date,
            adoptionFund
        });
        await newAdoptionFund.save();
        res.status(201).json(newAdoptionFund);
    } catch (error) {
        res.status(400).json({ message: "Error creating adoption fund", error: error.message });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const funds = await AdoptionFund.find();
        res.json(funds);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving adoption funds", error: error.message });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const fund = await AdoptionFund.findById(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: "Adoption fund not found" });
        }
        res.json(fund);
    } catch (error) {
        res.status(500).json({ message: "Error fetching adoption fund", error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { date, adoptionFund } = req.body;
        const updatedFund = await AdoptionFund.findByIdAndUpdate(req.params.id, {
            date,
            adoptionFund
        }, { new: true, runValidators: true });
        if (!updatedFund) {
            return res.status(404).json({ message: "Adoption fund not found" });
        }
        res.json(updatedFund);
    } catch (error) {
        res.status(400).json({ message: "Error updating adoption fund", error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await AdoptionFund.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Adoption fund not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting adoption fund", error: error.message });
    }
});

module.exports = router;
