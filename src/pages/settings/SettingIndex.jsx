import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import LoadingPage from "../../helpers/LoadingPage";

function SettingIndex() {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className=" min-h-screen px-5">
        <div className="  font-bold  text-lg gap-5 cursor-pointer ">
          <div className="heading mb-5">
            <h2 className="">Settings</h2>
            <p className=""> make cahages in your detail</p>
          </div>

          <nav>
            <ul className="flex gap-3 text-sm justify-start border-b border-gray-200 pb-1">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-secondary p-1 font-normal "
                      : "text-gray-400  font-normal"
                  }
                  to={`/dashboard/settings/profile`}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-secondary p-1 font-normal "
                      : "text-gray-400  font-normal"
                  }
                  to={`/dashboard/settings/company/${user.company.id}`}
                >
                  Company
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 border-secondary p-1 font-normal "
                      : "text-gray-400  font-normal"
                  }
                  to={`/dashboard/settings/change-password`}
                >
                  Change Password
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SettingIndex;
