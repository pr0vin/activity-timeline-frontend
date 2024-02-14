import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
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
function CompanyForm() {
  const [data, setData] = useState({
    name: "",
    description: "",
    contact: "",
    email: "",
    province: "",
    district: "",
    municipality: "",
    address: "",
    web: "",
  });
  const handleInputChange = (e) => {
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const [file, setFiles] = useState("");
  const [Preview, setPreview] = useState("");
  const setImgFiles = (e) => {
    setFiles(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {};
  return (
    <div>
      <div className="flex justify-start ">
        <div className="md:w-8/12 w-full ">
          <div className="mb-3 ">
            <div
              style={{ height: 150, width: 150 }}
              className=" relative mb-3  border-2 border-primary rounded-full"
            >
              <label htmlFor="img">
                {Preview ? (
                  <img
                    src={Preview}
                    style={{ height: 150, width: 150 }}
                    className="  rounded-full object-cover "
                    alt="image"
                  />
                ) : (
                  <img
                    style={{ height: 150, width: 150 }}
                    className="  rounded-full object-cover"
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Velb4WTMSb5h9nXcIbiwhbsWe-dQXswwFg&usqp=CAU"
                    }
                  />
                )}
              </label>
              <label
                htmlFor="img"
                className=" absolute bottom-0 right-0 z-[99] "
              >
                <div className="flex gap-2 items-center border border-primary bg-primary text-white px-5 py-1 rounded-lg">
                  <span className=""> Edit </span>
                  <FiEdit size={16} />
                </div>
              </label>
            </div>

            <input
              id="img"
              className="hidden"
              type="file"
              name="image"
              onChange={setImgFiles}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <motion.div
              variants={animated}
              initial={"offscreen"}
              animate={"onscreen"}
              exit={"exit"}
              className="grid lg:grid-cols-2   gap-3"
            >
              <div className="mb-3 md:col-span-2">
                <label htmlFor="" className="myLabel">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="English Name "
                  name="name"
                  value={data.name}
                  className="myInput"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 md:col-span-2">
                <label htmlFor="" className="myLabel">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  className="myInput"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 md:col-span-2">
                <label htmlFor="web" className="myLabel">
                  Web Address:
                </label>
                <input
                  id="web"
                  type="text"
                  name="web"
                  placeholder="www.example.com"
                  value={data.web}
                  className="myInput"
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div className="mb-2">
                <label htmlFor="contact" className="myLabel">
                  Contact:
                </label>
                <input
                  id="contact"
                  placeholder="Contact"
                  type="text"
                  name="contact"
                  className="myInput"
                  value={data.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="myLabel">
                  Province :{" "}
                </label>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  className="myInput"
                  value={data.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="myLabel">
                  District :{" "}
                </label>
                <input
                  type="text"
                  placeholder="District"
                  name="district"
                  className="myInput"
                  value={data.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="" className="myLabel">
                  Municipality :{" "}
                </label>
                <input
                  type="text"
                  placeholder="municipality"
                  name="municipality"
                  className="myInput"
                  value={data.municipality}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3  md:col-span-2">
                <label htmlFor="" className="myLabel">
                  Address :
                </label>
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  className="myInput"
                  value={data.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-end md:col-span-2">
                <button className="myButton">Save</button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm;
