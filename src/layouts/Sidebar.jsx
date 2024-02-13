import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsCalendar2Date, BsActivity } from "react-icons/bs";

// import Topbar from "./Topbar";
import UserSubMenu from "./Submenu";
const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

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
      menus: ["company", "user", "fiscal Year"],
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
        className="bg-blue-900 flex-none text-white shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
      >
        {/* logo */}
        <div className="flex items-center bg-white gap-2.5 font-medium border-b border-slate-300 py-2 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiXOxahe363rn8-BfMuiFdaBNrEz8cdj5PtLheBgJ3kKMbhlq_h0BWM-VtioUbseWPFk&usqp=CAU"
            alt="..."
            width={45}
          />
          <span className="text-xl whitespace-pre  text-gray-600">
            Event Timeline
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
                Dashboard
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
                Events
              </NavLink>
            </li>
            <li>
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
            {(isOpen || isTabletMid) && (
              <div className="border-y py-5 border-slate-300">
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