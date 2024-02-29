import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import { notifySuccess } from "../../helpers/ToastMessage";
function Register() {
  const navigate = useNavigate();
  const { companies } = useCompany();

  const [data, setData] = useState({
    company_id: "",
    role: "user",
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const setEmpty = () => {
    setData({
      ...data,
      company_id: "",
      role: "user",
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
  };
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
      notifySuccess(res.data);
      setEmpty();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="bg-white w-full">
      <div div className="flex justify-center">
        <div className="  p-5 rounded-lg md:w-6/12  ">
          <div className=" mb-5">
            <h6 className="font-bold text-xl">Register</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="company" className="myLabel">
                Select a Municipality
              </label>
              <div>
                <select
                  className="mySelect"
                  name="company_id"
                  value={data.company_id}
                  onChange={handleChange}
                  id="company"
                  required
                >
                  <option value="">select</option>
                  {companies?.map(({ id, name }, i) => (
                    <option key={i} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
              <label htmlFor="role" className="myLabel">
                Select a Roles
              </label>
              <div>
                <select
                  className="mySelect"
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  id="role"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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

            <div className="text-end my-10">
              <button type="submit" className="myButton  ">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
