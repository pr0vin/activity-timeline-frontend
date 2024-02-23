import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../helpers/ToastMessage";
import { useAuth } from "./AuthProvider";

const CompanyContext = createContext();

const init = {
  companies: [],
  company: {},
};
function CompanyProvider({ children }) {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post(`/api/companies`, data);
      getCompanies();
      notifySuccess(res.data.message);
      navigate(`/dashboard/config/companies`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (data, id) => {
    try {
      const res = await axios.post(`/api/companies/${id}`, data);
      getUser();
      getCompanies();
      notifySuccess(res.data.message);
      navigate(`/home`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/companies/${id}`);
      getCompanies();
      notifySuccess(res.data.message);
      navigate(`/dashboard/config/companies`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanies = async () => {
    const res = await axios.get(`/api/companies`);

    dispatch({ type: "ALL", payload: res.data });
  };
  const getCompany = async (id) => {
    const res = await axios.get(`/api/companies/${id}`);
    dispatch({ type: "SINGLE", payload: res.data });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <CompanyContext.Provider
      value={{ ...state, handleDelete, handleSubmit, handleUpdate, getCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

const useCompany = () => {
  return useContext(CompanyContext);
};

export { CompanyProvider, useCompany };

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        companies: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        company: action.payload,
      };

    default:
      return state;
  }
};
