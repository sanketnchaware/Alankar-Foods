import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const AddMenuList = () => {
  return (
    <div className="">
      <p className="font-semibold text-orange text-xl font-sans">
        Add New Item
      </p>
      <p className=" font-semibold text-lg font-sans">
       <Link to="/menu/manage-menu"> Manage Menu</Link>  &#8250;  Add New Item
      </p>
    </div>
  );
};

export default AddMenuList;
