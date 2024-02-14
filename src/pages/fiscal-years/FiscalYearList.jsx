import React from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function FiscalYearList() {
  const navigate = useNavigate();
  const { fiscalYears, handleDelete } = useFiscalYear();
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="font-medium border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Years
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {fiscalYears?.map(
                    ({ id, year, startDate, endDate, status }, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{year}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {startDate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {endDate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {status == true && (
                            <span className="text-green-600">Active</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-2">
                            <BiEdit
                              onClick={() =>
                                navigate(`/dashboard/config/fiscal-year/${id}`)
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

export default FiscalYearList;
