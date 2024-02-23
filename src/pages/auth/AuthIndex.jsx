import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const animated = {
  offscreen: { x: -500, opacitx: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      damping: 40,
      delay: 1,
    },
  },
  exit: { x: -500, opacity: 0 },
};

const textAnimation = {
  offscreen: { y: -200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 40,
      delay: 0.7,
    },
  },
  exit: { y: -200, opacity: 0 },
};

function AuthIndex() {
  return (
    <>
      <div className=" ">
        <div className="md:grid  lg:grid-cols-3 md:grid-cols-2 h-screen  ">
          <div className=" md:block hidden bg-primary flex items-center justify-between">
            <div className="text-center text-white">
              <motion.div
                variants={textAnimation}
                initial={"offscreen"}
                animate={"onscreen"}
                exit={"exit"}
              >
                <div className="text-lg mt-10">स्वागत छ !!!</div>

                <div className="text-4xl mt-10"> कार्य समयरेखा</div>
                <p className="py-5">तपाईंको काम, हाम्रो काम</p>
              </motion.div>
              <motion.div
                variants={animated}
                initial={"offscreen"}
                animate={"onscreen"}
                exit={"exit"}
                className="mx-auto"
              >
                <img src="/svgs/login.svg" className="w-8/12 m-10" alt="" />
              </motion.div>
              <p className="my-10">हामी तपाईंको कामको ख्याल राख्छौं |</p>
            </div>
          </div>
          <div className="w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthIndex;
