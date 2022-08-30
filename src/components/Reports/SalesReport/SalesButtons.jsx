import React from "react";
import sale from "../../../Images/Reports/Sales.svg";
import totalsales from "../../../Images/Reports/TotalSales.svg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

import moment from "moment";

const SalesButtons = () => {
  const [revenue, setRevenue] = useState(0);
  const [type, setType] = useState(0);
  const [ordertype, setOrdertype] = useState("all");

  const { handleSales, handleDate, datee } = useContext(AuthContext);
  const token = localStorage.getItem("alankartoken");
  useEffect(() => {
    getDineIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordertype, datee]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordertype, datee]);

  useEffect(() => {
    getRevenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordertype, datee]);

  const getDineIn = async () => {
    if (ordertype !== "all") {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reports/total?order_type=${ordertype}&date=${datee}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      setType(data.data.data[0].total);
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/total-items`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      setType(data.data.data[0].total);
    }
  };

  const getRevenue = async () => {
    if (ordertype !== "all") {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/revenue?order_type=${ordertype}&date=${datee}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setRevenue(data.data.data[0].total);
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/All-sales`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setRevenue(data.data.data[0].total);
      console.log(data.data.data[0].total, "data");
    }
  };

  const handleCetegory = (e) => {
    handleDate("");

    setOrdertype(e.target.value);
  };

  const fetchData = async () => {
    if (ordertype !== "all") {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reports/itemsold?date=${datee}&order_type=${ordertype}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      handleSales(data.data.data);
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/All-items`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      handleSales(data.data.data);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/2 flex gap-6  flex-row">
        <div className="w-2/6 lg:w-1/5 bg-white pb-3 box flex items-center justify-center flex-col">
          <div className="h-14 rounded-full w-20 lg:w-14 mt-3 bg-red-100">
            <img
              src={totalsales}
              alt="totalsales icon "
              className="ml-3 mt-3"
            />
          </div>
          <p className="text-xl text-center mt-4 font-sans font-semibold">
            {revenue || 0}
          </p>
          <p className="text-center text-sm mt-1 font-sans">Total Sales</p>
        </div>

        <div className="w-2/6 lg:w-1/5 bg-white pb-3 box flex items-center justify-center flex-col">
          <div className="h-14 rounded-full w-20 lg:w-14  mt-3 bg-red-100">
            <img src={sale} alt="sales icon " className="ml-3 mt-3" />
          </div>
          <p className="text-xl text-center mt-4 font-sans font-semibold">
            {type || 0}
          </p>
          <p className=" text-sm text-center mt-1 font-sans">Items Sold</p>
        </div>
      </div>
      <div className="w-1/3 h-14 flex">
        <div className=" flex pl-6 flex-row gap-4">
          <select
            className="outline-none px-8 h-14 text-orange rounded-lg  border-2 border-button_border text-base "
            onChange={handleCetegory}
          >
            <option value="all">All</option>
            <option value="1">Dine-In</option>
            <option value="2">Take Away</option>
            <option value="3">Party Order</option>
          </select>
          <input
            type="date"
            className="outline-none px-4 rounded-lg border-2 border-button_border  text-orange text-base"
            onChange={(e) => {
              handleDate(e.target.value);
            }}
            value={datee}
            max={moment().format("YYYY-MM-DD")}
          />
        </div>
        <p className="text-orange font-sans ml-2 flex justify-end items-end">
          <u>Reset</u>
        </p>
      </div>
     
    </div>
  );
};

export default SalesButtons;
