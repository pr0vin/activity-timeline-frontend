import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsCalendar2Date, BsActivity } from "react-icons/bs";
import { GrDocumentConfig } from "react-icons/gr";
// import Topbar from "./Topbar";
import UserSubMenu from "./Submenu";
import { useAuth } from "../providers/AuthProvider";
const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const { user, isSuperAdmin } = useAuth();

  useEffect(() => {
    if (isTabletMid) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTabletMid]);
  useEffect(() => {
    isTabletMid && setIsOpen(false);
  }, [pathname]);

  const sidebar_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenuList = [
    {
      name: "settings",
      icon: IoSettingsOutline,
      menus: ["company", "user"],
    },
  ];

  const configurations = [
    {
      name: "config",
      icon: GrDocumentConfig,
      menus: ["fiscal year", "categories", "companies", "company user"],
    },
  ];

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
        } `}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={sidebar_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="bg-white text-gray-600 flex-none shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
      >
        {/* logo */}
        <div className="flex items-center  gap-2.5 font-medium  border-slate-300 p-2 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFK8a1szrFRi4lMNlCRf5ODhQPk0kFxUiXA&usqp=CAU"
            alt="..."
            width={45}
            className="w-18 h-18 rounded-full cover"
          />
          <span className="px-3 text-xl whitespace-pre  text-gray-600">
            <div className="text-primary font-bold text-2xl "> कार्य</div>
            <div className="font-bold ">समयरेखा</div>
          </span>
        </div>
        {/* menus */}

        <div className="flex flex-col h-full  mt-10">
          <ul className="whitespace-pre ps-2.5 text-[0.9rem] pb-3 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[80%] md:max-h-[78%] ">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? " link " : "link")}
                to={"/dashboard"}
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                ड्यासबोर्ड
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active link " : "link"
                }
                to={"/dashboard/events"}
              >
                <BsCalendar2Date size={23} className="min-w-max" />
                कार्यहरू
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active link " : "link"
                }
                to={`/dashboard/settings/${user.company_id}`}
              >
                <IoSettingsOutline size={23} className="min-w-max" />
                सेटिङहरू
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active link " : "link"
                }
                to={"/dashboard/activities"}
              >
                <BsActivity size={23} className="min-w-max" />
                Activity
              </NavLink>
            </li>
            {/* submenu */}
            {/* {(isOpen || isTabletMid) && (
              <div className="border-t py-5 border-slate-300">
                <small className="pl-3  inline-block mb-2">Settings</small>
                <div>
                  {subMenuList.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      {" "}
                      <UserSubMenu data={menu} />
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {(isOpen || isTabletMid) && isSuperAdmin && (
              <div className="border-y py-5 border-secondary">
                <small className="pl-3  inline-block mb-2">
                  Configurations
                </small>
                <div>
                  {configurations.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      {" "}
                      <UserSubMenu data={menu} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ul>
        </div>

        {/* second */}

        {/* control button */}
        <motion.div
          animate={
            isOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-fit h-fit z-50 right-2 bottom-3 cursor-pointer md:block hidden"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div
        className="m-3 md:hidden block md:relative absolute z-50 bg-white top-0 left-0  "
        onClick={() => setIsOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </>
  );
};

export default Sidebar;
