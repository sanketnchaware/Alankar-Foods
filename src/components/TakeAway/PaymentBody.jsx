import axios from "axios";
import React, { useState, useContext ,useEffect} from "react";
import Swal from "sweetalert2";
import Button from "../UniversalComponents/Button";
import "./style.scss";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";


const PaymentBody = () => {
  const { handleStep, activeobj, handleShow } = useContext(AppContext);
  const postdata = activeobj;
  const takeAwayCart=postdata.items;
  const [discount, setdiscount] = useState("");
  const [coupstatus, setCoupstatus] = useState(true);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const [buttonStatus, setbuttonStatus] = useState(true);
  const [gst, setgst] = useState(0);

  const gstapi = async () => {
    try {
      const gst = await axios.get(`${BASE_URL}/admin/gst`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setgst(gst.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    gstapi();
  })

  var a = takeAwayCart.map((item) => {
    return item.takeaway_price * item.quantity;
  });
  var s = 0;
  a.map(function (x) {
    return (s += x);
  });

  const i = takeAwayCart.map((item) => {
    return {
      menu_id: item.id,
      quantity: item.quantity,
    };
  });

  let navigate = useNavigate();

  const handleClick = () => {
    setbuttonStatus(false);
    if (takeAwayCart.length > 0) {
      postdata.items = i;
      axios
        .post(`${BASE_URL}/admin/orders`, postdata, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order created successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/menu/take-away/manage-order");
          handleclose();
          handleStep(1);
          setbuttonStatus(true);
        })
        .catch((error) => {
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
          setdiscount("");
          setbuttonStatus(true);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please add atleast one item",
        showConfirmButton: false,
        timer: 1500,
      });
      handleStep(2);
      setbuttonStatus(true);
      // navigate("/menu/dinein/customer");
    }
  };


  const handleChange = (e) => {
    setdiscount(e.target.value);
  };

  const handleSubmit = async () => {
    if (discount.length >= 1) {
      await axios
        .get(`${BASE_URL}/admin/coupons-check?code=${discount}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          // setAfterDiscount(res.data.data);
          setAfterDiscount(res.data);
          setCoupstatus(false);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Coupon added successfully",
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
            text: `${err.response.data.errors.message}`,
            timer: 1500,
            confirmButtonText: "OK",
            confirmButtonClass: "confirm_btn",
          });
        });
    } else {
      Swal.fire({
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
        imageWidth: 200,
        imageHeight: 200,
        text: "Enter valid coupon code",
        timer: 1500,
        confirmButtonText: "OK",
        confirmButtonClass: "confirm_btn",
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
        setdiscount("");
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


  const handleCustomer = (e) => {
    handleStep(1);
  };

  const handleclose = () => {
    handleShow(false);
  };

  return (
    <div className="px-9 pb-5 pt-2">
      <p className="font-semibold text-orange text-xl font-sans">
        Manage Order
      </p>
      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/take-away">Take Away</Link>  &#8250;
        <Link to="/menu/take-away"> Manage Order</Link>  &#8250; 
        Create New Order
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex gap-8 mb-4">
        <button
          onClick={handleCustomer}
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
      <div className="h-[55vh] gap-4 flex flex-row">
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
                    value={discount}
                  />
                    <Button
                      text="Remove"
                      className="px-10 ml-10"
                      onClick={handleRemove}
                    ></Button>
                    </>
                  )}
          </div>

          <div className="w-full h-4/6 mt-4 p-4 rounded-lg">
            {/* For Tablet View */}

            <div className="lg:hidden h-[67vh] w-11/12 overflow-y-scroll  items_box px-3 rounded-lg  mb-4 flex flex-col">
              <div className=" flex flex-col  ">
                <p className="text-orange font-sans text-lg mb-2 font-semibold">
                  Items Selected:
                </p>
                <div className=" flex gap-2 justify-between mb-2 px-2">
                  <p className="w-9/12 font-sans font-semibold">Name</p>
                  <p className="w-4/12 font-sans text-left font-semibold">Quantity</p>
                  <p className="w-2/12 font-sans text-left font-semibold">Price</p>
                  <p className=" w-1/12"></p>
                  <p className=" w-1/12"></p>
                  <p className=" w-1/12"></p>
                </div>
                {takeAwayCart.map((item, i) => {
                  return (
                    <div className="flex  flex-row" key={i + 1}>
                      <p className="font-sans text-base w-6/12 pl-2">
                        {item.name}
                      </p>
                      <p className="font-sans text-base text-left w-2/12 mr-2">
                        x {item.quantity}
                      </p>
                      <p className="font-sans text-base text-left w-2/12 pl-1">
                        &#8377; {item.takeaway_price * item.quantity}
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
                  <p>GST</p>
                  <p> &#8377; {(s * (gst / 100)).toFixed(2)}</p>
                </div>
                <div className="flex mt-4 flex-row justify-between">
                  <p>Discount &#64; </p>
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

                <hr className=" mt-3 mb-3 border-2 bord" />
                <div className="flex flex-row justify-between">
                  <p className="text-base font-sans font-semibold">
                    Total Bill :
                  </p>
                  {afterDiscount.value ? (
                    <p className="text-base font-sans font-semibold">
                      {" "}
                      &#8377;{" "}
                      {(s - afterDiscount.value + s * (gst / 100)).toFixed(2)}
                    </p>
                  ) : (
                    <>
                      {afterDiscount.percentage ? (
                        <p className="text-base font-sans font-semibold">
                          &#8377;{" "}
                          {(
                            s -
                            (afterDiscount.percentage * s) / 100 +
                            s * (gst / 100)
                          ).toFixed(2)}
                        </p>
                      ) : (
                        <p className="text-base font-sans font-semibold">
                          &#8377; {(s + s * (gst / 100)).toFixed(2)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mb-8 mt-14  flex justify-center items-center">
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

        {/* For desktop view */}

        <div className="hidden lg:flex h-[67vh]  w-7/12 overflow-y-scroll  items_box px-3 rounded-lg  mb-4  flex-col">
          <div className=" flex flex-col  ">
            <p className="text-orange font-sans text-lg mb-2 font-semibold">
              Items Selected:
            </p>
            <div className=" flex gap-2 justify-between mb-2 px-2">
              <p className="w-11/12 font-sans font-semibold">Name</p>
              <p className="w-5/12 font-sans text-center font-semibold">Quantity</p>
              <p className="w-3/12 font-sans text-right font-semibold">Price</p>
              <p className=" w-1/12"></p>
              <p className=" w-1/12"></p>
              <p className=" w-1/12"></p>
            </div>
            {takeAwayCart.map((item, i) => {
              return (
                <div className="flex  flex-row" key={i + 1}>
                  <p className="font-sans text-base w-7/12 pl-2">{item.name}</p>
                  <p className="font-sans text-base text-left w-2/12 mr-2">
                    x {item.quantity}
                  </p>
                  <p className="font-sans text-base text-left w-3/12 pl-1">
                    &#8377; {item.takeaway_price * item.quantity}
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
              <p>GST</p>
              <p> &#8377; {(s * (gst / 100)).toFixed(2)}</p>
            </div>
            <div className="flex mt-4 flex-row justify-between">
              <p>Discount &#64; </p>
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

            <hr className=" mt-3 mb-3 border-2 bord" />
            <div className="flex flex-row justify-between">
              <p className="text-base font-sans font-semibold">Total Bill :</p>
              {afterDiscount.value ? (
                <p className="text-base font-sans font-semibold">
                  {" "}
                  &#8377; {(s - afterDiscount.value + s * (gst / 100)).toFixed(2)}
                </p>
              ) : (
                <>
                  {afterDiscount.percentage ? (
                    <p className="text-base font-sans font-semibold">
                      &#8377;{" "}
                      {(
                        s -
                        (afterDiscount.percentage * s) / 100 +
                        s * (gst / 100)
                      ).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-base font-sans font-semibold">
                      &#8377; {(s + s * (gst / 100)).toFixed(2)}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mb-8 mt-14  flex justify-center items-center">
            {buttonStatus ? (
              <Button
                text="Create & send invoice"
                className="pl-14 pr-14"
                onClick={handleClick}
              ></Button>
            ) : (
              <Button text="Processing Order" className="pl-14 pr-14"></Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBody;
