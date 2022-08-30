import React from "react";
import AddNewStaffForm from "./AddNewStaffForm";
import AddNewStaffList from "./AddNewStaffList";
import "./style.scss";

const AddNewStaffBody = () => {
  return (
    <div className="px-9 pt-2 pb-5">
      <AddNewStaffList/>
      <hr className=" mt-1 mb-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <AddNewStaffForm/>
    </div>
  );
};

export default AddNewStaffBody;
