import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const { formId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        formId: '',
        date: '',
        formFields: [{ text: '', amount: '' }]
    });

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/Form/get/${formId}`);
                setFormData({
                    formId: response.data.formId,
                    date: response.data.date.slice(0, 10),  // Assuming the date is returned in ISO format
                    formFields: response.data.formFields
                });
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [formId]);

    const handleFormFieldsChange = (index, field, value) => {
        const updatedFormFields = [...formData.formFields];
        updatedFormFields[index][field] = value;
        setFormData({
            ...formData,
            formFields: updatedFormFields
        });
    };

    const addFormField = () => {
        setFormData({
            ...formData,
            formFields: [...formData.formFields, { text: '', amount: '' }]
        });
    };

    const removeFormField = (index) => {
        const updatedFormFields = [...formData.formFields];
        updatedFormFields.splice(index, 1);
        setFormData({
            ...formData,
            formFields: updatedFormFields
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8070/Form/update/${formId}`, formData);
            navigate('/'); // Redirect to the homepage or list of forms after updating
        } catch (error) {
            console.error('Error updating form:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5">Edit Form: {formId}</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300">
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                    <input 
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {formData.formFields.map((field, index) => (
                    <div key={index} className="mb-4 flex flex-col">
                        <label htmlFor={`text-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Text:</label>
                        <input
                            type="text"
                            id={`text-${index}`}
                            value={field.text}
                            onChange={(e) => handleFormFieldsChange(index, 'text', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor={`amount-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                        <input
                            type="text"
                            id={`amount-${index}`}
                            value={field.amount}
                            onChange={(e) => handleFormFieldsChange(index, 'amount', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button type="button" onClick={() => removeFormField(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addFormField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Add Field</button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Update Form</button>

            </form>
        </div>
    );
}

export default UpdateForm;
