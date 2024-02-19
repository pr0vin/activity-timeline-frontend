import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { LuUserCircle2, LuSettings, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user, userLoading, logOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  if (userLoading) {
    return "...";
  }

  const { name, email } = user;
  return (
    <>
      {/* {open && (
        <div
          className=" w-[100%] h-[100] absolute z-[99] "
          onClick={toggleMenu}
        ></div>
      )} */}
      <div className="relative group" onClick={toggleMenu}>
        <div className="w-12 h-12">
          <img
            src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
            className="w-12 h-12 rounded-full"
            alt=""
          />
        </div>

        {open && (
          <ul className="absolute text-start right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 cursor-pointer">
            <li className="text-start px-2 border-b">
              <h6 className="font-bold text-xl">{name}</h6>
              <small>{email}</small>
            </li>
            <li className="p-2 flex gap-5 hover:bg-gray-100">
              <LuUserCircle2 size={23} />
              <span>Profile</span>
            </li>
            <li
              onClick={() => navigate(`/dashboard`)}
              className="p-2 flex gap-5 hover:bg-gray-100"
            >
              <LuSettings size={23} />
              <span>Dashboard</span>
            </li>
            <li onClick={logOut} className="p-2 flex gap-5 hover:bg-gray-100">
              <LuLogOut size={23} />
              <span>Log Out</span>{" "}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileMenu;
