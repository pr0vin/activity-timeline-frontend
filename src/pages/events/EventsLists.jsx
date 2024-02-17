import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../providers/EventProvider";
import { BiEdit, BiHappyHeartEyes, BiTrash } from "react-icons/bi";
import StatusView from "../../components/StatusView";
function EventsLists() {
  const navigate = useNavigate();
  const { events } = useEvent();

  return (
    <div>
      <div>
        <button
          className="myButton"
          onClick={() => navigate(`/dashboard/events/add`)}
        >
          Add
        </button>
      </div>

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
                        Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Content
                      </th>
                      <th scope="col" className="px-6 py-4">
                        FiscalYear
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Organize Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Categories
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events?.map(
                      (
                        {
                          id,
                          title,
                          content,
                          categories,
                          fiscal_year,
                          date,
                          status,
                        },
                        i
                      ) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {content}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {fiscal_year.year}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {date}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <ul className="flex whitespace-nowrap gap-2">
                              {categories?.map((innerItem, innerIndex) => (
                                <li className="border p-1" key={innerIndex}>
                                  {innerItem.name}
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <StatusView status={status} />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <BiEdit
                                onClick={() =>
                                  navigate(`/dashboard/events/add/${id}`)
                                }
                                className="text-blue-300"
                                size={23}
                              />
                              <BiTrash
                                onClick={(e) => handleDelete(e, id)}
                                className="text-red-300"
                                size={23}
                              />
                              <BiHappyHeartEyes
                                onClick={() =>
                                  navigate(`/dashboard/events/${id}/view`)
                                }
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

export default EventsLists;
