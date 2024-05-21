import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import PieChart from './PieChart';

const RightPanel = () => {
    return (
        <div className="space-y-4">
            <div className="border p-4">
                <PieChart />
            </div>
            <NavLink to="/Formsection" className="block w-full text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Form Section
            </NavLink>
            <NavLink to="/Form" className="block w-full text-center py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Add Form
            </NavLink>
            <NavLink to="/" className="block w-full text-center py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                DashBoard
            </NavLink>
        </div>
    );
};

export default RightPanel;

