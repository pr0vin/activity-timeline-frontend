import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../helpers/ToastMessage";
import { useAuth } from "./AuthProvider";

const EventContext = createContext();
function EventProvider({ children }) {
  const init = {
    events: [],
    event: {},
  };

  const { token } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/events`, data);
      getEvents();
      notifySuccess(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e, data, id) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/events/${id}`, data);
      getEvents();
      notifySuccess(res.data.message);
      navigate(`/dashboard/events`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/events/${id}`);
      getEvents();
      notifySuccess(res.data.message);
      navigate(`/dashboard/events`);
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    const res = await axios.get(`/api/events`);

    dispatch({ type: "ALL", payload: res.data });
  };
  const getEvent = async (id) => {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({ type: "SINGLE", payload: res.data });
  };

  useEffect(() => {
    getEvents();
  }, [token]);

  return (
    <EventContext.Provider
      value={{ ...state, handleDelete, handleSubmit, handleUpdate, getEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

const useEvent = () => {
  return useContext(EventContext);
};

export { EventProvider, useEvent };
const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        events: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        event: action.payload,
      };

    default:
      return state;
  }
};
