import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const EditMenuList = () => {
  return (
    <div className="">
      <p className="font-semibold text-orange text-xl font-sans">Edit Menu</p>
      <p className=" font-semibold text-lg font-sans">
      <Link to="/menu/manage-menu"> Manage Menu</Link>  &#8250;  Edit Menu
      </p>
    </div>
  );
};

export default EditMenuList;
