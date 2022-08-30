import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "../Button";
import Printer from "react-pdf-print";
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";


import { AppContext } from "../../context/AppContext";

export const AllOrders = ({ billSearch }) => {
  console.log("billSearch:", billSearch);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [pastData, setPastData] = useState([]);

  // const [page, setPage] = React.useState(1);
  const[inputs,setInputs] = useState(1)
  // const[numberofpages,setnumberofpages] = useState(1)

  const {  handlebill, date,pData,handlePData } = useContext(AppContext);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");

  console.log(date, "date");
  useEffect(() => {
    getData();
    handleAddStatus();
  }, []);

  const handlePagination = (e, value) => {
    setInputs({ ...inputs, page: value });
    console.log(value,"value")
  };
  const menuArr = ["S.No", "Customer Name", "Date & Time", "Order ID", "Total"];

  const getData = () => {
    axios
      .get(`${BASE_URL}/orders/past-orders?order_type=1`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        const addStatus = res.data.data.data.map((item) => {
          return {
            ...item,
            status: false,
          };
        });
        // setPastData(addStatus);
        handlePData(addStatus)
       
      })
      .catch((error) => {
        console.log("All Orders PASt Order Error : ", error);
      });
  };

  const handleprint = (id) => {
    const menu = pData.filter((item) => item.id === id);
    handlebill(menu);
    // localStorage.setItem("bill", JSON.stringify(menu));
    navigate("print/bill");
  };

  const handleClick = (item) => {
    handlePData(
      pData.map((e) => {
        if (e.id === item.id) {
          e.status = !e.status;
          setOpen(!open);
        } else {
          e.status = false;
        }
        // console.log(e);
        return e;
      })
    );
  };

  const handleAddStatus = () => {};



  return (
    <div className="mx-11 bg-white rounded-lg pl-10 pr-10 pb-6 mt-10">
      <h1 className=" text-2xl font-bold text-darkyellow  mt-2">
        All Orders -
      </h1>
      <div className="h-[60vh] text-center bg-white overflow-y-scroll  divBorder pt-2 ">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow className="border-b-2 border-button_border">
                {menuArr.map((e,i) => (
                  <TableCell key={i+1}>
                    <p className="font-bold text-base font-sans">{e}</p>
                  </TableCell>
                ))}
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {pData.map((e, index) => (
                <>
                  <TableRow
                    key={parseInt(e.sno)}
                    className="border-b-2 border-t-2 border-t-white border-b-button_border"
                  >
                    <TableCell component="th">{index + 1}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell className="flex flex-col">
                      <div>{e?.created_at.substring(0, 10)}</div>
                      <div>{e?.created_at.substring(11, 16)}.a.m.</div>
                    </TableCell>
                    <TableCell>#{e?.id}</TableCell>
                    <TableCell>&#x20b9;{e?.total}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleClick(e)}
                      >
                        {open && e.status ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={open && e.status}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 4 }}>
                          <div className="flex flex-row">
                            <div className="w-10/12">
                              <Table size="small" aria-label="purchases">
                                <Printer>
                                  <TableHead>
                                    <TableRow className="border-b-2  border-white">
                                      <TableCell align="center">
                                        S.No.
                                      </TableCell>
                                      <TableCell align="center">Name</TableCell>
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
                                    {e.meta_order.map((historyRow, index) => (
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
                                          &#x20b9;{historyRow.price}
                                        </TableCell>
                                        <TableCell align="center">
                                          {e.bill_no}
                                        </TableCell>
                                        <TableCell align="center">
                                          x{historyRow.quantity}
                                        </TableCell>
                                        <TableCell align="center">
                                          {parseInt(historyRow.price) *
                                            parseInt(historyRow.quantity)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Printer>
                              </Table>

                              <hr className="bord ml-10 mt-2 mr-10" />
                              <div className="flex flex-row mt-2 mr-8 justify-end">
                                <div className="text-gray-400">Subtotal</div>
                                <div className="ml-4">&#x20b9;{e.sub_toal}</div>
                              </div>
                              <div className="flex flex-row mt-2 mr-8 justify-end">
                                <div className="text-gray-400">Tax@18%</div>
                                <div className="ml-4">&#x20b9;{e.tax}</div>
                              </div>
                              <div className="flex flex-row mt-3 mr-8 justify-end">
                                <div className="font-bold">Total</div>
                                <div className="ml-4">&#x20b9;{e.total}</div>
                              </div>
                            </div>
                            <div className="w-2/12 flex justify-end items-end">
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
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
};
