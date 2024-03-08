import React from "react";

function SearchBar({ handleSearch, searchTerm }) {
  return (
    <div>
      <div className=" md:flex gap-3  items-center p-2  ">
        <div className="flex gap-2 w-full">
          <div className="relative  flex items-center ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
              value={searchTerm}
              onChange={handleSearch}
              className="w-full  py-1 pl-10 pr-4 rounded-full  border border-gray-200 focus:outline-none focus:border-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
