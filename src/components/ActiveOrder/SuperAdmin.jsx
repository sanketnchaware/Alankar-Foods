import { FoodItems } from "../UniversalComponents/FoodItems";
import "./superadmin.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UniversalComponents/Button";
import { AppContext } from "../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { DetailOrder } from "./DetailOrder";
import React from "react";
import Search from "../UniversalComponents/Search";

//images
import itemsold from "../../Images/svgs/itemsold.svg";
import edit_active from "../../Images/ActiveOrder/edit_active.svg";
import Refresh from "../UniversalComponents/Refresh";
import TablePagination from "../UniversalComponents/TablePagination";

export const SuperAdmin = () => {
  const [count, setcount] = useState(0);
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newOrder, setNewOrder] = useState(0);

  const {
    handleStep,
    handleShow,
    handleDetailOrder,
    handleActiveData,
    activeData,
    numberofpages,
    handleNumberOfPages,
  } = useContext(AppContext);

  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    date: "",
  });

  const navigate = useNavigate();



  const token = localStorage.getItem("alankartoken");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [serve, setServe] = useState(0);

  const refreshOrder = () => {
    getAllOrderscount(input);
  };

  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
  };

  const handleClick = (el) => {
    handleShow(true);

    axios
      .get(`${BASE_URL}/admin/list-tab?id=${el.id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        handleDetailOrder(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const key = e.target.value;
    if (key !== " ") {
      setInput({ ...input, search_key: key, page: 1 });
      setLoading(true);
    }
  };

  useEffect(() => {
    getAllOrderscount(input);
    getCookingCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page, input.search_key, input.date]);

  const getCookingCount = async () => {
    const data = await axios.get(`${BASE_URL}/items/status/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.data, "res");
    setNewOrder(data?.data?.CountNew[0]?.total);
    setcount(data.data?.data[0]?.CountCooking);
    setServe(data.data?.data[0]?.CountReadytoServe);
    setData(data.data?.data[0]?.CountServed);
  };

  const getAllOrderscount = async (input) => {
    handleActiveData([]);
    setLoading(true);
    const token = localStorage.getItem("alankartoken");
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/active-orders?order_type=1&key=${input.search_key}&from=&page=${input.page}&to=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    // setActiveOrder(data.data.data.data);
    handleActiveData(data.data.data.data);
    handleNumberOfPages(data.data.data.meta.last_page);
    setLoading(false);
  };

  const managePayment = (id, table_id) => {
    axios
      .patch(`${BASE_URL}/admin/orders/payment/status/${id}`, obj, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        updateItemStatus(id);
        updateTable(table_id);

        setInput({ ...input, search_key: "", page: 1 });
        getAllOrderscount(input);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItemStatus = async (id) => {
    axios.patch(`${BASE_URL}/item/status/update/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  };
  

  const updateTable = (table_id) => {
    axios.patch(
      `${BASE_URL}/admin/tables/status/${table_id}`,
      {
        status: 1,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };
  const obj = {
    payment_status: "PAID",
  };

  const handleID = (id) => {
    navigate(`add-items/${id}`);
    handleStep(1);
  };

  return (
    <div className="">
      <div className="px-9 bg-darkwhite">
        <div className="grid grid-flow-row gap-1 pt-2 ">
          <span className="font-semibold text-orange text-xl font-sans">
            Active Order
          </span>
          <span className=" font-semibold text-lg font-sans">
            This is your order list
          </span>
          <hr className=" mt-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
        </div>
        <div className="flex justify-between mt-6">
          <div className=" grid grid-flow-col w-8/12 gap-2 md:gap-2 lg:gap-6 lg:w-6/12 2xl:6/12">
            <FoodItems
              data={{
                picture: itemsold,
                count: newOrder || 0,
                type: "Active Orders",
              }}
            />
            <FoodItems
              data={{
                picture: itemsold,
                count: count || 0,
                type: "Cooking",
              }}
            />{" "}
            <FoodItems
              data={{
                picture: itemsold,
                count: serve || 0,
                type: "Ready to Serve",
              }}
            />{" "}
            <FoodItems
              data={{
                picture: itemsold,
                count: data || 0,
                type: "Served",
              }}
            />
          </div>
          <div className="w-1/12"></div>
          {/* For desktop view */}
          <div className="hidden lg:block ">
           <div className="flex flex-row gap-5">
           <Search
              data={{ handleChange: handleChange, value: input.search_key }}
            />
            <Link to="/menu/dinein/create-new-order">
              {" "}
              <Button
                text="Create Order"
                className="text-sm mx-4 px-1.5   lg:mx-0 lg:h-14  lg:px-3"
              ></Button>
            </Link>
           </div>
          </div>
          <div className="lg:hidden">
            <Link to="/menu/dinein/create-new-order">
              {" "}
              <Button
                text="Create Order"
                className="text-sm mx-4 px-1.5   lg:mx-0 lg:h-14  lg:px-3"
              ></Button>
            </Link>
          </div>
          
        </div>

        {/* For tablet view */}

        <div className=" lg:hidden mt-4 w-8/12 ">
          {/* Search */}
          <Search
            data={{ handleChange: handleChange, value: input.search_key }}
          />
        </div>

        {/* Refresh */}
        <Refresh data={{ onClick: refreshOrder }} />

        {/* <AllOrders/> */}
        <div
          className={` overflow-y-scroll lg:h-full px-4 pb-4 pt-2 mb-6 lg:mb-6 rounded-xl bg-white shadow-md outle`}
        >
          <h1 className="text-lg lg:text-xl font-bold text-darkyellow">
            All Orders
          </h1>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              {activeData.length > 0 ? (
                <div className=" text-center">
                  <table className=" table-auto w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 text-base lg:text-lg   border-button_border ">
                        <td className=" mb-2  px-2 font-semibold">Table No.</td>
                        <td className=" mb-2 px-2 font-semibold">Order ID</td>
                        <td className=" mb-2  px-2 text-sm lg:text-lg font-semibold">
                          Customer Name
                        </td>
                        <td className="hidden lg:block mb-2  px-2 font-semibold">
                          Item Status
                        </td>
                        <td className=" mb-2  px-2 font-semibold">
                          Payment Status
                        </td>
                        <td className=" mb-2  px-2 font-semibold">Action</td>
                        <td className=" mb-2  px-2 font-semibold">
                          Payment Action
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {activeData.map((e, index) => (
                        <tr
                          key={index}
                          className="tableBorder font-sans text-base "
                        >
                          <td>
                            <span
                              onClick={() => {
                                handleClick(e);
                              }}
                              className=" font-semibold text-orange cursor-pointer"
                            >
                              <u>{e?.table?.name}</u>
                            </span>
                          </td>
                          <td>
                            <span className="my-3 lg:my-7">#{e?.id}</span>
                          </td>
                          <td>
                            <span className=" my-3 lg:my-7 ">{e?.name}</span>
                          </td>

                          <td className="hidden py-6 lg:block">
                            <span className="">
                              cooking x {e?.status[2] || 0} , Ready to serve x{" "}
                              {e?.status[3] || 0} , served x {e?.status[4] || 0}
                            </span>
                          </td>

                          <td className="">
                            <span className="   flex items-center justify-center">
                              {e?.payment_status === "INPROGRESS" ? (
                                <div className="flex flex-row">
                                  <div className="out h-4 w-4 rounded-lg mr-1.5 mt-1.5">
                                    <div className="in h-2 w-2 rounded-lg ml-1 mt-1"></div>
                                  </div>
                                  <div>In Progress</div>
                                </div>
                              ) : (
                                <div className="flex flex-row">
                                  <div className="circle h-4 w-4 rounded-lg mr-1.5 mt-1.5">
                                    <div className="circle-in h-2 w-2 rounded-lg ml-1 mt-1"></div>
                                  </div>
                                  <div>Pending</div>
                                </div>
                              )}
                            </span>
                          </td>
                          <td className="py-3 lg:py-4 ">
                            <div className="flex items-center justify-center">
                              {e?.payment_status === "INPROGRESS" ? (
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    handleID(e.id);
                                  }}
                                >
                                  <path
                                    d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                                    stroke="#F0912C"
                                    stroke-width="2"
                                  />
                                  <path
                                    d="M8.68332 22.1476C8.56771 22.1474 8.4534 22.1231 8.34766 22.0764C8.24193 22.0296 8.14708 21.9613 8.06916 21.8759C7.98982 21.7912 7.92929 21.6907 7.89152 21.581C7.85374 21.4713 7.83959 21.3548 7.84999 21.2393L8.05416 18.9942L17.4858 9.56592L20.4333 12.5126L11.0042 21.9401L8.75916 22.1442C8.73395 22.1466 8.70864 22.1477 8.68332 22.1476ZM21.0217 11.9234L18.075 8.97675L19.8425 7.20925C19.9199 7.13177 20.0118 7.0703 20.113 7.02837C20.2141 6.98643 20.3226 6.96484 20.4321 6.96484C20.5416 6.96484 20.65 6.98643 20.7512 7.02837C20.8524 7.0703 20.9443 7.13177 21.0217 7.20925L22.7892 8.97675C22.8666 9.05414 22.9281 9.14605 22.97 9.24722C23.012 9.34838 23.0336 9.45682 23.0336 9.56633C23.0336 9.67585 23.012 9.78428 22.97 9.88545C22.9281 9.98661 22.8666 10.0785 22.7892 10.1559L21.0225 11.9226L21.0217 11.9234Z"
                                    fill="#F0912C"
                                  />
                                </svg>
                              ) : (
                                <div>
                                  <img
                                    className="h-10 w-10"
                                    src={edit_active}
                                    alt="edit icon"
                                  />
                                </div>
                              )}
                            </div>
                          </td>

                          <td>
                            <span className=" ">
                              {e?.payment_status === "PENDING" ? (
                                <button
                                  className="Btn text-white"
                                  onClick={() => {
                                    managePayment(e.id, e?.table_id);
                                  }}
                                >
                                  Payment Received
                                </button>
                              ) : (
                                <button
                                  className="grayBackground text-white"
                                  disabled={true}
                                >
                                  Payment Received
                                </button>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center text-2xl justify-center">
                  No data found!
                </div>
              )}
            </div>
          )}
        </div>
        {loading ? (
          <div>{null}</div>
        ) : (
          <div>
            {activeData.length <= 0 ? (
              <div>{null}</div>
            ) : (
              <div className="flex mt-4 mb-28 lg:mb-4 justify-center">
                <TablePagination data={{npages:numberofpages,page:input.page,handleChange:handlePagination}}/>
              </div>
            )}
          </div>
        )}
      </div>
      <DetailOrder />
    </div>
  );
};
