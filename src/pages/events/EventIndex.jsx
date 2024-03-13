import React from "react";
import { Outlet } from "react-router-dom";

function EventIndex() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default EventIndex;
