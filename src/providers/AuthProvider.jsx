import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate("/");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({});

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

  const handlePasswordChange = (data) => {
    console.log(data);
  };

  const handleLogin = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/login`, data);
      // localStorage.setItem("token", res.data.token);
      getUser();
      setToken(res.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/user`);
      setUser(res.data.user);
      setUserLoading(false);
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
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, userLoading, logOut, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };
