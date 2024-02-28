import React, { useEffect, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  BiCalendarEvent,
  BiCheck,
  BiCross,
  BiEdit,
  BiEditAlt,
} from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useTasks } from "../../providers/TaskProvider";
import { PiPlus } from "react-icons/pi";
import NepaliDate from "nepali-date-converter";
import TasksList from "../tasks/TasksList";
import { RxCross2 } from "react-icons/rx";
import LoadingPage from "../../helpers/LoadingPage";

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
  const [name, setName] = useState("");
  const [file, setFiles] = useState(null);
  const setImgFiles = (e, index, task) => {
    const value = e.target.files[0];
    setFiles(value);
    setIndex(index);
    setName(task);
  };

  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId]);

  const upload = (id) => {
    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("documents", file);
    formData.append("event_id", eventId);
    formData.append("name", name);

    handleUpdate(formData, id);
    setIndex(-1);
  };

  if (eventLoading) {
    return <LoadingPage />;
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/dashboard/events/add/${eventId}`)}
            className="flex text-primary items-center gap-2 text-sm rounded hover:border hover:border-gray-200 hover:bg-gray-100 py-1.5 px-3 "
          >
            {" "}
            <BiEdit className="text-primary" size={18} /> <span> Edit</span>
          </button>

          {!open && (
            <button
              className="myButtonOutline   py-2 px-10  "
              onClick={handleOpen}
            >
              <div className="flex items-center gap-2">
                <PiPlus size={16} /> <span>नयाँ कार्य</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="my-5 p-3 bg-gray-50">{event.content}</p>

        <div className="text-xs text-end text-gray-500">
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
              <div className="md:w-8/12 flex items-center border   rounded-lg">
                <input
                  type="text"
                  className="appearance-none rounded   w-full  px-4 text-gray-700 text-sm  py-2 focus:outline-none focus:bg-white focus:border-primary   "
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
                <div className="flex items-center">
                  <button className=" border-x border-gray-100 hover:bg-gray-100 hover:rounded px-3  flex items-center ">
                    <PiPlus size={18} className=" mx-3 my-2" />{" "}
                    <span>थप्नुहोस्</span>
                  </button>
                  <button
                    onClick={handleOpen}
                    className=" hover:bg-gray-100 hover:rounded px-3  text-red-300"
                  >
                    <RxCross2 size={23} className=" mx-3 my-2" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white  overflow-hidden ">
        <div className="font-bold text-lg my-5 px-3 text-gray-500">
          कार्यहरू
        </div>

        <div>
          <TasksList {...taskProps} />
        </div>
        {/* <div className="overflow-x-scroll w-full">
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
                    onChange={(e) => setImgFiles(e, i, task.name)}
                    required
                  />
                </div>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default EventView;
