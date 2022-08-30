import React from "react";
//import AddNewCategoryForm from "./AddNewCategoryForm";
import AddNewCategoryList from "./AddNewCategoryList";
import "./style.scss";
import AddCat from "./AddCat";

const AddNewCategoryBody = () => {
  return (
    <div className="pb-5 pt-2 px-9">
      <AddNewCategoryList />
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
{/* 
      <AddNewCategoryForm /> */}
      <AddCat/>
    </div>
  );
};

export default AddNewCategoryBody;
