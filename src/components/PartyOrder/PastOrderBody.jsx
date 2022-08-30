import sales from "../../Images/Reports/Sales.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import {FoodItems} from "../UniversalComponents/FoodItems";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "../UniversalComponents/Button";
import Printer from "react-pdf-print";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import RangePicker from "../UniversalComponents/RangePicker";
import Reset from "../UniversalComponents/Reset";
import TablePagination from "../UniversalComponents/TablePagination";
import Search from "../UniversalComponents/Search";
import Refresh from "../UniversalComponents/Refresh";
const to12Hours = require("to12hours");

const PastOrderBody = () => {
  const [pastData, setPastData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    sdate: "",
    edate: "",
  });
  const [numberofpages, setnumberofpages] = useState(1);
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

  const classes = useStyles();

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

  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  useEffect(() => {
    getData(input);
    handleAddStatus();
    totall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page, input.search_key, input.edate]);

  const refreshData = () => {
    getData(input);
  };

  const isTouchDevice = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  const getData = (input) => {
    setPastData([]);
    setLoading(true);
    axios
      .get(
        `${BASE_URL}/admin/past-orders?order_type=3&key=${input.search_key}&from=${input.sdate}&to=${input.edate}&page=${input.page}`,
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
        setPastData(addStatus);
        setnumberofpages(res.data.data.meta.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log("All Orders PASt Order Error : ", error);
      });
  };

  const handleprint = async (id) => {
    await axios
      .get(`${BASE_URL}/print-bills?id=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // const linkSource = `data:application/pdf;base64,${res.data.data}`;
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
        console.log(isTouchDevice());
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

  const totall = async () => {
    const res = await axios.get(
      `${BASE_URL}/admin/active-orders?order_type=3&key=&date=&page=1`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    setTotal(res.data.data.meta.total);
  };

  const handleSearch = (e) => {
    setStartDate(null);
    setEndDate(null);
    const key = e.target.value;
    if (key !== " ") {
      setInput({ ...input, search_key: key, page: 1, sdate: "", edate: "" });
    }
  };

  const handleAddStatus = () => {};

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
    <div className="px-9 pb-5 pt-2">
      <h1 className=" text-2xl font-bold text-darkyellow  mt-2">All Orders</h1>

      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/party-order">Party Order</Link> &#8250; Past Order
      </p>

      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />

      <div className="flex flex-row justify-between">
        <div className="w-2/6 lg:1/5 flex gap-6  flex-row">
          
        <FoodItems
            data={{
              picture: sales,
              count: total || 0,
              type: "Pending Orders",
            }}
          />

        </div>
        <div className=" h-1/2 flex flex-col pt-2">
          <div className="">
            <div className="h-1/2 flex justify-between flex-row gap-4">
              <Search data={{handleChange:handleSearch,value:input.search_key}}/>
              
             <RangePicker data={{startDate,endDate,onChange}}/>


             <Reset className="" data={{onClick:handleReset,Reset}}/>
  
            </div>
          </div>
          
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-10">Loading..</div>
      ) : (
        <div>
          <Refresh data={{onClick:refreshData}}/>
          {pastData.length > 0 ? (
            <div className=" lg:h-full text-center outle rounded-xl px-3 py-4 bg-white mt-1 divBorder">
              <table className="w-full">
                <th className="w-full">
                  <tr className="flex flex-row justify-between w-full">
                    <div className="w-8">S.No</div>
                    <div className="w-2/12 text-center  lg:hidden">
                      Customer Details
                    </div>
                    {width > 1024 && (
                      <p className="w-2/12 text-center break-all">
                        Customer Name
                      </p>
                    )}
                    {width > 1024 && (
                      <div className="w-2/12 text-center">Phone No</div>
                    )}
                    <div className="w-2/12 text-center">
                      Delivery Date & Time
                    </div>
                    {width > 1024 && (
                      <div className="w-2/12 text-center">Occassion</div>
                    )}
                    <div className="w-2/12 text-center">Order ID</div>
                    <div className="w-2/12 text-center">Grand Total</div>
                    <div className="w-2/12 text-center mr-6">
                      Advance Received
                    </div>
                  </tr>
                  <hr className="mt-2  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                </th>
                <tbody>
                  <tr>
                    {pastData.map((e, index) => (
                      <>
                        <Accordion elevation={0} className={classes.accordion}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <tr key={index + 1} className="w-full">
                              <div className="flex flex-row justify-between">
                                <div className="my-3 ">
                                  {" "}
                                  {input.page * 10 - 10 + (index + 1)}.
                                </div>
                                <div className="flex flex-col w-2/12 lg:hidden">
                                  <div className=" ">{e?.name}</div>
                                  <div>{e?.phone}</div>
                                </div>
                                {width > 1024 && (
                                  <div className="my-3 w-2/12 break-all">
                                    {e?.name}
                                  </div>
                                )}
                                {width > 1024 && (
                                  <div className="my-3 w-2/12">{e?.phone}</div>
                                )}
                                <div className="flex w-2/12 flex-col">
                                  <div>{e?.created_at.substring(0, 10)}</div>
                                  <div>
                                    {to12Hours(e?.created_at?.slice(11, 16))}
                                  </div>
                                </div>
                                {width > 1024 && (
                                  <div className="my-3 w-2/12">
                                    {e?.occassion}
                                  </div>
                                )}
                                <div className="my-3 w-2/12">#{e?.id}</div>
                                <div className="my-3 w-2/12">
                                  &#x20b9;{e?.total}
                                </div>
                                <div className="my-3 w-2/12">
                                  &#x20b9;
                                  {e?.advance_received === null
                                    ? "0"
                                    : e?.advance_received}
                                </div>
                              </div>
                            </tr>
                          </AccordionSummary>
                          <AccordionDetails>
                            <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                            <Box sx={{ margin: 4 }}>
                              <span className="flex flex-row m-auto">
                                <span className="w-[410px]">
                                  <Table size="small" aria-label="purchases">
                                    <Printer>
                                      <TableHead>
                                        <TableRow className="border-b-2  border-button_border">
                                          <TableCell align="center">
                                            S.No.
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
                                        {e.meta_order.map(
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
                                                {historyRow.menus?.name}
                                              </TableCell>
                                              <TableCell align="center">
                                                &#x20b9;
                                                {historyRow.menus?.dinein_price}
                                              </TableCell>
                                              <TableCell align="center">
                                                x{historyRow.quantity}
                                              </TableCell>
                                              <TableCell align="center">
                                                {parseInt(
                                                  historyRow.menus?.dinein_price
                                                ) *
                                                  parseInt(historyRow.quantity)}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Printer>
                                  </Table>

                                  <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                                  <div className="flex flex-row mt-2 mr-8 justify-end">
                                    <div className="text-gray-400">
                                      Subtotal
                                    </div>
                                    <div className="ml-4">
                                      &#x20b9;{e.sub_toal}
                                    </div>
                                  </div>
                                  <div className="flex flex-row mt-2 mr-8 justify-end">
                                    <div className="text-gray-400">Tax@5%</div>
                                    <div className="ml-4">&#x20b9;{e.tax}</div>
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
                                  <div className="font-semibold text-left">
                                    Instructions:
                                  </div>
                                  <div className="w-[350px] break-words">
                                    {e.instructions}
                                  </div>
                                </span>

                                <div className="w-2/12 flex justify-end items-end">
                                  <Button
                                    text="Print"
                                    className="w-40"
                                    onClick={() => {
                                      handleprint(e.id);
                                    }}
                                  />
                                </div>
                              </span>
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
            <div className="text-center text-2xl font-sans">
              No data found!!!!
            </div>
          )}
        </div>
      )}
      {pastData.length <= 0 ? (
        <div>{null}</div>
      ) : (
        <div className="flex my-3 mb-28 lg:mb-4 justify-center">
         
          <TablePagination data={{npages:numberofpages,page:input.page,handleChange:handlePagination}}/>
        </div>
      )}
    </div>
  );
};
export default PastOrderBody;
