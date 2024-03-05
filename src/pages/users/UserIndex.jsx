import React from "react";
import { Outlet } from "react-router-dom";

function UserIndex() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default UserIndex;
