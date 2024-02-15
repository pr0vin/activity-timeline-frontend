import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { useCompany } from "../../providers/CompanyProvider";
import { useParams } from "react-router-dom";
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

const API_URL = import.meta.env.VITE_API_URL;

function CompanyForm() {
  const { handleSubmit, handleUpdate, getCompany, company } = useCompany();
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    contact: "",
    email: "",
    province: "",
    district: "",
    municipality: "",
    address: "",
    website: "",
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
  const setImgFiles = (doc) => {
    setFiles(doc);
    setPreview(URL.createObjectURL(doc));
  };

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const setLogoImages = (doc) => {
    setLogo(doc);
    setLogoPreview(URL.createObjectURL(doc));
  };

  const setEmpty = () => {
    setData({
      ...data,
      name: "",
      description: "",
      contact: "",
      email: "",
      province: "",
      district: "",
      municipality: "",
      address: "",
      website: "",
    });
    setLogo("");
    setFiles("");
    setLogoPreview("");
    setPreview("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("municipality", data.municipality);
    formData.append("address", data.address);
    formData.append("website", data.website);
    formData.append("logo", logo);
    formData.append("subLogo", file);

    handleSubmit(formData);
    setEmpty();
  };

  const update = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("municipality", data.municipality);
    formData.append("address", data.address);
    formData.append("website", data.website);
    formData.append("logo", logo);
    formData.append("subLogo", file);

    handleUpdate(formData, id);
    setEmpty();
  };

  useEffect(() => {
    if (id) {
      getCompany(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && company) {
      const {
        name,
        description,
        address,
        contact,
        email,
        logo,
        subLogo,
        province,
        municipality,
        district,
        website,
      } = company;
      setData({
        ...data,
        name: name ? name : "",
        description: description ? description : "",
        email: email ? email : "",
        contact: contact ? contact : "",
        address: address ? address : "",
        province: province ? province : "",
        municipality: municipality ? municipality : "",
        district: district ? district : "",
        website: website ? website : "",
      });

      if (logo) {
        setLogo(logo);
        setLogoPreview(`${API_URL}/storage/${logo}`);
      }
      if (subLogo) {
        setFiles(subLogo);
        setPreview(`${API_URL}/storage/${subLogo}`);
      }
    }
  }, [id, company]);

  return (
    <div>
      <div className="flex justify-start ">
        <div className="md:w-8/12 w-full ">
          <div className="md:flex gap-20">
            <div className="mb-3 ">
              <div
                style={{ height: 150, width: 150 }}
                className=" relative mb-3  border-2 border-primary rounded-full"
              >
                <label htmlFor="img">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
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
                  htmlFor="logo"
                  className=" absolute bottom-0 right-0 z-[99] "
                >
                  <div className="flex gap-2 items-center border border-indigo-300 bg-indigo-300 text-white px-5 py-1 rounded-lg bg-indigo-300">
                    <span className=""> Edit </span>
                    <FiEdit size={16} />
                  </div>
                </label>
              </div>

              <label htmlFor="" className="myLabel text-center">
                {" "}
                Logo Image
              </label>
              <input
                id="logo"
                className="hidden"
                type="file"
                name="logo"
                onChange={(e) => setLogoImages(e.target.files[0])}
              />
            </div>

            {/* sub logo */}
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
                  <div className="flex gap-2 items-center border border-primary bg-indigo-300 bg-primary text-white px-5 py-1 rounded-lg">
                    <span className=""> Edit </span>
                    <FiEdit size={16} />
                  </div>
                </label>
              </div>
              <label htmlFor="" className="myLabel text-center">
                {" "}
                Sub-Logo Image
              </label>
              <input
                id="img"
                className="hidden"
                type="file"
                name="image"
                onChange={(e) => setImgFiles(e.target.files[0])}
              />
            </div>
          </div>
          <form onSubmit={id ? update : handleSave}>
            <motion.div
              variants={animated}
              initial={"offscreen"}
              animate={"onscreen"}
              exit={"exit"}
              className="grid lg:grid-cols-2   gap-3"
            >
              <div className="mb-3 md:col-span-2">
                <label htmlFor="" className="myLabel">
                  Municipality Name
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
                  Municipality Tagline
                </label>
                <input
                  type="text"
                  placeholder="Tgaline "
                  name="description"
                  value={data.description}
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
                <label htmlFor="website" className="myLabel">
                  Website Address:
                </label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  placeholder="www.example.com"
                  value={data.website}
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
                <button className="myButton">{id ? "update" : "Save"}</button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm;
