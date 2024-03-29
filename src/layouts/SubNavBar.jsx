import React, { useEffect, useMemo, useRef, useState } from "react";
import { status, statusNepali } from "../json/company";
import NepaliDate from "nepali-date-converter";
import ProfileMenu from "../components/ProfileMenu";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { BsCalendar3Event } from "react-icons/bs";
import Modal from "../helpers/Modal";
import FilterEvent from "../components/FilterEvent";
import moment from "moment";
// import { useFiscalYear } from "../providers/FiscalYearProvider";

function SubNavBar({
  selectedCategory,
  handleCategoryChange,
  handleStatusChange,
  selectedStatus,
  selectedYear,
  handleChangeYear,
  fiscalYears,
  setSelectedYear,
  categories,
  events,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchData = (data) => {
    setSearchTerm(data);
  };

  const SearchedData = useMemo(() => {
    const now = new Date();
    const current = moment(now).format("YYYY-MM-DD");
    const filtered = events.filter(
      (event) =>
        event.ad_date &&
        (!searchTerm
          ? event.ad_date.toString().includes(current)
          : event.ad_date.toString().includes(searchTerm.toString()))
    );
    return filtered;
  }, [searchTerm]);

  return (
    <>
      <div className="text-center max-w-screen-2xl mx-auto mb-3 ">
        {/* <StatusDots /> */}

        <div className=" md:flex gap-5  justify-between items-center px-2 ">
          <div className="relative w-full overflow-x-auto text-sm">
            <div className="flex items-center ">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  value={0}
                  className="sr-only"
                  checked={selectedCategory == 0}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor="all"
                  className={`cursor-pointer select-none px-3 py-1 
          ${
            selectedCategory == 0
              ? "border-b-4  border-primary  font-bold "
              : ""
          }`}
                >
                  सबै
                </label>
              </div>
              {/* Map over the categories array and create a custom radio button for each category */}
              {categories?.map(({ id, name }, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    id={id}
                    name="category"
                    value={id}
                    className="sr-only"
                    checked={selectedCategory == id}
                    onChange={handleCategoryChange}
                  />
                  <label
                    htmlFor={id}
                    className={`cursor-pointer select-none px-3 py-1 
            ${
              selectedCategory == id
                ? "border-b-4  border-primary  font-bold "
                : ""
            }`}
                  >
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="md:flex items-center gap-3">
            <div className="flex items-center justify-between md:my-2 gap-3 mb-8 ">
              <div className="">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="text-sm min-w-36 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-50 rounded  focus:outline-none "
                >
                  <option value="all">सबै</option>
                  {status?.map((s, i) => (
                    <option value={s} key={i}>
                      {statusNepali[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 ">
                <div className="">
                  <select
                    value={selectedYear}
                    onChange={handleChangeYear}
                    className="  text-sm min-w-28 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-50 rounded  focus:outline-none "
                  >
                    {fiscalYears?.map(({ year, id }) => (
                      <option value={id} key={id}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" ">
                  <BsCalendar3Event
                    onClick={handleOpen}
                    size={23}
                    className="text-primary"
                  />
                </div>

                <div>
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => {
          handleOpen();
          setSearchTerm("");
        }}
      >
        <div className="md:w-[500px] w-full p-2">
          <div className="font-bold text-gray-700 text-lg ">Search</div>

          <label htmlFor="" className="myLabel text-xs mt-5">
            तपाईंले खोज्न चाहनुभएको मिति छान्नुहोस् |
          </label>
          <FilterEvent
            handleSearh={SearchedData}
            handleSearchData={handleSearchData}
          />
        </div>
      </Modal>
    </>
  );
}

export default SubNavBar;
