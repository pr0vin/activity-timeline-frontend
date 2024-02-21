import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../helpers/ToastMessage";
import { useAuth } from "./AuthProvider";

const CategoryContext = createContext();

const init = {
  categories: [],
  category: {},
};
function CategoryProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);
  const { token } = useAuth();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/categories`, data);
      getCategories();
      notifySuccess(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e, data, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/categories/${id}`, data);
      getCategories();
      notifySuccess(res.data.message);
      navigate(`/dashboard/config/categories`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/categories/${id}`);
      getCategories();
      notifySuccess(res.data.message);

      navigate(`/dashboard/config/categories`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    const res = await axios.get(`/api/categories`);

    dispatch({ type: "ALL", payload: res.data });
  };
  const getCategory = async (id) => {
    const res = await axios.get(`/api/categories/${id}`);
    dispatch({ type: "SINGLE", payload: res.data });
  };

  useEffect(() => {
    getCategories();
  }, [token]);
  return (
    <CategoryContext.Provider
      value={{
        ...state,
        handleDelete,
        handleSubmit,
        handleUpdate,
        getCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

const useCategory = () => {
  return useContext(CategoryContext);
};
export { CategoryProvider, useCategory };

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        ...state,
        categories: action.payload,
      };

    case "SINGLE":
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};
