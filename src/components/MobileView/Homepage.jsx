import React from "react";
import MobileviewLogo from "../../Images/MobileviewLogo.svg";
import Breakfast from "../../Images/Breakfast.svg";
import Lunch from "../../Images/Lunch.svg";
import Dinner from "../../Images/Dinner.svg";
import "./style.scss";
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
    <div className="">
      <div className=" flex items-center bg-lightyellow rounded-b-2xl justify-center ">
        <img src={MobileviewLogo} alt="logo" className="h-28 mt-8 mb-5 w-28" />
      </div>
      <div className="flex items-start pl-6 justify-start font-bold text-3xl mt-2">
        <div>Welcome</div>
      </div>
      <div className="flex flex-col items-left justify-left pl-6 mb-3">
        <div className="font-sans font-bold text-sm mt-2 text-gray-600 ">
          Select your order type
        </div>
        <div className="font-sans font-semibold text-sm text-gray-500">
          Please select your order type and proceed to order.
        </div>
      </div>
      <div className="px-7 py-3 gap-4 flex flex-col">
        <Link to="/meal_type/1">
          <div className="relative ">
            <div className="breakfast h-24"></div>
            <div className="flex justify-center items-center">
              <img
                src={Breakfast}
                alt="breakfast"
                className="absolute inset-y-7 w-[145px]"
              />
            </div>
          </div>
        </Link>
        <Link to="/meal_type/2">
          <div className="relative ">
            <div className="lunch h-24"></div>
            <div className="flex justify-center items-center">
              <img
                src={Lunch}
                alt="lunch"
                className="absolute inset-y-7 w-28"
              />
            </div>
          </div>
        </Link>

        <Link to="/meal_type/3">
          <div className="relative ">
            <div className="dinner h-24"></div>
            <div className="flex justify-center items-center">
              <img
                src={Dinner}
                alt="dinner"
                className="absolute inset-y-7 w-[120px]"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
