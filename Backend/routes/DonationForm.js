const express = require('express');
const router = express.Router();
const DonationForm = require('../models/DonationForm');

// Route to handle POST requests to create a new donation form
router.post('/add', async (req, res) => {
  try {
    const { formID, date, description, amount } = req.body;
    const newDonationForm = new DonationForm({
      formID,
      date,
      description,
      amount
    });
    const savedDonationForm = await newDonationForm.save();
    res.status(201).json(savedDonationForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to handle GET requests to fetch all donation forms
router.get('/getall', async (req, res) => {
  try {
    const donationForms = await DonationForm.find();
    res.json(donationForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to handle GET requests to fetch a single donation form by ID
router.get('/get/:id', async (req, res) => {
  try {
    const donationForm = await DonationForm.findById(req.params.id);
    if (!donationForm) {
      return res.status(404).json({ message: 'Donation form not found' });
    }
    res.json(donationForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to handle PUT requests to update a donation form
router.put('/update/:id', async (req, res) => {
  try {
    const { formID, date, description, amount } = req.body;
    const updatedDonationForm = await DonationForm.findByIdAndUpdate(req.params.id, {
      formID,
      date,
      description,
      amount
    }, { new: true });
    if (!updatedDonationForm) {
      return res.status(404).json({ message: 'Donation form not found' });
    }
    res.json(updatedDonationForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to handle DELETE requests to delete a donation form
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDonationForm = await DonationForm.findByIdAndDelete(req.params.id);
    if (!deletedDonationForm) {
      return res.status(404).json({ message: 'Donation form not found' });
    }
    res.json({ message: 'Donation form deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
