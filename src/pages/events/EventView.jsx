import React, { useEffect, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { BiCalendarEvent, BiCheck } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useTasks } from "../../providers/TaskProvider";
import { PiPlus } from "react-icons/pi";
import NepaliDate from "nepali-date-converter";
import TasksList from "../tasks/TasksList";

function EventView() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { event, getEvent, eventLoading } = useEvent();
  const { handleUpdate, handleSubmit } = useTasks();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const [data, setData] = useState({
    name: "",
    event_id: eventId,
  });

  const [index, setIndex] = useState(-1);
  const [file, setFiles] = useState(null);
  const setImgFiles = (e, index) => {
    const value = e.target.files[0];
    setFiles(value);
    setIndex(index);
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
    setIndex(-1);
  };

  if (eventLoading) {
    return "loading";
  }

  const { tasks } = event;
  let eventDate = new NepaliDate(event.date).format("ddd DD, MMMM YYYY", "np");

  const taskProps = {
    setImgFiles,
    file,
    index,
    tasks,
    upload,
    eventId,
  };

  return (
    <div className="p-5 bg-white">
      <div className=" md:flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{event.title}</h1>

          <p className="text-sm flex my-2 items-center">
            <BiCalendarEvent size={18} className="text-primary" />
            <span> {eventDate}</span>
          </p>
        </div>

        <div>
          {!open && (
            <button
              className="myButtonOutline py-2 px-10  "
              onClick={handleOpen}
            >
              <div className="flex items-center gap-2">
                <PiPlus size={16} /> <span>New</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="my-5 p-3 bg-gray-50">{event.content}</p>

        <div className="text-xs text-gray-500">
          <strong>Assigned To :</strong> <span>{event.assignTo}</span>
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
            <div className="md:flex  md:mx-5 items-center  gap-2  mt-10  py-3 ">
              <div className="md:w-1/2">
                <input
                  type="text"
                  className="myInput   "
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-2 ">
                <button className="border px-5 flex items-center">
                  <PiPlus size={18} className=" mx-3 my-2" /> <span>Add</span>
                </button>
                <button
                  onClick={handleOpen}
                  className="border px-10 py-1 text-red-300"
                >
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white pt-10 overflow-hidden ">
        <div className="font-bold text-lg mb-5 text-gray-500">Tasks:</div>

        <div>
          <TasksList {...taskProps} />
        </div>
        <div className="overflow-x-scroll w-full">
          <ul>
            {event.tasks?.map((task, i) => (
              <li
                key={i}
                className="flex justify-between gap-5 items-center border-b mb-5 pb-2"
              >
                <span className=" whitespace-pre  md:text- before:w-3 before:h-3 before:me-5 before:bg-gray-600 before:rounded-full before:inline-block">
                  {task.name}
                </span>
                {task.documents ? (
                  <span className="flex gap-5">
                    <BiCheck size={23} className="text-green-600" />{" "}
                    <BsEye size={23} className="text-blue-600" />
                  </span>
                ) : (
                  <label
                    htmlFor={task.id}
                    className="px-10 py-2 bg-gray-50  rounded-lg  flex gap-5 items-center"
                  >
                    <div className="text-[8px]">
                      {i === index && file && file.name}
                    </div>

                    <div>
                      {index !== i ? (
                        <div className="flex gap-5">
                          <IoCloudUploadOutline size={23} />
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

                <div className="mb-2">
                  <input
                    id={task.id}
                    type="file"
                    className="hidden"
                    name="documents"
                    onChange={(e) => setImgFiles(e, i)}
                    required
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventView;
