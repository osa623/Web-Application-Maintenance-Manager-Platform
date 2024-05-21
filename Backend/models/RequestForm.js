const mongoose = require('mongoose');
const requestFormSchema = new mongoose.Schema({
    events: [{ type: String, required: true }],
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Accepted', 'Declined', 'Pending']
    }
});
const RequestForm = mongoose.model('RequestForm', requestFormSchema);
module.exports = RequestForm;
