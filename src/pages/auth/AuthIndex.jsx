import React from "react";
import { Outlet } from "react-router-dom";
function AuthIndex() {
  return (
    <>
      <div className="w-full">
        <div className="h-[40vh] md:bg-primary w-[100%] "></div>

        <div className="md:-m-32 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthIndex;
