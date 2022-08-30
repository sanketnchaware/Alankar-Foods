import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [profiledata, setprofileData] = useState({});
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const [pData,setPData] = useState([])
  const [detailOrder,setDetailOrder] = useState([])
  const[editTable,setEditTable] = useState([])
  const [toggle, setToggle] = useState(true);
  const[role,setRole] = useState("");
  const [takeAwayCart, setTakeawayCart] = useState([]);
  const [bill,setbill] = useState([])
  const[menuList,setMenuList] = useState([]);
  const[activeOrder,setActiveOrder] = useState([]);
  const [step, setStep] = useState(1);
  const [activeobj, setActiveobj] = useState({});
  const [activeData,setActiveData] = useState([])
  const [numberofpages, setnumberofpages] = useState(1);
  const [activeTables,setActiveTables] = useState([])
  

  const handleStep=(newStep)=>{
    setStep(newStep)
  }

  const handleActiveTables =  (newData) =>{
    setActiveTables(newData)
  }

  const handleNumberOfPages= (pages) =>{
    setnumberofpages(pages)

  }

  const handleActiveData = (newData) =>{
    setActiveData(newData)
  }

  const handleRole = (role) =>{
    setRole(role)

 }
  
 const handleData = (newData)=>{
   setprofileData(newData);
 }

  const handleObj=(newObj)=>{
    setActiveobj(newObj)
  }


  const handleTakeawayCart = (newCart) => {
    setTakeawayCart(newCart);
  };

  const handlePData = (newData) => {
    setPData(newData);
  };

  const handleDetailOrder= (newData) =>{
     setDetailOrder(newData)
  }

  const handleActiveOrder = (newData) =>{
    setActiveOrder(newData)
  }

  const handleTable = (newData) =>{
    setEditTable(newData)
  }


  const handleCustomerDetails = (newDetails) => {
    setCustomerDetails(newDetails);
  };

  const handlebill = (bill) =>{
    setbill(bill)
  }

  const handleMenu = (newData) =>{
       setMenuList(newData)
  }

  const handleToggle = (value)=>{
    setToggle(value);
  }

  const handleShow = (value) => {
    setShow(value);
  };

  const handleDate = (newDate) => {
    setDate(newDate);
  };
  

  return (
    <AppContext.Provider
      value={{
        customerDetails,
        handleCustomerDetails,
        takeAwayCart,
        handleTakeawayCart,
        step,
        handleStep,
        activeobj,
        handleObj,
        show,
        handleShow,
        date,
        handleDate,
        pData,
        handlePData,
        bill,
        handlebill,
        detailOrder,
        handleDetailOrder,
        menuList,
        handleMenu,
        profiledata,
        handleData,
        editTable,
        handleTable,
        toggle,
        handleToggle,
        activeOrder,
        handleActiveOrder,
        role,
        handleRole,
        handleActiveData,
        activeData,
        numberofpages ,
        handleNumberOfPages,
        activeTables,
        handleActiveTables

      }}
    >
      {children}
    </AppContext.Provider>
  );
};
