import React from "react";

function Paginate({
  handlePerPageChange,
  currentPage,
  perPage,
  goToNextPage,
  goToPreviousPage,
  paginateData,
}) {
  return (
    <>
      <div className=" relative flex justify-between p-2">
        <div>
          <select
            name="perPage"
            className="block w-full py-1 px-2 text-gray-700 bg-white border border-gray-200 rounded  focus:outline-none focus:border-secondary;"
            value={perPage}
            onChange={handlePerPageChange}
            id=""
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            className="myButtonOutline"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <button
            className="myButtonOutline"
            disabled={currentPage * perPage >= paginateData.length}
            onClick={goToNextPage}
          >
            <span> Next Page</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Paginate;
