import React, { useState } from 'react';
import axios from 'axios';
import AddForm from '../../components/Forms/AddForm';
import RightPanel from '../../components/Forms/RightPanel';

const Form = () => {
    return (
        <div className="flex min-h-screen">
          <div className="w-3/5 p-4">
            <AddForm />
          </div>
          <div className="w-1/3 fixed right-0 top-0 h-full overflow-auto bg-gray-100 p-4">
            <RightPanel />
          </div>
        </div>
      );

};

export default Form;
