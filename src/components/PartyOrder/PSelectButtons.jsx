import { useState } from "react";
import  PAddItems  from "./PAddItems";
import PPayment from "./PPayment";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PCustomer from "./PCustomer";
import "./style.scss";

const PSelectButtons = () => {

const [value, setValue] = useState('1');
const [background, setBackground] = useState("#FF5733");

const handleChange = (event, newValue) => {
  setValue(newValue);
  setBackground(background);
};


  return (
      <div className="h-[88vh] pt-6 mt-2 bg-darkwhite pl-12 pr-8 overflow-y-scroll">
    <p className="font-semibold text-xl text-orange mb-1 font-sans">
    Create New Order
  </p>
  <p className=" font-semibold text-lg font-sans">
    Party Order &#8250; Active Order
  </p>
  <hr className=" mt-3 mb-6 border-2 bord" />
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box>
        <TabList onChange={handleChange}>
          <Tab label="Customer Details" value="1" style={{color:"#ffff", borderRadius:"10px"}} className="add"/>
           <Tab label="Add Items" value="2" style={{marginLeft:"20px"}}/> 
          <Tab label="Manage Payment" value="3" style={{marginLeft:"20px"}}/>
        </TabList> 
    
      </Box>
      <TabPanel value="1"><PCustomer/></TabPanel>
      <TabPanel value="2"><PAddItems/></TabPanel>
      <TabPanel value="3"><PPayment/></TabPanel>
    </TabContext>
  </Box>
  </div>
  );
};

export default PSelectButtons;
