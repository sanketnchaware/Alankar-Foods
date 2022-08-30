import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../../UniversalComponents/Button";
import additem from "../../../Images/additem.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Validator from "validatorjs";
import { Text } from "../../UniversalComponents/Text";


const fields = {
  name: "",
  image: "",
  gst: "",
};

const CategoryForm = () => {
  const [imgurl, setImgurl] = useState("");
  const [inputList, setInputList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(fields);
  const [errors, setErrors] = useState(fields);
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
   
    console.log(index,"res");
    axios
      .delete(`${BASE_URL}/admin/categories/${index}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => { 
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Subcategory removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        Catedata();
      })
      .catch((err) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: "Sorry, can't remove this!",
          timer: 1500,
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        });
      });
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
    let input = JSON.parse(JSON.stringify(data));
    input.image = image;
    setData(input);
    setImgurl(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(data, {
      name: "required|max:15",
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
      name: data.name,
      gst: data.gst,
      image: imgurl,
      sub_category: inputList,
    };
    axios
      .put(`${BASE_URL}/admin/categories/${id}`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
          timer: 1500,
        });
        navigate("/menu/manage-category");
      })
      .catch(()=>{
        Swal.fire({
          title: "Failure",
          text: "Category updatedation not possible",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        });

      })
     
  };

  //Getting the single category data
  const Catedata = () => {
    const res = axios.get(`${BASE_URL}/admin/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setData(res.data.data);
      setInputList(res.data.data.sub_categories);
      setImgurl(res.data.data.image);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    Catedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (e, type) => {
    let input = JSON.parse(JSON.stringify(data));
    input[type] = e.target.value;
    setData(input);
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-10/12">
        <div className=" w-72 lg:w-2/5  flex flex-col gap-2">
          <label
            className="font-sans font-semibold text-base"
            name="categorynamelabel"
          >
            Category Name
          </label>
          <Text
            type="text"
            name="name"
            error={errors.name}
            id="categorynamelabel"
            value={data.name}
            className="bg-search h-14"
            handleChange={(e) => {
              onInputChange(e, "name");
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-rows-4 lg:grid-rows-3 grid-flow-col w-10/12">
          {imageURLs.map((item, i) => (
            <div className="grid grid-flow-col w-20 h-20" key={i + 1}>
              <input
                type="radio"
                name="image"
                className="mt-4 w-3 h-3"
                key={i + 1}
                value={imageURLs[i]}
                checked={data.image === imageURLs[i]}
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
                  </div>
                )}
                <div className="">
                  {inputList.length && (
                    <button
                      className="add mt-10 py-3 px-6 text-white font-sans font-semibold text-xs ml-4"
                      onClick={() => handleRemoveClick(x.id)}
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
            text=" Update"
          >
           
          </Button>
        </div>
      </div>
      {/* <Logo /> */}
    </div>
  );
};

export default CategoryForm;
