// components/PdfReccat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PdfReccat = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        fetchPdfs();
    }, []);

    const fetchPdfs = async () => {
        try {
            const response = await axios.get('http://localhost:8070/invoices/getall');
            setPdfs(response.data);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    };

    const deletePdf = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8070/invoices/delete/${id}`);
            if (response.status === 200) {
                alert('File deleted successfully');
                setPdfs(prevPdfs => prevPdfs.filter(pdf => pdf._id !== id));
            }
        } catch (error) {
            console.error('Error deleting PDF:', error);
            alert('Failed to delete PDF');
        }
    };

    return (
        <div className="border-4 border-blue-500 p-4">
            <h1 className="text-2xl font-bold mb-4">PDF Section</h1>
            <div className="grid grid-cols-3 gap-4">
                {pdfs.map(pdf => (
                    <div key={pdf._id} className="border p-4 mb-2 shadow-sm">
                        <p>{pdf.filename}</p>
                        <div className="flex justify-between items-center mt-2">
                            <button 
                                onClick={() => window.open(`/uploads/${pdf.filename}`, "_blank")}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                            >
                                View
                            </button>
                            <button 
                                onClick={() => deletePdf(pdf._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PdfReccat;
