import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const RollList = () => {
  return (
    <div className="">
      <p className="font-semibold text-orange mb-1 text-xl font-sans">
        Manage Role
      </p>
      <p className=" font-semibold text-lg font-sans"> <Link to="/menu/managestaff"> Manage Staff</Link>  &#8250; Create Role</p>
    </div>
  );
};

export default RollList;
