import React from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  convertEnglishToNepaliUnicode,
  convertToNepaliUnicode,
} from "../../helpers/UnicodeToEnglish";
function FiscalYearList({ handleOpen, open }) {
  const navigate = useNavigate();
  const { fiscalYears, handleDelete } = useFiscalYear();

  const length = fiscalYears && fiscalYears.length;
  const num = convertToNepaliUnicode(length);

  return (
    <div>
      <div className=" flex p-3 bg-zinc-50 items-center justify-between gap-5 border-b">
        <div className="md:flex gap-5 items-center">
          <h2 className="font-bold text-xl">आर्थिक वर्षहरू </h2>
          <p className="text-xs">
            ( अहिले <strong>{num}</strong> आर्थिक वर्षहरू छन् )
          </p>
        </div>
        <div>
          {!open && (
            <button
              onClick={handleOpen}
              className="flex myButtonOutline border border-gray-300 "
            >
              <BiPlus size={20} />
              <span>नयाँ</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col overflow-x-scroll">
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
                      आर्थिक वर्ष
                    </th>
                    <th scope="col" className="px-6 py-4">
                      सुरु मिति
                    </th>
                    <th scope="col" className="px-6 py-4">
                      समाप्त मिति
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {fiscalYears?.map(
                    ({ id, year, startDate, endDate, status }, i) => {
                      const sn = convertToNepaliUnicode(i + 1);
                      return (
                        <tr key={i}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {sn}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {year}
                          </td>
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
                                  navigate(
                                    `/dashboard/config/fiscal-year/${id}`
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
                      );
                    }
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
