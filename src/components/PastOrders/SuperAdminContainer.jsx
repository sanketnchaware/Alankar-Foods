import "./pastorders.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";

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
import Button from "../UniversalComponents/Button";
import Printer from "react-pdf-print";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import isTouchDevice from "../../helpers/isTouchDevice";
import RangePicker from "../UniversalComponents/RangePicker";
import Reset from "../UniversalComponents/Reset";
import Search from "../UniversalComponents/Search";
import Refresh from "../UniversalComponents/Refresh";
import TablePagination from "../UniversalComponents/TablePagination";
const to12Hours = require("to12hours");

export const SuperAdminContainer = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");
  const [total, setTotal] = useState(0);
  const [numberofpages, setnumberofpages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    sdate: "",
    edate: "",
  });

  const { handlePData, pData } = useContext(AppContext);
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

  const refreshOrder = () => {
    getData(input);
  };

  const classes = useStyles();
  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
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

  const getData = (input) => {
    handlePData([]);
    axios
      .get(
        `${BASE_URL}/admin/past-orders?order_type=1&key=${input.search_key}&from=${input.sdate}&to=${input.edate}&page=${input.page}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )

      .then((res) => {
        setnumberofpages(res.data.data.meta.last_page);
        setTotal(res.data.data.meta.total);
        const addStatus = res.data.data.data.map((item) => {
          return {
            ...item,
            status: false,
          };
        });
        handlePData(addStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.log("All Orders PASt Order Error : ", error);
      });
  };

  const handleAddStatus = () => {};
  useEffect(() => {
    getData(input);
    handleAddStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.edate, input.search_key, input.page]);

 

  const handleChange = (e) => {
    setStartDate(null);
    setEndDate(null);
    if (e.target.value !== " ") {
      setLoading(true);
      setInput({
        ...input,
        search_key: e.target.value,
        page: 1,
      });
    }
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

  return (
    <div className=" mt-1 lg:mb-2">
      <div className="px-9 lg:mb-4 bg-darkwhite">
        {/* Past Orders Container */}
        <div className="flex flex-col  pt-3">
          <p className="font-semibold text-orange text-xl font-sans">
            Past Order - {total}
          </p>
          <p className=" font-semibold text-lg font-sans">
            <Link to="/menu/dinein/active-order">Dine - In</Link> &#8250;
            <span className="text-orange"> Past Order </span>
          </p>
          <hr className=" mt-2 mb-3  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
        </div>

        {/*Sorting & Search Bill No Container */}
        <div className="flex gap-8 ">
         <RangePicker data={{startDate,endDate,onChange}}/>

          <div className=" ml-auto gap-2 flex flex-row ">
          <Search
            data={{ handleChange: handleChange, value: input.search_key }}
          />
          
            <Reset className="" data={{onClick:handleReset,Reset}}/>
            
          </div>
        </div>
        <div className="flex items-end justify-end mt-4">
          <Refresh data={{onClick:refreshOrder}}/>
          
        </div>
        {/* All Orders Container */}

        {/* <AllOrders billSearch={billSearch} /> */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              {pData.length > 0 ? (
                <div className=" w-full bg-white rounded-xl">
                  <table className="w-full bg-white bod rounded-xl">
                    <th className="w-full flex flex-row justify-between">
                      <div className="ml-3 w-1/12 my-2 text-center">S.No.</div>
                      <div className="my-2 w-3/12 text-center">
                        Customer Name
                      </div>
                      <div className="my-2 w-2/12 text-center hidden lg:block">
                        Phone Number
                      </div>
                      <div className="my-2 w-2/12 text-center">Date & Time</div>
                      <div className="my-2 w-2/12 text-center">Order ID</div>
                      <div className="my-2 mr-8 w-3/12 text-center">Total</div>
                    </th>
                    <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                    <tbody>
                      <tr>
                        {pData.map((e, index) => (
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
                                <div className="flex w-full flex-row justify-between">
                                  <div className="w-1/12 text-center mt-3">
                                    {input.page * 10 - 10 + (index + 1)}.
                                  </div>
                                  <div className="w-3/12 text-center mt-3">
                                    {e?.name}
                                  </div>
                                  <div className="w-2/12 text-center mt-3 hidden lg:block">
                                    {e?.phone}
                                  </div>
                                  <div className="flex flex-col text-center w-2/12">
                                    <div>
                                      {moment(e?.created_at).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </div>
                                    <div>
                                      {to12Hours(e?.created_at?.slice(11, 16))}
                                    </div>
                                  </div>
                                  <div className="w-2/12 text-center mt-3">
                                    #{e?.id}
                                  </div>
                                  <div className="w-3/12 text-center text-red-500 mt-3">
                                    &#x20b9;{e?.total}
                                  </div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                                <hr className="  border-2 border-b-button_border border-t-white border-l-white border-r-white" />
                                <Box sx={{ margin: 4 }}>
                                  <div className="flex flex-row w-[550px] m-auto">
                                    <div className="w-full">
                                      <Table
                                        size="small"
                                        aria-label="purchases"
                                      >
                                        <Printer>
                                          <TableHead>
                                            <TableRow className="border-b-2  border-white">
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
                                                  key={historyRow.id}
                                                  className="border-b-2 border-white"
                                                >
                                                  <TableCell
                                                    align="center"
                                                    component="th"
                                                  >
                                                    {index + 1}.
                                                  </TableCell>
                                                  <TableCell align="center">
                                                    {historyRow.menus?.name}
                                                  </TableCell>
                                                  <TableCell align="center">
                                                    &#x20b9;{historyRow.price}
                                                  </TableCell>

                                                  <TableCell align="center">
                                                    x{historyRow.quantity}
                                                  </TableCell>
                                                  <TableCell align="center">
                                                    {parseInt(
                                                      historyRow.price
                                                    ) *
                                                      parseInt(
                                                        historyRow.quantity
                                                      )}
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
                                        <div className="text-gray-400">Tax</div>
                                        <div className="ml-4">
                                          &#x20b9;{e.tax}
                                        </div>
                                      </div>
                                      <div className="flex flex-row mt-3 mr-8 justify-end">
                                        <div className="font-bold">Total</div>
                                        <div className="ml-4">
                                          &#x20b9;{e.total}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-3/12 flex justify-end items-end">
                                      <Button
                                        text="Print"
                                        className="w-40"
                                        onClick={() => {
                                          handleprint(e.id);
                                        }}
                                      />
                                    </div>
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
                <div className="flex justify-center text-2xl items-center">
                  No data found!
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {loading ? (
        <div>{null}</div>
      ) : (
        <div>
          {pData.length <= 0 ? (
            <div>{null}</div>
          ) : (
            <div className="flex mb-28 lg:mb-4 justify-center mt-4 mx-9">
             <TablePagination data={{npages:numberofpages,page:input.page,handleChange:handlePagination}}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
