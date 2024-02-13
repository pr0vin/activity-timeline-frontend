import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StatusDots from "../components/StatusDots";
import { GiCheckMark } from "react-icons/gi";
import { activities } from "../json/activitiesNepali";
import { MdOutlineWorkHistory } from "react-icons/md";
import { monthColors } from "../json/monthsColors";
import Share from "../components/Share";
import NepaliDate from "nepali-date-converter";
import { status, statusNepali, categories } from "../json/company";

function Index() {
  const upcomingRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(
    new NepaliDate().format("YYYY")
  );

  const filteredActivities = useMemo(() => {
    return activities.filter(
      (todo) => new NepaliDate(todo.date).format("YYYY") === selectedYear
    );
  }, [selectedYear]);
  const sortedActivities = useMemo(() => {
    return filteredActivities.slice().sort((a, b) => {
      return new NepaliDate(a.date) - new NepaliDate(b.date);
    });
  }, [filteredActivities]);

  const todosByMonth = useMemo(() => {
    const todosByMonth = {};
    sortedActivities.forEach((todo) => {
      const month = new NepaliDate(todo.date).format("MMMM YYYY", "np");
      if (!todosByMonth[month]) {
        todosByMonth[month] = [];
      }
      todosByMonth[month].push(todo);
    });
    return todosByMonth;
  }, [sortedActivities]);

  useEffect(() => {
    if (upcomingRef.current && sortedActivities.length > 0) {
      const now = new NepaliDate();
      const upcomingTodo = sortedActivities.find(
        (todo) => new NepaliDate(todo.date) > now
      );
      if (upcomingTodo) {
        upcomingRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  }, [sortedActivities]);

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  // status

  const [selectedStatus, setSelectedStatus] = useState("notDone");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // categories
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="relative max-w-screen">
      <div className="bg-white sticky top-0 z-[999]">
        <div className="text-center max-w-screen-2xl mx-auto my-3 shadow">
          {/* <StatusDots /> */}
          {/* <div className="text-end mb-3">
            <select
              value={selectedYear}
              onChange={handleChangeYear}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {Array.from(
                { length: new NepaliDate().format("YYYY") - 2076 },
                (_, index) => 2077 + index
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div> */}

          <div className=" md:flex gap-5 justify-between items-center p-2 ">
            <div className="flex items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  value="All"
                  className="sr-only"
                  checked={selectedCategory === "All"}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor="all"
                  className={`cursor-pointer select-none px-3 py-1 
          ${selectedCategory === "All" ? "border-b-2 border-blue-500" : ""}`}
                >
                  All
                </label>
              </div>
              {/* Map over the categories array and create a custom radio button for each category */}
              {categories.map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    type="radio"
                    id={cat}
                    name="category"
                    value={cat}
                    className="sr-only"
                    checked={selectedCategory === cat}
                    onChange={handleCategoryChange}
                  />
                  <label
                    htmlFor={cat}
                    className={`cursor-pointer select-none px-3 py-1 
            ${selectedCategory === cat ? "border-b-2 border-blue-500" : ""}`}
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <div className="flex  items-center ">
                {status.map((s) => (
                  <div key={s} className="flex items-center">
                    <input
                      type="radio"
                      id={s}
                      name="status"
                      value={s}
                      className="sr-only"
                      checked={selectedStatus === s}
                      onChange={handleStatusChange}
                    />
                    <label
                      htmlFor={s}
                      className={`cursor-pointer select-none px-3 py-1 
            ${
              selectedStatus === s ? "border-b-2 border-blue-500 bg-white" : ""
            }`}
                    >
                      {statusNepali[s]}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <img
                  src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center -mt-8">
          <span className="font-bold bg-white   p-2 text-blue-900 border border-red ">
            वार्षिक कार्य योजना
          </span>
        </div>
      </div>

      <div className="">
        {Object.entries(todosByMonth).map(([month, activities], index) => (
          <div
            className=""
            style={{
              backgroundColor: monthColors[index % monthColors.length],
            }}
            key={month}
          >
            <VerticalTimeline lineColor="#fff">
              <h1 className="text-3xl font-bold me-48 text-end underline">
                <div>{month}</div>
              </h1>
              {activities.map((activity, i) => (
                <VerticalTimelineElement
                  key={i}
                  className={
                    new NepaliDate() < new NepaliDate(activity.date)
                      ? "brightness-50 p-0 m-0"
                      : ""
                  }
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderTop: "5px solid #4B0082",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid  #fff" }}
                  date={
                    new NepaliDate().format("ddd DD, MMMM YYYY", "np") ===
                    new NepaliDate(activity.date).format(
                      "ddd DD, MMMM YYYY",
                      "np"
                    )
                      ? "Today"
                      : new NepaliDate(activity.date).format(
                          "ddd DD, MMMM YYYY",
                          "np"
                        )
                  }
                  iconStyle={{
                    backgroundColor: {
                      canceled: "rgba(255,0,0)",
                      postponed: "#f5d327",
                      done: "rgb(0, 255, 0)",
                      notDone: "rgb(33, 150, 243)",
                    }[activity.status],
                    color: "#fff",
                  }}
                  icon={
                    activity.status === "done" ? (
                      <GiCheckMark />
                    ) : (
                      <MdOutlineWorkHistory />
                    )
                  }
                >
                  <div ref={upcomingRef}>
                    <div>
                      <h3 className="font-bold text-xl">{activity.title}</h3>
                      <small>{activity.content.slice(0, 100)}...</small>
                    </div>

                    <div className="my-5">
                      <div className="font-bold">कार्यहरू :</div>
                      <ul>
                        {activity.tasks.map((task, i) => (
                          <li className="flex p-2 border-b-2" key={i}>
                            <small className="">{i + 1}. </small>
                            <small>{task}</small>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Share />
                    </div>
                  </div>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
