import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import DashboardMenu from "../layouts/DashboardMenu";
import { useAuth } from "../providers/AuthProvider";

function AdminIndex() {
  const { isAdmin, isSuperAdmin } = useAuth();

  const location = useLocation();

  // scroll to top of page after a page transition.
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return (
    <>
      {/* <ScrollRestoration />s */}
      <div className="flex overflow-hidden ">
        <div className={`${isAdmin || isSuperAdmin ? "block" : "hidden"} `}>
          <Sidebar />
        </div>

        <main className="flex-grow overflow-hidden  h-screen  bg-gray-50">
          <div className=" flex items-center justify-end px-3 py-2 z-[999] drop-shadow-xl   bg-white ">
            <DashboardMenu />
          </div>
          <div className=" p-5  w-full h-[90%]  overflow-y-scroll  mx-auto pb-20 ">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminIndex;
