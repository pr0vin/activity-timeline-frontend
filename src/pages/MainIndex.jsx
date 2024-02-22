import React from "react";
import NavBar from "../layouts/NavBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useFiscalYear } from "../providers/FiscalYearProvider";

function MainIndex() {
  const { user } = useAuth();

  if (!user) {
    return "loading...";
  }
  return (
    <>
      <div>
        <div className="">
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
