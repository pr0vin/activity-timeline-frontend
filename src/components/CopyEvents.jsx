import React from "react";

function CopyEvents({
  fiscalYears,
  data,
  handleChange,
  setEmpty,
  toggleTransfer,
  handleTransfer,
  handleSelfTransfer,
}) {
  return (
    <>
      <div>
        {/* <button className="myButton" onClick={handleSelfTransfer}>
          self transfer
        </button> */}
      </div>

      <div className="text-xs text-orange-300 italic  px-3">
        Select the fiscal Year to transfer from one fiscal year to another.
      </div>
      <form>
        {/* <div className=" md:flex items-center gap-20 m-3  p-2"> */}
        <div className="flex justify-center items-center   gap-5 my-10">
          <div>
            <label htmlFor="" className="myLabel">
              From Year
            </label>
            <select
              name="from_fiscal_year"
              id="from"
              value={data.form_fiscal_year}
              onChange={handleChange}
              className="mySelect "
            >
              <option value="">select</option>
              {fiscalYears?.map(({ id, year }, i) => (
                <option value={id} key={i}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="myLabel">
              To Year
            </label>
            <select
              name="to_fiscal_year"
              id="to"
              value={data.to_fiscal_year}
              onChange={handleChange}
              className="mySelect"
            >
              <option value="">select</option>
              {fiscalYears?.map(({ id, year }, i) => (
                <option value={id} key={i}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="my-5 pt-8 flex gap-3 ">
            <button
              type="button"
              onClick={() => {
                setEmpty();
                toggleTransfer();
              }}
              className="myButtonOutline md:px-10 text-red-600  "
            >
              रद्द गर्नुहोस्
            </button>

            <button className="myButton md:px-10  ">अपडेट गर्नुहोस्</button>
          </div> */}
        </div>
      </form>
    </>
  );
}

export default CopyEvents;
