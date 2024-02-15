import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import { BiEdit, BiTrash } from "react-icons/bi";

const API_URL = import.meta.env.VITE_API_URL;
function CompanyList() {
  const navigate = useNavigate();

  const { companies, handleDelete } = useCompany();
  return (
    <div>
      <div className="text-end mb-3 ">
        <button
          className="myButton py-2 rounded-full"
          onClick={() => navigate(`/dashboard/config/companies/add`)}
        >
          Add a new company
        </button>
      </div>

      <div className="bg-white ">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Company
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
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
                        <tr key={i} className="border-b">
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
                                <h6 className="font-bold text-lg">{name}</h6>
                                <p>{description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {contact}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {email}
                          </td>
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
    </div>
  );
}

export default CompanyList;
