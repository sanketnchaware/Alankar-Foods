import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import table_icon from "../../Images/table_icon.svg";
import { FoodItems } from "../UniversalComponents/FoodItems";
import TableCard from "../UniversalComponents/TableCard";

const TablesList = () => {
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const table_count = data.length;

  const stats = (input) => {
    const res = axios.get(`${BASE_URL}/admin/list/tables`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    res.then((res) => {
      setData(res.data.data);
      console.log(res.data.data, "table data");
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    stats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-9 mt-1 pb-10 bg-darkwhite ">
      <div>
        <div className="">
          <p className="font-semibold text-orange text-xl font-sans">Tables</p>
          <p className=" font-semibold text-lg font-sans">
            <Link to="/menu/setting">Setting</Link> &#8250; Tables
          </p>
        </div>
        <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />

        <div className="flex justify-between">
          <FoodItems
            data={{
              picture: table_icon,
              count: table_count || 0,
              type: "Tables Count",
            }}
          />
        </div>

        <div className="py-4 lg:pt-8 lg:pb-20 overflow-y-scroll lg:overflow-y-hidden grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-24 ">
          {data.map((item) => (
            <TableCard data={{ data: item }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablesList;
