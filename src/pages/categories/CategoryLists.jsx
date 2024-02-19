import React from "react";
import { useCategory } from "../../providers/CategoryProvider";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function CategoryLists({ handleOpen, open }) {
  const navigate = useNavigate();
  const { categories, handleDelete } = useCategory();

  return (
    <div className="">
      <div className=" flex p-3 bg-zinc-50 items-center justify-between gap-5 border-b">
        <div className="md:flex gap-5 items-center">
          <h2 className="font-bold text-xl"> वर्गहरू </h2>
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
                      वर्ग
                    </th>

                    <th scope="col" className="px-6 py-4">
                      विवरण
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(({ id, name, description }, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{name}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {description}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
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
