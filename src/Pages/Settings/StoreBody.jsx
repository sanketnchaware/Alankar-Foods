import "../../components/StoreSetting/style.scss";
import React, { useState } from "react";
import Validator from "validatorjs";
import Swal from "sweetalert2";
import axios from "axios";
import { Text } from "../../components/UniversalComponents/Text";
import Button from "../../components/UniversalComponents/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const fields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  gst_no: "",
  gst: "",
};

const StoreBody = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  let token = localStorage.getItem("alankartoken");
  useEffect(() => {
    getStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStore = () => {
    const res = axios.get(`${BASE_URL}/admin/stores`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res
      .then((res) => {
        setParams(res.data[0]);
        console.log(res.data[0], "res");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "required|max:20",
      email: "required|email",
      phone: "required|numeric|digits:10",
      address: "required|max:60",
      gst_no: "required|size:15",
      gst: "required|min:2|numeric|max:100",
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
      name: params.name,
      email: params.email,
      phone: params.phone,
      address: params.address,
      gst_no: params.gst_no,
      gst: params.gst,
    };
    axios
      .put(`${BASE_URL}/admin/stores/${params.id}`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer: 1000,
        }).then(() => {
          setParams(obj);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-9 pt-2 pb-5">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Store Setting
      </p>
      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/setting"> Setting</Link> &#8250; Store
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <form onSubmit={handleSubmit} className="">
        <div className=" grid  grid-rows-3  grid-flow-col ml-auto mr-auto">
          <div className=" mr-10 flex flex-col">
            <p className="font-sans text-base font-semibold mb-1">Store Name</p>
            <Text
              name="name"
              value={params.name}
              handleChange={handleChange}
              error={errors.name}
              placeholder=""
              className="h-16 w-full"
            />
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">Email</p>
            <Text
              name="email"
              value={params.email}
              handleChange={handleChange}
              error={errors.email}
              placeholder=""
              className="h-16 w-full"
            />
          </div>

          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base mb-1">Phone No.</p>
            <Text
              name="phone"
              value={params.phone}
              handleChange={handleChange}
              error={errors.phone}
              placeholder=""
              className="h-16 w-full"
            />
          </div>

          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">
              Store Address
            </p>
            <Text
              name="address"
              value={params.address}
              handleChange={handleChange}
              error={errors.address}
              placeholder=""
              className="h-16 w-full"
            />
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">GST No.</p>
            <Text
              name="gst_no"
              value={params.gst_no}
              handleChange={handleChange}
              error={errors.gst_no}
              placeholder=""
              className="h-16 w-full"
            />
          </div>
          <div className=" mr-10 flex flex-col">
            <p className="font-sans font-semibold text-base  mb-1">
              GST Percentage.
            </p>
            <Text
              name="gst"
              value={params.gst}
              handleChange={handleChange}
              error={errors.gst}
              placeholder=""
              className="h-16 w-full"
            />
          </div>
        </div>
        <div className=" mt-20 mr-28 flex items-center justify-center">
          <Button text="Update" className="pl-14 pr-14"></Button>
        </div>
      </form>
    </div>
  );
};

export default StoreBody;
