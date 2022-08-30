import React, { } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./style.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
const SalesTable = () => {
  var num = 1;
  const { sales, handleSales } = useContext(AuthContext);
  const token = localStorage.getItem("alankartoken");
  useEffect(() => {
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/reports/itemsold?date=&order_type=1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    handleSales(data.data.data);
  };

  return (
    <div className=" bg-white pt-2 pl-6 pr-8 mt-6 box rounded-lg">
      <div className="text-orange text-xl  mt-5 mb-4 font-semibold font-sans">
        All Items
      </div>
      <div className=" font-sans">
        <Table className="relative">
          <Thead className="border-b-2 mb-1  bg-white head ">
            <Tr className=" text-left text-lg ">
              <Th className="font-sans pb-2">S. No.</Th>
              <Th className="font-sans  pb-2">Product Name</Th>
              <Th className="font-sans  pb-2">Item Sales</Th>
              <Th className="font-sans pb-2  pr-60">Total Revenue</Th>
            </Tr>
          </Thead>
          {sales.map((data, i) => {
           
            return (
              <Tbody key={i+1}>
                <Tr className="row border-b-2 font-sans" >
                  <Td  className="pt-9 pb-9">
                    {num++}
                  </Td>
                  <Td  className=" text-left ">
                    {data.name}
                  </Td>
                  <Td  className="text-left ">
                    {data.quantity}
                  </Td>
                  <Td  className="text-left ">
                    { data.price}
                  </Td>
                </Tr>
              </Tbody>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;
