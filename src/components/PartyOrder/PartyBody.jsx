import React from "react";
import "./style.scss";
import sales from "../../Images/Reports/Sales.svg";
import Button from "../UniversalComponents/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import to12hours from "to12hours";
import "react-datepicker/dist/react-datepicker.css";
import RangePicker from "../UniversalComponents/RangePicker";
import Reset from "../UniversalComponents/Reset";
import { FoodItems } from "../UniversalComponents/FoodItems";
import Search from "../UniversalComponents/Search";
import Refresh from "../UniversalComponents/Refresh";
import TablePagination from "../UniversalComponents/TablePagination";
const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#FF0000",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#FFA500",
      color: "#FF0000",
    },
  },
}));
const PartyBody = () => {
  const [partyData, setPartyData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [numberofpages, setnumberofpages] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    sdate: "",
    edate: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  useEffect(() => {
    getPartyOrderData(input);
    totall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page, input.search_key, input.edate]);

  const classes = useStyles();

  const refreshData = () => {
    getPartyOrderData(input);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    let startdate = start;
    let enddate = end;
    if (startdate && enddate !== null) {
      setInput({
        ...input,
        page: 1,
        sdate: moment(start).format("YYYY-MM-DD"),
        edate: moment(end).format("YYYY-MM-DD"),
      });
    }

    setStartDate(start);
    setEndDate(end);
  };

  const totall = async () => {
    const res = await axios.get(
      `${BASE_URL}/admin/active-orders?order_type=3&key=&date=&page=1`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    setCount(res.data.data.meta.total);
  };
  const getPartyOrderData = (input) => {
    setLoading(true);
    setPartyData([]);
    axios
      .get(
        `${BASE_URL}/admin/active-orders?order_type=3&key=${input.search_key}&from=${input.sdate}&to=${input.edate}&page=${input.page}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const addStatus = res.data.data.data.map((item) => {
          return {
            ...item,
            status: false,
          };
        });
        setPartyData(addStatus);

        setnumberofpages(res.data.data.meta.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in Specfic Category Data :", err);
      });
  };

  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
    console.log(value, "value");
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key !== " ") {
      setInput({ ...input, search_key: key, page: 1, date: "" });
      setLoading(true);
    }
  };

  const handlepayment = async (id) => {
    await axios.patch(
      `${BASE_URL}/admin/orders/payment/status/${id}`,
      {
        payment_status: "PAID",
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    window.location.reload(true);
  };

  const handleReset = () => {
    setInput((input) => ({
      ...input,
      page: 1,
      search_key: "",
      sdate: "",
      edate: "",
    }));
    setStartDate(null);
    setEndDate(null);
    getPartyOrderData(input);
  };

  const width = window.innerWidth;

  return (
    <div className="px-9 pt-2 pb-5">
      <p className="font-semibold text-orange mb-1 text-xl font-sans">
        Active Order
      </p>
      <p className=" font-semibold text-lg font-sans">
        Party Order &#8250; Active Order
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex flex-row justify-between">
        <div className="w-1/4 flex gap-6  flex-row">
          <FoodItems
            data={{
              picture: sales,
              count: count || 0,
              type: "Pending Orders",
            }}
          />
        </div>
        <div className="w-9/12 lg:w-10/12 h-1/2 flex flex-col lg:pl-4 pt-2">
          <div className="">
            <div className="h-14 pl-24  flex justify-end gap-4 flex-row ">
              <div className="hidden lg:flex ">
                <Search
                  data={{ handleChange: handleSearch, value: input.search_key }}
                />
              </div>

              <RangePicker data={{ startDate, endDate, onChange }} />
              <Link to="/menu/party-order/customer">
              <Button
                text="Create Order"
                className="text-sm mx-4 px-1.5   lg:mx-0 lg:h-14  lg:px-3"
              ></Button>
            </Link>
              <Reset className="ml-0" data={{ onClick: handleReset, Reset }} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-2 w-5/12">
        <Search
          data={{ handleChange: handleSearch, value: input.search_key }}
        />
      </div>

      <div className=" rounded-lg">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-sans font-semibold text-xl mt-4  mb-1 lg:mb-2 text-orange">
              All Orders
            </h1>
          </div>
          <Refresh data={{ onClick: refreshData }} />
        </div>
        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          <div>
            {partyData.length > 0 ? (
              <div className=" lg:h-full text-center bg-white outle rounded-xl  pt-2 ">
                <table className="w-full">
                  <th className="w-full">
                    <tr className="flex flex-row justify-between w-full">
                      <div className="ml-3 my-3 w-8 text-center">S.No.</div>
                      <div className="my-3 w-2/12 text-center lg:hidden">
                        Customer Details
                      </div>
                      {width > 1024 && (
                        <div className=" my-3  text-center w-2/12">
                          Customer Name
                        </div>
                      )}
                      {width > 1024 && (
                        <div className="my-3 w-1/12 text-right">Phone No</div>
                      )}
                      <div className="my-3 w-2/12 text-center">
                        Delivery Date & Time
                      </div>
                      {width > 1024 && (
                        <div className=" my-3 w-1/12 text-center">
                          Occassion
                        </div>
                      )}
                      <div className="my-3 w-1/12 text-center">Order ID</div>
                      <div className="my-3 w-1/12 text-center">Grand Total</div>
                      <div className="my-3 w-2/12 text-center">
                        Advance Received
                      </div>
                      {width > 1024 && (
                        <div className="mr-8 my-3 w-1/12 text-center">
                          Pending
                        </div>
                      )}
                    </tr>
                    <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                  </th>
                  <tbody>
                    <tr className="w-full">
                      {partyData.map((e, index) => (
                        <>
                          <Accordion
                            elevation={0}
                            className={classes.accordion}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <div className="flex flex-row justify-between w-full">
                                <div className="text-center my-3 w-8">
                                  {" "}
                                  {input.page * 10 - 10 + (index + 1)}.
                                </div>
                                <div className="flex flex-col text-left w-2/12 lg:hidden">
                                  <div>{e?.name}</div>
                                  <div>{e?.phone}</div>
                                </div>
                                {width > 1024 && (
                                  <div className="text-center my-3 w-2/12">
                                    {e?.name}
                                  </div>
                                )}
                                {width > 1024 && (
                                  <div className="text-left my-3 w-1/12">
                                    {e?.phone}
                                  </div>
                                )}
                                <div className="text-left lg:text-center w-1/12">
                                  {e?.created_at.substring(0, 10)}{" "}
                                  <span>
                                    <br />
                                  </span>
                                  {to12hours(e?.created_at?.slice(11, 16))}
                                </div>
                                {width > 1024 && (
                                  <div className="text-center my-3 w-1/12">
                                    {e?.occassion}
                                  </div>
                                )}
                                <div className="text-center my-3 w-1/12">
                                  #{e?.id}
                                </div>
                                <div className="text-left my-3 w-1/12">
                                  ₹ {e?.total}
                                </div>
                                <div className="text-center my-3 w-1/12">
                                  ₹ {e?.advance_received}
                                </div>
                                {width > 1024 && (
                                  <div className="text-red-500 my-3 text-center w-1/12">
                                    ₹{e?.pending}
                                  </div>
                                )}
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                              <Box sx={{ margin: 1 }} className="flex flex-row">
                                <div className="flex flex-col w-full">
                                  <Table
                                    size="small"
                                    aria-label="purchases"
                                    className="border-b-2 border-button_border"
                                  >
                                    <TableHead className="border-b-2 border-button_border">
                                      <TableRow>
                                        <TableCell align="center">
                                          Sno
                                        </TableCell>
                                        <TableCell align="center">
                                          Name
                                        </TableCell>
                                        <TableCell align="center">
                                          Price
                                        </TableCell>
                                        <TableCell align="center">
                                          Quantity
                                        </TableCell>
                                        <TableCell align="center">
                                          Total
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e?.meta_order?.map(
                                        (historyRow, index) => (
                                          <TableRow
                                            key={index + 1}
                                            className="border-b-2 border-white"
                                          >
                                            <TableCell
                                              align="center"
                                              component="th"
                                            >
                                              {index + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                              {historyRow?.menus?.name}
                                            </TableCell>
                                            <TableCell align="center">
                                              {historyRow?.menus?.dinein_price}
                                            </TableCell>

                                            <TableCell align="center">
                                              {historyRow?.quantity}
                                            </TableCell>
                                            <TableCell align="center">
                                              {parseInt(
                                                historyRow?.menus?.dinein_price
                                              ) *
                                                parseInt(historyRow?.quantity)}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                  <div className="">
                                    <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                                    <div className="flex flex-row mt-2 mr-8  justify-end items-end">
                                      <div className="text-gray-400">
                                        Subtotal
                                      </div>
                                      <div className="ml-4">
                                        &#x20b9;{e.sub_toal}
                                      </div>
                                    </div>
                                    <div className="flex flex-row mt-2 mr-8 justify-end">
                                      <div className="text-gray-400">
                                        Tax@5%
                                      </div>
                                      <div className="ml-4">
                                        &#x20b9;{e.tax}
                                      </div>
                                    </div>

                                    <div className="flex flex-row mt-2 mr-8 justify-end">
                                      <div className="text-gray-400">
                                        Party Amount
                                      </div>
                                      <div className="ml-4">
                                        &#x20b9;
                                        {(
                                          e?.total -
                                          (e?.tax + e?.sub_toal) +
                                          e?.discount
                                        ).toFixed(2)}
                                      </div>
                                    </div>

                                    <div className="flex flex-row mt-2 mr-8 justify-end">
                                      <div className="text-gray-400">
                                        Discount
                                      </div>
                                      <div className="ml-4">
                                        &#x20b9;{e.discount}
                                      </div>
                                    </div>
                                    <div className="flex flex-row mt-3 mr-8 justify-end">
                                      <div className="font-bold">Total</div>
                                      <div className="ml-4">
                                        &#x20b9;{e.total}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="font-semibold text-left font-base">
                                    Instructions:
                                  </div>
                                  <div className="w-[300px] break-words">
                                    {e.instructions}
                                  </div>
                                </div>
                                <div className="w-8/12 flex justify-end items-end gap-4">
                                  <Button
                                    text="Payment Received"
                                    className="w-48"
                                    onClick={() => {
                                      handlepayment(e.id);
                                    }}
                                  />
                                </div>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                          <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                        </>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-2xl text-center w-full font-sans">
                No data found!
              </div>
            )}
          </div>
        )}
      </div>
      {partyData.length <= 1 ? (
        <div>{null}</div>
      ) : (
        <div className="flex mt-4 mb-28 lg:mb-4 justify-center">
          <TablePagination
            data={{
              npages: numberofpages,
              page: input.page,
              handleChange: handlePagination,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PartyBody;
