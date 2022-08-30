import React, { useState, useEffect } from "react";
import Validator from "validatorjs";
import axios from "axios";
import Button from "../../UniversalComponents/Button";
import { Text } from "../../UniversalComponents/Text";
import "./style.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const fields = {
  name: "",
  phone: "",
  role: "",
  email: "",
  password: "",
  tables: [],
  shift: "",
};

const AddNewStaffForm = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);

  const [value, setValue] = useState([]);
  const [table, setTable] = useState([]);
  const navigate = useNavigate();
  const file ="";

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  const stats = () => {
    const res = axios.get(`${BASE_URL}/admin/role`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setValue(res.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const TableData = () => {
    const res = axios.get(`${BASE_URL}/admin/rolewise?id=2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setTable(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    stats();
    TableData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRole = (e) => {
    params.role = e.target.value;
  };

  const handleShift = (e) => {
    params.shift = e.target.value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "required|max:20",
      phone: "required|numeric|digits:10",
      role: "max:150",
      email: ["required",'regex:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/'],
      password: "required|min:8|max:12",
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
    handleClick();
  };

  const handleChangeCheckBox = (e) => {
    const temp = e.target.value;
    const checked = e.target.checked;
    if (checked) params.tables.push(parseInt(temp));
  };

  const handleClick = () => {
    const postdata = {
      name: params.name,
      email: params.email,
      role_id: params.role,
      phone: params.phone,
      image: file,
      tables: params.tables,
      password: params.password,
      shift: params.shift,
    };
    axios
      .post(`${BASE_URL}/admin/users`, postdata, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Staff added successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer:1500,
        });
        navigate("/menu/managestaff");
      })
      .catch((error) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: `${error.response.data.errors.message}`,
          confirmButtonClass: "confirm_btn",
          timer:1500,
        });
      });
  };


  return (
    <form onSubmit={handleSubmit} className="">
      <div className=" grid grid-rows-4 pr-20 grid-flow-col">
        <div className=" mr-10 flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Name</p>
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
          <p className="font-sans font-semibold text-base mb-1">Role</p>
          <select
            className="h-16 mr-20  w-full pl-2 bg-input_color outline-none rounded-lg"
            name="role"
            error={errors.role}
            onChange={handleRole}
          >
            <option disabled selected>
              Select Role
            </option>
            {value.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" mr-10 flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Shift</p>
          <select
            className="h-16 mr-20  w-full pl-2 bg-input_color outline-none rounded-lg"
            name="shift"
            error={errors.shift}
            onChange={handleShift}
          >
            <option disabled selected>
              Select shift
            </option>
            <option value="6am-3pm">6am-3pm</option>
            <option value="9pm-3am">6pm-3am</option>
            <option value="9am-6pm">9am-6pm</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Email</p>
          <Text
            name="email"
            type="email"
            value={params.email}
            handleChange={handleChange}
            error={errors.email}
            placeholder=""
            className="h-16 w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Password</p>
          <Text
            name="password"
            value={params.password}
            handleChange={handleChange}
            error={errors.password}
            placeholder=""
            className="h-16 w-full"
          />
        </div>
        {params.role === "2" ? (
          <div >
            <div className="flex flex-col">
              <p className="font-sans font-semibold text-base mb-1">Table</p>
              <div className="w-full h-[12vh] overflow-y-scroll grid grid-cols-2 lg:grid-cols-4">
                {table.map((item, i) => (
                  <div
                    key={i + 1}
                    className="w-full h-[50px] pt-2 form-group flex felx-row gap-4"
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      name="tables"
                      onChange={handleChangeCheckBox}
                      id={item.id}
                      className="h-[20px] w-[20px]"
                    />
                    <label
                      className="mt-2 text-base font-sans"
                      htmlFor={item.id}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
     
      <div className=" mt-1 flex items-center justify-center">
        <Button
          text="Create Staff"
          onClick={handleSubmit}
          className="pl-12 pr-12"
        ></Button>
      </div>
    </form>
  );
};

export default AddNewStaffForm;