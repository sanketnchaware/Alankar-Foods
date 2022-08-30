import React from "react";
import "./style.scss";


const StaffButton = () => {
  return (
    <div className="flex justify-between">
      <div className=" flex ">
        <input
          type="date"
          className="text-orange text-base outline-none border-2 border-button_border rounded-lg pl-8 pr-8"
        />

        <div className="">
          <select className=" border-2 pl-4 pr-24 pt-4 pb-4  mr-2 ml-6 border-button_border text-base outline-none text-orange rounded-lg ">
            <option value="one">Cook</option>
            <option value="two">Waiter</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StaffButton;
