import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPdf = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null); // Initialize as null, not empty string
    const navigate = useNavigate();

    const submitFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file); // Ensure 'file' is the name expected by backend

        try {
            const result = await axios.post('http://localhost:8070/invoices/uploadpdf', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(result);
            alert('File uploaded successfully');
            window.location.reload();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        }
    };

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitFile}>
            <h2 className="block text-gray-700 text-lg font-bold mb-2">Upload the Receipt in PDF format</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <input
                    type="file"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit the PDF
                </button>
            </div>
        </form>
    );
};

export default AddPdf;
