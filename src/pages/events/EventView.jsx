import React, { useEffect, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useTasks } from "../../providers/TaskProvider";
import { PiPlus } from "react-icons/pi";

function EventView() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { event, getEvent } = useEvent();
  const { handleUpdate, handleSubmit } = useTasks();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const [data, setData] = useState({
    name: "",
    event_id: eventId,
  });
  const [file, setFiles] = useState(null);
  const setImgFiles = (e) => {
    const value = e.target.files[0];
    setFiles(value);
  };
  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId]);

  const upload = (id) => {
    let data = new FormData();
    data.append("_method", "PUT");
    data.append("documents", file);
    data.append("event_id", eventId);

    handleUpdate(data, id);
  };

  return (
    <div className="p-5 bg-white">
      <div className=" md:flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p>{event.content}</p>
        </div>
        <div>
          {/* <button
            className="myButton py-2 px-10  "
            onClick={() => navigate(`/dashboard/events/${eventId}/view/add`)}
          > */}
          <button className="myButton py-2 px-10  " onClick={handleOpen}>
            <div className="flex items-center gap-2">
              <PiPlus size={16} /> <span>New</span>
            </div>
          </button>
        </div>
      </div>

      {/* <div className="bg-white p-5 mt-10">
        <Outlet />
      </div> */}

      {open && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(data);
              setData({ ...data, name: "" });
            }}
          >
            <div className="md:flex  mx-5 items-center  gap-2  mt-10  py-3 ">
              <div className="md:w-1/2">
                <input
                  type="text"
                  className="myInput h-12  "
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-2 ">
                <button className="border px-5">
                  <PiPlus size={24} className=" mx-3 my-2" />
                </button>
                <button
                  onClick={handleOpen}
                  className="border px-10 py-2 text-red-300"
                >
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-10 overflow-hidden ">
        <div className="font-bold text-xl mb-5">Tasks:</div>
        <div className="overflow-x-scroll w-full">
          <ul>
            {event.tasks?.map((task, i) => (
              <li
                key={i}
                className="flex justify-between gap-5 items-center border-b mb-5 pb-2"
              >
                <span className=" whitespace-pre  md:text-lg before:w-3 before:h-3 before:me-5 before:bg-gray-600 before:rounded-full before:inline-block">
                  {task.name}
                </span>
                {task.documents ? (
                  <span className="flex gap-5">
                    <BiCheck size={23} className="text-green-600" />{" "}
                    <BsEye size={23} className="text-blue-600" />
                  </span>
                ) : (
                  <label
                    htmlFor="doc"
                    className="px-10 py-2 bg-gray-50  rounded-lg  flex gap-5 items-center"
                  >
                    <div className="text-[8px]">{file && file.name}</div>

                    <div>
                      {!file ? (
                        <div className="flex gap-5">
                          <IoCloudUploadOutline size={23} />{" "}
                          <small>upload</small>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => upload(task.id)}
                            className="border bg-indigo-100 px-2 rounded"
                          >
                            upload
                          </button>
                        </div>
                      )}
                    </div>
                  </label>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-2">
        <input
          id="doc"
          type="file"
          className="hidden"
          name="documents"
          onChange={setImgFiles}
          required
        />
      </div>
    </div>
  );
}

export default EventView;
