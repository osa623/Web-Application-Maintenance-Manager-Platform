import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DonFormcat() {
    const [forms, setForms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://localhost:8070/donationforms/getall');
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    const handleDelete = async (formId) => {
        try {
            await axios.delete(`http://localhost:8070/donationforms/delete/${formId}`);
            fetchForms(); // Refresh the forms list after deletion
        } catch (error) {
            console.error('Error deleting the form:', error);
        }
    };

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter forms based on the search query
    const filteredForms = forms.filter(form => form.formID.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="border border-gray-300 rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Requirement Forms</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Form ID..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <Link to="/Dform" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Form</Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {filteredForms.map(form => (
                    <div key={form._id} className="border border-gray-300 rounded-md p-4">
                        <p className="mb-2"><strong>Form ID:</strong> {form.formID}</p>
                        <p className="mb-2"><strong>Date:</strong> {form.date}</p>
                        <p className="mb-2"><strong>Description:</strong> {form.description}</p>
                        <p className="mb-2"><strong>Amount:</strong> {form.amount}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleDelete(form._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                            <Link to={`/editdform/${form._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DonFormcat;
