import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonFormSection = () => {
    const [donationForms, setDonationForms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/donationforms/all')
            .then(response => setDonationForms(response.data))
            .catch(error => console.error('Error fetching donation forms:', error));
    }, []);

    const handleAccept = (id, totalAmount) => {
        axios.put(`http://localhost:8070/donationforms/accept/${id}`)
            .then(response => {
                alert(response.data.message);
                // Update state to remove accepted donation form
                setDonationForms(donationForms.filter(form => form._id !== id));
                // You may need to update the funds page here to reflect the changes
            })
            .catch(error => {
                console.error('Error accepting donation form:', error);
                alert('Failed to accept donation: ' + (error.response?.data?.message || 'Server error'));
            });
    };

    return (
        <div className="border-2 border-green-500 p-4">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Donation Forms</h2>
            {donationForms.map(form => (
                <div key={form._id} className="mb-3 p-2 border-2 border-green-500">
                    <p>Description: {form.Description}</p>
                    <p>Date: {new Date(form.date).toLocaleDateString()}</p>
                    <p>Total Amount: ${form.totalAmount}</p>
                    <p>Status: {form.status}</p>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => handleAccept(form._id, form.totalAmount)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Accept
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DonFormSection;
