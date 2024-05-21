import React from 'react'
import {FaSearch} from "react-icons/fa"

 const Searchbar = () => {
    return(   

        <div>
            <div className='flex items-center rounded -[5px] px-[14px] py-[14px] '>
                <input type ='text' className='bg-[#EDEDED] h-[40px] outline-none pl-[14px] w-[350px] rounded-[5-x] placeholder :text-[14px] leading-[20px] font-normal' placeholder='Search for..'/>
                <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer roiunded-tr-[5px] rounded-br-[5px]'>
                    <FaSearch color ='white'/>
                </div>
            </div>
            <div>
                <div>

                </div>
            </div>
        </div>
     )

}

export default Searchbar