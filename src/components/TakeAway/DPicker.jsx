import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../Images/calender.png";

const Dpicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputs, setInputs] = useState({
    sdate: "",
    edate: "",
  });

  const onChange = (dates) => {
    const [start, end] = dates;
    setInputs({
      ...inputs,
      sdate: moment(start).format("MM/DD/YYYY"),
      edate: moment(end).format("MM/DD/YYYY"),
    });
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className=" border-2 border-button_border text-orange rounded-lg">
      <div>
        <label className="block text-text text-sm ml-2">Date Range</label>
        <div className="flex flex-row">
          <DatePicker
            className="text-xs"
            id="datepicker"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            maxDate={new Date()}
          />
          <label htmlFor="datepicker">
            <img className=" h-4 w-4 mt-1 mr-1" src={calender} alt="date" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dpicker;
