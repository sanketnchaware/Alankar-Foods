import React from "react";
import Button from "../../UniversalComponents/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import additem from "../../../Images/additem.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Text } from "../../UniversalComponents/Text";
import Validator from "validatorjs";

const fields = {
  category: "",
};

const AddCat = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const [imgurl, setImgurl] = useState("");
  const [inputList, setInputList] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "" }]);
  };

  const imageURLs = [
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649570267_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649604191_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649627475_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649677800_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649709395_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649733847_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649777458_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649859766_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649885848_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649910402_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649945323_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653649999946_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650020058_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650042632_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650092249_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650113656_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650137668_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650191176_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650216227_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650235640_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650260032_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650282112_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650303506_.svg",
    "https://scube-users.s3.ap-south-1.amazonaws.com/1653650326361_.svg",
  ];

  const handleImage = (image) => {
    setImgurl(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      category: "required|max:15",
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
      name: params.category,
      image: imgurl,
      sub_category: inputList,
    };
    axios
      .post(`${BASE_URL}/admin/categories`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Category created successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        });
        navigate("/menu/manage-category");
      })
      .catch((error) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: `${error.response.data.errors.message}`,
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-10/12">
        <div className="w-72 lg:w-2/5 flex flex-col gap-2">
          <label
            className="font-sans font-semibold text-base"
            name="categorynamelabel"
          >
            Category Name
          </label>
          <Text
            name="category"
            type="text"
            error={errors.category}
            id="categorynamelabel"
            value={params.category}
            className="bg-search h-14"
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-rows-4 lg:grid-rows-3 grid-flow-col w-10/12 ">
          {imageURLs.map((item, i) => (
            <div className="grid grid-flow-col w-20 h-20" key={i + 1}>
              <input
                type="radio"
                name="test"
                className="mt-4 w-3 h-3"
                onChange={() => handleImage(imageURLs[i])}
              />
              <img src={imageURLs[i]} alt="logo" className="h-10 w-10" />
            </div>
          ))}
        </div>
      </div>
      <div>
        {inputList.map((x, i) => {
          return (
            <div>
              <div className="flex flex-row">
                {inputList.length && (
                  <div className="mt-3">
                    <p className="font-sans font-semibold">
                      Enter Sub_Category Name
                    </p>
                    <input
                      name="name"
                      className="bg-search h-12 w-72 lg:w-96"
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <div>{errors.name}</div>
                  </div>
                )}
                <div className="">
                  {inputList.length && (
                    <button
                      className="add mt-10 py-3 px-6 text-white font-sans font-semibold text-xs ml-4"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <img
            onClick={handleAddClick}
            src={additem}
            className="w-12 mt-4 h-12"
            alt="icon"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <Button
            onClick={handleSubmit}
            className="add px-10 py-3 text-lg font-semibold text-white"
            text="Create"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default AddCat;
