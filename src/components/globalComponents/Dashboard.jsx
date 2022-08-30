import React from "react";
import { CurveLineChart } from "../Dashboard/CurveLineChart";
import { FoodItems } from "../Dashboard/FoodItems";

import customers from "../../Images/Dashboard/customers.svg";
import feedbacks from "../../Images/Dashboard/feedbacks.svg";
import itemsold from "../../Images/svgs/itemsold.svg";

function Dashboard(props) {
  return (
    <div>
      <div className="">
        <div className="bg-darkwhite">
          <div className="grid grid-flow-row gap-1 pl-9">
            <p className="font-semibold mt-2 text-orange text-xl font-sans">
              Dashboard
            </p>
            <p className=" font-semibold text-lg font-sans">
              Your Statistic Report
            </p>
            <hr className=" mt-2 mr-10 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
          </div>
          <div className="ml-10 mt-1 text-orange font-sans font-semibold">
            Today's Statistic Report
          </div>
          <div className=" flex gap-6 mt-2 lg:gap-11  pl-9 w-3/5 lg:w-6/12 2xl:w-1/2">
            <FoodItems
              data={{
                picture: itemsold,
                count: props.data.food || 0,
                type: "items sold",
              }}
            />
            <FoodItems
              data={{
                picture: customers,
                count: props.data.customer || 0,
                type: "Orders",
              }}
            />
            <FoodItems
              data={{
                picture: feedbacks,
                count: props.data.feedback || 0,
                type: "feedback",
              }}
            />
          </div>
          <div className="grid grid-flow-row gap-1 pl-9 mt-4">
            <div className="mt-9 box bg-white p-6 w-[650px]  lg:w-[1050px] px-9">
              <div className="flex flex-row justify-between">
                <p className=" text-2xl font-semibold mr-8 lg:mr-0 text-darkyellow">
                  Date
                </p>
                <div className="flex flex-row gap-4">
                  {/* <select
                  className="h-12 lg:h-14 w-40 lg:w-48 border-2 rounded-lg border-button_border text-orange"
                  onChange={handleDate}
                  value={time}
                >
                  <option value="disabled" selected disabled>
                    Select option
                  </option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                </select> */}

                  <div className=" relative border-2 border-button_border text-orange rounded-lg">
                    {/* <label
                        htmlFor="datepicker"
                        className="text-text text-sm absolute top-[14px] left-2"
                      >
                        Date Range
                      </label> */}
                  </div>
                  {/* <p
                  onClick={handleReset}
                  className="text-orange flex items-center justify-center cursor-pointer"
                >
                  <u className="cursor-pointer">Reset</u>
                </p> */}
                </div>
              </div>
              <CurveLineChart report={props.data.report} />
            </div>
            {/* <div className="flex mt-6 mb-14  flex-row justify-around mr-[20%]">
            <div className="flex pt-1 flex-col h-14 w-36 lg:w-1/6 box">
              <p className="text-center font-semibold font-sans text-base">
                Rs.{today || 0}
              </p>
              <p className="text-xs text-center font-semibold text-orange font-sans">
                Today's Sale
              </p>
            </div>
            <div className="flex pt-1 flex-col h-14 w-36 lg:w-1/6 box">
              <p className="text-center font-semibold font-sans text-base">
                Rs.{week || 0}
              </p>
              <p className="text-xs text-center font-semibold text-orange font-sans">
                This Week's Sale
              </p>
            </div>
            <div className="flex pt-1 flex-col h-14 w-36 lg:w-1/6 box">
              <p className="text-center font-sans font-semibold text-base">
                Rs.{month || 0}
              </p>
              <p className="text-xs text-center font-semibold text-orange font-sans">
                This Month's Sale
              </p>
            </div>
          </div> */}
          </div>
        </div>
        {/* <Logo /> */}
      </div>
    </div>
  );
}

export default Dashboard;
