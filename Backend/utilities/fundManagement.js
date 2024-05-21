// utilities/fundManagement.js
const DonationFund = require('../models/Donationfund');
const AdoptionFund = require('../models/Adoptionfund');

async function deductFunds(requestAmount) {
    const donationFund = await DonationFund.findOne();
    const adoptionFund = await AdoptionFund.findOne();

    console.log(`Initial Donation Fund: ${donationFund.amount}, Adoption Fund: ${adoptionFund.amount}`);

    let remainingAmount = requestAmount;

    // Donation Fund deduction
    if (donationFund && donationFund.amount >= remainingAmount) {
        donationFund.amount -= remainingAmount;
        await donationFund.save();
        remainingAmount = 0;
    } else if (donationFund) {
        remainingAmount -= donationFund.amount;
        donationFund.amount = 0;
        await donationFund.save();
    }

    console.log(`Remaining Amount after Donation Fund: ${remainingAmount}`);

    // Adoption Fund deduction
    if (remainingAmount > 0 && adoptionFund && adoptionFund.amount >= remainingAmount) {
        adoptionFund.amount -= remainingAmount;
        await adoptionFund.save();
        remainingAmount = 0;
    } else if (remainingAmount > 0 && adoptionFund) {
        adoptionFund.amount -= remainingAmount;
        adoptionFund.amount = 0;
        await adoptionFund.save();
    }

    console.log(`Remaining Amount after Adoption Fund: ${remainingAmount}`);

    return remainingAmount === 0; // Return true if fully deducted, false otherwise
}


module.exports = {
    deductFunds
};
