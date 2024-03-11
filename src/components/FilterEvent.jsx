import React, { useMemo, useState } from "react";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { useEvent } from "../providers/EventProvider";

function FilterEvent() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleDate = ({ bsDate, adDate }) => {
    setSearchTerm(adDate);
  };
  const { events } = useEvent();

  const handleSearh = useMemo(() => {
    return events.filter(
      (event) =>
        event.ad_date &&
        event.ad_date.toString().includes(searchTerm.toString())
    );
  }, [searchTerm]);

  console.log(handleSearh);
  return (
    <>
      <Calendar className="myInput  " onChange={handleDate} theme="deepdark" />

      <div className="mt-5 h-[40vh] overflow-y-scroll">
        <ul>
          {handleSearh?.map((event) => (
            <li
              className="py-2 border-b border-gray-100 font-bold text-gray-700"
              key={event.id}
            >
              {event.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilterEvent;
