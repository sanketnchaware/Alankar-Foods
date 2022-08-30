import "./style.scss";
import React, { useState } from "react";
import Validator from "validatorjs";
import Swal from "sweetalert2";
import Button from "../UniversalComponents/Button";
import { Text } from "../UniversalComponents/Text";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const fields = {
 floor:"",
 hall:"",
 type:1,
 status:1,
 table:""
};

const TableBody = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      table:"max:20|required|string",
      floor:"required|integer|max:2000",
      hall:"required|max:20|string",
      type:"max:50",
      status:"max:50",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const obj={
      floor:params.floor,
      hall:params.hall,
      type:1,
      status:1,
      name:params.table
    }
    axios
    .post(`${BASE_URL}/admin/tables`, obj, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Table created successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer:1000,
        }).then(() => {
          setParams(fields);
        });
        navigate("/menu/setting/table");
        
      })
      .catch((error) => {
        Swal.fire({
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU',
          imageWidth: 200,
          imageHeight: 200,
          text: `${error.response.data.errors.message}`,
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        })
      });
  };


  return (
    <div className="px-9 pt-2 pb-5">
      <p className="font-semibold  text-orange mb-1 text-xl font-sans">Table</p>
      <p className=" font-semibold text-lg font-sans ">
       <Link to="/menu/setting"> Setting </Link> &#8250; Table
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <form onSubmit={handleSubmit} className="">
        <div className=" grid grid-rows-2  grid-flow-col mr-auto ml-auto">
          <div className=" mr-10 flex flex-col ">
            <p className="font-sans text-base font-semibold  mb-1">
              Table Name
            </p>
             <Text
              name="table"
              placeholder=""
              value={params.table}
              handleChange={handleChange}
              className="h-16 w-full lg:w-10/12  bg-search"
              error={errors.table}
            /> 
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans text-base font-semibold mt-4   mb-1">
              Floor No.
            </p>
            <Text
              name="floor"
              value={params.floor}
              handleChange={handleChange}
              error={errors.floor}
              placeholder=""
              className="h-16 w-full lg:w-10/12"
            />
          </div>

          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">Hall Name</p>
            <Text
              name="hall"
              value={params.hall}
              handleChange={handleChange}
              error={errors.hall}
              placeholder=""
              className="h-16 w-full lg:w-10/12"
            />
          </div>
        </div>

        <div className="w-10/12 ml-12 h-1/6 mt-24 flex items-center justify-center">
          <Button text="Create" onClick={handleSubmit} className="pl-16 pr-16"></Button>
        </div>
      </form>
    </div>
  );
};

export default TableBody;
