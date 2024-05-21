const router = require("express").Router();
const Form = require("../models/Form");

// Add new form
router.post("/add", (req, res) => {
    const { formId, date, formFields } = req.body;
    const newForm = new Form({
        formId,
        date,
        formFields
    });

    newForm.save()
        .then(() => res.json("Form added successfully!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all forms
router.get("/get", (req, res) => {
    Form.find()
        .then(forms => res.json(forms))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific form
router.put("/update/:id", async (req, res) => {
    const { formId, date, formFields } = req.body;

    Form.findByIdAndUpdate(req.params.id, { formId, date, formFields }, { new: true })
        .then(updatedForm => res.json(updatedForm))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a form
router.delete("/delete/:id", (req, res) => {
    Form.findByIdAndDelete(req.params.id)
        .then(() => res.json('Form deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific form
router.get("/get/:id", (req, res) => {
    Form.findById(req.params.id)
        .then(form => res.json(form))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
