import React from 'react'
import Formcat from '../../components/Forms/Formcat';
import RightPanel from '../../components/Forms/RightPanel';
import DonFormcat from '../../components/Forms/DonFormcat';

const DFormSection = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <DonFormcat/>
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <RightPanel />
          </div>
        </div>
      );

}

export default DFormSection

