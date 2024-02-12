import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StatusDots from "../components/StatusDots";
import { GiCheckMark } from "react-icons/gi";
import { activities } from "../json/activities";
import { MdOutlineWorkHistory } from "react-icons/md";
import moment from "moment";
import Share from "../components/Share";

function Home() {
  const contentStyle = {
    backgroundColor: "#fff",
    borderTop: "5px solid #4B0082",
  };

  const contentArrowStyle = {
    borderRight: "7px solid  #fff",
  };

  const now = moment().format("LL");

  const [todos, setTodos] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year().toString());
  const upcomingRef = useRef(null);

  useEffect(() => {
    const todosForSelectedYear = activities.filter(
      (todo) => moment(todo.date).year() === parseInt(selectedYear)
    );
    const sortedTodos = todosForSelectedYear.sort((a, b) => {
      return moment(a.date, "YYYY-MM-DD") - moment(b.date, "YYYY-MM-DD");
    });

    setTodos(sortedTodos);

    if (upcomingRef.current && sortedTodos.length > 0) {
      const now = moment();
      const upcomingTodo = sortedTodos.find((todo) =>
        moment(todo.date, "YYYY-MM-DD").isAfter(now)
      );
      if (upcomingTodo) {
        upcomingRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  }, [selectedYear]);

  const years = useMemo(() => {
    const currentYear = moment().year();
    return Array.from(
      { length: currentYear - 2020 + 1 },
      (_, index) => 2020 + index
    );
  }, []);

  const todosByMonth = useMemo(() => {
    const todosByMonth = {};
    todos.forEach((todo) => {
      const month = moment(todo.date).format("MMMM YYYY");
      if (!todosByMonth[month]) {
        todosByMonth[month] = [];
      }
      todosByMonth[month].push(todo);
    });
    return todosByMonth;
  }, [todos]);

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
        <div className="font-bold text-center pt-5 text-3xl">My Activities</div>
        <div className="text-center my-3">
          <StatusDots />
          <div className="text-end mb-3 absolute top-10 right-10">
            <label htmlFor="">Select Year</label>
            <select
              value={selectedYear}
              onChange={handleChangeYear}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        {Object.entries(todosByMonth).map(([month, activities], index) => (
          <div
            className=""
            style={{ backgroundColor: monthColors[index % monthColors.length] }}
            key={month}
          >
            <VerticalTimeline lineColor="#fff">
              <h1 className="text-3xl font-bold me-48 text-end underline">
                <div>{month}</div>
              </h1>
              {activities.map((activity, i) => {
                const newdate = moment(activity.date).format("LL");
                const today = moment(activity.date).isSame(now);
                const backgroundColors = {
                  canceled: "rgba(255,0,0)",
                  postponed: "#f5d327",
                  done: "rgb(0, 255, 0)",
                  notDone: "rgb(33, 150, 243)",
                };
                return (
                  <VerticalTimelineElement
                    key={i}
                    className={
                      moment(activity.date, "YYYY-MM-DD").isAfter(moment())
                        ? "brightness-50"
                        : ""
                    }
                    contentStyle={contentStyle}
                    contentArrowStyle={contentArrowStyle}
                    date={today ? "Today" : newdate}
                    iconStyle={{
                      backgroundColor: backgroundColors[activity.status],
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
                        <p>{activity.content.slice(0, 100)}...</p>
                      </div>

                      <div className="my-5">
                        <div className="font-bold">Tasks :</div>
                        <ul>
                          {activity.tasks &&
                            activity.tasks.map((task, i) => (
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
                );
              })}
            </VerticalTimeline>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
