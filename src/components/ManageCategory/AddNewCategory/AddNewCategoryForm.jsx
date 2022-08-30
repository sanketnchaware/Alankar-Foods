import React, { useState } from "react";
import Validator from "validatorjs";
import swal from "sweetalert";
import axios from "axios";
import { orange } from "@mui/material/colors";
import food from "../../../Images/ManageCategory/fast-food.png"
import Radio from "@mui/material/Radio";
import { Button } from "../../Button";
import { Text } from "../../Text";
import "./style.scss";
import Logo from "../../FooterLogo/Logo"

const fields = {
  name: "",
  gst: "18",
  image: "",
  sub_category : [{
    name:""
  }]
};



const AddNewCategoryForm = () => {
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const [step, setStep] = useState(1);

  const imageURLs = ["https://cdn-icons-png.flaticon.com/512/62/62484.png",
  "https://www.pngkey.com/png/full/181-1811217_donut-bakery-doughnut-coffee-paper-cup-hot-coffee.png",
  "https://icon-library.com/images/food-and-drink-icon-png/food-and-drink-icon-png-6.jpg",
  "https://toppng.com/uploads/preview/file-drink-icon-115635077817qmdujji8r.png",
  "https://cdn-icons-png.flaticon.com/512/161/161592.png",
  "https://cdn-icons-png.flaticon.com/512/2776/2776827.png",
  "https://www.pngfind.com/pngs/m/5-58824_png-file-svg-food-and-drink-icon-png.png",
  "https://w7.pngwing.com/pngs/996/922/png-transparent-hamburger-eguneko-menu-computer-icons-burger-icon-barbecue-food-text-thumbnail.png",
  "https://img.favpng.com/8/23/10/hamburger-junk-food-fast-food-computer-icons-png-favpng-fmWt8XP3KeGhdYVEHj0b3STh0.jpg",
  "https://www.kindpng.com/picc/m/80-801974_drinking-icon-transparent-background-hd-png-download.png",
  "https://w7.pngwing.com/pngs/715/850/png-transparent-hamburger-fast-food-cheeseburger-chicken-sandwich-hamburger-s-white-food-face.png",
  "https://w7.pngwing.com/pngs/655/959/png-transparent-hamburger-fast-food-junk-food-junk-food.png"

];


  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");
 

  const handleServiceChange = (e, index) => {
    const { name } = e.target.value;
   
    const list = [...serviceList];
    list[index][name] = e.target.value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };


  const handleValue = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "required|max:100",
      gst: "max:100",
      image: "max:300",
      
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
      name: params.name,
      gst: params.gst,
      image:params.image,
     
    };
    axios
      .post(`${BASE_URL}/admin/categories`, obj, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        swal("Thanks for creating category!", "success").then((value) => {
          setParams(fields);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  

  if(step===0){
    params.image=imageURLs[step]
  }else if(step===1){
    params.image=imageURLs[step]
  }else if(step===2){
    params.image=imageURLs[step]
  }else if(step===3){
    params.image=imageURLs[step]
  }else if(step===4){
    params.image=imageURLs[step]
  }else if(step===5){
    params.image=imageURLs[step]
  }else if(step===6){
    params.image=imageURLs[step]
  }else if(step===7){
    params.image=imageURLs[step]
  }else if(step===8){
    params.image=imageURLs[step]
  }else if(step===9){
    params.image=imageURLs[step]
  }else if(step===10){
    params.image=imageURLs[step]
  }else if(step===11){
    params.image=imageURLs[step]
  }else if(step===12){
    params.image=imageURLs[step]
  }else if(step===13){
    params.image=imageURLs[step]
  }else if(step===14){
    params.image=imageURLs[step]
  }

  return (
    <form onSubmit={handleSubmit} className=" h-[70vh]">
      <div className=" w-9/12 gap-12 justify-between flex flex-row">
        <div className="flex w-5/6 gap-1 flex-col">
          <p className="font-semibold font-sans text-base">Category Name</p>
          <Text
            name="name"
            value={params.name}
            handleChange={handleValue}
            error={errors.name}
            placeholder=""
            className="w-full h-16 "
          />
        </div>
        <div className="flex w-5/6 gap-1 flex-col">
          <p className="font-semibold font-sans text-base">GST NO</p>
          <Text
            name="gst"
            value={params.gst}
            handleChange={handleValue}
            error={errors.gst}
            placeholder=""
            className="w-full h-16 "
          />
        </div>
      </div>
      <div className="w-full h-1/4 gap-4 grid grid-cols-9 pr-28" >
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("a")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(0)}
          />
          <img src="https://cdn-icons-png.flaticon.com/512/62/62484.png"   className="w-14 h-14" alt="food"/>
        </div>
        
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("b")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(1)}
          />
          <img src="https://www.pngkey.com/png/full/181-1811217_donut-bakery-doughnut-coffee-paper-cup-hot-coffee.png" className="bg-darkwhite h-14 w-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("c")}
            sx={{
              color:orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(2)}
          />
          <img src="https://icon-library.com/images/food-and-drink-icon-png/food-and-drink-icon-png-6.jpg" className="h-14 w-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("d")}
            sx={{
              color:orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(3)}
          />
          <img src="https://toppng.com/uploads/preview/file-drink-icon-115635077817qmdujji8r.png" className="h-14 bg-darkwhite w-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("e")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(4)}
          />
          <img src="https://cdn-icons-png.flaticon.com/512/161/161592.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("f")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(5)}
          />
          <img src="https://cdn-icons-png.flaticon.com/512/2776/2776827.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("g")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(6)}
          />
          <img src="https://www.pngfind.com/pngs/m/5-58824_png-file-svg-food-and-drink-icon-png.png" className="h-14 w-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("h")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(7)}
          />
          <img src="https://w7.pngwing.com/pngs/996/922/png-transparent-hamburger-eguneko-menu-computer-icons-burger-icon-barbecue-food-text-thumbnail.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("i")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(8)}
          />
          <img src="https://img.favpng.com/8/23/10/hamburger-junk-food-fast-food-computer-icons-png-favpng-fmWt8XP3KeGhdYVEHj0b3STh0.jpg" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("j")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(9)}
          />
          <img src="https://www.kindpng.com/picc/m/80-801974_drinking-icon-transparent-background-hd-png-download.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("k")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(10)}
          />
          <img src="https://w7.pngwing.com/pngs/715/850/png-transparent-hamburger-fast-food-cheeseburger-chicken-sandwich-hamburger-s-white-food-face.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row">
          <Radio className=""
            {...controlProps("l")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(11)}
          />
          <img src="https://w7.pngwing.com/pngs/655/959/png-transparent-hamburger-fast-food-junk-food-junk-food.png" className="w-14 h-14" alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("m")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(12)}
          />
          <img src={food} alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("n")}
            sx={{
              color: orange[100],
              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(13)}
          />
          <img src={food} alt="food"/>
        </div>
        <div className=" flex flex-row" >
          <Radio className=""
            {...controlProps("o")}
            sx={{
              color: orange[100],

              "&.Mui-checked": {
                color: orange[800],
              },
            }}
            onClick={()=>setStep(14)}
          />
          <img src={food} alt="food"/>
        </div>
      </div>
      <div className="mb-10 mt-10 w-1/3">
        <form className="App" autoComplete="off">
          <div className="form-field">
            {serviceList.map((singleService, index) => (
              <div key={index} className=" ">
                <p className="text-sm font-sans font-semibold mb-1">
                  Enter Sub - Category Name
                </p>
                <div className="flex flex-row">
                  <div className="first-division">
                    <Text
                      id="service"
                      placeholder=""
                      onChange={(e) => handleServiceChange(e, index)}
                      required
                      className="w-full h-12 "
                    />
                    {serviceList.length - 1 === index &&
                      serviceList.length < 2 && (
                        <button
                          type="button"
                          onClick={handleServiceAdd}
                          className="bg-search rounded-lg"
                        >
                          <span className="text-orange font-bold text-3xl">
                            +
                          </span>
                        </button>
                      )}
                  </div>
                  <div className="second-division">
                    {serviceList.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => handleServiceRemove(index)}
                        className="add h-12 pl-4 pr-4"
                      >
                        <span className="font-sans font-semibold text-white text-sm ">
                          Remove
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="w-full h-1/6 flex justify-center items-center">
        <Button text="Add Category" onClick={handleSubmit} className="pl-8 pr-8"></Button>
      </div>
      <Logo/>
    </form>
  );
};

export default AddNewCategoryForm;
