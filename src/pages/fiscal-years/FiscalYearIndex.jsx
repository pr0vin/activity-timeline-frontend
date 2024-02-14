import React from "react";
import FiscalYearForm from "./FiscalYearForm";
import FiscalYearList from "./FiscalYearList";

function FiscalYearIndex() {
  return (
    <>
      <div className="heading">
        <h2>Fiscal Year</h2>
        <p> Here are the fiscal years</p>
      </div>
      <div className="md:flex gap-5">
        <div className="md:w-1/3 p-3 bg-white rounded mb-5">
          <FiscalYearForm />
        </div>

        <div className="flex-1 p-2 bg-white rounded">
          <FiscalYearList />
        </div>
      </div>
    </>
  );
}

export default FiscalYearIndex;
