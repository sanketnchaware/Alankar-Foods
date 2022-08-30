import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const[category,setcategory]  = useState([])
  const[feedback,setfeedback] = useState([])
  const[sales,setSales] = useState([])
  const[datee,setdatee] = useState("")
  const[searchfeedback,setsearchfeedback] = useState([])
  useEffect(() => {
    //let token = localStorage.getItem("alankarToken");
    if (token) {
      setToken(token);
      navigate("/menu/dashboard");
    }
  },[token,navigate]);

  const handleToken = (newToken) => {
    localStorage.setItem("alankarToken", newToken);
    setToken(newToken);
  };

  const handleData = (newData) => {
    setData(newData);
  };

  const handleCategory = (newData) => {
    setcategory(newData);
  };

  const feedbackcontroller = (data) =>{
    setfeedback(data)
  }

  const handleSales = (data) =>{
    setSales(data)
  }

  const handleDate = (data) =>{
    setdatee(data)
  }

  const handleFeedback = (data) =>{
    setsearchfeedback(data)
  }



  return (
    <AuthContext.Provider value={{ token, handleToken, handleData, data,handleCategory, category,feedback,feedbackcontroller,sales,handleSales,datee,handleDate,handleFeedback,searchfeedback}}>
      {children}
    </AuthContext.Provider>
  );
};
