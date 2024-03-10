import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../providers/EventProvider";
import { useCategory } from "../../providers/CategoryProvider";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { BiCopy, BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { AiOutlineSelect } from "react-icons/ai";
import StatusView from "../../components/StatusView";
import { MdOutlinePreview } from "react-icons/md";
import EventsFilter from "../../helpers/EventsFilter";
import NepaliDate from "nepali-date-converter";
import { useCompany } from "../../providers/CompanyProvider";
import Modal from "../../helpers/Modal";
import SearchBar from "../../helpers/SearchBar";
import { notifyError } from "../../helpers/ToastMessage";
function EventsLists() {
  const navigate = useNavigate();
  const {
    events,
    handleDelete,
    handleCopySelectedEvent,
    handleDublicateSelectedEvent,
  } = useEvent();
  const { companies } = useCompany();
  const { categories } = useCategory();

  const { fiscalYears, activeYear } = useFiscalYear();

  const [index, setIndex] = useState(-1);
  const [select, setSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredCompany, setFilteredcompany] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // tranCompany

  const [data, setData] = useState({
    target_companies: [],
    target_events: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [arrCompanies, setArrCompanies] = useState([]);
  const [selectAllEvents, setSelectAllEvents] = useState(false);
  const [arrEvents, setArrEvents] = useState([]);

  useMemo(() => {
    const filtered = events.filter(
      (event) =>
        (!selectedYear || event.fiscal_year_id == selectedYear) &&
        (!selectedCategory ||
          event.categories.some(
            (category) => category.id == selectedCategory
          )) &&
        (!selectedStatus || event.status === selectedStatus) &&
        (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.date.toLowerCase().includes(searchTerm.toString()))
    );
    const paginatedEvents = filtered.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    setFilteredEvents(paginatedEvents);
  }, [
    events,
    searchTerm,
    selectedCategory,
    selectedYear,
    selectedStatus,
    perPage,
    currentPage,
  ]);

  const setEmpty = () => {
    setData({
      ...data,
      target_companies: [],
      target_events: [],
    });
    setArrCompanies([]);
    setArrEvents([]);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const toggleSelect = () => {
    setSelect((prev) => !prev);
    setEmpty();
  };
  const handleSearch = (e) => {
    setSearchterm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    if (activeYear) {
      setSelectedYear(activeYear.id);
    }
  }, [activeYear]);

  const props = {
    selectedCategory,
    handleCategoryChange,
    handleStatusChange,
    selectedStatus,
    selectedYear,
    handleChangeYear,
    handleSearch,
    fiscalYears,
    categories,
    searchTerm,
    handleSearch,
    setSelectedYear,
  };
  const calculateOverallIndex = (pageIndex, index) => {
    return (pageIndex - 1) * perPage + index + 1;
  };

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

  // function to select companies
  const handleEventCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setArrEvents([...arrEvents, value]);
    } else {
      setArrEvents(arrEvents.filter((event) => event !== value));
    }
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setArrCompanies([...arrCompanies, value]);
    } else {
      setArrCompanies(arrCompanies.filter((company) => company !== value));
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setArrCompanies([]);
    } else {
      const com = companies.map((company) => company.id.toString());
      setArrCompanies(com);
    }
    setSelectAll(!selectAll);
  };
  const toggleAllEvents = () => {
    if (selectAllEvents) {
      setArrEvents([]);
    } else {
      const ev = events.map((event) => event.id.toString());
      setArrEvents(ev);
    }
    setSelectAllEvents(!selectAllEvents);
  };

  useMemo(() => {
    setData({
      ...data,
      target_companies: arrCompanies,
    });
  }, [arrCompanies]);

  useMemo(() => {
    setData({
      ...data,
      target_events: arrEvents,
    });
  }, [arrEvents]);

  const handleTransfer = () => {
    if (data.target_companies.length === 0 || data.target_events.length === 0) {
      notifyError("please select companies");
    } else {
      handleCopySelectedEvent(data);
      setEmpty();
      handleOpen();
      setSelectAllEvents(false);
      setSelectAll((prev) => !prev);
    }
  };
  const handleDublicate = () => {
    if (data.target_events.length === 0) {
      notifyError("please select events");
    } else {
      handleDublicateSelectedEvent(data);
      toggleSelect();
      setEmpty();
      setSelectAllEvents(false);
    }
  };

  const handleCompanySearch = (e) => {
    setSearchData(e.target.value);
  };

  useMemo(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchData.toString())
    );

    setFilteredcompany(filtered);
  }, [searchData]);

  return (
    <div className="">
      <div className=" ">
        <div className="md:flex  justify-between items-center   ">
          <div className="heading   items-center gap-5 ">
            <h2 className="">कार्ययोजनाहरू</h2>
            {/* <p className="text-lg">यहाँ कार्यहरूको सूची छ |</p>s */}
          </div>

          <div className="flex gap-3 justify-end px-2">
            {select ? (
              <div className="flex gap-2">
                <button
                  className="myButtonOutline   min-w-32  "
                  onClick={handleDublicate}
                >
                  <div className="flex gap-2 items-center">
                    <BiCopy size={18} />
                    <span>Dublicate </span>
                  </div>
                </button>
                <button
                  className="myButtonOutline   min-w-32  "
                  onClick={handleOpen}
                >
                  <div className="flex gap-2 items-center">
                    <AiOutlineSelect size={18} />
                    <span>company </span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                className="myButtonOutline   w-32  "
                onClick={toggleSelect}
              >
                <div className="flex gap-2 items-center">
                  <AiOutlineSelect size={18} />
                  <span>select </span>
                </div>
              </button>
            )}
            <button
              className="myButton  hover:border-gray-300 w-32 border hover:text-white  "
              onClick={() => navigate(`/dashboard/events/add`)}
            >
              <div className="flex gap-2 items-center">
                <BiPlus size={18} />
                <span>नयाँ</span>
              </div>
            </button>
          </div>
        </div>
        {/* <div class="relative w-1/4">
          <input
            type="text"
            placeholder="Search"
            class="w-full py-2 pr-10 pl-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div> */}

        <div className="">
          <EventsFilter {...props} />
        </div>
        <div className="  p-2  bg-white rounded-lg drop-shadow-xl   ">
          <div className="flex flex-col overflow-auto bg-white min-h-[60vh] ">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-center text-sm font-light text-gray-700">
                    <thead className="font-medium border-b border-gray-100  ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          {select ? (
                            <span className="">
                              <span className="flex gap-2">
                                <button
                                  onClick={toggleSelect}
                                  className="border px-1 border-gray-100 text-red-300"
                                >
                                  X
                                </button>
                              </span>
                              <label htmlFor=""> All</label>
                              <input
                                type="checkbox"
                                checked={selectAllEvents}
                                onChange={toggleAllEvents}
                              />
                            </span>
                          ) : (
                            <span>#</span>
                          )}
                        </th>

                        <th scope="col" className="px-6 py-4">
                          शीर्षक
                        </th>
                        <th scope="col" className="px-6 py-4">
                          विवरण
                        </th>

                        <th scope="col" className="px-6 py-4">
                          तोकिएको मिति
                        </th>
                        <th scope="col" className="px-6 py-4">
                          समुह
                        </th>

                        <th scope="col" className="px-6 py-4">
                          जिम्मेवार व्यक्ति / शाखा
                        </th>
                        <th scope="col" className="px-6 py-4">
                          स्थिति
                        </th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents?.map(
                        (
                          {
                            id,
                            title,
                            content,
                            categories,
                            fiscal_year,
                            date,
                            status,
                            assignTo,
                          },
                          i
                        ) => (
                          <tr
                            key={i}
                            onClick={() => setIndex(id)}
                            className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              index === id && "bg-gray-100"
                            }`}
                          >
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {select ? (
                                <label>
                                  <input
                                    id={i}
                                    type="checkbox"
                                    name="events"
                                    checked={
                                      arrEvents && arrEvents.includes(`${id}`)
                                    }
                                    onChange={handleEventCheckboxChange}
                                    value={id}
                                  />
                                </label>
                              ) : (
                                <label>
                                  {calculateOverallIndex(currentPage, i)}
                                </label>
                              )}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-start">
                              <span
                                className="font-bold hover:underline"
                                onClick={() =>
                                  navigate(`/dashboard/events/${id}/view`)
                                }
                              >
                                {" "}
                                {title}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-start">
                              {content.slice(0, 50)}...
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {date}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              <ul className="flex whitespace-nowrap gap-2">
                                {categories?.map((innerItem, innerIndex) => (
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
                              {assignTo}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <StatusView status={status} />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex gap-2">
                                <MdOutlinePreview
                                  onClick={() =>
                                    navigate(`/dashboard/events/${id}/view`)
                                  }
                                  className="text-secondary"
                                  size={23}
                                />
                                <BiEdit
                                  onClick={() =>
                                    navigate(`/dashboard/events/add/${id}`)
                                  }
                                  className="text-secondary"
                                  size={23}
                                />
                                <BiTrash
                                  onClick={(e) => handleDelete(e, id)}
                                  className="text-secondary"
                                  size={23}
                                />
                              </div>{" "}
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
            {" "}
            <div className=" relative flex justify-between p-2">
              <div>
                <select
                  name="perPage"
                  className="block w-full py-1 px-2 text-gray-700 bg-white border border-gray-200 rounded  focus:outline-none focus:border-secondary;"
                  value={perPage}
                  onChange={handlePerPageChange}
                  id=""
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  className="myButtonOutline"
                  disabled={currentPage === 1}
                  onClick={goToPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="myButtonOutline"
                  disabled={currentPage * perPage >= events.length}
                  onClick={goToNextPage}
                >
                  <span> Next Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="md:w-[400px]">
              <div className="font-bold">Select Companies</div>
              <SearchBar
                handleSearch={handleCompanySearch}
                searchTerm={searchData}
              />
              <ul className="p-2">
                <li className="flex gap-3 justify-end border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <label htmlFor="">Select All</label>
                </li>
                {filteredCompany?.map(({ id, name }, i) => (
                  <li
                    key={i}
                    className="border-b border-gray-100 text-sm font-bold p-2 flex gap-2"
                  >
                    <input
                      id={i}
                      type="checkbox"
                      name="companies"
                      checked={arrCompanies && arrCompanies.includes(`${id}`)}
                      onChange={handleCheckboxChange}
                      value={id}
                    />

                    <span>{name}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between gap-4 mt-5">
                <button
                  className="myButtonOutline text-red-300"
                  onClick={handleOpen}
                >
                  Cancel
                </button>{" "}
                <button onClick={handleTransfer} className="myButton ">
                  Transfer Data
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default EventsLists;
