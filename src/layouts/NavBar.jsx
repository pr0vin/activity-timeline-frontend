import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { PiEnvelope } from "react-icons/pi";
import { useAuth } from "../providers/AuthProvider";
import StatusDots from "../components/StatusDots";
const API_URL = import.meta.env.VITE_API_URL;

function NavBar() {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return "Loading...";
  }

  const {
    contact,
    email,
    logo,
    name,
    description,
    address,
    subLogo,
    municipality,
    district,
  } = user.company;
  return (
    <>
      <div className=" bg-primary text-white   text-xs  ">
        <div className="max-w-screen-2xl mx-auto flex items-center px-10  gap-5  justify-end">
          <div className="flex items-center gap-2 p-2 ">
            <MdOutlinePhone size={16} />
            {contact && <span>{contact}</span>}
          </div>
          <div className="flex items-center gap-2 p-2">
            <PiEnvelope size={16} />
            {email && <span>{email}</span>}
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex overflow-hidden  ">
          <div className="flex  items-center">
            <div className="w-2/10 p-2 md:block hidden">
              {logo ? (
                <div className="w-32 h-32 rounded-full">
                  <img
                    src={`${API_URL}/storage/${logo}`}
                    className="w-32 h-32 rounded-full md:p-2"
                    alt=""
                  />
                </div>
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ea/National_Emblem_Of_Nepal.png"
                  className="w-32 h-32 rounded-full md:p-2"
                  alt=""
                />
              )}
            </div>
            <div className="flex-1  p-2 md:ms-5 text-red-600">
              <div className="text-center ">
                <div className="text-lg font-bold ">{name}</div>
                <h2 className="font-bold text-3xl py-2">{description}</h2>
                <p className="">
                  {municipality}, {district}
                </p>
              </div>
            </div>

            <div className="w-2/10 p-2 md:block hidden">
              {subLogo && (
                <div className="w-32 h-32 rounded-full">
                  <img
                    src={`${API_URL}/storage/${subLogo}`}
                    className="w-32 h-32 rounded-full md:p-2"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          {/* 
          <div className="p-5 md:block hidden">
            <StatusDots />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default NavBar;
