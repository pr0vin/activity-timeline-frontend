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
import Modal from "../../helpers/Modal";

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
    <div className="">
      {" "}
      <div className="p-5 md:w-10/12  mx-auto bg-white">
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
                className="myButtonOutline   "
                onClick={() => navigate(`/dashboard/events/add`)}
              >
                <div className="flex items-center gap-2">
                  <PiPlus size={16} /> <span>नयाँ </span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="min-h-[10rem] bg-white my-3 ">
            <p className="p-3 text-gray-600">{event.content}</p>
          </div>

          <div className="text-xs  text-gray-500">
            <strong>जिम्मेवार व्यक्ति / शाखा :</strong>{" "}
            <span>{event.assignTo}</span>
          </div>
        </div>

        <div className="  overflow-hidden mt-10 ">
          <div className="flex gap-5 mb-5">
            <div className="font-bold text-xl px-3   text-gray-700">
              कार्यहरू
            </div>
            {!open && (
              <button className="myButtonOutline    " onClick={handleOpen}>
                <div className="flex items-center gap-2">
                  <PiPlus size={16} /> <span>नयाँ </span>
                </div>
              </button>
            )}
          </div>

          <div>
            <TasksList {...taskProps} />
          </div>
        </div>

        <div>
          <Modal open={open} onClose={() => setOpen(false)}>
            {open && (
              <div className="md:w-[400px] ">
                <div>
                  <div className="font-bold    text-gray-700 ">
                    नयाँ कार्य सिर्जना गर्नुहोस् |
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(data);
                    setData({ ...data, name: "" });
                  }}
                >
                  <div className="  items-center  gap-2  my-5  py-3 ">
                    <label htmlFor="" className="myLabel">
                      कार्यको शीर्षक
                    </label>
                    <input
                      type="text"
                      className=" myInput "
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="flex justify-between gap-4 mt-5">
                    <button
                      className="myButtonOutline text-red-300"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>{" "}
                    <button className="myButton ">save</button>
                  </div>
                </form>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default EventView;
