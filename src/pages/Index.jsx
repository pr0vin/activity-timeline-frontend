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
import Share from "../components/Share";
import NepaliDate from "nepali-date-converter";

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

  const monthColors = [
    "#F0F8FF",
    "#F0FFF0",
    "#FFFFE0",
    "#F5F5F5",
    "#FFF0F5",
    "#FFE4E1",
    "#FAEBD7",
    "#FAF0E6",
    "#FFF5EE",
    "#F0FFFF",
    "#E6E6FA",
    "#FFFAF0",
  ];

  return (
    <div className="relative">
      <div className="bg-white sticky top-0 z-[999]">
        <div className="font-bold text-center pt-5 text-3xl">
          योजना समय रेखा
        </div>
        <div className="text-center my-3">
          <StatusDots />
          <div className="text-end mb-3 absolute top-10 right-10">
            {/* <label htmlFor="">Select Year</label> */}
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
          </div>
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
