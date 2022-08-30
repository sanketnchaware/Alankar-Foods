import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import back from "../../Images/back.png";
import axios from "axios";
import kdsimg from "../../Images/KDS/kdsimg.png";
import MobileSearch from "../../Images/MobileSearch.png";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Sink from "@mui/material/Link";
import restorant from "../../Images/restorant.svg";

const ViewItems = () => {
  let { mealType, id } = useParams();
  const location = useLocation();
  const { from } = location.state;
  const { category } = location.state;
  let backgroundImage =
    "https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=";

  const mealTypeId = parseInt(mealType);
  let navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [inputs, setInputs] = useState({
    searchKey: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getItems = (inputs) => {
    const res = axios.get(
      `${BASE_URL}/menu-view-mealType?id=${mealTypeId}&sub_category=${id}&search_key=${inputs.searchKey}`
    );
    res.then((res) => {
      setItem(res.data);
      console.log(res.data)
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  console.log(item)
  useEffect(() => {
    getItems(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.searchKey]);

  const handleChange = (e) => {
    setInputs({ ...inputs, searchKey: e.target.value });
  };
  return (
    <div>
      <div className="bg-lightyellow w-full h-36  rounded-b-2xl sticky top-0">
        <div className=" flex flex-row">
          <div className="w-12">
            <img
              className="mt-3 ml-2"
              src={back}
              alt="go_back"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className="w-full mr-6 flex items-center justify-center">
            <img src={restorant} alt="name" className="h-10 mt-3 w-36" />
          </div>
        </div>
        <div className="mt-6 flex justify-between bg-amber-300 mx-8 rounded-lg h-10">
          <input
            className="bg-amber-300"
            placeholder="Search"
            onChange={handleChange}
          />
          <img src={MobileSearch} alt="Search" className="mx-1 my-1 h-8 w-8" />
        </div>
      </div>
      <div className="text-gray-500 px-4 bg-white sticky top-36 py-2">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Sink
            underline="hover"
            color="inherit"
            onClick={() => {
              navigate(-2);
            }}
          >
            {mealTypeId === 1 ? (
              <div className="font-sans font-semibold text-sm py-3">
                Breakfast
              </div>
            ) : (
              <div>
                {mealTypeId === 2 ? (
                  <div className="font-sans font-semibold text-sm py-3">
                    Lunch
                  </div>
                ) : (
                  <div className="font-sans font-semibold text-sm py-3">
                    Dinner
                  </div>
                )}
              </div>
            )}
          </Sink>
          <Sink
            underline="hover"
            color="inherit"
            onClick={() => {
              navigate(-1);
            }}
          >
            <div className="font-sans font-semibold text-sm py-3">
              {category}
            </div>
          </Sink>
          <Sink underline="hover" color="inherit">
            <div className="font-sans font-semibold text-sm py-3">{from}</div>
          </Sink>
        </Breadcrumbs>
      </div>

      <div>
        {item.length > 0 ? (
          <div className="">
            {item.map((item, i) => (
              <div key={i + 1}>
                {item.availability_count>0?
                <div>
                  <div className="flex mx-3 px-3 mt-3 flex-row border border-button_border rounded-lg bg-search justify-between">
                  <div className="">
                    <div className="font-sans font-semibold text-lg  pt-3">
                      {item.name} 
                    </div>
                    <div className="text-sm font-semibold font-sans">
                      Price:
                    </div>
                    <div className="font-sans text-xs ">
                      Dinein: ₹{" "}
                      <span className="font-sans font-semibold">
                        {item.dinein_price}
                      </span>
                    </div>
                    <div className="font-sans text-xs ">
                      Take-away: ₹{" "}
                      <span className="font-sans font-semibold">
                        {item.takeaway_price}
                      </span>
                    </div>
                  </div>
                  <div className="w-16 my-6 h-16">
                    <img
                      src={item.image || backgroundImage}
                      alt="food_icon"
                      className="h-16 rounded-md w-16"
                    />
                  </div>
                </div>
                </div>:
                <div></div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-6">
            <img src={kdsimg} alt="kdsimage" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewItems;
