import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../providers/EventProvider";
import { BiEdit, BiHappyHeartEyes, BiPlus, BiTrash } from "react-icons/bi";
import StatusView from "../../components/StatusView";
import { PiPlus } from "react-icons/pi";
function EventsLists() {
  const navigate = useNavigate();
  const { events } = useEvent();

  return (
    <div className="">
      <div className="bg-white shadow-lg p-5 ">
        <div className="flex justify-between items-center border-b  p-3 ">
          <div className="heading md:flex items-center gap-5 ">
            <h2>कार्यहरू</h2>
            <p>(यहाँ कार्यहरूको सूची छ)</p>
          </div>
          <div className="text-end mb-3 ">
            <button
              className="myButtonOutline  py-2 "
              onClick={() => navigate(`/dashboard/events/add`)}
            >
              <div className="flex gap-2 items-center">
                <BiPlus size={20} />
                <span>नयाँ</span>
              </div>
            </button>
          </div>
        </div>
        <div class="flex flex-col overflow-x-auto bg-white ">
          <div class="sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-x-auto">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>

                      <th scope="col" className="px-6 py-4">
                        शीर्षक
                      </th>
                      <th scope="col" className="px-6 py-4">
                        वर्णन
                      </th>
                      <th scope="col" className="px-6 py-4">
                        आर्थिक वर्ष
                      </th>
                      <th scope="col" className="px-6 py-4">
                        तोकिएको मिति
                      </th>
                      <th scope="col" className="px-6 py-4">
                        वर्गहरू
                      </th>
                      <th scope="col" className="px-6 py-4">
                        खटाइएका
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
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
                          assignTo,
                        },
                        i
                      ) => (
                        <tr key={i} className={i % 2 == 0 ? "bg-gray-50 " : ""}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {content.slice(0, 50)}...
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
                            {assignTo}
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
