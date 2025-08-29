import React from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  FolderIcon
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/blogs", label: "Blog", icon: DocumentTextIcon },
  { to: "/event", label: "Events", icon: CalendarDaysIcon },
  { to: "/newsletter", label: "Newsletters", icon: EnvelopeIcon },
  { to: "/projects", label: "Projects", icon: FolderIcon }
];

const Sidebar = () => {
  return (
    <div className="h-screen w-[90px] lg:w-[270px] flex flex-col items-end border-r border-[#663333]/20 shadow-lg">
      <nav className="flex flex-col gap-6 mt-20 w-full px-3 lg:pl-8 lg:pr-2 py-8 md:py-10">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 
              ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "text-red-500 hover:bg-red-500/10"
              }`
            }
          >
            <Icon className="h-6 w-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
