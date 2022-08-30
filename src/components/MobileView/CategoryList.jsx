import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import back from "../../Images/back.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Sink from "@mui/material/Link";
import MobileSearch from "../../Images/MobileSearch.png";
import restorant from "../../Images/restorant.svg";
import kdsimg from "../../Images/KDS/kdsimg.svg";

const CategoryList = () => {
  let { id } = useParams();
  const mealTypeId = parseInt(id);
  const [list, setList] = useState([]);
  const [menu, setMenu] = useState([]);
  const [searchkey, setsearchKey] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();
  let backgroundImage =
    "https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=";

  const getCategory = () => {
    const res = axios.get(`${BASE_URL}/categories/mealType?id=${mealTypeId}`);
    res.then((res) => {
      setList(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const getMenuList = (searchKey) => {
    const res = axios.get(
      `${BASE_URL}/menu-on-category?mealType=${mealTypeId}&category_id=&search_key=${searchKey}`
    );
    res.then((res) => {
      setMenu(res.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    let searchKey = e.target.value;
    setsearchKey(e.target.value);

    if (searchKey.length <= 0) {
      setMenu([]);
      getCategory();
    }
    if (searchKey.length > 0) {
      getMenuList(searchKey);
    }
  };

  // Removing the duplicate data

  var dataArr = list.map((item) => {
    return [item.name, item];
  });
  var maparr = new Map(dataArr);
  // console.log(maparr)
  var result = [...maparr.values()];
  // console.log(result);
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
      <div className="text-gray-500 sticky z-10 top-36 bg-white px-4 py-2 ">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Sink underline="hover" color="inherit" href="/">
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
        </Breadcrumbs>
      </div>
      <hr className="mx-4 border-2 bord" />
      <div className="py-3 px-2">
        {searchkey.length > 0 ? (
          <div>
            {menu.length > 0 ? (
              <div className="">
                {menu.map((item, i) => (
                  <div key={i + 1}>
                    <div className="flex mx-3 px-3 mt-3 flex-row border border-button_border rounded-lg bg-search justify-between">
                      <div className="">
                        <div className="font-sans font-semibold text-lg  pt-3">
                          {item.name} ({item.availability_count})
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center mt-6">
                <img src={kdsimg} alt="kdsimage" />
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-3 grid-flow-row">
            {result.map((item, i) => (
              <div key={i + 1} className="flex justify-center items-center">
                <Link
                  to={`/meal_type/${mealTypeId}/category/${item.id}`}
                  state={{ from: item?.name }}
                >
                  {/* <div className="font-sans font-semibold text-sm px-8 py-3">
                {item?.name}
              </div> */}
                  <div className="h-20 w-20 flex items-center justify-center py-4 rounded-[50%] bg-search">
                    <img src={item.image} alt="icon" className="h-10 w-10" />
                  </div>
                  <div className="text-center w-20 break-words">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryList;
