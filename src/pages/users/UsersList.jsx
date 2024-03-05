import React from "react";
import { useAuth } from "../../providers/AuthProvider";

function UsersList() {
  const { allUsers } = useAuth();
  return (
    <div>
      <div className="  p-2  bg-white rounded-lg drop-shadow-xl   ">
        <div className="flex flex-col overflow-auto bg-white min-h-[60vh] ">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-center text-sm font-light text-gray-500">
                  <thead className="font-medium   ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Roles
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {users?.map(
                      (
                        {
                          id,
                          title,
                          content,
                          categories,
                          fiscal_year,
                          date,
                          status,
                          assignTo,
                        },
                        i
                      ) => (
                        <tr key={i} className={"border-b border-gray-100"}>
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-start">
                            {title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-start">
                            {content.slice(0, 50)}...
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {date}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <ul className="flex whitespace-nowrap gap-2">
                              {categories?.map((innerItem, innerIndex) => (
                                <li
                                  className="border px-2 text-xs rounded-full"
                                  key={innerIndex}
                                >
                                  {innerItem.name}
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {assignTo}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <StatusView status={status} />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <MdOutlinePreview
                                onClick={() =>
                                  navigate(`/dashboard/events/${id}/view`)
                                }
                                className="text-secondary"
                                size={23}
                              />
                              <BiEdit
                                onClick={() =>
                                  navigate(`/dashboard/events/add/${id}`)
                                }
                                className="text-secondary"
                                size={23}
                              />
                              <BiTrash
                                onClick={(e) => handleDelete(e, id)}
                                className="text-secondary"
                                size={23}
                              />
                            </div>{" "}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          {" "}
          {/* <div className=" relative flex justify-between p-2">
            <div>
              <select
                name="perPage"
                className="block w-full py-1 px-2 text-gray-700 bg-white border border-gray-200 rounded  focus:outline-none focus:border-secondary;"
                value={perPage}
                onChange={handlePerPageChange}
                id=""
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                className="myButtonOutline"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                Previous
              </button>
              <button
                className="myButtonOutline"
                disabled={currentPage * perPage >= events.length}
                onClick={goToNextPage}
              >
                <span> Next Page</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
