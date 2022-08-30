import axios from "axios";
import { useEffect, useState, useContext } from "react";
import  Button  from "../UniversalComponents/Button";
import Validator from "validatorjs";
import "./createneworder.scss";
import AddItems from "./AddItems";
import { Link } from "react-router-dom";
import PaymentBody from "./PaymentBody";
import { AppContext } from "../../context/AppContext";
//import Logo from '../FooterLogo/Logo'
const intialValues = {
  name: "",
  phone: "",
  order_type: 2,
};

const CustomerDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //const [tableNo, setTableNo] = useState([]);
  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);

  const { step, handleStep, handleObj } = useContext(AppContext);

  let token = localStorage.getItem("alankartoken");

  useEffect(() => {
    handleStep(1);
    getTableNO();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "alpha_num|max:20|required",
      phone: "required|numeric|digits:10",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setFormErrors(fieldErrors);
      return;
    } else {
      handleStep(2);
    }
  };

  const getTableNO = () => {
    axios
      .get(`${BASE_URL}/admin/list-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        // setTableNo(res.data.data);
      })
      .catch((error) => {
        console.log("error in Table NO", error);
      });
  };

  const handleClick = () => {
    handleObj({ ...params });
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <div>
            <div className="pb-5 pt-2 px-9">
              <p className="font-semibold text-orange text-xl font-sans">
                Manage Order
              </p>
              <p className=" font-semibold text-lg font-sans">
                <Link to="/menu/take-away">Take Away</Link> &#8250;{" "}
                <Link to="/menu/take-away">Manage Order</Link> &#8250; Create
                New Order
              </p>
              <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
              <div className="flex gap-8 mb-4">
                <Button
                  text="Customer Details"
                  className="w-40 px-1 lg:px-4 lg:w-44 "
                />
                <button className="button text-white font-sans font-semibold  h-14 w-40 lg:w-44">
                  Add Items
                </button>
                <button className="button text-white font-sans font-semibold  h-14 w-40 lg:w-44">
                  Manage Payment
                </button>
              </div>
              <form onSubmit={handleSubmit} className="formContainer">
                <div>
                  <label className="block text-lg  font-semibold mb-2">
                    Customer Name
                  </label>
                  <input
                    className="w-3/4 h-14 lg:h-18 bg-search rounded-xl outline-darkyellow"
                    type="text"
                    name="name"
                    value={params.name}
                    onChange={handleChange}
                    error={formErrors.name}
                  />
                  <p className=" mb-6 text-[12px] pl-1 text-[#FF0000] font-medium">
                    {formErrors.name}
                  </p>
                </div>

                <div className=" ">
                  <label className=" block text-lg  font-semibold mb-2">
                    Phone No.
                  </label>
                  <input
                    className="w-3/4 h-14 lg:h-18 bg-search rounded-xl outline-darkyellow"
                    type="text"
                    name="phone"
                    value={params.phone}
                    onChange={handleChange}
                  />
                  <p className=" mb-6 text-[12px] pl-1 text-[#FF0000] font-medium">
                    {formErrors.phone}
                  </p>
                </div>
                <div className=" mt-8 flex col-span-2 justify-center items-center">
                  <Button
                    text="Next"
                    className="w-40 lg:w-44"
                    onClick={handleClick}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {step === 2 ? (
            <div>
              <AddItems />
            </div>
          ) : (
            <div>
              <PaymentBody />
            </div>
          )}
        </div>
      )}
      {/* <Logo/> */}
    </div>
  );
};

export default CustomerDetails;
