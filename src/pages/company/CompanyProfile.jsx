import React from "react";

import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function CompanyProfile() {
  const navigate = useNavigate();
  const { user, userLoading, isAdmin, isSuperAdmin } = useAuth();

  if (userLoading) {
    return "Loading...";
  }

  const { province, municipality, district, address, website, name, email } =
    user.company;
  return (
    <div className="">
      <div className=" p-5">
        <div>
          <div className="flex gap-3 items-center mb-10">
            <div className="w-12 h-12">
              <img
                src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
                className="w-12 h-12 rounded-full"
                alt=""
              />
            </div>
            <div className="">
              <div className="font-bold capitalize">{user.name}</div>

              <small>{user.email}</small>
              <small className="border px-2 rounded-full text-green-300 lowercase mx-2">
                {user.roles[0].name}
              </small>
            </div>
          </div>
        </div>
        <div className="md:flex justify-between ">
          <div>
            {" "}
            <div className="font-bold  mb-5 text-gray-600">Company Detail</div>
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
            <div className="font-bold text-xl my-5">Settings</div>
            <ul className="  text-blue-500 italic underline">
              {(isAdmin || isSuperAdmin) && (
                <li
                  className="p-2 italic"
                  onClick={() =>
                    navigate(`/dashboard/settings/${user.company_id}`)
                  }
                >
                  Company Settings
                </li>
              )}

              <li
                className="p-2 italic  "
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
