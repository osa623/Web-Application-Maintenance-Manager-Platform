const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');

// Post an invoice
router.post('/add', async (req, res) => {
  const { invoiceNumber, date, items } = req.body;
  const newReceipt = new Receipt({ invoiceNumber, date, items });

  try {
    const savedReceipt = await newReceipt.save();
    res.status(201).json(savedReceipt);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all receipts
router.get('/getall', async (req, res) => {
    try {
        const receipts = await Receipt.find({});
        res.status(200).json(receipts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a receipt
router.delete('/delete/:id', async (req, res) => {
    try {
        const receipt = await Receipt.findByIdAndDelete(req.params.id);
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found!' });
        }
        res.status(200).json({ message: 'Receipt deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single receipt by ID
router.get('/getdata/:id', async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id);
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found!' });
        }
        res.status(200).json(receipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a receipt
router.put('/update/:id', async (req, res) => {
    const { invoiceNumber, date, items } = req.body;
    try {
        const receipt = await Receipt.findByIdAndUpdate(req.params.id, { invoiceNumber, date, items }, { new: true });
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found!' });
        }
        res.status(200).json(receipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
