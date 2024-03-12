import React, { useEffect, useState } from "react";
import { useCategory } from "../../providers/CategoryProvider";
import { useNavigate, useParams } from "react-router-dom";

function CategoryForm({ handleOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, handleUpdate, category, getCategory } = useCategory();
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const Empty = () => {
    setData({
      ...data,
      name: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      getCategory(id);
    }
  }, [id]);
  useEffect(() => {
    if (id && category) {
      setData({
        ...data,
        name: category.name ? category.name : "",
        description: category.description ? category.description : "",
      });
    }
  }, [id, category]);

  const handleCancel = () => {
    Empty();
    handleOpen();
    navigate(`/dashboard/config/categories`);
  };

  return (
    <div className="">
      <div className="my-3 font-bold underline text-center">
        नयाँ श्रेणी थप्नुहोस्
      </div>

      <form
        onSubmit={(e) => {
          if (id) {
            handleUpdate(e, data, id);
          } else {
            handleSubmit(e, data);
          }
          Empty();
        }}
      >
        <div className="mb-2">
          <label className="myLabel" htmlFor="name">
            नाम
          </label>
          <input
            id="name"
            type="text"
            className="myInput"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        <div className="mb-2">
          <label className="myLabel" htmlFor="desc">
            विवरण
          </label>
          <textarea
            id="desc"
            type="text"
            className="myInput"
            name="description"
            onChange={handleChange}
            value={data.description}
          />
        </div>

        <div className="mt-5 flex gap-3 justify-between  overflow-auto">
          <button
            onClick={handleCancel}
            className="myButtonOutline text-red-600  "
          >
            रद्द गर्नुहोस्
          </button>
          <button className="myButton  ">
            {id ? "अपडेट गर्नुहोस्" : "सेभ गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
