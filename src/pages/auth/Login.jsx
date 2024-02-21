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
    <div className=" w-[100%]">
      <div className=" md:w-4/12  mx-auto   py-5 px-10 bg-white rounded-lg  shadow-lg  ">
        <div className="flex justify-center -m-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFK8a1szrFRi4lMNlCRf5ODhQPk0kFxUiXA&usqp=CAU"
            className="w-32 h-32   rounded-full border-b-2 border-primary "
            alt=""
          />
        </div>
        <div className="my-10 text-2xl font-bold">Login</div>
        <form className="" onSubmit={(e) => handleLogin(e, data)}>
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

          <div className="text-center">
            <button
              className="myButton w-1/2 py-2 my-10 "
              // onClick={(e) => handleSubmit(e, data)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
