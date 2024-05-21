import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Formcat() {
    const [forms, setForms] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://localhost:8070/Form/get');
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    const handleUpdate = (formId) => {
        navigate(`/editform/${formId}`);
    };

    const handleDelete = async (formId) => {
        try {
            await axios.delete(`http://localhost:8070/Form/delete/${formId}`);
            fetchForms(); // Refresh the forms list after deletion
        } catch (error) {
            console.error('Error deleting the form:', error);
        }
    };

    // Search function to filter forms based on the input Form ID
    const filteredForms = forms.filter(form => form.formId.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-xl mx-auto border-2 border-gray-300 rounded-lg shadow p-4">
            <h1 className="text-xl font-bold text-center mb-4">All Forms</h1>
            <input
                type="text"
                placeholder="Search by Form ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex flex-wrap gap-5 justify-center">
                {filteredForms.map(form => (
                    <div key={form._id} className="p-4 border-2 border-gray-300 rounded shadow-md cursor-pointer w-full sm:w-3/3">
                        <p className="mb-2"><strong>Form ID:</strong> {form.formId}</p>
                        <p className="mb-2"><strong>Date:</strong> {form.date}</p>
                        <p className="mb-2"><strong>Number of Fields:</strong> {form.formFields.length}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleUpdate(form._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py- px-10 rounded focus:outline-none focus:shadow-outline">Edit</button>
                            <button onClick={() => handleDelete(form._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Formcat;
