import React, { useState, useEffect } from "react";
import Validator from "validatorjs";
import axios from "axios";
import Button from "../../UniversalComponents/Button";
import { Text } from "../../UniversalComponents/Text";
import "./style.scss";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
//import Logo from "../../FooterLogo/Logo";

const fields = {
  name: "",
  phone: "",
  role: "",
  email: "",
  password: "",
  tables: [],
  shift: "",
};

const EditStaffForm = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  // const [images, setImages] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);
  const [value, setValue] = useState([]);
  const [table, setTable] = useState([]);
  const [roles, setRole] = useState([]);
  const [shift, setShift] = useState("");
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const navigate = useNavigate();
  // const [file, setFile] = useState("");

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

  useEffect(() => {
    getStaff();
    stats();
    TableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getStaff = () => {
    const res = axios.get(`${BASE_URL}/admin/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      console.log(res.data,"data");
      setParams({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role_id,
        tables: res.data.tables.map((table) => table.id),
        shift: res.data.shift,
        image: res.data.image,
        password: res.data.password,
      });
      setRole(res.data.role);
      setShift(res.data.shift);
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
      password: "min:8|max:12",
      email: "required|email",
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

    const postdata = {
      name: params.name,
      email: params.email,
      role_id: params.role,
      phone: params.phone,
      image: "",
      tables: params.tables,
      password: params.password,
      shift: params.shift,
    };

    axios
      .put(`${BASE_URL}/admin/users/${id}`, postdata, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Staff updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        }).then((result) => {
          if (result.value) {
            window.location.href = "/menu/managestaff";
          }
          navigate("/menu/managestaff");
        });
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

  const handleChangeCheckBox = (e) => {
    const temp = e.target.value;
    if (e.target.checked === true) {
      const oldParams = JSON.parse(JSON.stringify(params));
      oldParams.tables.push(temp);
      setParams(oldParams);
    }

    if (e.target.checked === false) {
      const oldParams = JSON.parse(JSON.stringify(params));
      const indexx = oldParams.tables?.indexOf(temp, 0);
      oldParams.tables.splice(indexx, 1);
      setParams(oldParams);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className=" grid  grid-rows-4 w-11/12 grid-flow-col">
        <div className=" flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Name</p>
          <Text
            name="name"
            value={params.name}
            handleChange={handleChange}
            error={errors.name}
            placeholder=""
            className="h-16 w-[90%]"
          />
        </div>
        <div className=" flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Phone No.</p>
          <Text
            name="phone"
            value={params.phone}
            handleChange={handleChange}
            error={errors.phone}
            placeholder=""
            className="h-16 w-[90%]"
          />
        </div>
        <div className=" flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">Role</p>
          <select
            className="h-16 w-[90%] font-semibold pl-2 bg-input_color outline-none rounded-lg"
            name="role"
            onChange={handleRole}
          >
            <option defaultValue={roles?.id} selected disabled>
              {roles?.name}
            </option>
            {value.map((option, i) => (
              <option key={i + 1} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex flex-col">
          <p className="font-sans font-semibold text-base mb-1">
            Shift Timings
          </p>
          <select
            name="shift"
            onChange={handleShift}
            className="h-16 bg-search w-[90%] rounded-lg pl-2 font-semibold"
          >
            <option value={shift} disabled selected>
              {shift}
            </option>
            <option value="6am-3pm">6am-3pm</option>
            <option value="6pm-3am">6pm-3am</option>
            <option value="9am-6pm">9am-6pm</option>
          </select>
        </div>
        <div className=" flex flex-col ">
          <p className="font-sans w-[90%] font-semibold text-base mb-1">Email</p>
          <Text
            name="email"
            value={params.email}
            handleChange={handleChange}
            error={errors.email}
            placeholder=""
            className="h-16 w-[90%]"
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
            className="h-16 w-[90%]"
          />
        </div>

        <div>
          {params.role === 1 ? (
            <div>{null}</div>
          ) : (
            <div className="flex flex-col">
              <p className="font-sans font-semibold text-base mb-1">Table</p>
              <div className="w-[90%] h-[12vh] overflow-y-scroll grid grid-cols-2 lg:grid-cols-4 ">
                {table.map((item, i) => (
                  <div
                    key={i + 1}
                    className="w-full h-[50px] pt-2 form-group flex felx-row gap-4"
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      name="tables[]"
                      onChange={handleChangeCheckBox}
                      id={item.id}
                      className="h-[20px] w-[20px]"
                      defaultChecked={params.tables?.includes(item.id)}
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
          )}
        </div>
      </div>

      <div className=" mt-1 flex items-center justify-center">
        <Button text="Update Staff" className="pl-12 pr-12"></Button>
      </div>
      {/* <Logo /> */}
    </form>
  );
};

export default EditStaffForm;
