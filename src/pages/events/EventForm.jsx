import React, { useEffect, useMemo, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { useParams } from "react-router-dom";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useCategory } from "../../providers/CategoryProvider";
import { status, statusNepali } from "../../json/company";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";
import { convertNepaliUnicodeToEnglish } from "../../helpers/UnicodeToEnglish";

function EventForm() {
  const { handleSubmit, handleUpdate, event, getEvent } = useEvent();
  const { fiscalYears } = useFiscalYear();
  const { categories } = useCategory();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    fiscal_year_id: "",
    title: "",
    content: "",
    date: "",
    time: "10:00",
    assignTo: "",
    status: "",
    categories: [],
  });

  const setEmpty = () => {
    setData({
      ...data,
      title: "",
      fiscal_year_id: "",
      title: "",
      content: "",
      date: "",
      time: "10:00",
      assignTo: "",
      status: "",
      categories: [],
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  // };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const timeChange = (newTime) => {
    setData({
      ...data,
      time: newTime,
    });
  };
  const handleDate = ({ bsDate }) => {
    const date = convertNepaliUnicodeToEnglish(bsDate);

    setData({
      ...data,
      date: date,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setData({ ...data, categories: [...data.categories, value] });
    } else {
      setData({
        ...data,
        categories: data.categories.filter((c) => c !== value),
      });
    }
  };

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id]);

  useMemo(() => {
    if (id && event) {
      const { title, content, categories, fiscal_year_id, date, status } =
        event;
      setData({
        ...data,
        title: title ? title : "",
        content: content ? content : "",
        date: date ? date : "",
        status: status ? status : "",
        fiscal_year_id: fiscal_year_id ? fiscal_year_id : "",
        categories: categories,
      });
    }
  }, [id, event]);

  const isCategorySelected = (category) => {
    return data.categories.includes(category);
  };

  return (
    <div>
      <div className="md:w-1/2 ">
        <form
          onSubmit={(e) => {
            if (id) {
              handleUpdate(e, data, id);
            } else {
              handleSubmit(e, data);
            }
            setEmpty();
          }}
        >
          <div className="mb-2">
            <label className="myLabel" htmlFor="year">
              Fiscal Year
            </label>
            <select
              name="fiscal_year_id"
              id="year"
              value={data.fiscal_year_id}
              className="mySelect md:w-1/2"
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {fiscalYears?.map(({ year, id }, i) => (
                <option key={i} value={id}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="myLabel" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="myInput"
              name="title"
              onChange={handleChange}
              value={data.title}
              required
            />
          </div>
          <div className="mb-2">
            <label className="myLabel" htmlFor="desc">
              Content
            </label>
            <textarea
              id="desc"
              type="text"
              className="myInput"
              name="content"
              onChange={handleChange}
              value={data.content}
              required
            />
          </div>

          <div className="mb-2 ">
            <label className="myLabel" htmlFor="date">
              Date of Event
            </label>

            <div className="md:flex items-center gap-3">
              {/* <div className="">
                <input
                  id="date"
                  type="date"
                  className="myInput"
                  name="date"
                  onChange={handleChange}
                  value={data.date}
                  required
                />
              </div> */}
              <div>
                <Calendar
                  className="myInput "
                  onChange={handleDate}
                  theme="deepdark"
                />
              </div>

              <div className="">
                <TimePicker
                  onChange={timeChange}
                  value={data.time}
                  className={"bg-white "}
                  disableClock={true}
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="myLabel" htmlFor="assignTo">
              Assign To
            </label>
            <input
              id="assignTo"
              type="text"
              className="myInput"
              name="assignTo"
              onChange={handleChange}
              value={data.assignTo}
              required
            />
          </div>

          <div className="mb-2">
            <label className="myLabel" htmlFor="categories">
              Categories
            </label>
            <div className="flex flex-row gap-3">
              {categories?.map((category, i) => (
                <label htmlFor="" key={i}>
                  <input
                    id="categories"
                    type="checkbox"
                    name="categories"
                    // checked={isCategorySelected(category.id)}
                    onChange={handleCheckboxChange}
                    value={category.id}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
          {id && (
            <div className="mb-2">
              <label className="myLabel" htmlFor="st">
                Status
              </label>
              <select
                name="status"
                id="st"
                value={data.status}
                className="mySelect md:w-1/2"
                onChange={handleChange}
                required
              >
                {status?.map((s, i) => (
                  <option key={i} value={s}>
                    {statusNepali[s]}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-5 text-end ">
            <button className="myButton px-10 rounded-full">
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
