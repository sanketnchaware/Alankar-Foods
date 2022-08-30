import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const EditStaffList = () => {
  return (
    <div className="">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Edit Staff
      </p>
      <p className=" font-semibold text-lg font-sans"> <Link to="/menu/managestaff"> Manage Staff</Link>  &#8250; Edit Staff</p>
    </div>
  );
};

export default EditStaffList;
