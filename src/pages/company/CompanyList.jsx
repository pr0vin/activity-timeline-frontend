import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import { BiEdit, BiPlus, BiTrash, BiCopy } from "react-icons/bi";
import CopyEvents from "../../components/CopyEvents";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useEvent } from "../../providers/EventProvider";
import { TiTrash, TiWarningOutline } from "react-icons/ti";
import LoadingPage from "../../helpers/LoadingPage";
import Paginate from "../../helpers/Paginate";
import Modal from "../../helpers/Modal";
import { AiOutlineSelect } from "react-icons/ai";
import { notifyError } from "../../helpers/ToastMessage";
import { company } from "../../json/company";

const API_URL = import.meta.env.VITE_API_URL;
function CompanyList() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { fiscalYears, fiscalYearLoading } = useFiscalYear();
  const { handleCopyEvent, handleSelfCopyEvent } = useEvent();
  const { companies, handleDelete, renewCompnay } = useCompany();

  const [index, setIndex] = useState(-1);
  const [selectAll, setSelectAll] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [arrCompanies, setArrCompanies] = useState([]);
  const [data, setData] = useState({
    source_id: "",
    target_id: "",
    from_fiscal_year: "",
    to_fiscal_year: "",
    target_companies: [],
  });

  const [searchTerm, setSearchterm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // filter
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleOpen = (e) => {
    setOpen((prev) => !prev);
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const setEmpty = () => {
    setData({
      ...data,
      from_fiscal_year: "",
      to_fiscal_year: "",
      target_companies: [],
    });
    setArrCompanies([]);
  };

  const toggleTransfer = () => {
    setIsTransfer(!isTransfer);
  };

  useEffect(() => {
    setData({
      ...data,
      target_companies: arrCompanies,
    });
  }, [arrCompanies]);

  const handleTransfer = (e) => {
    e.preventDefault();

    handleCopyEvent(data);
    setEmpty();
    toggleTransfer();
  };

  const handleSelfTransfer = (e) => {
    e.preventDefault();
    if (!data.to_fiscal_year || !data.from_fiscal_year) {
      return null;
    }

    handleSelfCopyEvent(data);
    setEmpty();
    toggleTransfer();
  };

  const handleCopy = () => {
    if (data.target_companies.length === 0) {
      notifyError("Please selest company first");
    } else {
      handleOpen();
    }
  };

  const copyProp = {
    handleChange,
    data,
    fiscalYears,
    setEmpty,
    handleTransfer,
    toggleTransfer,
    handleSelfTransfer,
  };

  const handleSearch = (e) => {
    setSearchterm(e.target.value);
  };

  // paginate
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

  useMemo(() => {
    const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedEvents = filtered.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    setFilteredData(paginatedEvents);
  }, [currentPage, perPage, , searchTerm, companies]);

  let paginateData = companies;
  const props = {
    handlePerPageChange,
    currentPage,
    perPage,
    paginateData,
    goToNextPage,
    goToPreviousPage,
  };

  if (fiscalYearLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="  ">
      <div className="md:flex justify-between items-center   px-3 ">
        <div className="heading md:flex items-center gap-5 ">
          <h3 className="font-bold text-2xl text-gray-700">कम्पनीहरू</h3>
          {/* <p>(यहाँ कम्पनीहरूको सूची छ)</p> */}
        </div>
        {/* <div className="text-end mb-3  flex gap-3">
          {" "}
          <button
            className={`myButtonOutline  bg-white py-2 ${
              isTransfer && "border-primary border bg-secondary"
            }`}
            onClick={() => setIsTransfer((prev) => !prev)}
          >
            <label className="flex gap-2 items-center">
              <BiCopy size={20} />
              <span>नक्कल</span>
            </label>
          </button>
          <button
            className="myButton px-10  py-2 "
            onClick={() => navigate(`/dashboard/config/companies/add`)}
          >
            <div className="flex gap-2 items-center">
              <BiPlus size={20} />
              <span>नयाँ</span>
            </div>
          </button>
        </div> */}
      </div>

      <div className="md:flex justify-between my-3 gap-3">
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
        <div className="flex gap-2 mt-3">
          {isTransfer ? (
            <div className="flex gap-2">
              {/* <button
                className={`myButtonOutline w-32  bg-blue-100 py-2 ${
                  isTransfer && "border-primary border "
                }`}
                onClick={handleOpen}
                disabled={data.target_companies.length === 0}
              >
                <label className="flex gap-2 items-center">
                  <AiOutlineSelect size={18} />
                  <span>Year</span>
                </label>
              </button> */}
              <button
                className={`myButtonOutline w-32   py-2 ${
                  isTransfer && "border-secondary border "
                }`}
                onClick={handleCopy}
                // disabled={data.target_companies.length === 0}
              >
                <label className="flex gap-2 items-center">
                  <BiCopy size={18} />
                  <span>नक्कल</span>
                </label>
              </button>
            </div>
          ) : (
            <button
              className={`myButtonOutline w-32  bg-white py-2 ${
                isTransfer && "border-primary border "
              }`}
              onClick={() => setIsTransfer((prev) => !prev)}
            >
              <label className="flex gap-2 items-center">
                <AiOutlineSelect size={18} />
                <span>Select</span>
              </label>
            </button>
          )}
          <button
            className="myButton  hover:border-gray-300 w-32 border hover:text-white  "
            onClick={() => navigate(`/dashboard/config/companies/add`)}
          >
            <div className="flex gap-2 items-center">
              <BiPlus size={18} />
              <span>नयाँ</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col  overflow-x-scroll bg-white shadow-lg  rounded">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="font-bold border-b border-gray-100   ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      {isTransfer ? (
                        <span className="">
                          <span className="flex gap-2">
                            <button
                              onClick={toggleTransfer}
                              className="border px-1 border-gray-100 text-red-300"
                            >
                              X
                            </button>
                          </span>
                          <label htmlFor=""> All</label>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                          />{" "}
                        </span>
                      ) : (
                        <span>#</span>
                      )}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      कम्पनी
                    </th>

                    <th scope="col" className="px-6 py-4">
                      ठेगाना
                    </th>
                    <th scope="col" className="px-6 py-4">
                      सम्पर्क
                    </th>
                    <th scope="col" className="px-6 py-4">
                      इमेल ठेगाना
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Expires on
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map(
                    (
                      {
                        id,
                        name,
                        description,
                        address,
                        contact,
                        email,
                        subLogo,
                        remaining_days,
                        status,
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
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {isTransfer ? (
                            <label>
                              <input
                                id={i}
                                type="checkbox"
                                name="companies"
                                checked={
                                  arrCompanies && arrCompanies.includes(`${id}`)
                                }
                                onChange={handleCheckboxChange}
                                value={id}
                              />
                            </label>
                          ) : (
                            <label>{i + 1}</label>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-start">
                            <h6 className="font-bold ">{name}</h6>
                            <p className="text-xs">{description}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {address}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contact}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{email}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {!remaining_days ? (
                            <span className="text-amber-600">
                              <button
                                onClick={() => renewCompnay(id)}
                                className="bg-red-600  text-white  px-2 py-1 rounded hover:bg-red-900"
                              >
                                Renew
                              </button>
                            </span>
                          ) : remaining_days < 30 ? (
                            <span className="text-red-600">
                              <div className="flex  gap-2 pt-5 items-center">
                                <span>
                                  <TiWarningOutline size={18} />
                                </span>
                                <span> {remaining_days}</span>
                                <span> days left</span>
                              </div>
                            </span>
                          ) : (
                            <span className="text-amber-600 ">
                              <span> {remaining_days}</span>
                              <span className="px-2">days left</span>
                            </span>
                          )}
                          <span className="px-2 text-blue-600"></span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {status === "1" ? (
                            <span className="text-green-500">Active</span>
                          ) : (
                            <span className="text-red-600">expired</span>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="flex gap-2">
                            <BiEdit
                              onClick={() =>
                                navigate(
                                  `/dashboard/config/companies/add/${id}`
                                )
                              }
                              className="text-blue-300"
                              size={23}
                            />
                            <BiTrash
                              onClick={(e) => handleDelete(e, id)}
                              className="text-red-300"
                              size={23}
                            />
                          </span>{" "}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <Paginate {...props} />
        </div>
      </div>

      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          {/* <div className="text-center w-full">
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this item?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-light w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger w-full">Delete</button>
            </div>
          </div> */}

          {isTransfer && (
            <div className="text-center">
              <CopyEvents {...copyProp} />
            </div>
          )}

          <div className="flex justify-between gap-4 mt-5">
            <button
              className="myButtonOutline text-red-300"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>{" "}
            <button
              disabled={!data.from_fiscal_year || !data.to_fiscal_year}
              onClick={handleTransfer}
              className="myButton "
            >
              Transfer Data
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CompanyList;
