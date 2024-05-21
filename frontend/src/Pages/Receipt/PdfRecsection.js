import React from 'react'
import RightPdfPanel from '../../components/Receipts/RighPdfPanel';
import PdfReccat from '../../components/Receipts/PdfReccat';

const PdfRecsection = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <PdfReccat/>
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <RightPdfPanel/>
          </div>
        </div>
      );
}

export default PdfRecsection
