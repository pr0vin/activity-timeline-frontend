import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useTasks } from "../../providers/TaskProvider";

export default function TaskForm() {
  const { eventId } = useParams();
  const { handleSubmit, handleUpdate } = useTasks();
  const [name, setName] = useState("");
  const [file, setFiles] = useState(null);
  const setImgFiles = (e) => {
    const value = e.target.files[0];
    setFiles(value);
  };

  const Submit = (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("event_id", eventId);
    data.append("name", name);
    data.append("documents", file);

    handleSubmit(data);
  };

  return (
    <div className="flex  justify-center">
      <form className="md:w-1/2" onSubmit={Submit}>
        <div className="font-bold my-5">Add the task below</div>

        <div className="mb-2">
          <label className="myLabel" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="myInput"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="mb-2">
          <label className="myLabel" htmlFor="doc">
            Documents
          </label>
          <input
            id="doc"
            type="file"
            className="myInput bg-white"
            name="documents"
            onChange={setImgFiles}
          />
        </div>
        <div className="mt-5 text-end ">
          <button className="myButton px-10 rounded-full">
            {!eventId ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
