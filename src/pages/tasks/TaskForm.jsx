import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useTasks } from "../../providers/TaskProvider";

export default function TaskForm() {
  const { eventId, id } = useParams();
  const { handleSubmit, handleUpdate, task, taskLoading, getTask } = useTasks();
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

  const Update = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("_method", "PUT");
    data.append("event_id", eventId);
    data.append("name", name);
    data.append("documents", file);

    handleUpdate(data, id);
  };

  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && task) {
      setName(task.name);
      setFiles(task.documents);
    }
  }, [id, task]);

  if (taskLoading) {
    return "Loading...";
  }

  return (
    <div className="flex  justify-center">
      <form className="md:w-1/2" onSubmit={id ? Update : Submit}>
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
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
