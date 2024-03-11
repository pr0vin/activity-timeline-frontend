import React, { useEffect, useMemo, useState } from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useParams } from "react-router-dom";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { convertNepaliUnicodeToEnglish } from "../../helpers/UnicodeToEnglish";

function FiscalYearForm({ handleOpen }) {
  const { id } = useParams();
  //   const id = 1;
  const { handleSubmit, getFiscalYear, fiscalYear, handleUpdate } =
    useFiscalYear();
  const [showCalender, setShowCalender] = useState(false);
  const [data, setData] = useState({
    year: "",
    startDate: "",
    ad_startDate: "",
    endDate: "",
    ad_endDate: "",
    status: false,
  });

  const Empty = () => {
    setData({
      ...data,
      year: "",
      startDate: "",
      endDate: "",
      status: false,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
  const handleStartDate = ({ bsDate, adDate }) => {
    const date = convertNepaliUnicodeToEnglish(bsDate);

    setData({
      ...data,
      ad_startDate: adDate,
      startDate: date,
    });
  };
  const handleEndDate = ({ bsDate, adDate }) => {
    const date = convertNepaliUnicodeToEnglish(bsDate);

    setData({
      ...data,
      ad_endDate: adDate,
      endDate: date,
    });
  };

  useEffect(() => {
    if (id) {
      getFiscalYear(id);
    }
  }, [id]);

  useEffect(() => {
    const { year, startDate, endDate, status } = fiscalYear;

    // setData(fiscalYear);
    if (id && fiscalYear) {
      setData({
        ...data,
        year: year ? year : "",
        startDate: startDate ? startDate : "",
        endDate: endDate ? endDate : "",
        status: status === 1 ? true : false,
      });
    }
  }, [fiscalYear, id]);

  const toggleCalender = () => {
    setShowCalender((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(data);
  };

  return (
    <div className="p-5 ">
      {/* <div className="mb-3">
        <small className="font-bold ">please fill out the form.</small>
      </div> */}
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
          <label className="myLabel" htmlFor="year">
            आर्थिक वर्ष
          </label>
          <input
            id="year"
            type="text"
            className="myInput"
            name="year"
            required
            onChange={handleChange}
            value={data.year}
          />
        </div>
        {(showCalender || !id) && (
          <div>
            {" "}
            <div className="mb-2">
              <label className="myLabel" htmlFor="startDate">
                सुरु मिति
              </label>
              {/* <input
         id="startDate"
         type="text"
         className="myInput"
         name="startDate"
         required
         onChange={handleChange}
         value={data.startDate}
       /> */}
              <div>
                <Calendar
                  className="myInput  "
                  onChange={handleStartDate}
                  theme="deepdark"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="myLabel" htmlFor="endDate">
                समाप्त मिति
              </label>
              {/* <input
         id="endDate"
         type="text"
         className="myInput"
         name="endDate"
         required
         onChange={handleChange}
         value={data.endDate}
       /> */}

              <div>
                <Calendar
                  className="myInput  "
                  onChange={handleEndDate}
                  theme="deepdark"
                />
              </div>
            </div>
          </div>
        )}
        <div className="md:flex items-center gap-3">
          {showCalender && (
            <label className="text-red-300 mb-3" onClick={toggleCalender}>
              cancel update
            </label>
          )}
          <label>
            {id && !showCalender && (
              <div className="cursor-pointer my-3">
                <div className="flex gap-5 justify-between">
                  <div>
                    <label className="myLabel" htmlFor="endDate">
                      सुरु मिति
                    </label>
                    <div className="text-sm  font-bold text-gray-600">
                      {/* {convertEnglishToNepaliUnicode(event.date)}{" "} */}
                      {data.startDate}
                    </div>
                  </div>

                  <div>
                    <label className="myLabel" htmlFor="startDate">
                      समाप्त मिति
                    </label>
                    <div className="text-sm  font-bold text-gray-600">
                      {/* {convertEnglishToNepaliUnicode(event.date)}{" "} */}
                      {data.endDate}
                    </div>
                  </div>
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
          {/* 
          <div>
            <Calendar
              className="myInput  "
              onChange={handleStartDate}
              theme="deepdark"
            />
          </div> */}
        </div>

        <div className="mb-2">
          <label className="myLabel" htmlFor="status">
            स्थिति
          </label>

          <select
            id="status"
            name="status"
            value={data.status}
            required
            onChange={handleChange}
            className="mySelect"
          >
            <option value={false}>निष्क्रिय </option>
            <option value={true}>सक्रिय </option>
          </select>
        </div>

        <div className="mt-5 flex gap-3 justify-between  overflow-auto">
          <button
            onClick={() => {
              Empty();
              handleOpen();
            }}
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

export default FiscalYearForm;
