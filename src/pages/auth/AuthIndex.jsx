import React from "react";
import { Outlet } from "react-router-dom";
function AuthIndex() {
  return (
    <>
      <div className="container">
        <h2 className="my-5 text-center font-bold text-3xl"> Welcome !!!</h2>

        <div className="flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthIndex;
