import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Submenu({ data }) {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      {" "}
      <>
        <li
          className={`link ${pathname.includes(data.name) && "text-primary"} `}
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <data.icon size={23} className="min-w-max" />
          <p className="capitalize flex-1">{data.name}</p>
          <IoIosArrowDown
            className={`${subMenuOpen && "rotate-180"} duration-200`}
          />
        </li>

        <motion.ul
          animate={
            subMenuOpen
              ? {
                  height: "fit-content",
                }
              : {
                  height: 0,
                }
          }
          className="flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0  rounded-b-lg"
        >
          {data.menus?.map((menu, i) => (
            <li key={menu}>
              <NavLink
                to={`/dashboard/${data.name}/${menu
                  .split(` `)
                  .join(`-`)
                  .toLowerCase()}`}
                className={({ isActive }) =>
                  isActive
                    ? "active link  capitalize "
                    : "link !bg-transparent capitalize"
                }
              >
                {menu}{" "}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      </>
    </>
  );
}

export default Submenu;
