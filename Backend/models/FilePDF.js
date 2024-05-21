// models/FilePDF.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true }
});

const FilePDF = mongoose.model('FilePDF', fileSchema);

module.exports = FilePDF;
