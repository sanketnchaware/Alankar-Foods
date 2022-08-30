import React from "react";
import EditMenuForm from "./EditMenuForm";
import EditMenuList from "./EditMenuList";
import "./style.scss";

const EditMenuBody = () => {
  return (
    <div className=" pt-2 pl-9 pb-5">
      <EditMenuList />
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <EditMenuForm />
    </div>
  );
};

export default EditMenuBody;
