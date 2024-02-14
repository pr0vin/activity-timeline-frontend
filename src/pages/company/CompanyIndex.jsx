import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CompanyIndex() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <div>Company</div>
          <small>Here we have the details of the company</small>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default CompanyIndex;
