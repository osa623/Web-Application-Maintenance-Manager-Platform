import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Request = () => {
    const [requestForms, setRequestForms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/requestforms/all')
            .then(response => setRequestForms(response.data))
            .catch(error => console.error('Error fetching request forms:', error));
    }, []);

    const handleAccept = (id) => {
        axios.put(`http://localhost:8070/requestforms/accept/${id}`)
            .then(response => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error accepting request form:', error);
                alert('Failed to accept request: ' + (error.response?.data?.message || 'Server error'));
            });
    };

    const handleDecline = (id) => {
        axios.put(`http://localhost:8070/requestforms/decline/${id}`)
            .then(response => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error declining request form:', error);
                alert('Failed to decline request: ' + (error.response?.data?.message || 'Server error'));
            });
    };

    // Filter pending request forms
    const pendingForms = requestForms.filter(form => form.status === 'Pending');

    return (
        <div className="bg-white shadow-md rounded-md p-3">
            <h2 className="text-2xl font-bold text-blue-500 mb-4 flex justify-center items-center">Pending Requests</h2>
            {pendingForms.map(form => (
                <div key={form._id} className="mb-3 p-2 border border-green-200 rounded-md relative">
                    <p className="text-gray-700 mb-1">Date: {new Date(form.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-1">Total Amount: ${form.totalAmount}</p>
                    <p className="text-gray-700 mb-1">Status: {form.status}</p>
                    <div className="absolute bottom-2 right-2">
                        <button 
                            onClick={() => handleAccept(form._id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-md mr-2">
                            Accept
                        </button>
                        <button 
                            onClick={() => handleDecline(form._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md">
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Request;
