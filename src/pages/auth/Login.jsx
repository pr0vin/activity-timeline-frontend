import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { LuUser2 } from "react-icons/lu";
import { motion } from "framer-motion";

const animated = {
  offscreen: { y: -200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 20,
      delay: 0.5,
    },
  },
  exit: { y: -200, opacity: 0 },
};

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
    <div className=" w-full">
      <div className="   mx-auto   p-10 bg-white  ">
        <div className="my-10 text-2xl font-bold">Login</div>

        <div className="flex justify-center hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFK8a1szrFRi4lMNlCRf5ODhQPk0kFxUiXA&usqp=CAU"
            className="w-24 h-24   rounded-full border-b-2 border-primary "
            alt=""
          />
        </div>
        <motion.div
          variants={animated}
          initial={"offscreen"}
          animate={"onscreen"}
          exit={"exit"}
          className=""
        >
          <form className="" onSubmit={(e) => handleLogin(e, data)}>
            <div className="mb-5 gap-3">
              {/* <div>Email:</div> */}
              <label className="myLabel" htmlFor="email">
                Username/Email:
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
                className="myButton w-10/12 py-2 my-10 "
                // onClick={(e) => handleSubmit(e, data)}
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
