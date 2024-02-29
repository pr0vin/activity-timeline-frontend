import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import { BiEdit, BiPlus, BiTrash, BiCopy } from "react-icons/bi";
import CopyEvents from "../../components/CopyEvents";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useEvent } from "../../providers/EventProvider";
import { TiWarningOutline } from "react-icons/ti";

const API_URL = import.meta.env.VITE_API_URL;
function CompanyList() {
  const navigate = useNavigate();

  const { fiscalYears, fiscalYearLoading } = useFiscalYear();
  const { handleCopyEvent } = useEvent();
  const { companies, handleDelete, renewCompnay } = useCompany();
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

  const copyProp = {
    handleChange,
    data,
    fiscalYears,
    setEmpty,
    handleTransfer,
    toggleTransfer,
  };

  if (fiscalYearLoading) {
    return "loading";
  }

  console.log(companies);
  return (
    <div className="bg-white  shadow-lg">
      <div className="md:flex justify-between items-center   py-8 px-3 ">
        <div className="heading md:flex items-center gap-5 ">
          <h2>कम्पनी</h2>
          <p>(यहाँ कम्पनीहरूको सूची छ)</p>
        </div>
        <div className="text-end mb-3  flex gap-3">
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
        </div>
      </div>

      {isTransfer && (
        <div>
          <CopyEvents {...copyProp} />
        </div>
      )}

      <div className="flex flex-col  overflow-x-scroll">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="font-bold border-b  ">
                  <tr>
                    {isTransfer ? (
                      <label>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                        />{" "}
                        All
                      </label>
                    ) : (
                      <label>#</label>
                    )}

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
                  {companies?.map(
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
                      <tr key={i} className={i / 2 !== 0 ? "bg-gray-50 " : ""}>
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
                          <div className="flex  items-center gap-3 ">
                            <div className="w-12 h-12">
                              <img
                                src={`${API_URL}/storage/${subLogo}`}
                                alt="photo"
                                className="h-12 w-12 rounded-full border "
                              />
                            </div>
                            <div className="text-start">
                              <h6 className="font-bold ">{name}</h6>
                              <p className="text-xs">{description}</p>
                            </div>
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
                                  {" "}
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
      </div>
    </div>
  );
}

export default CompanyList;
