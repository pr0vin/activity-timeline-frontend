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
import SubNavBar from "../layouts/SubNavBar";
import { useEvent } from "../providers/EventProvider";
import { useFiscalYear } from "../providers/FiscalYearProvider";
import { useCategory } from "../providers/CategoryProvider";

function Index() {
  const { events } = useEvent();
  const { fiscalYears, fiscalYearLoading } = useFiscalYear();
  const { categories } = useCategory();

  const upcomingRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("0");

  const filteredData = useMemo(() => {
    const selected = parseInt(selectedYear);
    const filteredByYear = selected
      ? events.filter((item) => item.fiscal_year_id === selected)
      : events;
    const filteredByCategory =
      selectedCategory !== "0"
        ? filteredByYear.filter((item) =>
            item.categories.some((cat) => cat.id === parseInt(selectedCategory))
          )
        : filteredByYear;
    // return filteredByCategory.filter((item) => item.status === selectedStatus);

    const filteredByStatus =
      selectedStatus === "all"
        ? filteredByCategory // If "all" is selected, return all filtered data
        : filteredByCategory.filter((item) => item.status === selectedStatus);

    return filteredByStatus;
  }, [selectedYear, selectedStatus, selectedCategory, events]);

  // const sortedEvents = useMemo(() => {
  //   return [...filteredData].sort(
  //     (a, b) => new NepaliDate(a.date) - new NepaliDate(b.date)
  //   );
  // }, [filteredData]);

  const sortedEvents = useMemo(() => {
    const fiscalYearStartMonth = 3;

    return [...filteredData].sort((a, b) => {
      const dateA = new NepaliDate(a.date);
      const dateB = new NepaliDate(b.date);

      // Adjusting the dates to the fiscal year start month
      const adjustedMonthA =
        (dateA.getMonth() - fiscalYearStartMonth + 12) % 12;
      const adjustedMonthB =
        (dateB.getMonth() - fiscalYearStartMonth + 12) % 12;

      // Compare the adjusted months
      if (adjustedMonthA !== adjustedMonthB) {
        return adjustedMonthA - adjustedMonthB;
      }
      return dateA - dateB;
    });
  }, [filteredData]);

  const todosByMonth = useMemo(() => {
    const todosByMonth = {};
    sortedEvents.forEach((todo) => {
      const month = new NepaliDate(todo.date).format("MMMM", "np");
      if (!todosByMonth[month]) {
        todosByMonth[month] = [];
      }
      todosByMonth[month].push(todo);
    });
    return todosByMonth;
  }, [sortedEvents]);

  useEffect(() => {
    if (upcomingRef.current && sortedEvents.length > 0) {
      const now = new NepaliDate().valueOf();
      let nearestEvent = null;
      let minDiff = Infinity;

      for (let i = 0; i < sortedEvents.length; i++) {
        const event = sortedEvents[i];
        const eventDate = new NepaliDate(event.date).valueOf();
        const diff = eventDate - now;

        if (diff > 0 && diff < minDiff) {
          // Only consider future events
          minDiff = diff;
          nearestEvent = event;
        }

        // Break the loop if the current event is in the future
        if (diff > 0) {
          break;
        }
      }

      if (nearestEvent) {
        upcomingRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  }, [fiscalYears]);

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (fiscalYearLoading) {
    return "...";
  }

  return (
    <div className="relative max-w-screen">
      <div className="bg-white sticky top-0 z-[999]">
        <div>
          <SubNavBar
            handleCategoryChange={handleCategoryChange}
            handleStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
            selectedCategory={selectedCategory}
            selectedYear={selectedYear}
            handleChangeYear={handleChangeYear}
            fiscalYears={fiscalYears}
            setSelectedYear={setSelectedYear}
            categories={categories}
          />
        </div>
        <div className="text-center -mt-8">
          <span className="font-bold bg-white   p-2 text-blue-900 border border-red ">
            वार्षिक कार्य योजना
          </span>
        </div>
      </div>

      <div className="">
        {Object.entries(todosByMonth)?.map(([month, activities], index) => (
          <div
            className=""
            style={{
              backgroundColor: monthColors[index % monthColors.length],
            }}
            key={index}
          >
            <div ref={upcomingRef}>
              <VerticalTimeline lineColor="#fff">
                <h1 className="text-3xl font-bold me-48 text-end underline">
                  <div>{month}</div>
                </h1>
                {activities?.map((activity, i) => (
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
                    <div>
                      <div className="flex gap-2">
                        {activity.categories?.map((cat, i) => (
                          <span
                            key={i}
                            className="border py-1 px-2  rounded-full  text-sm"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{activity.title}</h3>
                        <small>{activity.content.slice(0, 100)}...</small>
                      </div>

                      <div className="my-5">
                        <div className="font-bold">कार्यहरू :</div>
                        <ul>
                          {activity.tasks?.map((task, i) => (
                            <li className="flex p-2 border-b gap-2" key={i}>
                              <small className="">{i + 1}. </small>
                              <small>{task.name}</small>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
