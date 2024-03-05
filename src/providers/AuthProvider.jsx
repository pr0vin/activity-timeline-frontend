import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../helpers/ToastMessage";
import axios from "axios";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const logOut = () => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      navigate("/");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (data) => {
    const res = await axios.post(`/api/change-password`, data);
    notifySuccess(res.data.message);
    navigate("/");
  };

  const handleUserPasswordChange = async (data, id) => {
    const res = await axios.put(`/api/change-user-password/${id}`, data);
    notifySuccess(res.data.message);
  };

  const handleLogin = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/login`, data);
      // localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      getUser();
      notifySuccess(res.data.message);
      navigate("/home");
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/user`);
      const { user } = res.data;
      setUser(user);
      setUserLoading(false);
      if (user) {
        const admin = user.roles.some((item) => item.name === "admin");
        setIsAdmin(admin);
      }
      if (user) {
        const superAdmin = user.roles.some(
          (item) => item.name === "Super-Admin"
        );

        setIsSuperAdmin(superAdmin);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`/api/all-users`);
      setAllUsers(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useMemo(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  useMemo(() => {
    getUser();
    getAllUsers();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        userLoading,
        isAdmin,
        isSuperAdmin,
        allUsers,
        logOut,
        handleLogin,
        handlePasswordChange,
        handleUserPasswordChange,
        getUser,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };
