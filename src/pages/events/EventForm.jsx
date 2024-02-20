import React, { useEffect, useMemo, useState } from "react";
import { useEvent } from "../../providers/EventProvider";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
      const {
        title,
        content,
        assignTo,
        categories,
        fiscal_year_id,
        time,
        date,
        status,
      } = event;
      setData({
        ...data,
        title: title ? title : "",
        content: content ? content : "",
        date: date ? date : "",
        status: status ? status : "",
        assignedTo: assignTo ? assignTo : "",
        assignedTo: time ? time : "",
        fiscal_year_id: fiscal_year_id ? fiscal_year_id : "",
        categories: categories,
      });
    }
  }, [id, event]);

  const isCategorySelected = (category) => {
    return data.categories.includes(category);
  };

  return (
    <div className="flex justify-center bg-white p-5 ">
      <div className="md:w-8/12   mb-10">
        <div className="font-bold  py-3  ">
          नयाँ क्रियाकलाप सिर्जना गर्नुहोस् |
        </div>
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
              आर्थिक वर्ष
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
              शीर्षक
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
              वर्णन
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
              तोकिएको मिति
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
              खटाइएका
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
              वर्गहरू
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
                स्थिति
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
        </form>
      </div>
    </div>
  );
}

export default EventForm;
