import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    // e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/register`, data);
      localStorage.setItem("token", res.data.token);
      navigate("/auth/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="  p-5 bg-white rounded-lg md:w-4/12 shadow-lg ">
        <form>
          <div className="mb-2">
            <label className="myLabel">Username:</label>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="myInput"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="myLabel"> Email:</label>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="myInput"
                value={data.email}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="myLabel">Password :</label>
            <input
              type="password"
              name="password"
              className="myInput"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-2">
            <label className="myLabel">Confirm Password :</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="myInput"
              value={data.confirm}
              onChange={handleChange}
              name="confirm"
              required
            />
          </div>
          <div className="italic text-blue-600 hover:underine">
            <a href="/auth/login"> Already Have an Account ?</a>
          </div>
          <div className="text-end">
            <button type="submit" onClick={handleSubmit} className="myButton ">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
