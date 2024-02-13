import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { LuUser2 } from "react-icons/lu";

function Login() {
  const { handleLogin } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className=" md:w-4/12  w-full  p-5 bg-white rounded-lg  shadow-lg  ">
        <form className="m-5" onSubmit={(e) => handleLogin(e, data)}>
          <div className="mb-5 gap-3">
            {/* <div>Email:</div> */}
            <label className="myLabel" htmlFor="email">
              Email:
            </label>
            <div>
              <input
                id="email"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                className="myInput "
                required
              />
            </div>
          </div>
          <div className="mb-2">
            {/* <div>Password :</div> */}
            <label className="myLabel" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="myInput"
              required
            />
          </div>
          <div className="italic text-blue-600 hover:underline mt-5">
            <a href="/auth/register"> Don't have an Account ?</a>
          </div>
          <div className="text-end">
            <button
              className="myButton "
              // onClick={(e) => handleSubmit(e, data)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
