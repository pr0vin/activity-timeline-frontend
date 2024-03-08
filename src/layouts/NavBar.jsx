import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { PiEnvelope } from "react-icons/pi";
import { useAuth } from "../providers/AuthProvider";
import LoadingPage from "../helpers/LoadingPage";
import NepaliDate from "nepali-date-converter";
import SearchBar from "../helpers/SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function NavBar() {
  const { user, userLoading } = useAuth();
  const now = new NepaliDate().format("ddd, DD MMMM YYYY", "np");

  if (userLoading) {
    return <LoadingPage />;
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
    <div className="myDiv">
      <div className="watermark"></div>
      <div className="content">
        <div className="  text-gray-700  text-xs  md:block hidden">
          <div className="max-w-screen-2xl mx-auto lg:w-10/12 md:flex items-center px-10  gap-5  justify-between  ">
            <span className="font-bold p-2">{now}</span>
            <div className="flex">
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
        </div>
        <div className="max-w-screen-2xl mx-auto lg:w-10/12">
          <div className="flex overflow-hidden  ">
            <div className="flex  items-center">
              <div className="w-2/10 p-2 md:block hidden">
                {logo ? (
                  <div className="w-32 h-32 rounded-full">
                    <img
                      src={`${API_URL}/storage/${logo}`}
                      className="w-32 h-32 rounded-full  object-cover"
                      alt=""
                    />
                  </div>
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ea/National_Emblem_Of_Nepal.png"
                    className="w-32 h-32 rounded-full md:p-2  object-cover"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
