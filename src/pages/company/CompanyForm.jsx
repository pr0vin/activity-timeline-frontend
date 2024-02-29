import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { useCompany } from "../../providers/CompanyProvider";
import { useNavigate, useParams } from "react-router-dom";

import municipalities from "../../json/municipalities";
import Addresses from "../../helpers/Addresses";

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
  const navigate = useNavigate();
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

  const props = {
    handleInputChange,
    data,
  };

  return (
    <div>
      <div className="flex justify-center bg-white  py-10 ">
        <div className="md:w-8/12 w-full   ">
          {/* <div className="font-bold text-center p-3  text-lg mb-5 underline">
            कृपया तलको फारम भर्नुहोस् |
          </div> */}

          <div className="md:flex justify-center gap-20">
            <div className="mb-3 ">
              <div
                style={{ height: 150, width: 150 }}
                className=" relative mb-3  border-2 border-gray-300 rounded-full"
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
                      src={"/img.png"}
                    />
                  )}
                </label>
                <label
                  htmlFor="logo"
                  className=" absolute bottom-0 right-0 z-[99] "
                >
                  <div className="flex gap-2 items-center border border-primary bg-primary text-white px-5 py-1 rounded bg-primary">
                    <span className="text-sm"> Edit </span>
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
                className=" relative mb-3  border-2 border-gray-300 rounded-full"
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
                      src={"/img.png"}
                    />
                  )}
                </label>
                <label
                  htmlFor="img"
                  className=" absolute bottom-0 right-0 z-[99] "
                >
                  <div className="flex gap-2 items-center border border-primary  bg-primary text-white px-5 py-1 rounded">
                    <span className="text-sm"> Edit </span>
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
                  नगरपालिकाको नाम
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  className="myInput"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 md:col-span-2">
                <label htmlFor="" className="myLabel">
                  नगरपालिकाको Tagline
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
                  इमेल ठेगाना
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
                  Website ठेगाना
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
                  सम्पर्क No.
                </label>
                <input
                  id="contact"
                  type="text"
                  name="contact"
                  className="myInput"
                  value={data.contact}
                  onChange={handleInputChange}
                />
              </div>
              <Addresses {...props} />
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
                <button className="myButton md:px-10  ">
                  {id ? "अपडेट गर्नुहोस्" : "सेभ गर्नुहोस्"}
                </button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm;
