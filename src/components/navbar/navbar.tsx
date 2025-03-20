// import { IoPersonOutline,IoChevronDown,IoSearchOutline,IoShareSocialOutline, IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";




interface NavbarProps {
  isOpen:boolean;
 
}

const Navbar =({isOpen}:NavbarProps)=>{
  
    return (
      <>
        <div
          className={`fixed flex items-center justify-between px-4 md:px-6 h-[70px] top-0 transition-all duration-300 bg-gray-900 w-full border-b border-orange-300 pl-[70px] md:pl-0 z-50 ${
            isOpen
              ? "md:w-[calc(100%-230px)] md:left-[230px]"
              : "md:w-[calc(100%-60px)] md:left-[60px]"
          }`}
        >
          <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-gray-200 text-center flex-grow ">
            Your Control Hub | Where Tasks Meet Efficiency
          </h1>
        </div>
      </>
    );
}

export default Navbar;