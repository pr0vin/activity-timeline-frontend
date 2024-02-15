import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CompanyIndex() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="heading">
          <h2>Company</h2>
          <p>Here we have the details of the company</p>
        </div>

        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default CompanyIndex;
