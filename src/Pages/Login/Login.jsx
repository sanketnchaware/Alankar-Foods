import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import axios from "axios";
import alankar from "../../Images/alankar.svg";
import login_img from "../../Images/login1.svg";
import "./login.scss";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Text } from "../../components/UniversalComponents/Text";
import scube from "../../Images/scube.png";

const intialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [params, setParams] = useState(intialValues);
  const [errors, setErrors] = useState(intialValues);
  const [err, setErr] = useState("");
  const [emai, setEmai] = useState("");
  const navigate = useNavigate();
  const { handleRole } = useContext(AppContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handlechange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setErr("");
    setEmai("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      email: ["required",'regex:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/'],
      password: "required|min:8",
    },{
      regex : "Please enter valid email",
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

    const obj = {
      email: params.email,
      password: params.password,
    };
    axios
      .post(`${BASE_URL}/login`, obj)
      .then((res) => {
        const adminDetails = {
          id: res.data?.data?.id,
          name: res.data?.data?.name,
          role: res.data?.data?.role?.name,
        };
        console.log(res.data, "data");
        localStorage.setItem("adminID", JSON.stringify(res.data?.data?.id));
        localStorage.setItem("adminDetails", JSON.stringify(adminDetails));
        localStorage.setItem("alankartoken", res.data?.data?.token.token);
        localStorage.setItem("role", res.data?.data?.role?.name);
        handleRole(res.data?.data?.role?.name);
        if (res.data?.data?.role?.name === "Admin") {
          navigate("/menu/dashboard");
        } else {
          navigate("/menu/dinein");
        }
      })
      .catch((error) => {
        setErr(error.response?.data?.errors?.message);
        setEmai(error.response.data?.errors?.email);
      });
  };

  return (
    <div className="login py-6 px-10 bg-darkwhite">
      <div className="log flex justify-center items-center lg:justify-start">
        <img src={alankar} alt="alankar" className="h-14 w-96 mb-4 lg:h-12 lg:w-96" />
      </div>
      <div className="both flex flex-row justify-between log1">
        <div className="hidden lg:block">
          <img src={login_img} alt="logo" className="h-5/6 mt-14 ml-24" />
        </div>
        <div className="m-auto mt-10 lg:mt-0 ">
          <div className="text-2xl lg:text-4xl">Welcome back, Please login to</div>
          <div className=" text-2xl flex lg:text-4xl gap-4 flex-row">
            your <div className="text-orange">Alankar Dashboard</div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className=" bg-white px-4 py-6 rounded-lg mt-6 boxShadow"
            >
              <div className="flex flex-col">
                <p className="font-sans text-base font-semibold  mb-1">Email</p>
                <Text
                  name="email"
                  type="email"
                  placeholder=""
                  value={params.email}
                  handleChange={handlechange}
                  className="h-16 w-full bg-search"
                  error={errors.email}
                />
              </div>
              <div className="text-red-500 ">{emai}</div>
              <div className="flex flex-col ">
                <p className="font-sans text-base font-semibold  mb-1">
                  Password
                </p>
                <Text
                  name="password"
                  placeholder=""
                  type="password"
                  value={params.password}
                  handleChange={handlechange}
                  className="h-16 w-full bg-search"
                  error={errors.password}
                />
              </div>
              <div className="text-red-500 text-sm">{err}</div>

              <div className="flex justify-center items-center px-4 mt-10">
                <button type="submit" className="add text-white w-full h-12 ">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end mt-4">
        <img src={scube} alt="scube" className=" w-36 h-14"/>
      </div>
    </div>
  );
};

export default Login;
