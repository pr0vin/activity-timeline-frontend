import React from "react";

import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function CompanyProfile() {
  const navigate = useNavigate();
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return "Loading...";
  }

  const { province, municipality, district, address, website, name, email } =
    user.company;
  return (
    <div className="md:flex justify-center">
      <div className="md:w-8/12  md:mt-10 p-5 shadow text-gray-600">
        <div className="flex justify-between">
          <div>
            {" "}
            <div className="font-bold text-xl mb-5">BasicInfo</div>
            <div className="mb-2 flex gap-5">
              <span>नाम :</span> <strong>{name}</strong>
            </div>
            <div className="mb-2 flex gap-5 ">
              <span>इमेल:</span> <strong>{email}</strong>
            </div>
            <div className="mb-2 flex gap-5 ">
              <span>प्रदेश:</span> <strong>{province}</strong>
            </div>{" "}
            <div className="mb-2 flex gap-5 ">
              <span>जिल्ला:</span> <strong>{district}</strong>
            </div>{" "}
            <div className="mb-2 flex gap-5 ">
              <span>नगरपालिका:</span> <strong>{municipality}</strong>
            </div>
            <div className="mb-2 flex gap-5 ">
              <span>ठेगाना:</span> <strong>{address}</strong>
            </div>
            <div className="mb-2 flex gap-5 ">
              <span>websites:</span> <strong>{website}</strong>
            </div>
          </div>
          <div className="text-gray-600">
            <div className="font-bold text-xl mb-5">Settings</div>
            <ul className=" p-5 text-primary italic">
              <li
                className="p-2"
                onClick={() =>
                  navigate(`/dashoard/settings/${user.company_id}`)
                }
              >
                Edit
              </li>

              <li
                className="p-2 "
                onClick={() => navigate(`/home/settings/profile`)}
              >
                Change Password
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
