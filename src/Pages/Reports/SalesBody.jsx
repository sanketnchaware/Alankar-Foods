import React from "react";
import "../../components/Reports/SalesReport/style.scss";
import sale from "../../Images/Reports/Sales.svg";
import totalsales from "../../Images/Reports/TotalSales.svg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../components/Reports/SalesReport/style.scss";
import "react-datepicker/dist/react-datepicker.css";
import RangePicker from "../../components/UniversalComponents/RangePicker";
import { FoodItems } from "../../components/UniversalComponents/FoodItems";
import SelectOption from "../../components/UniversalComponents/SelectOption";
import Reset from "../../components/UniversalComponents/Reset";

const SalesBody = () => {
  const [revenue, setRevenue] = useState(0);
  const value = true;
  const [type, setType] = useState(0);
  const { handleSales, sales } = useContext(AuthContext);
  const token = localStorage.getItem("alankartoken");
  // const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    ordertype: "",
    sdate: "",
    edate: "",
    all:"all"
  });

  const data1 = [
    { name: "Dine-In", id: "1" },
    { name: "Take Away", id: "2" },
    { name: "Party Order", id: "3" },
  ];

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

  useEffect(() => {
    getDineIn(inputs);
    fetchData(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.ordertype, inputs.edate]);

  const getDineIn = async (inputs) => {
    setType(0);
    setRevenue(0);
    if (inputs.ordertype === "all") {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reports/sales/stats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setType(data.data.quantity);
      setRevenue(data.data.total);
      console.log(data.data);
    } else {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reports/sales/stats?order_type=${inputs.ordertype}&from=${inputs.sdate}&to=${inputs.edate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setType(data.data.quantity);
      setRevenue(data.data.total);
      console.log(data.data.quantity);
    }
  };

  const handleCetegory = (e) => {
    setInputs({ ...inputs, ordertype: e.target.value, date: "", all:"" });
  };

  const fetchData = async (inputs) => {
    handleSales([]);
    try {
      if (inputs.ordertype === "all") {
        const data = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/reports/sales?order_type=&from=&to=`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );
        handleSales(data.data);
        setLoading(false);
      } else {
        const data = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/reports/sales?order_type=${inputs.ordertype}&from=${inputs.sdate}&to=${inputs.edate}
          
          `,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );
        handleSales(data.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const reset = () => {
    setInputs({
      ...inputs,
      ordertype: "",
      sdate: "",
      edate: "",
    });
    setStartDate(null);
    setEndDate(null);
    fetchData(inputs);
    // window.location.reload();
  };

  return (
    <div className="px-9 pt-2 pb-5">
      <div>
        <p className="font-semibold text-xl text-orange  mb-1 font-sans">
          All Sales Report
        </p>
        <p className=" font-semibold text-lg font-sans">Sales Report</p>
      </div>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex flex-col gap-6  lg:flex-row lg:justify-between">
        <div className="w-1/2 flex gap-6  flex-row">
          <FoodItems
            data={{
              picture: totalsales,
              count: revenue || 0,
              type: "Total Sales",
            }}
          />
          <FoodItems
            data={{
              picture: sale,
              count: type || 0,
              type: "Items Sold",
            }}
          />
        </div>
        <div className="lg:w-3/4 lg:h-14 lg:flex lg:justify-end flex-row">
          <div className=" flex  flex-row gap-4">
            <SelectOption
              data={{
                handleChange: handleCetegory,
                value,
                data: data1,
                dvalue: "Select Option",
              }}
            />

            <RangePicker data={{ startDate, endDate, onChange }} />
            <Reset className="" data={{ onClick: reset, Reset }} />
          </div>
          
        </div>
      </div>

      <div className=" overflow-y-scroll lg:h-full  bg-white pt-2 pl-6 pr-8 mt-6 box rounded-lg">
        <div className="text-orange text-xl  mt-5 mb-4 font-semibold font-sans">
          All Items
        </div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <div>
            {sales.length > 0 ? (
              <div className=" font-sans flex justify-center">
                <Table className="relative">
                  <Thead className="border-b-2 mb-1  bg-white head ">
                    <Tr className=" text-left text-base lg:text-lg ">
                      <Th className="font-sans pb-2">S. No.</Th>
                      <Th className="font-sans  pb-2">Product Name</Th>
                      <Th className="font-sans  pb-2">Item Sales</Th>
                      <Th className="font-sans pb-2">Total Revenue</Th>
                    </Tr>
                  </Thead>
                  {sales.map((data, i) => {
                    return (
                      <Tbody key={i + 1}>
                        <Tr className="row border-b-2 font-sans">
                          <Td className="pt-9 pb-9">{i + 1}.</Td>
                          <Td className=" text-left ">{data.name}</Td>
                          <Td className="text-left ">{data.quantity}</Td>
                          <Td className="text-left ">{data.price}</Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              </div>
            ) : (
              <div className="text-center text-2xl">No data found!</div>
            )}
          </div>
        )}
      </div>
      <div className="mt-10">{/* <Logo/> */}</div>
    </div>
  );
};

export default SalesBody;
