import React from "react";
import NavBar from "../layouts/NavBar";
import { Outlet } from "react-router-dom";

function MainIndex() {
  return (
    <>
      <div>
        <div className="max-w-screen-2xl mx-auto">
          <NavBar />
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainIndex;
