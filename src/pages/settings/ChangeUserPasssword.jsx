import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../providers/CompanyProvider";
import LoadingPage from "../../helpers/LoadingPage";
function ChangeUserPasssword() {
  const { handleUserPasswordChange, user, userLoading } = useAuth();
  const { company, getCompany } = useCompany();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    user_id: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!userLoading) {
      getCompany(user.company_id);
    }
  }, [user]);

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
      handleUserPasswordChange(data, data.user_id);
    } else {
      // Passwords don't match, display an error message or prevent form submission
      console.log("Passwords do not match.");
    }
    setEmpty();
  };

  if (userLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className=" w-full h-screen bg-slate-50  md:flex  justify-center">
        <div className="bg-white shadow-lg p-5 md:w-6/12 w-full">
          <div className="heading ">
            <h2>Change User Password</h2>
            <p>Change Your password</p>
          </div>

          <div className=" my-10 md:px-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <select
                  name="user_id"
                  value={data.user_id}
                  onChange={handleInputChange}
                  id="user"
                  className="mySelect"
                >
                  <option value="">select a user</option>
                  {company.users?.map((user, i) => (
                    <option key={i} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
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

export default ChangeUserPasssword;
