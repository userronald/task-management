import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";
import { useState } from "react";


const Mainlayout  = ()=>{

  const[isOpen,setIsOpen]=useState(true);
   return (
     <>
       <div className="w-screen h-screen relative">
         <Navbar isOpen={isOpen} />
         <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
         <div
           className={`transition-all duration-300 ${
             isOpen ? "md:pl-[250px] pl-[60px]" : "pl-[60px]"
           } pr-[20px] pt-[78px] w-full h-full overflow-y-auto`}
         >
           <Outlet />
         </div>
       </div>
     </>
   );
}

export default Mainlayout;