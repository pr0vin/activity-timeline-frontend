import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CompanyIndex() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default CompanyIndex;
