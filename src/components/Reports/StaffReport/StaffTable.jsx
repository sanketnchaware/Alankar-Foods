import React, {  } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./style.scss";


const StaffTable = ({staff}) => {
  return (
    <div className="sta overflow-y-scroll lg:h-full  bg-white pt-2 pl-6 pr-8 mt-5 box rounded-lg">
      <div className="text-orange text-xl  mt-5 mb-4 font-semibold font-sans">
        All Items
      </div>
      {
        staff.length> 0 ?<div className=" pr-32 font-sans">
        <Table className="relative">
          <Thead className="border-b-2 mb-1  bg-white head ">
            <Tr className=" text-left text-lg ">
              <Th className="font-sans pb-2">S. No.</Th>
              <Th className="font-sans  pb-2">Staff Name</Th>
              <Th className="font-sans  pb-2">Role</Th>
              <Th className="font-sans pb-2 ">Timing</Th>
              <Th className="font-sans  pb-2">Shift Timing</Th>
              <Th className="font-sans pb-2">No.Of Orders</Th>
              
            </Tr>
          </Thead>
          {staff?.map((data, i) => {
            return (
              <Tbody key={i}>
                <Tr className="row border-b-2 font-sans">
                  <Td  className="pt-9 pb-9" >
                    {i + 1}.
                  </Td>
                  <Td  className=" text-left " >
                    {data?.name}
                  </Td>
                  <Td  className="text-left " >
                    {data?.role}
                  </Td>
                  <Td  className="text-left " >
                    8hours
                  </Td>
                  <Td  className="  ">
                    {data?.shift}
                    
                  </Td>
                  <Td  className="" >
                    {data?.total}
                  </Td>
                 
                </Tr>
              </Tbody>
            );
         })} 
        </Table>
      </div>: <div>No data found!!!</div>
      }
    </div>
  );
};

export default StaffTable;
