import React from "react";
import { useCategory } from "../../providers/CategoryProvider";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function CategoryLists() {
  const navigate = useNavigate();
  const { categories, handleDelete } = useCategory();

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
                      Category
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Description
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
