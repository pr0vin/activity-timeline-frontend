import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProfileSetting() {
  const { user, handlePasswordChange } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirm" && data.password !== "") {
      setPasswordsMatch(value === data.password);
    }
  };

  const setEmpty = () => {
    setData({
      ...data,
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.confirm) {
      handlePasswordChange(data);
    } else {
      // Passwords don't match, display an error message or prevent form submission
      console.log("Passwords do not match.");
    }
  };

  return (
    <>
      <div className=" my-5 w-full ">
        <div className="  md:w-4/12 w-full">
          {/* <div className="heading ">
            <h2>प्रोफाइल</h2>
            <p>Change Your password</p>
          </div> */}

          <div className=" p-5 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="myLabel">
                  New Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  className="myInput"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="myLabel">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirm"
                  value={data.confirm}
                  className="myInput"
                  onChange={handleInputChange}
                />
                {!passwordsMatch && data.password && data.confirm ? (
                  <p className="text-red-600">Passwords do not match.</p>
                ) : (
                  data.password &&
                  data.confirm && (
                    <p className="text-green-600">You can proceed now</p>
                  )
                )}
              </div>

              <div className="my-10 flex gap-3 justify-between md:col-span-2  ">
                <button
                  type="button"
                  onClick={() => {
                    setEmpty();
                    navigate(-1);
                  }}
                  className="myButtonOutline md:px-10 text-red-600  "
                >
                  रद्द गर्नुहोस्
                </button>
                <button className="myButton md:px-10  ">सेभ गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;
