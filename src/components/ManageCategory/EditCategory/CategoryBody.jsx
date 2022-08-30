import React from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import "./style.scss";

const CategoryBody = () => {
  return (
    <div className="pb-5 pt-2 px-9">
      <CategoryList />
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <CategoryForm />
    </div>
  );
};

export default CategoryBody;
