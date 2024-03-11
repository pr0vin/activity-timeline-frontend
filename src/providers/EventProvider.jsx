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
import { notifySuccess } from "../helpers/ToastMessage";
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
  const { activeYear } = useFiscalYear();
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [hasMore, setHasMore] = useState(false);

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
    // const res = await axios.get(`/api/events`);

    try {
      const response = await axios.get(`/api/events`);

      dispatch({ type: "ALL", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  // const getEvents = async (activeYear, currentPage) => {
  //   try {
  //     dispatch({ type: "SET_LOADING", payload: true });
  //     const response = await axios.get(
  //       `/api/events?fiscal_year_id=${activeYear.id}&page=${currentPage}`
  //     );

  //     // Update state based on the fetched data
  //     if (currentPage === 1) {
  //       // If it's the first page, replace existing events with new ones
  //       dispatch({ type: "SET_EVENTS", payload: response.data.data });
  //     } else {
  //       // If it's not the first page, append new events to existing ones
  //       dispatch({ type: "APPEND_EVENTS", payload: response.data.data });
  //     }

  //     // Check if there are more pages to load
  //     const totalPages = response.data.meta.last_page;
  //     const hasMore = currentPage < totalPages;
  //     dispatch({ type: "SET_HAS_MORE", payload: hasMore });
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   } finally {
  //     dispatch({ type: "SET_LOADING", payload: false });
  //   }
  // };
  const getEvent = async (id) => {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({ type: "SINGLE", payload: res.data.data });
    console.log(state.loading);
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

  useMemo(() => {
    if (activeYear && state.currentPage) {
      getEvents(activeYear, state.currentPage);
    }
  }, [activeYear, state.currentPage]);

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

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_EVENTS":
//       return {
//         ...state,
//         events: action.payload,
//         loading: false,
//       };
//     case "APPEND_EVENTS":
//       return {
//         ...state,
//         events: [...state.events, ...action.payload],
//         loading: false,
//       };
//     case "SET_LOADING":
//       return {
//         ...state,
//         loading: action.payload,
//       };

//     case "SET_HAS_MORE":
//       return {
//         ...state,
//         hasMore: action.payload,
//       };
//     case "INCREMENT_PAGE":
//       return {
//         ...state,
//         currentPage: state.currentPage + 1,
//       };
//     case "SINGLE":
//       return {
//         ...state,
//         eventLoading: false,
//         event: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        events: [...state.events, ...action.payload],
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
