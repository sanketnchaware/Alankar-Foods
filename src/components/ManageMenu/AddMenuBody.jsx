import React from "react";
import AddMenuForm from "./AddMenuForm";
import AddMenuList from "./AddMenuList";
import "./style.scss";

const AddMenuBody = () => {
  
  return (
    <div className=" pt-2 bg-darkwhite px-9 pb-5">
      <AddMenuList />
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <AddMenuForm />
    </div>
  );
};

export default AddMenuBody;
