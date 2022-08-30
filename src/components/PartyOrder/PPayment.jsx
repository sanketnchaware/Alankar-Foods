import axios from "axios";
import React, { useState, useContext,useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../UniversalComponents/Button";
import { Link } from "react-router-dom";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import gstcall from "../../helpers/gst";

const PPayment = () => {
  const { handleStep, activeobj, handleShow } = useContext(AppContext);
  const postdata = activeobj;
  const total = parseFloat(postdata.party_amount);
  const navigate = useNavigate();
  const [coupstatus, setCoupstatus] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const [coupon, setCoupon] = useState("");
  const [afterDiscount, setAfterDiscount] = useState(0);
  const PartyCart =postdata.items;
  const [buttonStatus, setButtonStatus] = useState(true);
  const [gst, setgst] = useState(0);

  const gstapi = async () => {
    const data = await gstcall();
    setgst(data);
  };

  useEffect(()=>{
    gstapi();
  },[])

  var a = PartyCart.map((item) => {
    return item.dinein_price * item.quantity;
  });
  var s = 0;
  a.map(function (x) {
    return (s += x);
  });
  const i = PartyCart.map((item) => {
    return {
      menu_id: item.id,
      quantity: item.quantity,
    };
  });

  const handleClick = () => {
    setButtonStatus(false)
    postdata.items = i;
    axios
      .post(`${BASE_URL}/admin/orders`, postdata, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Order Placed",
          text: "Order created successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonClass: "confirm_btn",
          confirmButtonText: "OK",
          timer: 1500,
        });
        navigate("/menu/party-order/active-order");
        setButtonStatus(true)
        handleClose();
      })
      .catch((error) => {
        setButtonStatus(true)
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: `${error.response.data.errors.message}`,
          timer: 1000,
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        });
        setButtonStatus(true)
      });
  };

 

  const handleChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleSubmit = async () => {
    if (coupon && coupon.length) {
      await axios
        .get(`${BASE_URL}/admin/coupons-check?code=${coupon}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setAfterDiscount(res.data);
          setCoupstatus(false);
          Swal.fire({
            title: "Coupon added",
            text: "Coupon added successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonClass: "confirm_btn",
            confirmButtonText: "OK",
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Sorry",
            text: "Coupon expired",
            icon: "info",
            showCancelButton: false,
            confirmButtonClass: "confirm_btn",
            confirmButtonText: "OK",
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Coupon code invalid",
        timer: 2000,
      });
    }
  };


  const handleRemove = () => {
    axios
      .get(`${BASE_URL}/admin/remove/coupon`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // setAfterDiscount(res.data.data);
        setCoupon("");
        setCoupstatus(true);
        setAfterDiscount(0);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Coupon removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
          imageWidth: 200,
          imageHeight: 200,
          text: "Something went wrong",
          timer: 1500,
          confirmButtonText: "OK",
          confirmButtonClass: "confirm_btn",
        });
      });
  };
  const handleClose = () => {
    handleShow(false);
  };

  return (
    <div className="">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Create New Order
      </p>
      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/party-order"> Party Order</Link> &#8250; Active Order
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex gap-8 mb-4">
        <button
          onClick={() => {
            handleStep(1);
          }}
          className="button text-white font-sans font-semibold  h-14 w-44"
        >
          Customer Details
        </button>
        <button
          onClick={() => {
            handleStep(2);
          }}
          className="button text-white font-sans font-semibold  h-14 w-44"
        >
          Add Items
        </button>
        <Button text="Manage Payment" className="w-44" />
      </div>
      <div className=" pr-8">
        <div className="gap-4 flex flex-row">
          <div className=" w-2/3  mr-6 flex flex-col">
            <div className="flex h-14  flex-row">


            {coupstatus ? (
                    <>
                    <input
                    type="text"
                    className="w-96 mt-0.5 border-2 border-button_border text-orange"
                    onChange={handleChange}
                    placeholder="Enter promocode"
                  />
                    <Button
                      text="Apply"
                      className="px-14 ml-10"
                      onClick={handleSubmit}
                    ></Button>
                    </>
                  ) : (
                    <>
                    <input
                    type="text"
                    className="w-96 mt-0.5 border-2 border-slate-300 text-gray-600"
                    // onChange={handleDiscount}
                    placeholder="Enter promocode"
                    value={coupon}
                  />
                    <Button
                      text="Remove"
                      className="px-10 ml-10"
                      onClick={handleRemove}
                    ></Button>
                    </>
                  )}
              {/* <input
                type="text"
                className="w-96 mt-0.5 border"
                onChange={handleChange}
                placeholder="Enter promocode"
                value={coupon}
              />
               {coupstatus ? (
                    <Button
                      text="Apply"
                      className="px-14 ml-10"
                      onClick={handleSubmit}
                    ></Button>
                  ) : (
                    <Button
                      text="Remove"
                      className="px-10 ml-10"
                      onClick={handleRemove}
                    ></Button>
                  )} */}
            </div>

            <div className="w-full h-4/6 mt-4 py-4 pr-4 lg:pl-4 rounded-lg">
              <div className="w-full lg:hidden flex  items_box h-[500px] overflow-y-scroll rounded-lg  mb-4  flex-col">
                <div className="h-full w-full   p-3 flex flex-col  ">
                  <p className="text-orange font-sans text-lg mb-2 font-semibold">
                    Items Selected:
                  </p>
                  <div className=" flex gap-2 justify-between mb-2 px-2">
                    <p className="w-9/12 font-sans font-semibold">Name</p>
                    <p className="w-3/12 font-sans font-semibold">Quantity</p>
                    <p className="w-3/12 ml-8 font-sans text-right font-semibold">Price</p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                  </div>
                  {PartyCart.map((item, i) => {
                    return (
                      <div
                        className="w-full h-7  flex  flex-row justify-between"
                        key={i + 1}
                      >
                        <p className="font-sans text-base w-5/12 pl-2">
                          {item.name}
                        </p>
                        <p className="font-sans text-base w-2/12 mr-2">
                          x {item.quantity}
                        </p>
                        <p className="font-sans text-base text-left w-3/12">
                          &#8377; {item.dinein_price * item.quantity}
                        </p>
                        {/* <RemoveIcon
                          className="cursor-pointer w-1/12 bg-darkyellow text-white"
                          fontSize="small"
                          onClick={() => decreaseQuantity(item)}
                        /> */}
                        {/* <p className="w-1/12 text-center">{item.quantity}</p> */}
                        {/* <AddIcon
                          className="cursor-pointer w-1/12 bg-darkyellow text-white"
                          fontSize="small"
                          onClick={() => increaseQuantity(item)}
                        /> */}
                      </div>
                    );
                  })}
                  <hr className=" mt-6 mb-4 border-2 bord" />
                  <div className="flex flex-row mt-2 justify-between">
                    <p className="font-semibold font-sans text-base">
                      Subtotal
                    </p>
                    <p> &#8377; {s}</p>
                  </div>
                  <div className="flex mt-4 flex-row justify-between">
                    <p>GST &#64; {gst} &#37;</p>
                    <p> &#8377; {(s * (gst / 100)).toFixed(2)}</p>
                  </div>
                  <div className="flex mt-4 flex-row justify-between">
                    <p>Discount &#64; </p>
                    {/* <p> &#8377; -{s * afterDiscount/100}</p> */}
                    {afterDiscount.value ? (
                      <p> &#8377; {afterDiscount.value}</p>
                    ) : (
                      <>
                        {afterDiscount.percentage ? (
                          <p> &#8377; {(afterDiscount.percentage * s) / 100}</p>
                        ) : (
                          <p> &#8377; 0</p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex mt-4 flex-row justify-between">
                    <p>Party Amount &#64; </p>
                    <p> &#8377; {total}</p>
                  </div>
                  <hr className=" mt-3 mb-3 border-2 bord" />
                  <div className="flex flex-row justify-between">
                    <p className="text-base font-sans font-semibold">
                      Total Bill :
                    </p>
                    {/* <p>&#8377;{total +  (s + s * (gst / 100)-(s * afterDiscount/100))}</p> */}
                    {afterDiscount.value ? (
                      <p className="text-base font-sans font-semibold">
                        {" "}
                        &#8377;{" "}
                        {(
                          total +
                          (s - afterDiscount.value + s * (gst / 100))
                        ).toFixed(2)}
                      </p>
                    ) : (
                      <>
                        {afterDiscount.percentage ? (
                          <p className="text-base font-sans font-semibold">
                            &#8377;{" "}
                            {(
                              total +
                              (s -
                                (afterDiscount.percentage * s) / 100 +
                                s * (gst / 100))
                            ).toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-base font-sans font-semibold">
                            &#8377; {(total + (s + s * (gst / 100))).toFixed(2)}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-8  flex justify-center items-center">
                {buttonStatus ? (
                <Button
                  text="Create & send invoice"
                  className="pl-14 pr-14"
                  onClick={handleClick}
                ></Button>
              ) : (
                <Button
                  text="Processing Order"
                  className="pl-14 pr-14"
                ></Button>
              )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 hidden lg:flex  items_box h-[500px] overflow-y-scroll rounded-lg  mb-4  flex-col">
            <div className="h-full w-full   p-3 flex flex-col  ">
              <p className="text-orange font-sans text-lg mb-2 font-semibold">
                Items Selected:
              </p>
              <div className=" flex gap-2 justify-between mb-2 px-2">
                <p className="w-11/12 font-sans font-semibold">Name</p>
                <p className="w-2/12 font-sans font-semibold">Quantity</p>
                <p className="w-2/12 font-sans pl-3  text-right font-semibold">Price</p>
                <p className=" w-1/12"></p>
                <p className=" w-1/12"></p>
                <p className=" w-1/12"></p>
              </div>
              {PartyCart.map((item, i) => {
                return (
                  <div
                    className="w-full h-7  flex  flex-row justify-between"
                    key={i + 1}
                  >
                    <p className="font-sans text-base w-7/12 pl-2">
                      {item.name}
                    </p>
                    <p className="font-sans text-base w-2/12 mr-2">
                      x {item.quantity}
                    </p>
                    <p className="font-sans text-base w-3/12">
                      &#8377; {item.dinein_price * item.quantity}
                    </p>
                    {/* <RemoveIcon
                      className="cursor-pointer w-1/12 bg-darkyellow text-white"
                      fontSize="small"
                      onClick={() => decreaseQuantity(item)}
                    /> */}
                    {/* <p className="w-1/12 text-center">{item.quantity}</p> */}
                    {/* <AddIcon
                      className="cursor-pointer w-1/12 bg-darkyellow text-white"
                      fontSize="small"
                      onClick={() => increaseQuantity(item)}
                    /> */}
                  </div>
                );
              })}
              <hr className=" mt-6 mb-4 border-2 bord" />
              <div className="flex flex-row mt-2 justify-between">
                <p className="font-semibold font-sans text-base">Subtotal</p>
                <p> &#8377; {s}</p>
              </div>
              <div className="flex mt-4 flex-row justify-between">
                <p>GST &#64; {gst} &#37;</p>
                <p> &#8377; {(s * (gst / 100)).toFixed(2)}</p>
              </div>
              <div className="flex mt-4 flex-row justify-between">
                <p>Discount &#64; </p>
                {/* <p> &#8377; -{s * afterDiscount/100}</p> */}
                {afterDiscount.value ? (
                  <p> &#8377; {afterDiscount.value}</p>
                ) : (
                  <>
                    {afterDiscount.percentage ? (
                      <p> &#8377; {(afterDiscount.percentage * s) / 100}</p>
                    ) : (
                      <p> &#8377; 0</p>
                    )}
                  </>
                )}
              </div>

              <div className="flex mt-4 flex-row justify-between">
                <p>Party Amount &#64; </p>
                <p> &#8377; {total}</p>
              </div>
              <hr className=" mt-3 mb-3 border-2 bord" />
              <div className="flex flex-row justify-between">
                <p className="text-base font-sans font-semibold">
                  Total Bill :
                </p>
                {/* <p>&#8377;{total +  (s + s * (5 / 100)-(s * afterDiscount/100))}</p> */}
                {afterDiscount.value ? (
                  <p className="text-base font-sans font-semibold">
                    {" "}
                    &#8377;{" "}
                    {(
                      total +
                      (s - afterDiscount.value + s * (gst / 100))
                    ).toFixed(2)}
                  </p>
                ) : (
                  <>
                    {afterDiscount.percentage ? (
                      <p className="text-base font-sans font-semibold">
                        &#8377;{" "}
                        {(
                          total +
                          (s -
                            (afterDiscount.percentage * s) / 100 +
                            s * (gst / 100))
                        ).toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-base font-sans font-semibold">
                        &#8377; {(total + (s + s * (gst / 100))).toFixed(2)}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="mb-8  flex justify-center items-center">
              {buttonStatus ? (
                <Button
                  text="Create & send invoice"
                  className="pl-14 pr-14"
                  onClick={handleClick}
                ></Button>
              ) : (
                <Button
                  text="Processing Order"
                  className="pl-14 pr-14"
                ></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPayment;
