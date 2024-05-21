import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateReceipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [receipt, setReceipt] = useState({
        invoiceNumber: '',
        date: '',
        items: []
    });

    // Fetch receipt data
    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/Receipts/getdata/${id}`);
                if (response.data) {
                    setReceipt({
                        invoiceNumber: response.data.invoiceNumber,
                        date: response.data.date.slice(0, 10), // Slice to format YYYY-MM-DD
                        items: response.data.items.map(item => ({
                            description: item.description || '',
                            amount: item.amount || 0
                        }))
                    });
                }
            } catch (error) {
                console.error('Failed to fetch receipt', error);
            }
        };

        fetchReceipt();
    }, [id]);

    const handleInputChange = (e, index) => {
        if (index !== null) {
            const updatedItems = receipt.items.map((item, idx) => {
                if (idx === index) {
                    return { ...item, [e.target.name]: e.target.value };
                }
                return item;
            });
            setReceipt({ ...receipt, items: updatedItems });
        } else {
            setReceipt({ ...receipt, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/Receipts/update/${id}`, receipt)
            .then(() => {
                alert('Receipt updated successfully!');
                navigate('/shelter/receipts'); // Navigate away after update
            })
            .catch(error => {
                console.error('Failed to update receipt', error);
                alert('Failed to update receipt');
            });
    };

    return (
        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
            <h1 className="font-bold text-2xl my-4 text-center text-blue-600">Edit Receipt</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6">
                    <input type="text" name="invoiceNumber" value={receipt.invoiceNumber || ''} onChange={handleInputChange} placeholder="Invoice Number" className="mb-2 p-1 w-full"/>
                    <input type="date" name="date" value={receipt.date || ''} onChange={handleInputChange} className="mb-2 p-1 w-full"/>
                </div>
                {receipt.items.map((item, index) => (
                    <div key={index} className="mb-4">
                        <input type="text" name="description" value={item.description || ''} onChange={(e) => handleInputChange(e, index)} className="p-1 w-full mb-1"/>
                        <input type="number" name="amount" value={item.amount || 0} onChange={(e) => handleInputChange(e, index)} className="p-1 w-full text-right"/>
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </form>
            <div className="text-gray-700 mb-2 mt-4">Please review and submit changes.</div>
        </div>
    );
};

export default UpdateReceipt;
