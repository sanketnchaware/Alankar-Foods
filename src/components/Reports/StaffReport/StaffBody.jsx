import React from "react";
import "./style.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./style.scss";
//import scubelogo from "../../../Images/scubelogo.png";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import RangePicker from "../../UniversalComponents/RangePicker";
import Reset from "../../UniversalComponents/Reset";
import SelectOption from "../../UniversalComponents/SelectOption";
const StaffBody = () => {
  const [staff, setStaff] = useState([]);
  const [user, setUser] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const today = new Date();
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputs, setInputs] = useState({
    date: "",
    user_id: "",
    sdate: "",
    edate: "",
  });

  const value = true;

  useEffect(() => {
    stats(inputs);
    users();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.sdate, inputs.edate, inputs.user_id]);

  const onChange = (dates) => {
    const [start, end] = dates;
    let startdate = start;
    let enddate = end;
    if (startdate && enddate !== null) {
      setInputs({
        ...inputs,
        page: 1,
        sdate: moment(start).format("YYYY-MM-DD"),
        edate: moment(end).format("YYYY-MM-DD"),
      });
    }
    setStartDate(start);
    setEndDate(end);
  };

  const token = localStorage.getItem("alankartoken");
  const stats = (inputs) => {
    setStaff([]);
    if (inputs.user_id !== "all") {
      const res = axios.get(
        `${BASE_URL}/reports/staff/report?searchKey=${inputs.user_id}&from=${inputs.sdate}&to=${inputs.edate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      res.then((res) => {
        setStaff(res.data);
        console.log(res.data, "staff");
        setLoading(false);
      });
      res.catch((err) => {
        console.log(err);
        setLoading(false)
      });
    } else {
      setInputs({
        ...inputs,
        user_id: "",
        date: "",
      });
      const res = axios.get(
        `${BASE_URL}/reports/staff/report?searchKey=${inputs.user_id}&from=${inputs.sdate}&to=${inputs.edate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      res.then((res) => {
        setStaff(res.data);
        console.log(res.data, "staff");
        setLoading(false);
      });
      res.catch((err) => {
        console.log(err);
        setLoading(false)
      });
    }
  };

  const users = () => {
    const res = axios.get(`${BASE_URL}/admin/users/dropdown`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setUser(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const handleSelect = (e) => {
    setInputs({
      ...inputs,
      user_id: e.target.value,
      sdate: "",
      edate: "",
    });
  };

  const handleReset = () => {
    setInputs({
      ...inputs,
      sdate: "",
      edate: "",
      user_id: "",
    });
    setStartDate(null);
    setEndDate(null);
    stats(inputs);
    //window.location.reload();
  };

  return (
    <div className="px-9 pt-2 pb-5">
      <div>
        <p className="font-semibold text-xl text-orange  mb-1 font-sans">
          All Staff Report
        </p>
        <p className=" font-semibold text-lg font-sans">Staff Report</p>
      </div>
      <hr className=" mt-3 mb-6 border-2  border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex justify-between">
        <div className=" flex gap-2 lg:gap-0">
          
          <RangePicker data={{startDate,endDate,onChange}}/>

          <div className=" h-14">

          <SelectOption className="" data={{handleChange:handleSelect,value,data:user,dvalue:"All"}}/>
           
          </div>

          <Reset className="" data={{onClick:handleReset,Reset}}/>

         
        </div>
      </div>

      <div className=" overflow-y-scroll lg:h-full  bg-white pt-2 pl-6 pr-8 mt-6 box rounded-lg">
        <div className="text-orange text-xl  mt-5 mb-16 lg:mb-4 font-semibold font-sans">
          All Items
        </div>
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div>
            {staff.length > 0 ? (
              <div className=" font-sans flex justify-center">
                <Table className="relative">
                  <Thead className="border-b-2 mb-1  bg-white head ">
                    <Tr className=" text-left text-base mb-2 lg:text-lg ">
                      <Th className="font-sans pb-2">S. No.</Th>
                      <Th className="font-sans pb-2">Staff Name</Th>
                      <Th className="font-sans  pb-2">Role</Th>
                      <Th className="font-sans pb-2 ">Timing</Th>
                      <Th className="font-sans pb-2">Shift Timing</Th>
                      <Th className="font-sans pb-2">No.Of Orders</Th>
                    </Tr>
                  </Thead>
                  {staff?.map((data, i) => {
                    return (
                      <Tbody key={i}>
                        <Tr className="row border-b-2 font-sans">
                          <Td className="pt-9 pb-9">{i + 1}.</Td>
                          <Td className=" text-left ">{data?.name}</Td>
                          <Td className="text-left ">{data?.role}</Td>
                          <Td className="text-left ">8hours</Td>
                          <Td className="  ">{data?.shift}</Td>
                          <Td className="">{data?.total}</Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              </div>
            ) : (
              <div className="text-center text-2xl">No data found!!!</div>
            )}
          </div>
        )}
      </div>
      {/* <div className="lg:hidden absolute  right-0  bottom-0 mx-9 my-4">
        <img src={scubelogo} alt="scubelogo" className="w-36" />
      </div> */}
    </div>
  );
};

export default StaffBody;
