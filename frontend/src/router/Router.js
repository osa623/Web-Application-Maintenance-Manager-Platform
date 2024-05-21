import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from '../Pages/Forms/Form';
import MainLayout from '../Layouts/MainLayout';
import Login from '../Pages/Login/Login';
import Fund from '../Pages/Funds/Fund';
import UserProtected from './UserProtected';
import FormSection from '../Pages/Forms/FormSection';
import EditForm from '../Pages/Forms/EditForm';
import AddReceipt from '../Pages/Receipt/AddReceipt';
import SendRecsection from '../Pages/Receipt/SendRecsection';
import UpdateSendReceipt from '../Pages/Receipt/UpdateSendReceipt';
import PdfRecsection from '../Pages/Receipt/PdfRecsection';
import RequestSection from '../Pages/Forms/RequestSection';
import DonationFund from '../Pages/Funds/DonationFund';
import DForm from '../Pages/Forms/DForm';
import DFormSection from '../Pages/Forms/DFormSection';
import EditDForm from '../Pages/Forms/EditDForm';
import Dashboard from '../Pages/DashBoard/Dashboard';

const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Navigate to="/Dashboard" replace />} /> {/* Redirect to Dashboard when the root path is accessed */}
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="Form" element={<Form />} />
                  <Route path="Dform" element={<DForm />} />
                  <Route path="Formsection" element={<FormSection />} />
                  <Route path="DFormsection" element={<DFormSection />} />
                  <Route path="Editform/:formId" element={<EditForm />} />
                  <Route path="EditDform/:id" element={<EditDForm />} />
                  <Route path="addReceipt" element={<AddReceipt />} />
                  <Route path="Sendreceipts" element={<SendRecsection />} />
                  <Route path="Editreceipt/:id" element={<UpdateSendReceipt />} />
                  <Route path="pdfrecsection" element={<PdfRecsection />} />
                  <Route path="requestsection" element={<RequestSection />} />
                  <Route path="donationform" element={<DonationFund />} />
                  <Route element={<UserProtected />}>
                      <Route path="Fund" element={<Fund />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default Router;
