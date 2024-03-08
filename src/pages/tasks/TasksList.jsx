import React, { useState } from "react";
import { BiCheck, BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../providers/TaskProvider";
import { convertToNepaliUnicode } from "../../helpers/UnicodeToEnglish";

const API_URL = import.meta.env.VITE_API_URL;

function TasksList({ tasks, setImgFiles, file, index, upload, eventId }) {
  const navigate = useNavigate();
  const { handleDelete } = useTasks();
  return (
    <div>
      <div className="flex flex-col overflow-x-auto bg-white  min-h-screen ">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-center text-sm font-light ">
                {/* <thead className="font-medium border-b ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>

                    <th scope="col" className="px-6 py-4">
                      शीर्षक
                    </th>
                    <th></th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead> */}
                <tbody>
                  {tasks?.map(({ id, name, documents }, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {convertToNepaliUnicode(i + 1)}
                      </td>
                      <td className="whitespace-nowrap text-start px-6 py-4">
                        {name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {documents ? (
                          <span className="flex gap-5">
                            <BiCheck size={23} className="text-green-600" />{" "}
                            <a
                              href={`${API_URL}/storage/${documents}`}
                              className="flex items-center gap-3 hover:text-blue-600 hover:underline"
                              download="FileName.pdf"
                            >
                              <BsEye size={23} className="text-gray-600" />
                              <span className="italic ">view</span>
                            </a>
                          </span>
                        ) : (
                          <div className="flex items-center">
                            <label
                              htmlFor={id}
                              className="px-10 py-2   rounded-lg  flex gap-5 items-center"
                            >
                              <div className="text-[8px]">
                                {i === index && file && file.name}
                              </div>

                              <div>
                                {index !== i && (
                                  <div className="flex gap-5">
                                    <IoCloudUploadOutline size={23} />
                                    <small>upload</small>
                                  </div>
                                )}
                              </div>
                            </label>
                            {index === i && file && (
                              <div>
                                <button
                                  onClick={() => upload(id)}
                                  className="myButtonOutline px-2 rounded"
                                >
                                  upload
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mb-2">
                          <input
                            id={id}
                            type="file"
                            className="hidden"
                            name="documents"
                            onChange={(e) => setImgFiles(e, i, name)}
                            required
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2">
                          {/* <MdOutlinePreview
                            className="text-gray-400"
                            size={23}
                          /> */}
                          <BiEdit
                            onClick={() =>
                              navigate(
                                `/dashboard/events/${eventId}/tasks/${id}`
                              )
                            }
                            className="text-secondary"
                            size={24}
                          />
                          <BiTrash
                            onClick={(e) => handleDelete(e, id)}
                            className="text-secondary"
                            size={24}
                          />
                        </div>
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

export default TasksList;
