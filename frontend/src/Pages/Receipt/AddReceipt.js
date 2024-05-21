import React from 'react'
import Receipt from '../../components/Receipts/Receipt';
import RightBarPanel from '../../components/Receipts/RightBarPanel';

const AddReceipt = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <Receipt/>
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <RightBarPanel />
          </div>
        </div>
      );

};

export default AddReceipt
