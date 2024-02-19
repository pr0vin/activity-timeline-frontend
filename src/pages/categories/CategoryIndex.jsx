import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryLists from "./CategoryLists";

function CategoryIndex() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      {/* <div className="heading">
        <h2>Categories</h2>
        <p> Here are the categories</p>
      </div> */}
      <div className="md:flex gap-5 mt-5">
        {open && (
          <div className="md:w-1/3 p-3 bg-white rounded my-5 shadow-lg">
            <CategoryForm handleOpen={handleOpen} />
          </div>
        )}

        <div className="flex-1  bg-white rounded-t shadow-lg">
          <CategoryLists handleOpen={handleOpen} open={open} />
        </div>
      </div>
    </div>
  );
}

export default CategoryIndex;
