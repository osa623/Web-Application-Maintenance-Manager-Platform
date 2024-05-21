import React from 'react';
import Request from '../../Widgets/Request';
import BarChart from '../../components/Receipts/Barchart';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 h-screen">
            {/* Additional section for displaying name and details */}
            <div className="col-span-2 bg-blue-300 p-4">
                {/* Add your name and other details here */}
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2 flex justify-center items-center">Welcome to Shelter Maintenenace Dashboard</h2>
                {/* Add more details if needed */}
            </div>

            <div className="col-span-1 row-span-1 bg-white-200 overflow-y-auto">
                <Request />
            </div>

            <div className="col-span-1 row-span-1 bg-white-200 overflow-y-auto">
                <BarChart />
            </div>
  
        </div>
    );
};

export default Dashboard;
