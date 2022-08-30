import React, { useState, useContext, useEffect } from "react";
import Validator from "validatorjs";
import "./style.scss";
import { Text } from "../UniversalComponents/Text";
import Button from "../UniversalComponents/Button";
import PAddItems from "./PAddItems";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import PPayment from "./PPayment";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const PCustomer = () => {
  const [startDate, setStartDate] = useState(new Date());
  const d1 = moment(startDate).format("YYYY-MM-DD");
  const fields = {
    name: "",
    phone: "",
    party_amount: "",
    advance_received: "",
    occassion: "",
    date_of_occassion: d1,
    order_type: 3,
  };

  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const { step, handleStep, handleObj } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(
      params,
      {
        name: "max:16",
        phone: "required|numeric|digits:10",
        party_amount: "required|numeric|min:0|max:999999",
        advance_received: "required|numeric|min:0|max:999999",
        occassion: "required|max:20|alpha",
        date_of_occassion: "required",
      },
      {
        min: "Amount must be positive",
      }
    );
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setErrors(fieldErrors);
      return;
    } else {
      handleStep(2);
    }
  };

  const handleClick = () => {
    handleObj({ ...params });
  };

  useEffect(() => {
    handleStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-9 pb-5 pt-2">
      {step === 1 ? (
        <div>
          <div>
            <div>
              <p className="font-semibold text-xl text-orange mb-1 font-sans">
                Create New Order
              </p>
              <p className=" font-semibold text-lg font-sans">
                <Link to="/menu/party-order"> Party Order</Link> &#8250; Active
                Order
              </p>
              <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
              <div className="flex gap-8 mb-4">
                <Button text="Customer Details" className="w-44" />
                <button className="button text-white font-sans font-semibold  h-14 w-44">
                  Add Items
                </button>
                <button className="button text-white font-sans font-semibold  h-14 w-44">
                  Manage Payment
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="">
              <div className=" w-11/12 rounded-lg bg-darkwhite  flex flex-col">
                <div className="w-full mt-1 grid grid-rows-3  grid-flow-col gap-1 pr-1/12">
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Customer Name
                    </p>
                    <Text
                      name="name"
                      value={params.name}
                      handleChange={handleChange}
                      error={errors.name}
                      placeholder=""
                      className="h-14 lg:h-16"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Party Amount
                    </p>
                    <Text
                      name="party_amount"
                      value={params.party_amount}
                      handleChange={handleChange}
                      error={errors.party_amount}
                      placeholder=""
                      className="h-14 lg:h-16"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Occassion
                    </p>
                    <Text
                      name="occassion"
                      value={params.occassion}
                      handleChange={handleChange}
                      error={errors.occassion}
                      placeholder=""
                      className="h-14 lg:h-16"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Phone No.
                    </p>
                    <Text
                      name="phone"
                      value={params.phone}
                      handleChange={handleChange}
                      error={errors.phone}
                      placeholder=""
                      className="h-14 lg:h-16"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Advance Received
                    </p>
                    <Text
                      name="advance_received"
                      value={params.advance_received}
                      handleChange={handleChange}
                      error={errors.advance_received}
                      placeholder=""
                      className="h-14 lg:h-16"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-semibold font-sans">
                      Date Of Occassion
                    </p>

                    <DatePicker
                      name="date_of_occassion"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="rounded-lg h-14 lg:h-16 w-10/12 bg-search focus:ring-1 ring-button_border"
                      minDate={new Date()}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full h-2/6">
                  <div className=" h-1/3 w-full mt-20 flex justify-center items-center">
                    <Button
                      text="Next"
                      onClick={handleClick}
                      className="pl-16 pr-16"
                    ></Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {step === 2 ? (
            <div>
              <PAddItems />
            </div>
          ) : (
            <div>
              <PPayment />
            </div>
          )}
        </div>
      )}

    </div>
  );
};
export default PCustomer;
