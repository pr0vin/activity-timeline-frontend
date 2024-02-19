import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { useCompany } from "../../providers/CompanyProvider";
import { useNavigate, useParams } from "react-router-dom";
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

  return (
    <div>
      <div className="flex justify-center bg-white  pb-10 ">
        <div className="md:w-8/12 w-full   ">
          <div className="font-bold text-center p-3  text-lg mb-5 underline">
            कृपया तलको फारम भर्नुहोस् |
          </div>

          <div className="md:flex justify-center gap-20">
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
                        "data:image/jpeg;base64,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"
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
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFK8a1szrFRi4lMNlCRf5ODhQPk0kFxUiXA&usqp=CAU"
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
              <div className="mb-2">
                <label htmlFor="" className="myLabel">
                  प्रदेश
                </label>
                <input
                  type="text"
                  name="province"
                  className="myInput"
                  value={data.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="myLabel">
                  जिल्ला
                </label>
                <input
                  type="text"
                  name="district"
                  className="myInput"
                  value={data.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="" className="myLabel">
                  नगरपालिका
                </label>
                <input
                  type="text"
                  name="municipality"
                  className="myInput"
                  value={data.municipality}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3  md:col-span-2">
                <label htmlFor="" className="myLabel">
                  ठेगाना
                </label>
                <input
                  type="text"
                  name="address"
                  className="myInput"
                  value={data.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-5 flex gap-3 justify-between md:col-span-2  overflow-auto">
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
