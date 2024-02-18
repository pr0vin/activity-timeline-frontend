import React from "react";
import { Outlet } from "react-router-dom";

function EventIndex() {
  return (
    <>
      {/* <div className="heading">
        <h2>Events</h2>
        <p>here are the events</p>
      </div> */}

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default EventIndex;
