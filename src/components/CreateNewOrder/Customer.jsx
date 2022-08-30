import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Button from "../UniversalComponents/Button";
import Validator from "validatorjs";
import { AppContext } from "../../context/AppContext";
import "./createneworder.scss";
import { ActiveOrderAddItems } from "./AddItems";
import { Link } from "react-router-dom";
import { Text } from "../UniversalComponents/Text";

const userId = localStorage.getItem("adminID");
const intialValues = {
  name: "",
  phone: "",
  email: "test@scube.me",
  total_persons: "",
  instructions: "",
  table_id: [],
  order_type: 1,
  items: [],
  user_id: userId,
};

const Customer = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const id = localStorage.getItem("adminID");
  const { step, handleStep, handleObj } = useContext(AppContext);
  const [tableNo, setTableNo] = useState([]);
  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [select, setSelect] = useState();
  let token = localStorage.getItem("alankartoken");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getTableNO();
    handleStep(1);
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
    console.log(params);
    let validation = new Validator(params, {
      name: "alpha|required|max:20",
      phone: "numeric|required|digits:10",
      total_persons: "required|integer|max:10|min:1",
      table_id: "required|max:200",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      console.log(fieldErrors);
      setFormErrors(fieldErrors);
      return false;
    } else {
      handleStep(2);
    }
  };

  const handleSelect = (e) => {
    setSelect(parseInt(e.target.value));
    params.table_id = [e.target.value];
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const getTableNO = () => {
    if (role === "Admin") {
      axios
        .get(`${BASE_URL}/admin/table/drop/down`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((res) => {
          setTableNo(res.data.data);
        })
        .catch((error) => {
          console.log("error in Table NO", error);
        });
    } else {
      axios
        .get(`${BASE_URL}/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((res) => {
          setTableNo(res.data.tables);
        })
        .catch((error) => {
          console.log("error in Table NO", error);
        });
    }
  };

  return (
    <div className="bg-darkwhite">
      {step === 1 ? (
        <div className="">
          <div className=" flex flex-col  pl-11 pt-3">
            <p className="font-semibold text-orange text-xl font-sans">
              Create New Order
            </p>
            <p className=" font-semibold text-lg font-sans">
              <Link to="/menu/dinein/active-order">Dine - In </Link>
              &#8250; Active Order
            </p>
            <hr className=" mt-3 border-2 mr-10 border-b-button_border border-t-white border-l-white border-r-white" />
            <div className="flex gap-11 mt-3 mb-11">
              <button
                className={`w-[180px] lg:w-[210px] h-14 lg:h-16 font-semibold  text-lg  lg:text-xl text-white add`}
              >
                Customer Details
              </button>
              <button
                className={`w-[180px] lg:w-[210px] h-14 lg:h-16 font-semibold text-lg lg:text-xl text-white button`}
              >
                Add Items
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="formContainer pr-9 lg:pr-28 "
          >
            <div className="pl-14">
              <label className="block text-lg  font-semibold mb-2">
                Customer Name
              </label>
              <Text
                name="name"
                value={params.name}
                handleChange={handleChange}
                error={formErrors.name}
                placeholder=""
                className="h-16"
              />
            </div>

            <div className="pl-14 ">
              <label className=" block text-lg  font-semibold mb-2">
                Phone No.
              </label>
              <Text
                name="phone"
                value={params.phone}
                handleChange={handleChange}
                error={formErrors.phone}
                placeholder=""
                className="h-16"
              />
            </div>

            <div className="pl-14">
              <label className=" block text-lg  font-semibold mb-2">
                No. Of People
              </label>
              <Text
                name="total_persons"
                value={params.total_persons}
                handleChange={handleChange}
                error={formErrors.total_persons}
                placeholder=""
                className="h-16"
              />
            </div>

            <div className="pl-14">
              <label className=" block text-lg  font-semibold mb-2">
                Table ID
              </label>
              <select
                className="w-10/12  h-14 lg:h-18 bg-search rounded-xl outline-darkyellow"
                value={select}
                onChange={handleSelect}
                name="table_id"
              >
                <option defaultValue selected disabled>
                  select table..
                </option>
                {tableNo.map((e, index) => (
                  <option key={e.id} value={e.id}>
                    {e?.name}
                  </option>
                ))}
              </select>
              <p className=" mb-6 text-[12px] pl-1 text-[#FF0000] font-medium">
                {formErrors.table_id}
              </p>
            </div>
            <div className="flex justify-center items-center mt-6 col-span-2">
              <Button
                text="Next"
                className="w-40 lg:w-44 "
                onClick={() => {
                  handleObj({ ...params });
                }}
              ></Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <ActiveOrderAddItems />
        </div>
      )}
    </div>
  );
};

export default Customer;
