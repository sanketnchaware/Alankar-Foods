import React, { useState, useEffect } from "react";
import Validator from "validatorjs";
import Swal from "sweetalert2";
import "./style.scss";
import  Button  from "../UniversalComponents/Button";
import { Text } from "../UniversalComponents/Text";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getS3Link from "../../helpers/upload";

const fields = {
  name: "",
  time: "",
  sub_category_id: "",
  dinein_price: "",
  category_id: "",
  takeaway_price: "",
  availability_count: "",
  meal_type: [],
  kds_id: "",
  image: "",
};
const AddMenuForm = () => {
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const [value, setValue] = useState([]);
  const [kds, setKds] = useState([]);
  const [cate, setCate] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const stats = () => {
    const res = axios.get(`${BASE_URL}/admin/category/drop-down`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setValue(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };
  const kdsData = () => {
    const res = axios.get(`${BASE_URL}/kds`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setKds(res.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };
  const subcate = (id) => {
    const res = axios.get(`${BASE_URL}/admin/sub-category?parent=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setCate(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const handleFileChange = async (e) => {
    const image = await getS3Link(e);
    if (image) {
      setFile(image.imageUrl);
    }
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  useEffect(() => {
    stats();
    kdsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCetegory = (e) => {
    params.category_id = e.target.value;
    subcate(params.category_id);
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleKds = (e) => {
    params.kds_id = e.target.value;
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handlesubCategory = (e) => {
    params.sub_category_id = e.target.value;
  };
  const handleChangeCheckBox = (e) => {
    const temp = e.target.value;
    if (e.target.checked === true) {
      const oldParams = JSON.parse(JSON.stringify(params));
      oldParams.meal_type.push(temp);
      setParams(oldParams);
      setErrors({ ...errors, [e.target.name]: "" });
    } else {
      const oldParams = JSON.parse(JSON.stringify(params));
      oldParams.meal_type.pop(temp);
      setParams(oldParams);

    }
  };
  //Validating and posting the formdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = (e) => {
    setButtonStatus(false);
    e.preventDefault();
    // alert("hello")
    let rules = {
      name: "required|max:20",
      time: "required|max:10",
      sub_category_id: "max:150",
      dinein_price: "required|integer|min:1|max:999",
      category_id: "required",
      takeaway_price: "required|integer|min:1|max:999",
      availability_count: "required|integer|min:1",
      meal_type: "required|array|max:100",
      image: "url",
      kds_id: "required",
    }
    let validation = new Validator(
      params,rules,
      {
        "required.meal_type": "Please select atleast one meal_type.",
        "required.name": "Name field is required",
        "required.time": "Time field is required",
        "required.sub_category_id": "",
        "required.category_id": "Please select category field",
        "required.takeaway_price": "Takeaway_price field is required",
        "required.dinein_price": "Dinein_price field is required",
        "required.availability_count": "Availability count is required",
        "required.kds_id": "Please select kds",
        "required.image":"Please upload image."
      },
      {
        min: "Price must be positive",
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
      name: params.name,
      time: params.time,
      sub_category_id: params.sub_category_id,
      dinein_price: params.dinein_price,
      category_id: params.category_id,
      takeaway_price: params.takeaway_price,
      availability_count: params.availability_count,
      meal_type: params.meal_type,
      kds_id: params.kds_id,
      image: file,
    };
    axios
      .post(`${BASE_URL}/admin/menus`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Menu created successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        }).then(() => {
          setParams(fields);
          setButtonStatus(true);
        });
        navigate("/menu/manage-menu");
      })
      .catch((error) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: `Please fill the all fields`,
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        });
      });
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const handleImg = () => {
    let ele = document.getElementById("menuimage");
    if (ele) ele.click();
  };
  
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="w-11/12  rounded-lg bg-darkwhite  flex flex-col">
        <div className="grid grid-rows-5  grid-flow-col gap-2 ">
          <div className="">
            <p className="text-base font-semibold font-sans">Name</p>
            <Text
              name="name"
              value={params.name}
              handleChange={handleChange}
              error={errors.name}
              placeholder=""
              className="h-16"
            />
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">Time</p>
            <Text
              name="time"
              value={params.time}
              handleChange={handleChange}
              error={errors.time}
              placeholder=""
              className="h-16"
            />
          </div>
          <div className=" ">
            <p className="text-base font-semibold font-sans">Sub Category</p>
            <div className="w-10/12 h-16 mt-1 ">
              <select
                className="w-full h-full pl-2 bg-input_color outline-none rounded-lg"
                name="sub_category_id"
                error={errors.sub_category_id}
                onChange={handlesubCategory}
              >
                <option disabled selected>
                  Select Sub-Category...
                </option>
                {cate.map((option, i) => (
                  <option value={option.id} key={i + 1}>
                    {option.name}
                  </option>
                ))}
              </select>
             
            </div>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">Dine - In Price</p>
            <input
              type="number"
              name="dinein_price"
              value={params.dinein_price}
              onChange={handleChange}
              error={errors.dinein_price}
              placeholder=""
              className="h-16 w-10/12 bg-input_color outline-none rounded-lg"
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              min="0"
            />
            <p className="text-sm text-red-500">{errors.dinein_price}</p>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">KDS</p>
            <div className="w-10/12 h-16 mt-1 ">
              <select
                className="w-full h-full pl-2 bg-input_color outline-none rounded-lg"
                name="kds_id"
                error={errors.kds_id}
                onChange={handleKds}
              >
                <option disabled selected>
                  Select KDS...
                </option>
                {kds.map((option, i) => (
                  <option value={option.id} key={i + 1}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-red-500">{errors.kds_id}</p>
          </div>
          <div className=" ">
            <p className="text-base font-semibold font-sans">Meal Type</p>
            <div className="w-full h-16  flex justify-between flex-row">
              <div className="w-1/3 h-full pt-2 form-group flex felx-row">
                <input
                  type="checkbox"
                  value="breakfast"
                  name="meal_type"
                  onChange={handleChangeCheckBox}
                  id="meal_type_breakfast"
                  className="h-4/5  w-2/12"
                />
                <label
                  className="mt-2 text-xs lg:text-base font-sans"
                  htmlFor="meal_type_breakfast"
                >
                  Breakfast
                </label>
              </div>
              <div className="w-1/3 h-full pt-2 form-group   flex felx-row">
                <input
                  type="checkbox"
                  id="meal_type_lunch"
                  value="lunch"
                  name="meal_type"
                  onChange={handleChangeCheckBox}
                  className="h-4/5 w-2/12"
                />
                <label
                  className="mt-2  text-xs lg:text-base font-sans"
                  htmlFor="meal_type_lunch"
                >
                  Lunch
                </label>
              </div>
              <div className="w-1/3 h-full pt-2 form-group   flex felx-row">
                <input
                  type="checkbox"
                  id="meal_type_dinner"
                  value="dinner"
                  name="meal_type"
                  onChange={handleChangeCheckBox}
                  className="h-4/5 w-2/12"
                />
                <label
                  className="mt-2  text-xs lg:text-base font-sans"
                  htmlFor="meal_type_dinner"
                >
                  Dinner
                </label>
              </div>
            </div>
            <p className="text-sm text-red-500">{errors.meal_type}</p>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">Category</p>
            <div className="w-full h-16 mt-1 ">
              <select
                className="w-full h-full pl-2 bg-input_color outline-none rounded-lg"
                name="category_id"
                error={errors.category_id}
                onChange={handleCetegory}
              >
                <option disabled selected>
                  Select Category...
                </option>
                {value.map((option, i) => (
                  <option value={option.id} key={i + 1}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-red-500">{errors.category_id}</p>

          </div>
          <div className=" ">
            <p className="text-base font-semibold font-sans">Take Away Price</p>
            <input
              type="number"
              name="takeaway_price"
              value={params.takeaway_price}
              onChange={handleChange}
              error={errors.takeaway_price}
              placeholder=""
              className="h-16 w-full pl-2 bg-input_color outline-none rounded-lg"
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              min="0"
            />
            <p className="text-sm text-red-500">{errors.takeaway_price}</p>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">
              Availability Count
            </p>
            <input
              type="number"
              name="availability_count"
              value={params.availability_count}
              onChange={handleChange}
              error={errors.availability_count}
              placeholder=""
              className="h-16 w-full bg-input_color outline-none rounded-lg"
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              min="0"
            />
            <p className="text-sm text-red-500">{errors.availability_count}</p>
          </div>
        </div>
        <div className="">
          <p className="font-semibold text-base font-sans">Upload Image</p>
          <div className="flex flex-row">
            <div
              onClick={handleImg}
              className="h-18 w-28 border-2 mt-2 border-dashed border-button_border"
            >
              {image.preview && (
                <img src={image.preview} alt="menu" className="h-18 w-28" />
              )}
              <div className="">
                <input
                  type="file"
                  id="menuimage"
                  hidden
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" h-1/3 w-full  flex justify-center items-center">
          {buttonStatus ? (
            <Button
              text="Create Menu"
              onClick={handleSubmit}
              className="pl-8 pr-8"
            ></Button>
          ) : (
            <Button
              text="Create Menu"
              onClick={handleSubmit}
              className="pl-8 pr-8"
            ></Button>
          )}
        </div>
      </div>
    </form>
  );
};
export default AddMenuForm;