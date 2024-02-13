import React from "react";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";

function AdminIndex() {
  return (
    <>
      <div className="flex overflow-hidden">
        <Sidebar />

        <main className=" w-full h-screen bg-lightwhite ">
          {/* <div className="h-16 bg-white border-b border-gray-300 mb-1 font-bold">
            <p className="p-5 text-gray-600 ">YourWork /</p>
          </div> */}
          <div className=" bg-white p-5  w-full h-full  overflow-y-scroll  mx-auto pb-20 ">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminIndex;
