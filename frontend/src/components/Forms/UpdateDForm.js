import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateDForm() {
    const { id } = useParams();
    const [formData, setFormData] = useState({ formID: "", date: "", description: "", amount: "" });

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/donationforms/get/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:8070/donationforms/update/${id}`, formData);
            console.log("Form updated successfully");
            alert("Form updated successfully!");
        } catch (error) {
            console.error('Error updating form:', error);
            alert("Error updating form");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Edit Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="formID" className="block text-sm font-medium text-gray-700">Form ID</label>
                    <input type="text" id="formID" name="formID" value={formData.formID} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                           required />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                           required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                           required />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange}
                           className="form-input border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                           required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Form
                </button>
            </form>
        </div>
    );
}

export default UpdateDForm;
