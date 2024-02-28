import React, { useEffect, useState } from "react";
import { useCategory } from "../../providers/CategoryProvider";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { IoMoveSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function CategoryLists({ handleOpen, open }) {
  const navigate = useNavigate();
  const { categories, handleDelete, handleSaveOrder } = useCategory();

  const [makeChange, setMakeChange] = useState(false);
  const [orderedCategories, setOrderedCategories] = useState([]);

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
      const updatedCategories = [...orderedCategories];
      // Remove the dragged item from its original position
      const draggedItem = updatedCategories.splice(draggedIndex, 1)[0];
      // Move the dragged item to the new position
      updatedCategories.splice(index, 0, draggedItem);
      // Update orderedCategories state with the new order
      setOrderedCategories(updatedCategories);
    }
  };

  const handleDragEnd = () => {
    // Reset makeChange state to false after dragging ends
    // setMakeChange(false);
  };

  useEffect(() => {
    setOrderedCategories(categories);
  }, [categories, makeChange]);

  return (
    <div className="">
      <div className=" md:flex p-3  items-center justify-between gap-5 ">
        <div className="heading md:flex gap-5 items-center">
          <h2 className="font-bold text-2xl p-2"> वर्गहरू </h2>
          <p>(यहाँ वर्गहरूको सूची छ)</p>
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
              className="flex myButton px-8 border border-gray-300 "
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
              handleSaveOrder(orderedCategories);
              handleMakeOrder();
            }}
          >
            Save Order{" "}
          </button>
        </div>
      )}
      <div className="flex flex-col">
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
                      वर्ग
                    </th>

                    <th scope="col" className="px-6 py-4">
                      विवरण
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderedCategories?.map(({ id, name, description }, i) => (
                    <tr
                      key={id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, i)}
                      onDragOver={(e) => handleDragOver(e, i)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center justify-center gap-5">
                        {makeChange ? (
                          <span>
                            <IoMoveSharp size={18} />
                          </span>
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{name}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {description}
                      </td>

                      <td className="whitespace-nowrap  py-4">
                        <div className="flex gap-2">
                          <BiEdit
                            onClick={() =>
                              navigate(`/dashboard/config/categories/${id}`)
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryLists;
