import React, { useEffect, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { Outlet, useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useTasks } from "../../providers/TaskProvider";

function EventView() {
  const { eventId } = useParams();
  const { event, getEvent } = useEvent();
  const { handleUpdate } = useTasks();

  const [file, setFiles] = useState(null);
  const setImgFiles = (e) => {
    const value = e.target.files[0];
    console.log(value);
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
    <>
      <div>
        <h1>{event.title}</h1>
        <p>{event.content}</p>
      </div>

      <ul>
        {event.tasks?.map((task, i) => (
          <li key={i} className="flex gap-5 items-center">
            <span>{task.name}</span>
            {task.documents ? (
              <span className="flex gap-5">
                <BiCheck size={23} className="text-green-600" />{" "}
                <BsEye size={23} className="text-blue-600" />
              </span>
            ) : (
              <label
                htmlFor="doc"
                className="px-10 py-2 border-4  rounded-lg border-dotted flex gap-5 items-center"
              >
                <div className="text-[8px]">{file && file.name}</div>

                <div>
                  {!file ? (
                    <div className="flex gap-5">
                      <IoCloudUploadOutline size={23} /> <small>upload</small>
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

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default EventView;
