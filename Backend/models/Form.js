const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
    text: { type: String, required: true },
    amount: { type: String, required: true }
});

const formSchema = new mongoose.Schema({
    formId: { type: String, required: true },
    date: { type: Date, required: true },
    formFields: [formFieldSchema]
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;