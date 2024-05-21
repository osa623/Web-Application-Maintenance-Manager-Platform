// routes/filepdf.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const FilePDF = require('../models/FilePDF');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// POST endpoint for uploading files
router.post('/uploadpdf', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }

    const newFile = new FilePDF({
        filename: req.file.originalname,
        path: req.file.path
    });
    try {
        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully', fileDetails: req.file });
    } catch (error) {
        console.error("Error saving file info:", error);
        res.status(500).json({ message: 'Error saving file information' });
    }
});

// Fetch all PDFs
router.get('/getall', async (req, res) => {
    try {
        const files = await FilePDF.find({});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a PDF
router.delete('/delete/:id', async (req, res) => {
    try {
        const file = await FilePDF.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Remove the document from MongoDB without checking the filesystem
        await FilePDF.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Failed to delete PDF:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
