import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { LuUserCircle2, LuSettings, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user, userLoading, logOut, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  if (userLoading) {
    return "...";
  }

  const { name, email, company_id } = user;
  return (
    <>
      <div className="relative group md:me-3 " onClick={toggleMenu}>
        <div className="w-10 h-10">
          <img
            src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
            className="w-10 h-10 rounded-full"
            alt=""
          />
        </div>

        {open && (
          <ul className="absolute text-start right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 cursor-pointer text-sm">
            <li className="text-start px-2 border-b">
              <h6 className="font-bold text-lg capitalize">{name}</h6>
              <small>{email}</small>
            </li>
            <li
              className="p-2 flex gap-3 hover:bg-gray-100"
              onClick={() => navigate(`/settings/profile`)}
            >
              <LuUserCircle2 size={18} />
              <span>प्रोफाइल</span>
            </li>
            {(isAdmin || isSuperAdmin) && (
              <li
                onClick={() => navigate(`/dashboard/settings/${company_id}`)}
                className="p-2 flex gap-3 hover:bg-gray-100"
              >
                <LuSettings size={18} />
                <span>सेटिङहरू</span>
              </li>
            )}
            <li onClick={logOut} className="p-2 flex gap-3 hover:bg-gray-100">
              <LuLogOut size={18} />
              <span>लग Out</span>{" "}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileMenu;
