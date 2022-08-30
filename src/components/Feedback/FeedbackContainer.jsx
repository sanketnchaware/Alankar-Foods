import { FeedbackCard } from "../UniversalComponents/FeedbackCard";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import RangePicker from "../UniversalComponents/RangePicker";
import { Customers } from "./Customers";
import Search from "../UniversalComponents/Search";

export const FeedbackContainer = () => {
  const [feedback, setFeedback] = useState([]);
  const [data, setdata] = useState(0);
  const token = localStorage.getItem("alankartoken");
  const [rate, setRate] = useState(0);
  const [service, setService] = useState(0);
  const [clean, setClean] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputs, setInputs] = useState({
    sdate: "",
    edate: "",
    search_key: "",
  });

  var orderMenu = [
    "S. No.",
    "Name",
    "Order ID",
    "Phone No",
    "Waiter",
    "Ratings",
    "Comments",
  ];

  const onChange = (dates) => {
    const [start, end] = dates;

    let startdate = start;
    let enddate = end;
    if (startdate && enddate !== null) {
      setInputs({
        ...inputs,
        search_key: "",
        sdate: moment(start).format("YYYY-MM-DD"),
        edate: moment(end).format("YYYY-MM-DD"),
      });
    }
    setStartDate(start);
    setEndDate(end);
  };

  const getRate = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/reports/feedbacks/stats`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setRate(data.data[0].feedbackcount);
    setService(data.data[0].service);
    setClean(data.data[0].cleanliness);
  };

  const getData = async (input) => {
    setFeedback([]);
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/feedback?searchkey=${inputs.search_key}&from=${inputs.sdate}&to=${inputs.edate}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setFeedback(data.data);
  };

  useEffect(() => {
    getData(inputs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.search_key, inputs.edate]);

  useEffect(() => {
    getAvg();
    getRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAvg = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/reports/feedbacks/stats`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setdata(data.data[0].feedbackcount.toFixed(1));
  };

  const handleSearch = (e) => {
    setInputs({
      ...inputs,
      sdate: "",
      edate: "",
      search_key: e.target.value.trim(),
    });
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="px-9 pt-2 pb-5">
      <>
        {" "}
        <div className="flex flex-col gap-2">
          <p className=" font-bold text-2xl text-darkyellow tracking-wider">
            Feedback{" "}
            <span>
              <StarIcon
                fontSize="small"
                className=" text-yellowstar ml-2 relative bottom-1"
              />
            </span>
            {data}
          </p>
          <p>({data} Rating Overall)</p>
          <hr className=" mt-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
        </div>
        <div className="grid grid-cols-2 mt-5 ">
        <RangePicker data={{startDate,endDate,onChange}}/>
         
          <div className="flex justify-end items-end">
            <Search data={{handleChange:handleSearch}}/>
            
          </div>
        </div>
      </>
      <div className="flex justify-between mt-6">
        <FeedbackCard data="Food Quality" data1={rate} />
        <FeedbackCard data="Service Quality" data1={service} />
        <FeedbackCard data="Cleanliness" data1={clean} />
      </div>
      <div>
        <Customers data={{feedback,orderMenu}}/>
      </div>
    </div>
  );
};
