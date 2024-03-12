import React, { useEffect, useState } from "react";
import FiscalYearForm from "./FiscalYearForm";
import FiscalYearList from "./FiscalYearList";
import { useParams } from "react-router-dom";

function FiscalYearIndex() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(true);
  }, [id]);
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
