import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { PiEnvelope } from "react-icons/pi";
import { company } from "../json/company";

function NavBar() {
  const {
    contact,
    email,
    logo,
    name,
    subHead,
    address,
    municipality,
    district,
  } = company;
  return (
    <>
      <div className="">
        <div className=" bg-blue-900 text-white flex justify-end  px-10  gap-5">
          <div className="flex gap-3">
            <MdOutlinePhone size={23} />
            <span>{contact}</span>
          </div>
          <div className="flex gap-3">
            <PiEnvelope size={23} />
            <span>{email}</span>
          </div>
        </div>

        <div className="flex  gap-10">
          <div className="flex items-center">
            <div className="w-2/10 p-2">
              <img src={`${logo}`} className="w-32 h-32" alt="" />
            </div>
            <div className="flex-1 p-2 text-red-600">
              <div className="text-center">
                <h1 className="font-bold text-3xl">{name}</h1>
                <h3 className="text-2xl ">{subHead}</h3>
                <p className="">
                  {municipality}, {district}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
