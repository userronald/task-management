import { IoPersonOutline,IoChevronDown,IoSearchOutline,IoShareSocialOutline, IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";

const Navbar =()=>{
    return (
      <>
        <div className="md:w-[calc(100%)-230px] w-[calc(100%-60px)] fixed flex items-center  pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 ">
          <div className="flex items-center gap-3 cursor-pointer">
            <IoPersonOutline />
            <span className="text-red-400 font-semibold  md:text-lg text-sm whitespace-nowrap">
              Dashboard Names
            </span>
            <IoChevronDown />
          </div>

          <div  className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-[10px]">
            <IoSearchOutline color={"orange"} />
            <input type="text" placeholder="Search" className=" place-items-center bg-gray-100 outline-none text-[15px]" />
          </div>
          
          <div className="md:flex hidden items-center gap-4">
            <div className="grid place-items-center bg-gray-100 rounded-lg px-3 py-[10px]">
              <IoShareSocialOutline />
            </div>
            <div className="grid place-items-center bg-gray-100 rounded-lg px-3 py-[10px]">
              <IoSettingsOutline />
            </div>
            <div className="grid place-items-center bg-gray-100 rounded-lg px-3 py-[10px]">
             <IoNotificationsOutline />
            </div>
          </div>
        </div>
      </>
    );
}

export default Navbar;