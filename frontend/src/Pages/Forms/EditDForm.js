import React from 'react'
import UpdateForm from '../../components/Forms/UpdateForm';
import RightPanel from '../../components/Forms/RightPanel';
import UpdateDForm from '../../components/Forms/UpdateDForm';

const EditDForm = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <UpdateDForm />
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <RightPanel />
          </div>
        </div>
      );

};
export default EditDForm
