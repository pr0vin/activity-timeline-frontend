import React, { useEffect } from "react";
import { status, statusNepali } from "../json/company";
import NepaliDate from "nepali-date-converter";
import ProfileMenu from "../components/ProfileMenu";
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
}) {
  useEffect(() => {
    if (fiscalYears.length > 0) {
      setSelectedYear(fiscalYears.length);
    }
  }, []);

  return (
    <>
      <div className="text-center max-w-screen-2xl mx-auto my-3 shadow-lg">
        {/* <StatusDots /> */}

        <div className=" md:flex gap-5 justify-between items-center p-2 ">
          <div className="flex items-center">
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
              ? "border-b-4 border-primary text-sm font-bold bg-gray-100"
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
                ? "border-b-4 border-primary text-sm font-bold bg-gray-100"
                : ""
            }`}
                >
                  {name}
                </label>
              </div>
            ))}
          </div>

          <div className="md:flex items-center gap-3 my-3">
            <div className="flex items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="isa"
                  name="status"
                  value="all"
                  className="sr-only"
                  checked={selectedStatus === "all"}
                  onChange={handleStatusChange}
                />
                <label
                  htmlFor="isa"
                  className={`cursor-pointer select-none px-3 py-1 
          ${
            selectedStatus === "all"
              ? "border-b-4 border-primary text-sm font-bold bg-gray-100"
              : ""
          }`}
                >
                  सबै
                </label>
              </div>
              <div className="flex  items-center ">
                {status.map((s) => (
                  <div key={s} className="flex items-center">
                    <input
                      type="radio"
                      id={s}
                      name="status"
                      value={s}
                      className="sr-only"
                      checked={selectedStatus === s}
                      onChange={handleStatusChange}
                    />
                    <label
                      htmlFor={s}
                      className={`cursor-pointer select-none px-3 py-1 
            ${
              selectedStatus === s
                ? "border-b-4 border-primary text-sm font-bold bg-gray-100 "
                : ""
            }`}
                    >
                      {statusNepali[s]}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between my-2 gap-3">
              <div className="">
                <select
                  value={selectedYear}
                  onChange={handleChangeYear}
                  className=" rounded-lg text-sm  mySelect"
                >
                  {fiscalYears?.map(({ year, id }) => (
                    <option value={id} key={id}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubNavBar;
