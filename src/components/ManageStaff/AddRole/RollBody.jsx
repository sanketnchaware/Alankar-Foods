import React from "react";
import RollForm from "./RollForm";
import RollList from "./RollList";
import "./style.scss";

const RollBody = () => {
  return (
    <div className="px-9 pb-5 pt-2">
      <RollList />
      <hr className=" mt-1 mb-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <RollForm />
    </div>
  );
};

export default RollBody;
