import {
  IoAppsOutline,
  IoGridOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoMenu,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navLinks = [
    { title: "Home", icon: <IoHomeOutline size={22} />, path: "/" },
    { title: "My Tasks", icon: <IoAppsOutline size={22} />, path: "/tasks" },
    { title: "Projects", icon: <IoGridOutline size={22} />, path: "/projects" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full flex flex-col transition-all duration-300 bg-black ${
        isOpen ? "md:w-[230px]" : "md:w-[60px]"
      } w-[60px] md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header with Hamburger */}
      <div className="w-full flex items-center px-4 h-[70px] bg-black">
        <button
          className="p-2 bg-gray-800 text-white rounded-md"
          onClick={toggleSidebar}
        >
          <IoMenu size={24} />
        </button>
        {/* Sidebar Title (Only visible when expanded) */}
        <span
          className={`text-orange-400 font-semibold text-2xl ml-4 transition-[opacity,max-width,transform] duration-300 ease-in-out 
  ${
    isOpen
      ? "opacity-100 max-w-[150px] scale-x-100"
      : "opacity-0 max-w-0 scale-x-0"
  } 
  overflow-hidden whitespace-nowrap`}
        >
          ITask
        </span>
      </div>

      {/* Sidebar Navigation */}
      <div className="w-full h-[calc(100vh-70px)] flex flex-col items-center md:items-start gap-2 border-slate bg-black py-5 px-3 relative">
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className="flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer"
          >
            {link.icon}
            <span
              className={`text-white font-medium text-[15px] transition-all duration-300 ${
                isOpen ? "md:block hidden" : "hidden"
              }`}
            >
              {link.title}
            </span>
          </NavLink>
        ))}
        {/* Logout */}
        <div className="flex absolute bottom-4 items-center gap-2 md:w-[98%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer">
          <IoLogOutOutline size={22} />
          <span
            className={`text-white font-medium text-[15px] transition-all duration-300 ${
              isOpen ? "md:block hidden" : "hidden"
            }`}
          >
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
