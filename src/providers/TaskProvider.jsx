import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../helpers/ToastMessage";
import { useEvent } from "./EventProvider";

const TaskContext = createContext();
function TaskProvider({ children }) {
  const init = {
    tasks: [],
    task: {},
  };
  const navigate = useNavigate();
  const { getEvent } = useEvent();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post(`/api/tasks`, data);

      console.log(res.data);
      notifySuccess(res.data.message);
      getEvent(res.data.task.event_id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (data, id) => {
    try {
      const res = await axios.post(`/api/tasks/${id}`, data);
      console.log(res.data);
      notifySuccess(res.data.message);
      // getTasks();
      // navigate(`/dashboard/config/tasks`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      getTasks();
      navigate(`/dashboard/config/tasks`);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    const res = await axios.get(`/api/tasks`);

    dispatch({ type: "ALL", payload: res.data });
  };
  const getTask = async (id) => {
    const res = await axios.get(`/api/tasks/${id}`);
    dispatch({ type: "SINGLE", payload: res.data });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ ...state, handleDelete, handleSubmit, handleUpdate, getTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

const useTasks = () => {
  return useContext(TaskContext);
};

export { TaskProvider, useTasks };

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        tasks: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        task: action.payload,
      };

    default:
      return state;
  }
};
