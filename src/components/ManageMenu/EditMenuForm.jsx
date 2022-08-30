import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./style.scss";
import Button from "../UniversalComponents/Button";
import { Text } from "../UniversalComponents/Text";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import getS3Link from "../../helpers/upload";

const fields = {
  name: "",
  time: "",
  kds_id: "",
  sub_category_id: "",
  dinein_price: "",
  category_id: "",
  takeaway_price: "",
  availability_count: "",
  meal_type: [],
  image: "",
};

const EditMenuForm = () => {
  const [errors, setErrors] = useState(fields);
  const [value, setValue] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcat, setSubcat] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [kds, setKds] = useState([]);
  const [cate, setCate] = useState([]);
  const [kdsid, setkdsid] = useState();
  const [kdsName, setKdsName] = useState("");
  const [params, setParams] = useState(fields);
  const navigate = useNavigate();
  let param = useParams();
  const [imgval, setImgval] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const menus = () => {
    const res = axios.get(`${BASE_URL}/admin/menus/${param.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setCategoryId(res.data[0].category_id);
      setFile(res.data[0].image);
      setCategoryName(res.data[0].category.name);
      setkdsid(res.data[0].kdsid);
      setKdsName(res.data[0].kd.name);
      setParams(res.data[0]);
      setImgval(res.data[0].image);
      setSubcat(res.data[0]?.category?.sub_categories[0]?.name);
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
      console.log(res.data,"kds");
      setKds(res.data);
      
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const handleCetegory = (e) => {
    params.category_id = e.target.value;
    subcate(e.target.value);
  };

  const handleKDS = (e) => {
    params.kds_id = e.target.value;
  };

  const handleChangeCheckBox = (e) => {
    const temp = e.target.value;
    if (e.target.checked === true) {
      const oldParams = JSON.parse(JSON.stringify(params));
      oldParams.meal_type.push(temp);
      setParams(oldParams);
    }
    if (e.target.checked === false) {
      const oldParams = JSON.parse(JSON.stringify(params));
      const indexx = oldParams.meal_type.indexOf(temp, 0);
      oldParams.meal_type.splice(indexx, 1);
      setParams(oldParams);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      image: file,
      kds_id: params.kds_id,
    };
    axios
      .put(`${BASE_URL}/admin/menus/${param.id}`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Menu updated successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        }).then((value) => {});
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

  const handlesubCategory = (e) => {
    params.sub_category_id = JSON.parse(e.target.value);
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

  useEffect(() => {
    stats();
    menus();
    kdsData();
    subcate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImg = () => {
    let ele = document.getElementById("menuimage");
    if (ele) ele.click();
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className=" w-11/12  rounded-lg  flex flex-col">
        <div className=" w-full grid grid-rows-5  grid-flow-col gap-2 pr-1/12">
          <div className="">
            <p className="text-base font-semibold font-sans">Name</p>
            <Text
              name="name"
              value={params.name}
              error={errors.name}
              placeholder=""
              className="h-16"
              handleChange={handleChange}
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
                name="subcategory"
                error={errors.sub_category_id}
                onChange={handlesubCategory}
              >
                <option disabled selected>
                  {subcat}
                </option>
                {cate.map((option, i) => (
                  <option
                    value={option.id}
                    className="font-sans font-semibold"
                    key={i + 1}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="text-sm text-red-500">{errors.sub_category_id}</div>
            </div>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">Dine - In Price</p>
            <Text
              name="dinein_price"
              value={params.dinein_price}
              handleChange={handleChange}
              error={errors.dinein_price}
              placeholder=""
              className="h-16"
            />
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">KDS</p>
            <div className="w-10/12 h-16 mt-1 ">
              <select
                className="w-full h-full pl-2 bg-input_color outline-none rounded-lg"
                name="kds"
                error={errors.kds}
                onChange={handleKDS}
              >
                <option disabled selected value={kdsid}>
                  {kdsName}
                </option>
                {kds.map((option, i) => (
                  <option
                    value={option.id}
                    className="font-sans font-semibold"
                    key={i + 1}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-red-500">{errors.kds_id}</p>

          </div>
          <div className=" " name="meal_type">
            <p className="text-base font-semibold font-sans">Meal Type</p>
            <div className="w-5/6 h-16  flex justify-between flex-row">
              <div className="w-1/3 h-full pt-2 form-group flex felx-row">
                <input
                  type="checkbox"
                  value="breakfast"
                  name="meal_type"
                  onChange={handleChangeCheckBox}
                  id="meal_type_breakfast"
                  className="h-4/5  w-2/12"
                  checked={params.meal_type.includes("breakfast")}
                />
                <label
                  className="mt-2 text-base font-sans"
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
                  checked={params.meal_type.includes("lunch")}
                  className="h-4/5 w-2/12"
                />
                <label
                  className="mt-2  text-base font-sans"
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
                  checked={params.meal_type.includes("dinner")}
                />
                <label
                  className="mt-2 text-base font-sans"
                  htmlFor="meal_type_dinner"
                >
                  Dinner
                </label>
              </div>
              <div></div>
              
            </div>
            <div className="text-sm text-red-500">{errors.meal_type}</div>
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">Category</p>
            <div className="w-10/12 h-16 mt-1 ">
              <select
                className="w-full h-full pl-2 bg-input_color outline-none rounded-lg"
                name="category_id"
                error={errors.category_id}
                onChange={handleCetegory}
              >
                <option disabled selected value={categoryId}>
                  {categoryName}
                </option>
                {value.map((option, i) => (
                  <option
                    value={option.id}
                    className="font-sans text-base font-semibold"
                    key={i + 1}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-red-500">{errors.category_id}</p>

          </div>
          
          <div className=" ">
            <p className="text-base font-semibold font-sans">Take Away Price</p>
            <Text
              name="takeaway_price"
              value={params.takeaway_price}
              handleChange={handleChange}
              error={errors.takeaway_price}
              placeholder=""
              className="h-16"
            />
            
          </div>
          <div className="">
            <p className="text-base font-semibold font-sans">
              Availability Count
            </p>
            <Text
              name="availability_count"
              value={params.availability_count}
              handleChange={handleChange}
              error={errors.availability_count}
              placeholder=""
              className="h-16"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-2/6">
          <div className="">
            <p className="font-semibold text-base font-sans">Upload Image</p>
            <div className="flex flex-row">
              <div
                onClick={handleImg}
                className="h-18 w-28 border-2 mt-2 border-dashed border-button_border"
              >
                {image.preview.length > 0 ? (
                  <img src={image.preview} alt="menu" className="h-18 w-28" />
                ) : (
                  <img src={imgval} alt="menu_img" className="h-18 w-28" />
                )}
                <div className="">
                  <input
                    type="file"
                    id="menuimage"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" h-1/3 w-full mt-2 flex justify-center items-center">
            <Button
              text="Update Menu"
              onClick={handleSubmit}
              className="pl-8 pr-8"
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditMenuForm;