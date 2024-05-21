import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isReceiptsSubMenuVisible, setIsReceiptsSubMenuVisible] = useState(false);
    const [isFundsSubMenuVisible, setIsFundsSubMenuVisible] = useState(false);
    const [isFormsSubMenuVisible, setIsFormsSubMenuVisible] = useState(false);

    const toggleReceiptsSubMenu = () => {
        setIsReceiptsSubMenuVisible(!isReceiptsSubMenuVisible);
    };

    const toggleFundsSubMenu = () => {
        setIsFundsSubMenuVisible(!isFundsSubMenuVisible);
    };

    const toggleFormsSubMenu = () => {
        setIsFormsSubMenuVisible(!isFormsSubMenuVisible);
    };

    return (
        <div className="fixed top-0 left-0 w-1/5 h-screen bg-[#4E73DF]">
            <div className='px-[30px] py-[20px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Shelter Management</h1>
            </div>
            <div className='flex flex-col items-center w-full'>
                <NavLink to="/Dashboard" className="py-[20px] w-full text-center text-white font-bold text-[18px] leading-[20px] hover:bg-blue-700 transition duration-150 ease-in-out">DashBoard</NavLink>

                <div className="w-full">
                    <button onClick={toggleFormsSubMenu} className="py-[20px] w-full text-center text-white font-bold text-[18px] leading-[20px] hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none">Forms</button>
                    {isFormsSubMenuVisible && (
                        <div className="flex flex-col items-center w-full bg-blue-600">
                            <NavLink to="/Formsection" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Shelter Requirement Records</NavLink>
                            <NavLink to="/DFormsection" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Forms for Don.Manager</NavLink>
                        </div>
                    )}
                </div>  
           


                <NavLink to="/requestsection" className="py-[20px] w-full text-center text-white font-bold text-[18px] leading-[20px] hover:bg-blue-700 transition duration-150 ease-in-out">Requests</NavLink>
                
                <div className="w-full">
                    <button onClick={toggleReceiptsSubMenu} className="py-[20px] w-full text-center text-white font-bold text-[18px] leading-[20px] hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none">Receipts</button>
                    {isReceiptsSubMenuVisible && (
                        <div className="flex flex-col items-center w-full bg-blue-600">
                            <NavLink to="/Sendreceipts" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Send Receipts</NavLink>
                            <NavLink to="/pdfrecsection" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Received Invoices</NavLink>
                        </div>
                    )}
                </div>  

                <div className="w-full">
                    <button onClick={toggleFundsSubMenu} className="py-[20px] w-full text-center text-white font-bold text-[18px] leading-[20px] hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none">Funds</button>
                    {isFundsSubMenuVisible && (
                        <div className="flex flex-col items-center w-full bg-blue-600">
                            <NavLink to="/donationform" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Donation Funds</NavLink>
                            <NavLink to="/adoptionfunds" className="py-[15px] w-full text-center text-white text-[16px] leading-[18px] hover:bg-blue-800 transition duration-150 ease-in-out">Adoption Funds</NavLink>
                        </div>
                    )}
                </div>  
            </div>
        </div>
    );
};

export default Sidebar;
