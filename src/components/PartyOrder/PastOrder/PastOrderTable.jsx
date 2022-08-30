import { pastAllOrdersData } from "../../../pastallorders";

import { useState } from "react";
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

const PastOrderTable = () => {
  const [data, setData] = useState(pastAllOrdersData);
  const [open, setOpen] = useState(false);
  console.log(data);
  

  const handleClick = (item) => {
    setData(
      data.map((e) => {
        if (e.id === item.id) {
          e.status = !e.status;
          setOpen(!open);
        } else {
          e.status = false;
        }
        return e;
      })
    );
  };

  

  console.log(width,"width");

  return (
    <div className=" pt-4 pl-6 pr-6 mt-6 rounded-lg">
      <h1 className="font-sans font-semibold text-xl  mb-4 text-orange">
        All Orders
      </h1>
      <div className="h-[55vh] text-center  overflow-y-scroll  pt-2 ">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow> 
                  <TableCell>S.No</TableCell>
                  {width>1024 && <TableCell>Customer Name</TableCell>}
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Payment Mode</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <>
                  <TableRow
                    key={parseInt(e.sno)}
                    sx={{ "& > *": { borderBottom: "unset" } }}
                  >
                    <TableCell component="th">{e?.sno}</TableCell>
                    <TableCell>{e?.cname}</TableCell>
                    <TableCell>{e?.dt.date}</TableCell>
                    <TableCell>{e?.orderID}</TableCell>
                    <TableCell>{e?.total}</TableCell>
                    <TableCell>{e?.paymentMode}</TableCell>
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
                        <Box sx={{ margin: 1 }}>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Customer</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">
                                  Total price ($)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {e.history.map((historyRow) => (
                                <TableRow key={historyRow.date}>
                                  <TableCell align="center" component="th">
                                    {historyRow.date}
                                  </TableCell>
                                  <TableCell align="center">
                                    {historyRow.customerId}
                                  </TableCell>
                                  <TableCell align="center">
                                    {historyRow.amount}
                                  </TableCell>
                                  <TableCell align="center">
                                    {Math.round(
                                      historyRow.amount * e?.takeaway_price * 100
                                    ) / 100}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
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

export default PastOrderTable;
