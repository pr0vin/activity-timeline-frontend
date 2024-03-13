import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../helpers/ToastMessage";
import { useAuth } from "./AuthProvider";
import { useFiscalYear } from "./FiscalYearProvider";

const EventContext = createContext();
function EventProvider({ children }) {
  const init = {
    events: [],
    eventLoading: true,
    event: {},
    loading: false,
    currentPage: 1,
    hasMore: true,
  };

  const { token } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  const nextPage = () => {
    dispatch({ type: "INCREMENT_PAGE" });
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/events`, data);
      getEvents();
      notifySuccess(res.data.message);
      navigate(`/dashboard/events/${res.data.event.id}/view`);
    } catch (error) {
      notifyError(error);
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
      notifyError(error);
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
      notifyError(error);
    }
  };

  const getEvents = async () => {
    // const res = await axios.get(`/api/events`);

    try {
      const response = await axios.get(`/api/events`);

      dispatch({ type: "ALL", payload: response.data.data });
    } catch (error) {
      notifyError(error);
    }
  };

  const getEvent = async (id) => {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({ type: "SINGLE", payload: res.data.data });
  };

  const handleCopyEvent = async (data) => {
    const res = await axios.post(`/api/copy-events`, data);
    notifySuccess(res.data.message);
  };
  const handleSelfCopyEvent = async (data) => {
    const res = await axios.post(`/api/copy-my-events`, data);
    notifySuccess(res.data.message);
  };
  const handleCopySelectedEvent = async (data) => {
    const res = await axios.post(`/api/copy-selected-events`, data);
    notifySuccess(res.data.message);
    getEvents();
  };
  const handleDublicateSelectedEvent = async (data) => {
    const res = await axios.post(`/api/dublicate-events`, data);
    notifySuccess(res.data.message);
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        ...state,
        nextPage,
        handleDelete,
        handleSubmit,
        handleUpdate,
        getEvent,
        handleCopyEvent,
        handleSelfCopyEvent,
        handleCopySelectedEvent,
        handleDublicateSelectedEvent,
      }}
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
        eventLoading: false,
        event: action.payload,
      };

    default:
      return state;
  }
};
