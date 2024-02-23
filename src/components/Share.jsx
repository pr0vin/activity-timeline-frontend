import React from "react";
import { LuShare2, LuStar } from "react-icons/lu";

function Share() {
  return (
    <>
      <div className="flex justify-end items-center">
        <div className="flex gap-2 items-center">
          <span> Share:</span> <LuShare2 size={18} />{" "}
        </div>
        {/* <div className="flex gap-2 items-center">
          <span> Rate:</span> <LuStar size={18} />{" "}
        </div> */}
      </div>
    </>
  );
}

export default Share;
