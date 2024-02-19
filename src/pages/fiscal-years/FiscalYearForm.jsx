import React, { useEffect, useMemo, useState } from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useParams } from "react-router-dom";

function FiscalYearForm({ handleOpen }) {
  const { id } = useParams();
  //   const id = 1;
  const { handleSubmit, getFiscalYear, fiscalYear, handleUpdate } =
    useFiscalYear();
  const [data, setData] = useState({
    year: "",
    startDate: "",
    endDate: "",
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
        status: status ? status : "",
      });
    }
  }, [fiscalYear, id]);

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

        <div className="mb-2">
          <label className="myLabel" htmlFor="startDate">
            सुरु मिति
          </label>
          <input
            id="startDate"
            type="text"
            className="myInput"
            name="startDate"
            required
            onChange={handleChange}
            value={data.startDate}
          />
        </div>
        <div className="mb-2">
          <label className="myLabel" htmlFor="endDate">
            समाप्त मिति
          </label>
          <input
            id="endDate"
            type="text"
            className="myInput"
            name="endDate"
            required
            onChange={handleChange}
            value={data.endDate}
          />
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
            <option value={0}>निष्क्रिय गर्नुहोस् </option>
            <option value={1}>सक्रिय गर्नुहोस्</option>
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
