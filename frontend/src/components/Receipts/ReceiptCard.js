import React from "react";
import { useNavigate } from "react-router-dom";

const ReceiptCard = ({ receipt, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/Editreceipt/${receipt._id}`);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this receipt?")) {
            onDelete(receipt._id);
        }
    };

    

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200">
            <h2 className="text-lg font-bold text-gray-800">Invoice {receipt.invoiceNumber}</h2>
            <p className="text-sm text-gray-600">Date: {receipt.date}</p>
            <ul className="text-sm text-gray-700">
                {receipt.items.map((item, index) => (
                    <li key={index}>{item.description}: ${item.amount.toFixed(2)}</li>
                ))}
            </ul>
            <div className="flex justify-end space-x-2 mt-2">
                <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200">Edit</button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200">Delete</button>
            </div>
        </div>
    );
};

export default ReceiptCard;