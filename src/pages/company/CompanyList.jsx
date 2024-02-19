import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";

const API_URL = import.meta.env.VITE_API_URL;
function CompanyList() {
  const navigate = useNavigate();

  const { companies, handleDelete } = useCompany();
  return (
    <div className="bg-white  shadow-lg">
      <div className="flex justify-between items-center border-b  bg-zinc-50 p-3 ">
        <div className="heading md:flex items-center gap-5 ">
          <h2>कम्पनी</h2>
          <p>(यहाँ कम्पनीहरूको सूची छ)</p>
        </div>
        <div className="text-end mb-3 ">
          <button
            className="myButtonOutline  py-2 "
            onClick={() => navigate(`/dashboard/config/companies/add`)}
          >
            <div className="flex gap-2 items-center">
              <BiPlus size={20} />
              <span>नयाँ</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col  overflow-x-scroll">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="font-bold   ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
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
                      },
                      i
                    ) => (
                      <tr key={i} className={i / 2 !== 0 ? "bg-gray-50 " : ""}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {i + 1}
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
                          <div className="flex gap-2">
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
    </div>
  );
}

export default CompanyList;
