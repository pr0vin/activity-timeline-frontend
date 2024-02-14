import React, { useEffect, useMemo, useState } from "react";
import { useFiscalYear } from "../../providers/FiscalYearProvider";
import { useParams } from "react-router-dom";

function FiscalYearForm() {
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
          <label className="myLabel" htmlFor="year">
            Fiscal Year
          </label>
          <input
            id="year"
            type="text"
            className="myInput"
            name="year"
            onChange={handleChange}
            value={data.year}
          />
        </div>

        <div className="mb-2">
          <label className="myLabel" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="text"
            className="myInput"
            name="startDate"
            onChange={handleChange}
            value={data.startDate}
          />
        </div>
        <div className="mb-2">
          <label className="myLabel" htmlFor="endDate">
            End Date
          </label>
          <input
            id="endDate"
            type="text"
            className="myInput"
            name="endDate"
            onChange={handleChange}
            value={data.endDate}
          />
        </div>

        <div className="mb-2">
          <label className="myLabel" htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={data.status}
            onChange={handleChange}
          >
            <option value={0}>Dactive</option>
            <option value={1}>Active</option>
          </select>
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

export default FiscalYearForm;
