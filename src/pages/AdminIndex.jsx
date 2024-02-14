import React from "react";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";

function AdminIndex() {
  return (
    <>
      <div className="flex overflow-hidden">
        <Sidebar />

        <main className=" w-full h-screen bg-lightwhite ">
          <div className=" flex items-center justify-end px-3 py-2 ">
            <img
              src="https://img.pikbest.com/origin/09/25/73/25qpIkbEsT5w8.png!f305cw"
              className="h-12 w-12 rounded-full shadow border"
              alt=""
            />
          </div>
          <div className=" bg-gray-100 p-5  w-full h-full  overflow-y-scroll  mx-auto pb-20 ">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminIndex;
