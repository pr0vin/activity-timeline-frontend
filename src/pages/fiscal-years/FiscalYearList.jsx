import React, { useEffect, useState } from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  convertEnglishToNepaliUnicode,
  convertToNepaliUnicode,
} from "../../helpers/UnicodeToEnglish";
import { IoMoveSharp } from "react-icons/io5";
function FiscalYearList({ handleOpen, open }) {
  const navigate = useNavigate();
  const { fiscalYears, handleDelete, handleSaveOrder } = useFiscalYear();

  const length = fiscalYears && fiscalYears.length;
  const num = convertToNepaliUnicode(length);

  const [makeChange, setMakeChange] = useState(false);
  const [orderedFiscalYears, setOrderedFiscalYears] = useState([]);

  useEffect(() => {
    // Initialize orderedFiscalYears with the initial fiscal years
    setOrderedFiscalYears(fiscalYears);
  }, [fiscalYears]);

  const handleMakeOrder = () => {
    setMakeChange(!makeChange);
  };

  const handleDragStart = (e, index) => {
    // Store the index of the dragged item
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    // Get the index of the dragged item
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    // If the dragged item is not over itself
    if (draggedIndex !== index) {
      const updatedFiscalYears = [...orderedFiscalYears];
      // Remove the dragged item from its original position
      const draggedItem = updatedFiscalYears.splice(draggedIndex, 1)[0];
      // Move the dragged item to the new position
      updatedFiscalYears.splice(index, 0, draggedItem);
      // Update orderedFiscalYears state with the new order
      setOrderedFiscalYears(updatedFiscalYears);
    }
  };

  const handleDragEnd = () => {
    // Reset makeChange state to false after dragging ends
    // setMakeChange(false);
  };

  return (
    <div>
      <div className=" flex p-3  items-center justify-between gap-5 ">
        <div className="md:flex gap-5 items-center heading">
          <h2 className="font-bold text-2xl">आर्थिक वर्षहरू </h2>
          <p className="text-xs">
            ( अहिले <strong>{num}</strong> आर्थिक वर्षहरू छन् )
          </p>
        </div>
        <div className="flex gap-3">
          {!makeChange && (
            <div>
              <button
                onClick={handleMakeOrder}
                className="flex myButtonOutline border border-gray-300 "
              >
                Manage Order
              </button>
            </div>
          )}
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
      {makeChange && (
        <div className="flex gap-3 justify-end px-3">
          <button
            className="myButtonOutline text-red-300"
            onClick={handleMakeOrder}
          >
            Cancel
          </button>
          <button
            className="myButton"
            onClick={() => {
              handleSaveOrder(orderedFiscalYears);
              handleMakeOrder();
            }}
          >
            Save Order{" "}
          </button>
        </div>
      )}
      <div className="flex flex-col overflow-x-scroll">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="font-medium border-b ">
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
                  {orderedFiscalYears?.map(
                    ({ id, year, startDate, endDate, status }, i) => {
                      const sn = convertToNepaliUnicode(i + 1);
                      return (
                        <tr
                          key={i}
                          draggable
                          onDragStart={(e) => handleDragStart(e, i)}
                          onDragOver={(e) => handleDragOver(e, i)}
                          onDragEnd={handleDragEnd}
                        >
                          <td className="whitespace-nowrap flex items-center justify-center py-4 font-medium">
                            {makeChange ? (
                              <span>
                                <IoMoveSharp size={18} />
                              </span>
                            ) : (
                              <span>{sn}</span>
                            )}
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
