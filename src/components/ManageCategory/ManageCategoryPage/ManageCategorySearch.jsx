import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import search from "../../../Images/ActiveOrder/Search_fill.png";
import { Button } from "../../Button";
import { SearchField } from "../../SearchField";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "./style.scss";

const ManageCategorySearch = () => {
  const { handleData } = useContext(AuthContext);

  const [look, setLook] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setLook(e.target.value);

    if (look.length >= 2) {
      stats();
    }
  };

  const token = localStorage.getItem("alankartoken");

  const stats = () => {
    const res = axios.get(`${BASE_URL}/admin/categories?search_key=${look}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      handleData(res.data.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="  flex justify-between">
      <div className="w-1/6 flex justify-between">
        <Link to="/menu/add-new-category">
          <Button text="Add New Category" className="pl-4 pr-4 mt-0.5"></Button>
        </Link>
      </div>
      <div className=" w-3/5 bg-search flex justify-between pl-2 pr-2  rounded-lg focus-within:border-2 border-button_border text-orange">
        <SearchField onChange={handleChange} />
        <div className="pt-3 w-1/12  bg-search">
          <img src={search} alt="search icon" />
        </div>
      </div>
    </div>
  );
};

export default ManageCategorySearch;
