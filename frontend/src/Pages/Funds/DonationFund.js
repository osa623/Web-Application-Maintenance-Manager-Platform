import React from 'react'
import BarChart from '../../components/Receipts/Barchart';
import PieChart from '../../components/Forms/PieChart';
import PdfReccat from '../../components/Receipts/PdfReccat';

const DonationFund = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <PdfReccat/>
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <BarChart/>
            {/* Correct flexbox setup for centering PieChart */}
            <div className="flex justify-center mt-4">  {/* Added 'flex' for flexbox and 'justify-center' for horizontal centering */}
              <PieChart/>
            </div>
          </div>
        </div>
    );
}

export default DonationFund;
