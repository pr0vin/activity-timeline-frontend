import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";
import DashboardMenu from "../layouts/DashboardMenu";
import { useAuth } from "../providers/AuthProvider";

function AdminIndex() {
  const { isAdmin, isSuperAdmin } = useAuth();
  return (
    <>
      {/* <div className="mx-auto">
        <div className="flex">
          <Sidebar setWid={setWid} />

          <main className="  h-[80vh]  ">
            <div className=" flex items-center justify-end px-3 py-2 ">
              <img
                src="https://img.pikbest.com/origin/09/25/73/25qpIkbEsT5w8.png!f305cw"
                className="h-12 w-12 rounded-full shadow border"
                alt=""
              />
            </div>
            <div className=" bg-gray-100 p-5   h-full  overflow-y-scroll  pb-20 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div> */}
      <div className="flex overflow-hidden ">
        <div className={`${isAdmin || isSuperAdmin ? "block" : "hidden"}`}>
          <Sidebar />
        </div>

        <main className="flex-grow overflow-hidden  h-screen  bg-gray-50">
          <div className=" flex items-center justify-end px-3 py-2 z-[999] drop-shadow-xl   bg-white ">
            {/* <img
              src="https://img.pikbest.com/origin/09/25/73/25qpIkbEsT5w8.png!f305cw"
              className="h-12 w-12 rounded-full shadow border"
              alt=""
            /> */}

            <DashboardMenu />
          </div>
          <div className=" p-5 w-full h-[90%]  overflow-y-scroll  mx-auto pb-20 ">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminIndex;
