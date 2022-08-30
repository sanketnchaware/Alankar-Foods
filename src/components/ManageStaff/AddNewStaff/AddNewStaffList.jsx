import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const AddNewStaffList = () => {
  return (
    <div className="">
      <p className="font-semibold text-orange mb-1 text-xl font-sans">
        Add New Staff
      </p>
      <p className=" font-semibold text-lg font-sans">
       <Link to="/menu/managestaff"> Manage Staff</Link>  &#8250;  Add New Staff
      </p>
    </div>
  );
};

export default AddNewStaffList;
