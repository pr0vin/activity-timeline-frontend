import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { PiEnvelope } from "react-icons/pi";
import { company } from "../json/company";
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
    municipality,
    district,
  } = user.company;
  return (
    <>
      <div className="">
        <div className=" bg-blue-900 text-white md:flex justify-end  px-10  gap-5">
          <div className="flex gap-3">
            <MdOutlinePhone size={23} />
            {contact && <span>{contact}</span>}
          </div>
          <div className="flex gap-3">
            <PiEnvelope size={23} />
            {email && <span>{email}</span>}
          </div>
        </div>

        <div className="flex overflow-hidden justify-between ">
          <div className="flex  items-center">
            <div className="w-2/10 p-2 md:block hidden">
              {logo ? (
                <div className="w-32 h-32">
                  <img
                    src={`${API_URL}/storage/${logo}`}
                    className="w-32 h-32 md:p-2"
                    alt=""
                  />
                </div>
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ea/National_Emblem_Of_Nepal.png"
                  className="w-32 h-32 md:p-2"
                  alt=""
                />
              )}
            </div>
            <div className="flex-1  p-2 md:ms-10 text-red-600">
              <div className="text-center ">
                <h3 className="text-2xl ">{name}</h3>
                <h1 className="font-bold text-3xl">{description}</h1>
                <p className="">
                  {municipality}, {district}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:block hidden">
            <StatusDots />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
