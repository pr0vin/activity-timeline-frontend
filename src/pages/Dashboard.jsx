import React, { useMemo } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsCalendar3Event } from "react-icons/bs";
import { useEvent } from "../providers/EventProvider";
import { useAuth } from "../providers/AuthProvider";
import { useCompany } from "../providers/CompanyProvider";
import CompanyTable from "./company/CompanyTable";
function Dashboard() {
  const { events } = useEvent();
  const { allUsers } = useAuth();
  const { companies } = useCompany();

  const filtered = useMemo(() => {
    return companies.filter((company) => company.remaining_days <= 30);
  }, [companies]);

  console.log(filtered);
  return (
    <>
      <div>
        <div className="heading">
          <h2>Dashboard</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-3 p-2 mt-5">
          <div className="bg-white shadow-lg p-2  gap-3 ">
            <div className="flex items-center justify-between ">
              <span className="text-sm text-gray-400">Companies</span>
              <HiOutlineBuildingOffice2 size={28} />
            </div>{" "}
            <div className="">
              <div className="text-gray-700 text-2xl">
                {companies && companies.length}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg p-2  gap-3 ">
            <div className="flex items-center justify-between ">
              <span className="text-sm text-gray-400">Users</span>
              <IoPeopleOutline size={28} />
            </div>{" "}
            <div className="">
              <div className="text-gray-700 text-2xl">
                {allUsers && allUsers.length}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg p-2  gap-3 ">
            <div className="flex items-center justify-between ">
              <span className="text-sm text-gray-400">Events</span>
              <BsCalendar3Event size={24} />
            </div>{" "}
            <div className="">
              <div className="text-gray-700 text-2xl">
                {events && events.length}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <CompanyTable companies={filtered} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
