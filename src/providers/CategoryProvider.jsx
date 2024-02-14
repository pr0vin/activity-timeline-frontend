import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const CategoryContext = createContext();

const init = {
  categories: [],
  category: {},
};
function CategoryProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/categories`, data);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e, data, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/categories/${id}`, data);
      getCategories();
      navigate(`/dashboard/config/fiscal-year`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/categories/${id}`);
      console.log(res.data.message);
      getCategories();
      navigate(`/dashboard/config/fiscal-year`);
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
  }, []);
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
