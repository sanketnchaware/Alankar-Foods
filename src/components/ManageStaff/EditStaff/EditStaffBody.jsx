import React from "react";
import EditStaffForm from "./EditStaffForm";
import EditStaffList from "./EditStaffList";
import "./style.scss";

const EditStaffBody = () => {
  return (
    <div className="px-9 pt-2 pb-5">
      <EditStaffList />
      <hr className=" mt-1 mb-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <EditStaffForm />
    </div>
  );
};

export default EditStaffBody;
