import { NavLink } from "react-router-dom";

import {
  HiOutlineHomeModern,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserGroup,
} from "react-icons/hi2";
const MainNav = () => {
  const activeNav = `bg-gray-100 p-3 text-indigo-700`;
  return (
    <nav className="mx-3 text-lg">
      <ul className="flex flex-col space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => {
            return isActive ? activeNav : "p-3";
          }}
        >
          <li className="flex items-center space-x-2">
            <HiOutlineHome />
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/students"
          className={({ isActive }) => {
            return isActive ? activeNav : "p-3";
          }}
        >
          <li className="flex items-center space-x-2">
            <HiOutlineUsers />
            <span>Students</span>
          </li>
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) => {
            return isActive ? activeNav : "p-3";
          }}
        >
          <li className="flex items-center space-x-2">
            <HiOutlineHomeModern />
            <span>Rooms</span>
          </li>
        </NavLink>
        <NavLink
          to="/staffs"
          className={({ isActive }) => {
            return isActive ? activeNav : "p-3";
          }}
        >
          <li className="flex items-center space-x-2">
            <HiOutlineUserGroup />
            <span>Staffs</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default MainNav;
