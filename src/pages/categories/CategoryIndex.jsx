import React from "react";
import CategoryForm from "./CategoryForm";
import CategoryLists from "./CategoryLists";

function CategoryIndex() {
  return (
    <div>
      <div className="heading">
        <h2>Categories</h2>
        <p> Here are the categories</p>
      </div>
      <div className="md:flex gap-5">
        <div className="md:w-1/3 p-3 bg-white rounded mb-5">
          <CategoryForm />
        </div>

        <div className="flex-1 p-2 bg-white rounded">
          <CategoryLists />
        </div>
      </div>
    </div>
  );
}

export default CategoryIndex;
