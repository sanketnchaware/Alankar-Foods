import "./style.scss";
import { useState } from "react";
import Button from "../UniversalComponents/Button";
import axios from "axios";
import { useEffect } from "react";
import * as React from "react";
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
import "./style.scss";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import to12hours from "to12hours";
import "react-datepicker/dist/react-datepicker.css";
import isTouchDevice from "../../helpers/isTouchDevice";
import RangePicker from "../UniversalComponents/RangePicker";
import Reset from "../UniversalComponents/Reset";
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

  summary: {
    border: "none",
  },
}));

const ManageOrderBody = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    sdate: "",
    edate: "",
  });
  const token = localStorage.getItem("alankartoken");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [numberofpages, setnumberofpages] = useState(1);

  const getData = (input) => {
    setOrderData([]);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin/takeaway-orders?order_type=2&key=${input.search_key}&from=${input.sdate}&to=${input.edate}&page=${input.page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("alankartoken")}`,
          },
        }
      )
      .then((res) => {
        setOrderData(res.data.data.data);
        setnumberofpages(res.data.data.meta.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  const onChange = (dates) => {
    const [start, end] = dates;
    setInput({
      ...input,
      page: 1,
      sdate: moment(start).format("YYYY-MM-DD"),
      edate: moment(end).format("YYYY-MM-DD"),
    });

    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    getData(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page, input.search_key, input.sdate, input.edate]);

  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
  };

  const searchData = async (e) => {
    if (e.target.value !== " ") {
      setInput({ ...input, search_key: e.target.value, page: 1, date: "" });
      setLoading(true);
    }
  };

  const handleprint = async (id) => {
    await axios
      .get(`${BASE_URL}/print-bills?id=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        let contentType = "application/pdf";
        const content = res.data.data;
        const sliceSize = 512;
        // method which converts base64 to binary
        const byteCharacters = window.atob(content);

        const byteArrays = [];
        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, {
          type: contentType,
        });
        const blobURL = URL.createObjectURL(blob);
        if (isTouchDevice()) {
          var printWindow = window.open(blobURL, "", "width=800,height=500");
          printWindow.print();
        } else {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = blobURL;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshPage = () => {
    getData(input);
  };

  const handlepayment = async (id) => {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/admin/orders/payment/status/${id}`,
      {
        payment_status: "PAID",
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("alankartoken")}`,
        },
      }
    );
    window.location.reload(true);
  };

  const handleReset = () => {
    setInput((input) => ({
      ...input,
      date: "",
      page: 1,
      search_key: "",
      sdate: "",
      edate: "",
    }));
    getData(input);
    setStartDate(null);
    setEndDate(null);
  };

  const width = window.innerWidth;

  return (
    <div className="pb-5 pt-2 px-9">
      <div className="flex flex-col">
        <span className="font-semibold text-xl text-orange mb-1 font-sans">
          Manage Order
        </span>
        <span className=" font-semibold text-lg font-sans">
          Take Away &#8250; Manage Order
        </span>
      </div>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="  flex justify-between">
        <RangePicker data={{ startDate, endDate, onChange }} />

        <div className="w-3/6 flex flex-row gap-3 justify-end items-end">
          <div className="hidden lg:block ">
            <Search
              data={{ handleChange: searchData, value: input.search_key }}
            />
            
          </div>
          <Link to="/menu/take-away/create">
              <Button
                text="Create Order"
                className="text-sm mx-4 px-1.5   lg:mx-0 lg:h-14  lg:px-3"
              ></Button>
            </Link>
          <div className="hidden lg:block ">
          <Reset className="lg:ml-0" data={{ onClick: handleReset, Reset }} />
          </div>

         
        </div>
      </div>
      <div className=" mt-6 rounded-lg ">
        <div className="flex lg:hidden">
          <Search
            data={{ handleChange: searchData, value: input.search_key }}
          />
        </div>

        <div className="flex flex-row justify-between mt-4 mb-2">
          <h1 className="font-sans font-semibold text-xl   text-orange">
            All Orders
          </h1>
          <Refresh data={{ onClick: refreshPage }} />
        </div>

        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          <div>
            {orderData.length > 0 ? (
              <div className=" overflow-y-scroll w-full lg:h-full outle text-center bg-white rounded-xl">
                <table className="w-full">
                  <th className="w-full">
                    <tr className="flex flex-row justify-between">
                      <div className="ml-3 my-3 w-1/12 text-center ">S.No.</div>
                      <div className="my-3 w-2/12 text-center lg:hidden">
                        Customer Details
                      </div>
                      {width > 1024 && (
                        <div className="my-3 w-2/12 text-center ">
                          Customer Name
                        </div>
                      )}
                      {width > 1024 && (
                        <div className="my-3 w-2/12 text-center ">
                          Phone No.
                        </div>
                      )}
                      <div className="my-3 w-2/12 text-center ">
                        Date & Time
                      </div>
                      <div className="my-3 w-1/12 text-center ">Order ID</div>
                      <div className="my-3 w-2/12 text-center ">
                        Grand Total
                      </div>
                      {width > 1024 && (
                        <div className="my-3 w-2/12 text-center ">
                          Order Status
                        </div>
                      )}
                      <div className="my-3 mr-10 w-3/12 text-center ">
                        Payment Action
                      </div>
                    </tr>
                    <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                  </th>
                  <tbody>
                    <tr>
                      {orderData.map((e, index) => (
                        <>
                          <Accordion
                            elevation={0}
                            className={classes.accordion}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={classes.summary}
                            >
                              <div className="flex w-full flex-row justify-between">
                                <div className="w-1/12 my-3 text-center">
                                  {input.page * 10 - 10 + (index + 1)}.
                                </div>
                                <div className="w-2/12 text-center flex flex-col lg:hidden">
                                  <div>{e?.name}</div>
                                  <div>{e?.phone}</div>
                                </div>

                                {width > 1024 && (
                                  <div className="w-2/12 my-3 text-center">
                                    {e?.name}
                                  </div>
                                )}
                                {width > 1024 && (
                                  <div className="w-2/12 my-3 text-center">
                                    {e?.phone}
                                  </div>
                                )}

                                <div className="flex flex-col w-2/12 text-center">
                                  <div>{e?.created_at.substring(0, 10)}</div>
                                  <div>
                                    {to12hours(e?.created_at?.slice(11, 16))}
                                  </div>
                                </div>
                                <div className="w-2/12 my-3 text-center">
                                  #{e?.id}
                                </div>
                                <div className="w-2/12 my-3 text-left pl-6">
                                  &#x20b9;{e?.total}
                                </div>
                                {width > 1024 && (
                                  <div className="w-2/12 my-3 text-center">
                                    <span className=" mb-7 mt-7 font-normal">
                                      {e?.payment_status === "INPROGRESS" ? (
                                        <div className="flex flex-row">
                                          <div className="out h-4 w-4 rounded-lg mr-1.5 mt-1">
                                            <div className="in h-2 w-2 rounded-lg ml-1 mt-1"></div>
                                          </div>
                                          <div>In Progress</div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-row">
                                          <div className="circle h-4 w-4 rounded-lg mr-1.5 mt-1">
                                            <div className="circle-in h-2 w-2 rounded-lg ml-1 mt-1"></div>
                                          </div>
                                          <div>Order Completed</div>
                                        </div>
                                      )}
                                    </span>
                                  </div>
                                )}
                                <div className="w-3/12 text-center">
                                  {e?.payment_status === "INPROGRESS" ? (
                                    <Button
                                      text="Payment Received"
                                      className="font-sans px-2 py-3 text-xs lg:text-base "
                                      onClick={() => {
                                        handlepayment(e?.id);
                                      }}
                                    ></Button>
                                  ) : (
                                    <button
                                      disabled
                                      className="button text-white px-2 py-3 lg:text-base  text-xs font-semibold font-sans"
                                    >
                                      Payment Received
                                    </button>
                                  )}
                                </div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                              <div className="flex w-full flex-row">
                                <Box
                                  sx={{ margin: 4 }}
                                  className="w-10/12  mb-4 border-b border-white"
                                >
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow className="border-b-2  border-button_border">
                                        <TableCell align="center">
                                          S. No.
                                        </TableCell>
                                        <TableCell align="center">
                                          Name
                                        </TableCell>
                                        <TableCell align="center">
                                          Price
                                        </TableCell>
                                        <TableCell align="center">
                                          Token No.
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
                                      {e.meta_order.map((data, i) => (
                                        <TableRow
                                          key={i + 1}
                                          className="border-b-2  border-t-2 border-t-white border-white"
                                        >
                                          <TableCell
                                            align="center"
                                            component="th"
                                          >
                                            {i + 1}.
                                          </TableCell>
                                          <TableCell align="center">
                                            {data.menus.name}
                                          </TableCell>
                                          <TableCell align="center">
                                            {data.menus.takeaway_price}
                                          </TableCell>
                                          <TableCell align="center">
                                            {Math.floor(Math.random() * 10)}
                                          </TableCell>
                                          <TableCell align="center">
                                            {data.quantity}
                                          </TableCell>
                                          <TableCell align="center">
                                            {data.quantity *
                                              data.menus.takeaway_price}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                  <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                                  <div className="flex justify-end items-end flex-row mr-10">
                                    <span className="text-sm text-gray-400">
                                      Subtotal
                                    </span>
                                    <span className="ml-6">
                                      ₹ {e?.sub_toal}
                                    </span>
                                  </div>
                                  <div className="flex justify-end items-end flex-row mr-10">
                                    <span className="text-sm text-gray-400">
                                      Tax
                                    </span>
                                    <span className="ml-6">₹ {e?.tax}</span>
                                  </div>

                                  <div className="flex justify-end items-end flex-row mr-10">
                                    <span className="text-sm text-gray-400">
                                      Discout
                                    </span>

                                    <span className="ml-6">
                                      ₹ {e?.discount}
                                    </span>
                                  </div>
                                  <div className="flex justify-end items-end flex-row mr-10">
                                    <span className="text-sm font-semibold">
                                      Total
                                    </span>
                                    <span className="ml-6">₹ {e?.total}</span>
                                  </div>
                                  <div className="font-semibold text-left text-base">
                                    Instructions:
                                  </div>
                                  <div className="w-[300px] break-words">
                                    <p>{e?.instructions}</p>
                                  </div>
                                </Box>
                                <div className="flex justify-end items-end mb-8 w-2/12">
                                  <Button
                                    className="h-14 w-36 "
                                    text="Print"
                                    onClick={() => {
                                      handleprint(e.id);
                                    }}
                                  ></Button>
                                </div>
                              </div>
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
              <div className="text-center font-sans text-2xl">
                No data found!!!
              </div>
            )}
          </div>
        )}
      </div>
      {orderData.length <= 0 ? (
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

export default ManageOrderBody;
