import React from 'react'
import BarChart from './Barchart'
import { NavLink } from 'react-router-dom'; // Import NavLink

const RightBarPanel = () => {
  return (
    <div className="space-y-4">
            <div className="border p-4">
                <BarChart />
            </div>
            <NavLink to="/Sendreceipts" className="block w-full text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Send Receipt Section
            </NavLink>
            <NavLink to="/Sendreceipts" className="block w-full text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Received Receipt Section
            </NavLink>
            <NavLink to="/addReceipt" className="block w-full text-center py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Add Receipt
            </NavLink>
            <NavLink to="/" className="block w-full text-center py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                DashBoard
            </NavLink>
        </div>
  )
}

export default RightBarPanel
