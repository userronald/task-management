import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";



const Mainlayout  = ()=>{
   return (
     <>
       <div className="w-screen h-screen relative">
         <Navbar />
         <SideBar />
         <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[78px] w-full h-full overflow-y-auto">
           <Outlet />
         </div>
       </div>
     </>
   );
}

export default Mainlayout;