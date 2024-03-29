import React, { useEffect, useState } from "react";
import { status, statusNepali } from "../json/company";
import { IoFilter } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function EventsFilter({
  selectedCategory,
  handleCategoryChange,
  handleStatusChange,
  selectedStatus,
  selectedYear,
  handleChangeYear,
  fiscalYears,
  categories,
  handleSearch,
  setSelectedYear,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (fiscalYears.length > 0) {
      setSelectedYear(fiscalYears.length);
    }
  }, []);
  return (
    <div className="">
      <div className="text-center max-w-screen-2xl mx-auto  ">
        {/* <StatusDots /> */}

        <div className=" md:flex gap-3  items-center p-2  ">
          <div className="flex gap-2 w-full">
            {/* <div className="relative   border px-2 py-2  rounded  cursor-pointer  ">
              <div
                className="flex items-center  text-gray-600 "
                onClick={handleOpen}
              >
                <IoFilter size={18} />
              </div>
            </div> */}
            <div className="relative md:w-4/12 flex items-center ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                // value={searchTerm}
                onChange={handleSearch}
                className="w-full  py-1 pl-10 pr-4 rounded-full  border border-gray-200 focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
          <div className="md:flex items-center gap-3 my-3 text-sm ">
            {/* search bar */}

            <div className="">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className=" mySelect min-w-32 text-xs"
              >
                <option value="">सबै</option>

                {categories?.map(({ name, id }, i) => (
                  <option value={id} key={i} className=" capitalize">
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <select
                value={selectedYear}
                onChange={handleChangeYear}
                className="  min-w-32  mySelect"
              >
                {fiscalYears?.map(({ year, id }) => (
                  <option value={id} key={id}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsFilter;
