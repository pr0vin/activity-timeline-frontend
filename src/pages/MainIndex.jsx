import React, { Suspense } from "react";
// import NavBar from "../layouts/NavBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useFiscalYear } from "../providers/FiscalYearProvider";
import LoadingPage from "../helpers/LoadingPage";

const Nav = React.lazy(() => import("../layouts/NavBar"));

function MainIndex() {
  const { user } = useAuth();

  return (
    <>
      <div>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense> */}

        <div className=" border-t-4 border-red-600 bg-zinc-50">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainIndex;
