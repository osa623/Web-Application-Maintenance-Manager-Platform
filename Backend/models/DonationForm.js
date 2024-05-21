const mongoose = require('mongoose');

// Define the schema for the DonationForm model
const donationFormSchema = new mongoose.Schema({
  formID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

// Create and export the DonationForm model
const DonationForm = mongoose.model('DonationForm', donationFormSchema);
module.exports = DonationForm;
