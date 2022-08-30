import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

//images
import Dashboard from "../UniversalComponents/Dashboard";
import CustomerDetails from "./CustomerDetails";

const TakeDashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const adminData = localStorage.getItem("adminDetails");
  const roleData = JSON.parse(adminData);
  const [report, setReport] = useState([]);
  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  const [food, setFood] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputs, setInputs] = useState({
    sdate: "",
    edate: "",
  });

  const [time, setTime] = useState("value");
  const handleDate = (e) => {
    let key = e.target.value;
    setTime(e.target.value);
    setStartDate(null);
    setEndDate(null);
    fetchData(key);
  };

  useEffect(() => {
    fetchData("today");

    statsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (key) => {
    let date = Calculate(key);

    if (date !== "lastweek") {
      const res = axios.get(
        `${BASE_URL}/reports/graph?order_type=2&date=${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      res
        .then((res) => {
          setReport(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Calculate = (key) => {
    if (key === "today") {
      var data = moment().format();
      var date = moment(data).format("YYYY-MM-DD");
      return date;
    } else if (key === "yesterday") {
      data = moment().subtract(1, "days").format();
      date = moment(data).format("YYYY-MM-DD");
      return date;
    } else {
      return key;
    }
  };

  const onChange = (dates) => {
    setTime("disabled");

    const [start, end] = dates;
    setInputs({
      ...inputs,
      sdate: moment(start).format("YYYY-MM-DD"),
      edate: moment(end).format("YYYY-MM-DD"),
    });
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      dateRangeData(start, end);
    }
  };

  const dateRangeData = async (start, end) => {
    const startDate = moment(start).format("YYYY-MM-DD");
    const endDate = moment(end).format("YYYY-MM-DD");

    await axios
      .get(
        `${BASE_URL}/reports/graph/range?from=${startDate}&to=${endDate}&order_type=2`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setReport(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const statsData = () => {
    const res = axios.get(
      `${BASE_URL}/reports/stats/dashboard/top?order_type=2`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    res.then((res) => {
      setCustomer(res.data.order);
      setFood(res.data.quantity);
      setFeedback(res.feedback);
      setWeek(res.data.revenue.weeks);
      setToday(res.data.revenue.todays);
      setMonth(res.data.revenue.months);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const handleReset = () => {
    setInputs(() => {
      setStartDate(null);
      setEndDate(null);
    });
    setTime("today");
    fetchData("today");
  };


  return (
    <>
    {roleData.role==="Admin"?<Dashboard data={{feedback,food,customer,week,today,month,report,startDate,endDate,handleDate,time,handleReset,onChange}}/>:<CustomerDetails/>}
    </>
    
  );
};

export default TakeDashboard;
