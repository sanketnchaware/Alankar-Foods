import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const AddNewCategoryList = () => {
  return (
    <div className="">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Add New Category
      </p>
      <p className="  font-semibold text-lg font-sans">
       <Link to="/menu/manage-category"> Manage Category</Link>  &#8250; Add New Category
      </p>
    </div>
  );
};

export default AddNewCategoryList;
