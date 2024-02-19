import React, { useState } from "react";
import FiscalYearForm from "./FiscalYearForm";
import FiscalYearList from "./FiscalYearList";

function FiscalYearIndex() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="md:flex gap-5">
        {open && (
          <div className="md:w-1/3 p-3 bg-white shadow-lg mb-5">
            <FiscalYearForm handleOpen={handleOpen} />
          </div>
        )}

        <div className="flex-1  bg-white shadow-lg overflow-scroll">
          <FiscalYearList handleOpen={handleOpen} open={open} />
        </div>
      </div>
    </>
  );
}

export default FiscalYearIndex;
