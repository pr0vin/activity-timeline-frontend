import React, { useEffect, useState } from "react";
import { useCategory } from "../../providers/CategoryProvider";
import { useParams } from "react-router-dom";

function CategoryForm() {
  const { id } = useParams();
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
    setData({
      ...data,
      name: category.name ? category.name : "",
      description: category.description ? category.description : "",
    });
  }, [category, id]);

  return (
    <div className="">
      <div className="mb-3">
        <small className="font-bold ">please fill out the form.</small>
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
            Name
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
            Description
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

        <div className="mt-5 text-end ">
          <button className="myButton px-10 rounded-full">
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
