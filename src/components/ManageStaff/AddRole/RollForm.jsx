import React, { useState } from "react";
import Validator from "validatorjs";
import axios from "axios";
import Button from "../../UniversalComponents/Button";
import { Text } from "../../UniversalComponents/Text";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const fields = {
  role: "",
};

const RollForm = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      role: "required|max:20|alpha",
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

    axios
      .post(
        `${BASE_URL}/admin/role`,
        { name: params.role },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          icon:'success',
          text: 'Role created successfully.',
          confirmButtonClass: "confirm_btn",
          timer: 2000
        })
        navigate("/menu/managestaff");
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: `Role already exists`,
          timer: 2000
        })
      });
  };


  return (
    <form onSubmit={handleSubmit} className="h-[70vh]">
      <p className="text-base font-semibold font-sans mb-2">Role</p>
      <Text
        name="role"
        value={params.role}
        handleChange={handleChange}
        error={errors.role}
        placeholder=""
        className="w-2/5 h-16"
      />
      <div className=" mt-28  flex justify-center items-center">
        <Button text="Create Role" className="pl-10 pr-10"></Button>
      </div>
    </form>
  );
};

export default RollForm;
