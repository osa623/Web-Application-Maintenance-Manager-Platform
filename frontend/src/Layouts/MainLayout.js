import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"


const MainLayout = () => {

    return(
        <div className="w-full h-screen">
    <div className="flex">
      <div className='basis-[20%] h-[100vh] '>
      <Sidebar/>
      </div>
     <div className='basis-[80%] border'>
     <Outlet/>
   </div>   

    </div>
    
        </div>
    )
}

export default MainLayout