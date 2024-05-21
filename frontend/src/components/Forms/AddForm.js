import React, { useState } from 'react';
import axios from 'axios';

const AddForm = () => {
    const [formFields, setFormFields] = useState([{ text: "", amount: "" }]);
    const [formId, setFormId] = useState("");
    const [date, setDate] = useState("");

    const handleFormChange = (index, event) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    };

    const addFields = () => {
        setFormFields([...formFields, { text: "", amount: "" }]);
    };

    const removeField = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setFormFields(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { formId, date, formFields };

        try {
            const response = await axios.post('http://localhost:8070/Form/add', data);
            console.log("Data submitted successfully");
            alert("Form submitted successfully!");
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert("Error submitting form");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 border-2 border-gray-300 rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">Financial Needs Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="formId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Form ID</label>
                    <input type="text" id="formId" value={formId} onChange={e => setFormId(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required />
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required />
                </div>

                {formFields.map((field, index) => (
                    <div key={index} className="mb-5">
                        <label htmlFor={`text-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text {index + 1}</label>
                        <input type="text" name="text" value={field.text} onChange={e => handleFormChange(index, e)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required />
                        <label htmlFor={`amount-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount {index + 1}</label>
                        <input type="number" name="amount" value={field.amount} onChange={e => handleFormChange(index, e)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required />
                        <button type="button" onClick={() => removeField(index)}
                                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Remove Line
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addFields}
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add New Line
                </button>

                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddForm;
