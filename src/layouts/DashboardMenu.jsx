import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  LuUserCircle2,
  LuSettings,
  LuHome,
  LuLogOut,
  LuLock,
} from "react-icons/lu";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../helpers/LoadingPage";
function DashboardMenu() {
  const [open, setOpen] = useState(false);
  const { user, userLoading, logOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  if (userLoading) {
    return <LoadingPage />;
  }

  const { name, email } = user;
  return (
    <>
      <div className="relative group px-3 cursor-pointer " onClick={toggleMenu}>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10">
            <img
              src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
              className="w-10 h-10 rounded-full"
              alt=""
            />
          </div>
          <div className="">
            <div className="font-bold capitalize">{user.name}</div>
            <div className="flex gap-2 items-center">
              <small className="border px-2 rounded-full text-primary">
                {user.roles[0].name}
              </small>
              <IoChevronDown size={16} />
            </div>
          </div>
        </div>

        {open && (
          <ul className="absolute text-start right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 cursor-pointer text-sm">
            <li className="text-start p-2 border-b">
              <h6 className="font-bold  capitalize">{name}</h6>
              <small>{email}</small>
            </li>
            {/* <li
              className="p-2 flex gap-3 hover:bg-gray-100"
              onClick={() => navigate(`/home/profile`)}
            >
              <LuUserCircle2 size={18} />
              <span>Profile</span>
            </li> */}
            <li
              onClick={() => navigate(`/home`)}
              className="p-2 flex gap-3 hover:bg-gray-100"
            >
              <LuHome size={18} />
              <span>Dashboard</span>
            </li>

            {/* <li className="px-2 border-b">
              <small>Settings</small>
            </li> */}
            {/* <li
              onClick={() => navigate(`/home`)}
              className="p-2 flex gap-3 hover:bg-gray-100"
            >
              <LuLock size={18} />
              <span>Change Password</span>
            </li> */}
            <li onClick={logOut} className="p-2 flex gap-3 hover:bg-gray-100">
              <LuLogOut size={18} />
              <span>Log Out</span>{" "}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default DashboardMenu;
