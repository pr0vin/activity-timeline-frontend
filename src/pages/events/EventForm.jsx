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
import {
  convertEnglishToNepaliUnicode,
  convertNepaliUnicodeToEnglish,
} from "../../helpers/UnicodeToEnglish";
import { GiAlarmClock } from "react-icons/gi";

function EventForm() {
  const navigate = useNavigate();
  const { handleSubmit, handleUpdate, event, getEvent } = useEvent();
  const { fiscalYears } = useFiscalYear();
  const { categories, categoriesLoading } = useCategory();
  const { id } = useParams();
  const [showCalender, setShowCalender] = useState(false);
  const [time, setTime] = useState();
  const [data, setData] = useState({
    title: "",
    fiscal_year_id: "",
    title: "",
    content: "",
    ad_date: "",
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
      date: "2080-11-10",
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

  const toggleCalender = () => {
    setShowCalender((prev) => !prev);
  };

  const toggleTime = () => {
    setTime((prev) => !prev);
  };

  const timeChange = (newTime) => {
    setData({
      ...data,
      time: newTime,
    });
  };
  const handleDate = ({ bsDate, adDate }) => {
    const date = convertNepaliUnicodeToEnglish(bsDate);

    setData({
      ...data,
      ad_date: adDate,
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
      const { title, content, assignTo, fiscal_year_id, time, date, status } =
        event;

      const categoriesIds = event.categories?.map((category) =>
        category.id.toString()
      );
      setData({
        ...data,
        title: title ? title : "",
        content: content ? content : "",
        date: date ? date : "",
        status: status ? status : "",
        assignTo: assignTo ? assignTo : "",
        time: time ? time : "",
        fiscal_year_id: fiscal_year_id ? fiscal_year_id : "",
        categories: categoriesIds,
      });
    }
  }, [id, event]);

  const handleSave = (e) => {
    e.preventDefault();

    console.log(data);
  };

  // const isCategorySelected = (category) => {
  //   return data.categories.includes(category);
  // };

  if (categoriesLoading) {
    return "Loading...";
  }

  return (
    <div className="md:flex justify-between md:p-5 gap-10 ">
      <div className="md:w-6/12 w-full   mb-10">
        {!id && (
          <div className="font-bold  p-3   text-gray-400 ">
            नयाँ कार्ययोजना सिर्जना गर्नुहोस् |
          </div>
        )}
        <form
          onSubmit={(e) => {
            if (id) {
              handleUpdate(e, data, id);
            } else {
              handleSubmit(e, data);
              handleSave(e);
            }
            setEmpty();
          }}
          className="p-3"
        >
          <div className="mb-5">
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
          <div className="mb-5">
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
          <div className="mb-5">
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

          <div className="mb-5 ">
            <label className="myLabel" htmlFor="date">
              तोकिएको मिति
            </label>

            <div className="md:flex items-center gap-3">
              {showCalender && (
                <label className="text-red-300" onClick={toggleCalender}>
                  X
                </label>
              )}
              <label>
                {id && !showCalender && (
                  <div className="cursor-pointer px-3">
                    <div className="text-sm  font-bold text-gray-600">
                      {convertEnglishToNepaliUnicode(event.date)}{" "}
                    </div>
                    <small
                      onClick={toggleCalender}
                      className="italic  text-gray-300 hover:underline"
                    >
                      change
                    </small>
                  </div>
                )}
              </label>

              {(showCalender || !id) && (
                <div>
                  <Calendar
                    className="myInput "
                    onChange={handleDate}
                    theme="deepdark"
                  />
                </div>
              )}

              <div>
                <GiAlarmClock
                  size={30}
                  className="text-primary "
                  onClick={toggleTime}
                />
              </div>

              {time && (
                <div className="">
                  <TimePicker
                    onChange={timeChange}
                    value={data.time}
                    className={"bg-white focous:outline-none "}
                    disableClock={true}
                    clockClassName={"bg-white border-none"}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="myLabel" htmlFor="assignTo">
              जिम्मेवार व्यक्ति / शाखा
            </label>
            <input
              id="assignTo"
              type="text"
              className="myInput"
              name="assignTo"
              onChange={handleChange}
              value={data.assignTo}
            />
          </div>

          <div className="mb-5">
            <label className="myLabel" htmlFor="categories">
              वर्गहरू
            </label>
            <div className="md:flex flex-row gap-3">
              {categories?.map((category, i) => (
                <label htmlFor="" key={i} className="flex">
                  <input
                    id="categories"
                    type="checkbox"
                    name="categories"
                    checked={
                      data.categories &&
                      data.categories.includes(`${category.id}`)
                    }
                    label={category.name}
                    onChange={handleCheckboxChange}
                    value={category.id}
                  />
                  <label className="px-1 text-gray-600"> {category.name}</label>
                </label>
              ))}
            </div>
          </div>
          {id && (
            <div className="mb-5">
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
          <div className="my-10 flex gap-3 justify-between md:col-span-2  overflow-auto">
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

      <div className="md:block hidden">
        {" "}
        <div className=" flex items-center justify-center m-10 ">
          <img src="/svgs/form.svg" className="w-96 h-96" alt="" />
        </div>
      </div>
    </div>
  );
}

export default EventForm;
