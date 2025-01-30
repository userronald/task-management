import { IoAppsOutline, IoGridOutline, IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import {NavLink } from "react-router-dom";


const SideBar = ()=>{

  

    const navLinks = [
      {
        title: "Home",
        icon: <IoHomeOutline color="#555" width={"22px"} height="22px" />,
        active: false,
        path: "/",
      },
      {
        title: "My Tasks",
        icon: <IoAppsOutline color="#555" width={"22px"} height="22px" />,
        active: false,
        path: "/tasks",
      },
      {
        title: "Projects",
        icon: <IoGridOutline color="#555" width={"22px"} height="22px" />,
        active: false,
        path: "/projects",
      },
    ];

    return (
      <>
        <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
          <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-black">
            <span className="text-orange-400 font-semibold text-2xl md:block hidden">
              ITask
            </span>
            <span className="text-orange-400 font-semibold text-2xl md:hidden block">
              I
            </span>
          </div>
         
          <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate bg-black py-5 px-3 relative">
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
                    link.active ? "bg-orange-300" : "bg-transparent"
                  }`}
                >
                  {link.icon}
                  <span className="font-medium text-[15px] md:block hidden">
                    {link.title}
                  </span>
                </NavLink>
              );
            })}
            <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[98%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-black-200">
              <IoLogOutOutline />
              <span className="font-medium text-[15px] md:block hidden ">
                Log Out
              </span>
            </div>
          </div>
        </div>
      </>
    );
}

export default SideBar;