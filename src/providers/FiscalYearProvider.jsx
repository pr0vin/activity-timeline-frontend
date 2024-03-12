import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../helpers/ToastMessage";
import { useAuth } from "./AuthProvider";

const FiscalYearContext = createContext();
function FiscalYearProvider({ children }) {
  const init = {
    fiscalYearLoading: true,
    fiscalYears: [],
    fiscalYear: {},
    activeYear: {},
  };

  const { token } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post(`/api/fiscal-years`, data);
      getFiscalYears();
      notifySuccess(res.data.message);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };
  const handleUpdate = async (data, id) => {
    try {
      const res = await axios.put(`/api/fiscal-years/${id}`, data);

      getFiscalYears();
      notifySuccess(res.data.message);
      navigate(`/dashboard/config/fiscal-year`);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/fiscal-years/${id}`);
      getFiscalYears();
      notifySuccess(res.data.message);
      navigate(`/dashboard/config/fiscal-year`);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const getFiscalYears = async () => {
    const res = await axios.get(`/api/fiscal-years`);

    dispatch({ type: "ALL", payload: res.data.data });
  };
  const getFiscalYear = async (id) => {
    const res = await axios.get(`/api/fiscal-years/${id}`);
    dispatch({ type: "SINGLE", payload: res.data.data });
  };

  const getActiveYears = async () => {
    const res = await axios.get(`/api/active-year`);
    dispatch({ type: "ACTIVE", payload: res.data.activeYear });
  };

  const handleSaveOrder = async (data) => {
    const fiscalYearOrder = data.map((category) => category.id);

    const res = await axios.put(`/api/order-fiscal-years`, {
      fiscalYearOrder: fiscalYearOrder,
    });

    notifySuccess(res.data.message);
    getFiscalYear();
  };

  useEffect(() => {
    getFiscalYears();
    getActiveYears();
  }, [token]);

  return (
    <FiscalYearContext.Provider
      value={{
        ...state,
        getFiscalYear,
        getFiscalYears,
        handleSubmit,
        handleUpdate,
        handleDelete,
        handleSaveOrder,
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
        fiscalYearLoading: false,
        fiscalYears: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        fiscalYear: action.payload,
      };
    case "ACTIVE":
      return {
        ...state,
        activeYear: action.payload,
      };
    default:
      return state;
  }
};
