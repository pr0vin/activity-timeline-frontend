import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-end  ">
        <button
          className="myButton py-2 rounded-full"
          onClick={() => navigate(`/dashboard/config/companies/add`)}
        >
          Add a new company
        </button>
      </div>
    </div>
  );
}

export default CompanyList;
