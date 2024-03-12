import React from "react";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { BiCalendarCheck } from "react-icons/bi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function FilterEvent({ handleSearh, handleSearchData }) {
  const getDate = ({ adDate, bsDate }) => {
    handleSearchData(adDate);
  };

  const navigate = useNavigate();
  return (
    <>
      <Calendar
        className="myInput  md:w-6/12 "
        onChange={getDate}
        theme="deepdark"
      />

      <div className="mt-5 ">
        {/* <div className="font-bold text-gray-500 mb-2 ">खोजिएको :</div> */}
        <ul className="h-[40vh] overflow-y-scroll">
          {handleSearh.length > 0 ? (
            handleSearh.map((event, i) => (
              <li
                className="py-2 border-b border-gray-100 font-bold text-gray-700 cursor-pointer"
                key={i}
              >
                <span
                  onClick={() => {
                    navigate(`/dashboard/events/${event.id}/view`);
                  }}
                >
                  {event.title}
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span>
                    <BiCalendarCheck size={12} />
                  </span>
                  <span>{moment(event.ad_date).format("LL")}</span>
                </div>
              </li>
            ))
          ) : (
            <div className="flex justify-center mt-10">
              <div className="text-center">
                <img
                  src="./svgs/not-found.svg"
                  alt=""
                  className="h-32 w-32 my-2"
                />
                <small>Oops! data not found</small>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default FilterEvent;
