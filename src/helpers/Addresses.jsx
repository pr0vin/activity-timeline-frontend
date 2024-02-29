import React, { useMemo } from "react";
import addresses from "../json/municipalities";

function Addresses({
  handleDistrictChange,
  handleMuncipalityChange,
  handleProvinceChange,
  handleInputChange,
  data,
}) {
  const filterAddresses = (data, condition) => {
    return data.filter(condition);
  };

  const provinces = useMemo(() => {
    const uniqueProvinceIds = new Set(addresses.map((obj) => obj.province));
    return Array.from(uniqueProvinceIds);
  }, [addresses]);

  const districts = useMemo(() => {
    const filteredAddresses = filterAddresses(
      addresses,
      (item) => item.province === data.province
    );
    const uniqueDistrictIds = new Set(
      filteredAddresses.map((obj) => obj.district)
    );
    return Array.from(uniqueDistrictIds);
  }, [data.province, addresses]);

  const muns = useMemo(() => {
    const filteredAddresses = filterAddresses(
      addresses,
      (item) => item.district === data.district
    );
    const uniqueMunicipalityIds = new Set(
      filteredAddresses.map((obj) => obj.municipality)
    );
    return Array.from(uniqueMunicipalityIds);
  }, [data.district, addresses]);

  return (
    <>
      <div className="mb-2">
        <label htmlFor="" className="myLabel">
          प्रदेश
        </label>

        {/* <input
                  type="text"
                  name="province"
                  className="myInput"
                  value={data.province}
                  onChange={handleInputChange}
                  required
                /> */}

        <select
          name="province"
          id="pro"
          onChange={handleInputChange}
          value={data.province}
          className="mySelect"
        >
          <option value="">प्रदेश</option>

          {provinces?.map((pro, i) => (
            <option key={i} value={pro}>
              {pro}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="" className="myLabel">
          जिल्ला
        </label>
        {/* <input
                  type="text"
                  name="district"
                  className="myInput"
                  value={data.district}
                  onChange={handleInputChange}
                  required
                /> */}
        <select
          name="district"
          id="dis"
          value={data.district}
          className="mySelect"
          onChange={handleInputChange}
        >
          <option value=""> जिल्ला</option>
          {districts?.map((dis, i) => (
            <option key={i} value={dis}>
              {dis}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3 ">
        <label htmlFor="" className="myLabel">
          नगरपालिका/गाउँपालिका
        </label>
        {/* <input
                  type="text"
                  name="municipality"
                  className="myInput"
                  value={data.municipality}
                  onChange={handleInputChange}
                /> */}

        <select
          name="municipality"
          id="pro"
          className="mySelect"
          value={data.municipality}
          onChange={handleInputChange}
        >
          <option value=""> नगरपालिका/गाउँपालिका</option>
          {muns?.map((mun, i) => (
            <option key={i} value={mun}>
              {mun}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Addresses;
