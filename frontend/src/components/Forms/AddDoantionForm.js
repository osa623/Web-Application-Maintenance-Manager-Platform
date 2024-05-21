import React, { useState } from 'react';
import axios from 'axios';

const AddDonationForm = () => {
    const [formFields, setFormFields] = useState({ formID: "", date: "", description: "", amount: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8070/donationforms/add', formFields);
            console.log("Data submitted successfully");
            alert("Form submitted successfully!");
        } catch (error) {
            console.error('Error:', error);
            alert("Error submitting form");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Add Donation Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="formID" className="block text-sm font-medium text-gray-700">Form ID</label>
                    <input type="text" id="formID" name="formID" value={formFields.formID} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
                           required />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" id="date" name="date" value={formFields.date} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
                           required />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" value={formFields.description} onChange={handleChange}
                           className="form-textarea border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full h-32 resize-none"
                           required />
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" id="amount" name="amount" value={formFields.amount} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
                           required />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddDonationForm;
