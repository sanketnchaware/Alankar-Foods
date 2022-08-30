import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <div className="">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Edit Category
      </p>
      <p className="  font-semibold text-lg font-sans">
      <Link to="/menu/manage-category"> Manage Category</Link>  &#8250; Edit Category
      </p>
    </div>
  );
};

export default CategoryList;
