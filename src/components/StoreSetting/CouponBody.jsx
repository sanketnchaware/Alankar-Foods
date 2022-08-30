import React, { useState } from "react";
import Validator from "validatorjs";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.scss";
import { Text } from "../UniversalComponents/Text";
import Button from "../UniversalComponents/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CouponBody = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [startDate, setStartDate] = useState(new Date());
  const d1 = moment(startDate).format("YYYY-MM-DD");
  const token = localStorage.getItem("alankartoken");
  const fields = {
    code: "",
    expires_at: d1,
    percent: "",
    status: 1,
    value: "",
  };
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(
      params,
      {
        code: "required|max:100",
        expires_at: "required|max:100",
        percent: "required",
        status: "max:20",
        value:
          params.percent === "amount"
            ? "required|min:1|numeric|max:100000|min:1"
            : "required|max:100|numeric",
      },
      {
        required: "Please fill the field",
      }
    );
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
      code: params.code,
      expires_at: d1,
      percent: params.percent,
      status: 1,
      value: params.value,
    };
    axios
      .post(`${BASE_URL}/admin/coupons`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Coupon created successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        }).then(() => {
          setParams(fields);
        });
        navigate("/menu/setting/discount");
      })
      .catch((error) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: "Coupon already exists!",
          confirmButtonClass: "confirm_btn",
          timer: 1000,
        });
      });
  };

  const handleKds = (e) => {
    params.percent = e.target.value;
  };

  return (
    <div className="pt-2 pb-5 px-9">
      <p className="font-semibold text-orange mb-1 text-xl font-sans">
        Create New Coupon
      </p>
      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/setting">Setting</Link> &nbsp; &#8250; &nbsp; Discount
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-rows-3  grid-flow-col ml-auto mr-auto">
          <div className=" mr-10 flex flex-col">
            <p className="font-sans text-base font-semibold mb-1">
              Coupon Code
            </p>
            <Text
              name="code"
              value={params.code}
              handleChange={handleChange}
              error={errors.code}
              placeholder=""
              className=" h-16 w-full lg:w-9/12"
            />
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">Value</p>
            <Text
              name="value"
              value={params.value}
              handleChange={handleChange}
              error={errors.value}
              placeholder=""
              className="w-full lg:w-9/12 h-16"
            />
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">
              Expiry Date
            </p>

            <DatePicker
              name="date_of_occassion"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="rounded-lg h-16 lg:h-16 w-full lg:w-9/12 bg-search focus:ring-1 ring-button_border"
              minDate={new Date()}
            />
          </div>
          <div className="  flex flex-col">
            <p className="font-sans font-semibold text-base mb-1">
              Percentage / Amount
            </p>

            <select
              name="percent"
              onChange={handleKds}
              className="w-full lg:w-9/12 h-16 bg-search rounded-lg pl-2 outline-none"
            >
              <option selected disabled>
                Select option..
              </option>
              <option value="amount">Amount</option>
              <option value="percentage">Percentage</option>
            </select>
            <p className="text-red-600">{errors.percent}</p>
          </div>

          <div className=" flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">Status</p>
            <Text
              name="status"
              value={params.status}
              handleChange={handleChange}
              error={errors.status}
              placeholder=""
              className="w-full lg:w-9/12 h-16"
            />
          </div>
        </div>

        <div className=" mt-20 mr-28 flex items-center justify-center">
          <Button text="Create" className="pl-14 pr-14"></Button>
        </div>
      </form>
    </div>
  );
};

export default CouponBody;
