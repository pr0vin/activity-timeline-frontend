import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const FiscalYearContext = createContext();
function FiscalYearProvider({ children }) {
  const init = {
    fiscalYears: [],
    fiscalYear: {},
  };

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/fiscal-years`, data);
      getFiscalYears();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e, data, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/fiscal-years/${id}`, data);
      getFiscalYears();
      navigate(`/dashboard/config/fiscal-year`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/fiscal-years/${id}`);
      console.log(res.data.message);
      getFiscalYears();
      navigate(`/dashboard/config/fiscal-year`);
    } catch (error) {
      console.log(error);
    }
  };

  const getFiscalYears = async () => {
    const res = await axios.get(`/api/fiscal-years`);

    dispatch({ type: "ALL", payload: res.data });
  };
  const getFiscalYear = async (id) => {
    const res = await axios.get(`/api/fiscal-years/${id}`);
    dispatch({ type: "SINGLE", payload: res.data });
  };

  useEffect(() => {
    getFiscalYears();
  }, []);

  return (
    <FiscalYearContext.Provider
      value={{
        ...state,
        getFiscalYear,
        getFiscalYears,
        handleSubmit,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </FiscalYearContext.Provider>
  );
}

const useFiscalYear = () => {
  return useContext(FiscalYearContext);
};

export { FiscalYearProvider, useFiscalYear };

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        fiscalYears: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        fiscalYear: action.payload,
      };

    default:
      return state;
  }
};