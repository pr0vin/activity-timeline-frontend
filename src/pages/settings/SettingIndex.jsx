import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function SettingIndex() {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(true);

  useEffect(() => {
    if (pathname.includes("company")) {
      setProfile(false);
    }
  }, [pathname]);
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex p-5 font-bold  text-lg gap-5 cursor-pointer ">
          <div className="profile">Profile</div>
          <div>Company</div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SettingIndex;
