import React, { useMemo, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import Paginate from "../../helpers/Paginate";
function UsersList() {
  const navigate = useNavigate();
  const { allUsers } = useAuth();
  const [menu, setMenu] = useState(false);
  const [index, setIndex] = useState(-1);
  const [searchTerm, setSearchterm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // filter
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useMemo(() => {
    const filtered = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedEvents = filtered.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    setFilteredData(paginatedEvents);
  }, [currentPage, perPage, allUsers, searchTerm]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPerPage(value);
    }
  };

  const toggleMenu = (i) => {
    if (menu && index === i) {
      setMenu((prev) => !prev);
      setIndex(-1);
    } else {
      setIndex(i);
    }
  };

  const handleSearch = (e) => {
    setSearchterm(e.target.value);
  };

  let paginateData = allUsers;
  const props = {
    handlePerPageChange,
    currentPage,
    perPage,
    paginateData,
    goToNextPage,
    goToPreviousPage,
  };

  return (
    <div>
      <div className="p-2 font-bold text-2xl">Users</div>
      <div className="flex justify-between my-3 gap-3">
        <div className="relative md:w-4/12 w-8/12 flex items-center ">
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
            value={searchTerm}
            onChange={handleSearch}
            className="w-full  py-1 pl-10 pr-4 rounded-full  border border-gray-200 focus:outline-none focus:border-secondary"
          />
        </div>
        <div>
          <button
            className="myButton  hover:border-gray-300 w-32 border hover:text-white  "
            onClick={() =>
              navigate(`/dashboard/config/company-user/register-new`)
            }
          >
            <div className="flex gap-2 items-center">
              <BiPlus size={18} />
              <span>नयाँ</span>
            </div>
          </button>
        </div>
      </div>
      <div className="  p-2  bg-white rounded-lg shadow-lg  ">
        <div className="flex flex-col overflow-auto bg-white min-h-[60vh] ">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-center text-sm font-light text-gray-500">
                  <thead className="font-medium   ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Roles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map(
                      ({ id, company, roles, name, email }, i) => (
                        <tr key={i} className={"border-b border-gray-100"}>
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 ">
                            {name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {email}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {company.name}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <ul className="flex whitespace-nowrap items-center gap-2">
                              {roles?.map((innerItem, innerIndex) => (
                                <li
                                  className="border px-2 text-xs rounded-full"
                                  key={innerIndex}
                                >
                                  {innerItem.name}
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="relative flex gap-2">
                              <IoEllipsisVerticalSharp
                                size={23}
                                onClick={() => toggleMenu(i)}
                              />

                              {index === i && (
                                <ul
                                  onClick={() => toggleMenu(i)}
                                  className="absolute p-2 z-[99] right-0 bg-white shadow-lg text-xs cursor-pointer"
                                >
                                  <li className="p-1 border-b border-gray-100 hover:bg-gray-100">
                                    Edit
                                  </li>
                                  <li className="p-1 border-b border-gray-100 hover:bg-gray-100">
                                    Delete
                                  </li>
                                  <li
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/config/company-user/change-password/${id}`
                                      )
                                    }
                                    className="p-1 border-b border-gray-100 hover:bg-gray-100"
                                  >
                                    Change Password
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Paginate {...props} />
        </div>
      </div>
    </div>
  );
}

export default UsersList;
