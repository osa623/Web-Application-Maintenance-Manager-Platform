import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptCard from './ReceiptCard';
import { useNavigate } from 'react-router-dom';

const SendReccat = () => {
    const [receipts, setReceipts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        try {
            const response = await axios.get('http://localhost:8070/Receipts/getall');
            setReceipts(response.data);
        } catch (error) {
            console.error('Error fetching receipts', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/Receipts/delete/${id}`);
            const updatedReceipts = receipts.filter(receipt => receipt._id !== id);
            setReceipts(updatedReceipts);
        } catch (error) {
            console.error('Error deleting receipt', error);
        }
    };
    
    const handleEdit = (id) => {
        navigate(`/Editreceipt/${id}`);
    };

    const handleAddReceipt = () => {
        navigate('/addReceipt');
    };

    return (
        <div className="container mx-auto mt-10 p-4 border border-gray-300 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Send Receipts</h1>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Invoice Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleAddReceipt}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Receipt
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receipts.map(receipt => (
                    <ReceiptCard key={receipt._id} receipt={receipt} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
};

export default SendReccat;
