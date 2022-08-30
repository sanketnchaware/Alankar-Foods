import "./createneworder.scss";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "../UniversalComponents/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CloseIcon from "@mui/icons-material/Close";
import { addMenu, removeMain } from "../../helpers/menusFilter";
import { removeMenu } from "../../helpers/menusFilter";
import Search from "../UniversalComponents/Search";
import ASelectOption from "../UniversalComponents/ASelectOption";

export const ActiveOrderAddItems = (props) => {
  const [discount, setdiscount] = useState("");
  const [categories, setCategories] = useState([]);
  const [copymenus, setcopymenus] = useState([]);
  const [gst, setgst] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [coupstatus, setCoupstatus] = useState(true);
  const navigate = useNavigate();
  const [instructions, setInstructions] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
  const handleInstructions = (e) => {
    console.log(e.target.value);
    setInstructions(e.target.value);
  };
  const value = true;

  const [inputs, setInputs] = useState({
    search_key: "",
    category: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const { show, handleShow, handleStep, activeobj } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const i = cart.map((item) => {
    return {
      menu_id: item.id,
      quantity: item.quantity,
    };
  });

  var a = cart.map((item) => {
    return item.dinein_price * item.quantity;
  });
  var s = 0;
  a.map(function (x) {
    return (s += x);
  });

  //get All Categories
  const getCategory = () => {
    axios
      .get(`${BASE_URL}/admin/category/drop-down`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        // console.log("Error in getting categories Data", error);
      });
  };

  const handleOpen = () => {
    handleShow(true);
  };

  const handleClose = () => {
    handleShow(false);
  };

  const CategoryData = (inputs) => {
    setMenuList([]);
    axios
      .get(
        `${BASE_URL}/admin/search/menu?search_key=${inputs.search_key}&category=${inputs.category}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMenuList(res.data);
        setcopymenus(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => {});
  };

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

  useEffect(() => {
    CategoryData(inputs);
    getCategory();
    gstapi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.search_key, inputs.category]);
  const userId = localStorage.getItem("adminID");
  const handleClick = async () => {
    setButtonStatus(false);
    const data = activeobj;
    console.log(data, "user_id");
    if (cart.length > 0) {
      const postdata = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        total_persons: data.total_persons,
        table_id: data.table_id,
        user_id: userId || null,
        items: i,
        instructions: instructions,
        order_type:1,
      };

      await axios
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
          updateTable(data.table_id);
          navigate("/menu/dinein/active-order");
          handleStep(1);
          setButtonStatus(true);
          handleShow();
        })
        .catch((error) => {
          Swal.fire({
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
            imageWidth: 200,
            imageHeight: 200,
            text: `${error.response.data.errors.message}`,
            timer: 1500,
            confirmButtonText: "OK",
            confirmButtonClass: "confirm_btn",
          });
          setdiscount("");
          handleShow();
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please add atleast one item",
        showConfirmButton: false,
        timer: 1500,
      });
      // navigate("/menu/dinein/customer");
      setButtonStatus(true);
    }
  };

  const updateTable = async (id) => {
    await axios.patch(
      `${BASE_URL}/admin/tables/status/${id}`,
      {
        status: 2,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };
  const handleSelect = async (e) => {
    if (e.target.value === "all") {
      setInputs({
        ...inputs,
        category: "",
        search_key: "",
      });
    } else {
      setInputs({
        ...inputs,
        category: e.target.value,
        search_key: "",
      });
    }
  };

  const handleChange = async (e) => {
    setInputs({
      ...inputs,
      search_key: e.target.value,
      category: "",
    });
  };

  const AddItem = (id) => {
    let menu;
    if (menuList.length > 0) {
      menu = menuList.filter((item) => {
        if (item.id === id && item.availability_count > 0) {
          return item.id === id && item;
        } else {
          return false;
        }
      });
    }

    if (menu.length > 0) {
      const existInCart = cart.find((x) => x.id === id);
      if (existInCart && existInCart.quantity < menu[0].availability_count) {
        existInCart.quantity += 1;
        setCart([...cart]);
      } else {
        setCart([...cart, { ...menu[0], quantity: 1 }]);
      }
      if (existInCart && existInCart.quantity === menu[0].availability_count) {
        let removeData = removeMain(menuList, existInCart);
        setMenuList(removeData);
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item out of stock",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Item out of stock",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const increaseQuantity = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist && exist.quantity < product.availability_count) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
      let removeData = removeMenu(menuList, exist);
      setMenuList(removeData);
    }

    if (exist && exist.quantity === product.availability_count) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Item out of stock",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const decreaseQuantity = (product) => {
    const i = cart.indexOf(product);
    const exist = cart.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      cart.splice(i, 1);
    }
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
      if (exist && exist.quantity - 1 < product.availability_count) {
        let addData = addMenu(copymenus, menuList, exist);
        setMenuList(addData);
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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

  const handleDiscount = (e) => {
    setdiscount(e.target.value);
  };

  return (
    <div className="mt-1">
      <div>
        <div className=" flex flex-col bg-darkwhite pl-9 pt-2">
          <p className="font-semibold text-orange text-xl font-sans">
            Create New Order
          </p>
          <p className=" font-semibold text-lg font-sans">
            <Link to="/menu/dinein/active-order">Dine - In </Link> &#8250;
            Active Order
          </p>
          <hr className=" mt-3 border-2 mr-10 border-b-button_border border-t-white border-l-white border-r-white" />
          <div className="flex gap-11 mt-3 mb-3">
            <button
              onClick={() => {
                handleStep(1);
              }}
              className={`w-[180px] lg:w-[210px] h-14 lg:h-16 font-semibold text-lg lg:text-xl text-white button`}
            >
              Customer Details
            </button>
            <button
              className={`w-[180px] lg:w-[210px] h-14 lg:h-16 font-semibold text-lg lg:text-xl text-white add`}
            >
              Add Items
            </button>
          </div>
        </div>
        <div className="w-full pl-9 flex flex-row gap-5 lg:gap-8">
          <div className="w-9/12 lg:w-6/12 rounded-lg mb-5">
            <div className="flex gap-3">
              <div className="mt-7 mb-2">
                <Search
                  data={{
                    handleChange: handleChange,
                    value: inputs.search_key,
                  }}
                />
              </div>

              <div className=" flex flex-col lg:w-36">
                <p className=" font-semibold ml-4 text-lg">Category</p>
                <div className=" text-xsv  w-36">
                  <ASelectOption
                    data={{
                      handleChange: handleSelect,
                      value,
                      data: categories,
                      dvalue: "All",
                      dval: "all",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" clear-both"></div>
            <div className="relative bottom-8 mt-6 ">
              <h2 className="text-xl lg:text-2xl font-bold text-darkyellow mb-4">
                All Orders
              </h2>
              {menuList.length > 0 ? (
                <div className="bg-white pb-2 px-4 rounded-lg w-full h-[500px] overflow-y-scroll">
                  <Table>
                    <Thead className=" h-10 top-0 border-b-1 border-button_border mb-1 z-20 bg-white head ">
                      <Tr className="">
                        <Th className="w-1/4 text-left">Item Name</Th>
                        <Th className="w-1/4">Stock Left</Th>
                        <Th className="w-1/4">Price</Th>
                        <Th className=" w-1/4">Quantity</Th>
                      </Tr>
                    </Thead>
                    {menuList.map((item, index) => (
                      <Tbody key={index + 1}>
                        <Tr className="row border-b-2  font-sans">
                          <Td className="pt-9 pb-9 w-1/4 ">{item.name}</Td>
                          <Td className=" w-1/4 ">
                            <p className="font-sans text-center text-sm">
                              {item.availability_count}
                            </p>
                          </Td>
                          <Td className="  w-1/4 text-center ">
                            {item.dinein_price}
                          </Td>
                          <Td className=" w-1/4 pl-10">
                            <div className="flex gap-2">
                              {item.availability_count > 0 ? (
                                <div className="">
                                  {" "}
                                  <Button
                                    text="Add"
                                    className="px-5  py-2"
                                    onClick={() => AddItem(item.id)}
                                  ></Button>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    disabled
                                    className="px-5 py-2 grayBackground text-white "
                                    onClick={() => AddItem(item.id)}
                                  >
                                    Add
                                  </button>
                                </div>
                              )}
                            </div>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </div>
              ) : (
                <div>No Menu Found..</div>
              )}
            </div>

            <div className="lg:hidden flex justify-between add w-11/12 ml-3 h-12 font-sans text-white text-lg py-2.5 px-4">
              <div>{cart.length} items</div>
              <div className="">
                <p onClick={handleOpen}>View Cart</p>
              </div>
            </div>
          </div>

          <div className="hidden w-5/12 lg:block">
            <div className="bg-white  py-2 px-4 rounded-lg outle h-[670px] ">
              <p className=" text-2xl font-semibold text-darkyellow">
                Items Selected
              </p>
              <div className=" flex gap-2 justify-between mb-2 px-2">
                <p className="w-7/12 font-sans font-semibold">Name</p>
                <p className="w-2/12 font-sans font-semibold">Quantity</p>
                <p className="w-1/12 font-sans font-semibold">Price</p>
                <p className=" w-1/12"></p>
                <p className=" w-1/12"></p>
                <p className=" w-1/12"></p>
              </div>
              <div className="mb-2 h-[250px] overflow-y-scroll">
                {cart.map((item) => {
                  return (
                    <div
                      className={` flex gap-2 justify-between mb-2 px-2`}
                      key={item}
                    >
                      <p className="w-7/12">{item.name}</p>
                      <p className="w-1/12">×{item.quantity}</p>
                      <p className="w-1/12">
                        ₹{item.quantity * item.dinein_price}
                      </p>
                      {/* <p>{item.quantity}</p> */}

                      <RemoveIcon
                        className="cursor-pointer w-1/12 bg-darkyellow text-white"
                        fontSize="small"
                        onClick={() => decreaseQuantity(item, item.index)}
                      />
                      <p className="w-1/12 text-center">{item.quantity}</p>

                      <AddIcon
                        className="cursor-pointer w-1/12 bg-darkyellow text-white"
                        fontSize="small"
                        onClick={() => increaseQuantity(item)}
                      />
                    </div>
                  );
                })}
              </div>

              <div className=" w-full mt-2 mr-6 flex flex-col">
                <div className="flex h-14  flex-row">
                  {/* <Text className="w-96 mt-0.5" placeholder="Enter promocode" onChange={handleChange}/> */}

                  {coupstatus ? (
                    <>
                      <input
                        type="text"
                        className="w-96 mt-0.5 border-2 border-button_border text-orange lowercase"
                        onChange={handleDiscount}
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
                        className="w-96 mt-0.5 border-2 border-slate-300 text-gray-600 lowercase"
                        // onChange={handleDiscount}
                        placeholder="Enter promocode"
                        value={discount.toLocaleLowerCase()}
                      />
                      <Button
                        text="Remove"
                        className="px-10 ml-10"
                        onClick={handleRemove}
                      ></Button>
                    </>
                  )}
                </div>
                <hr className=" mt-3 border-2 bord" />
                <div className="flex justify-between mt-1 pl-2">
                  <p className="font-semibold font-sans w-4/6">Sub Total</p>
                  <p className="w-2/6 pl-3">₹{s}</p>
                </div>
                <div className="flex justify-between mt-1 pl-2">
                  <p className="font-semibold font-sans w-4/6">GST @{gst}</p>
                  <p className="w-2/6 pl-3">₹{((s * gst) / 100).toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-1 pl-2">
                  <p className="font-semibold font-sans w-4/6">Discount</p>
                  {/* <p className="w-2/6 pl-3">₹</p> */}
                  {afterDiscount.value ? (
                    // <p> &#8377; {afterDiscount.value}</p>
                    <p className="w-2/6 pl-3">₹{afterDiscount.value}</p>
                  ) : (
                    <>
                      {afterDiscount.percentage ? (
                        // <p> &#8377; {(afterDiscount.percentage * s) / 100}</p>
                        <p className="w-2/6 pl-3">
                          ₹{(afterDiscount.percentage * s) / 100}
                        </p>
                      ) : (
                        <p className="w-2/6 pl-3">₹0</p>
                      )}
                    </>
                  )}
                </div>
                <hr className=" mt-3 border-2 bord" />
                <div className="flex justify-between mt-1 pl-2">
                  <p className="font-semibold font-sans w-4/6">Grand Total</p>
                  {/* <p className="w-2/6 pl-3">₹10000</p> */}
                  {afterDiscount.value ? (
                    <p className="w-2/6 pl-3">
                      ₹{(s - afterDiscount.value + s * (gst / 100)).toFixed(2)}
                    </p>
                  ) : (
                    <>
                      {afterDiscount.percentage ? (
                        <p className="w-2/6 pl-3">
                          ₹
                          {(
                            s -
                            (afterDiscount.percentage * s) / 100 +
                            s * (gst / 100)
                          ).toFixed(2)}
                        </p>
                      ) : (
                        <p className="w-2/6 pl-3">
                          &#8377;{(s + s * (gst / 100)).toFixed(2)}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <p className="my-2 font-semibold pl-2 mt-3">
                  Special Instructions
                </p>
                {/* <p className="w-full h-28 bg-search">para</p> */}
                <textarea
                  type="textarea"
                  className="w-full rounded-lg h-20 bg-search outline-none"
                  onChange={handleInstructions}
                />
                <div className="w-full h-4/6 mt-4 p-4 rounded-lg"></div>
              </div>

              {buttonStatus ? (
                <Button
                  text="Create"
                  className="relative  w-[150px] ml-48 mb-24 "
                  onClick={handleClick}
                />
              ) : (
                <Button
                  text="Processing Order"
                  className="relative  w-[250px] ml-36 mb-24"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* For tabview */}

      <div className="lg:hidden">
        <div className={` ${show ? "nav-menu active" : "nav-menu"}`}>
          <div
            className="w-[100vw] h-[100vh] overflow-y-scroll shadow-lg"
            key={i + 1}
          >
            <div className="flex flex-row">
              <div
                className="w-[30vw] lg:w-[70vw] val"
                onClick={handleClose}
              ></div>
              <div className="w-9/12 lg:w-[530px]  border-2 bg-white">
                <div className="flex justify-between bg-white">
                  <p className=" text-2xl mt-4 pl-6 font-semibold text-darkyellow">
                    Items Selected
                  </p>
                  <CloseIcon
                    fontSize="large"
                    className="mt-3"
                    onClick={handleClose}
                  />
                </div>
                <div className="bg-white  py-2 px-4 rounded-lg outle h-[1100px] lg:h-[670px] ">
                  <div className=" flex gap-2 justify-between mb-2 px-2">
                    <p className="w-7/12 font-sans font-semibold">Name</p>
                    <p className="w-2/12 font-sans font-semibold">Quantity</p>
                    <p className="w-1/12 font-sans font-semibold">Price</p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                  </div>
                  <div className="mb-2 h-[400px] lg:h-[250px] overflow-y-scroll">
                    {cart.map((item) => {
                      return (
                        <div
                          className={` flex gap-2 justify-between mb-2 px-2`}
                          key={item}
                        >
                          <p className="w-7/12">{item.name}</p>
                          <p className="w-1/12">×{item.quantity}</p>
                          <p className="w-1/12">
                            ₹{item.quantity * item.dinein_price}
                          </p>
                          {/* <p>{item.quantity}</p> */}

                          <RemoveIcon
                            className="cursor-pointer w-1/12 bg-darkyellow text-white"
                            fontSize="small"
                            onClick={() => decreaseQuantity(item, item.index)}
                          />
                          <p className="w-1/12 text-center">{item.quantity}</p>

                          <AddIcon
                            className="cursor-pointer w-1/12 bg-darkyellow text-white"
                            fontSize="small"
                            onClick={() => increaseQuantity(item)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <hr className=" mt-3 border-2 bord" />
                  {/* <div className="flex justify-between mt-1 pl-2">
                <p className="font-semibold font-sans w-4/6">Sub Total</p>
                <p className="w-2/6 pl-3">₹</p>
              </div>
              <div className="flex justify-between mt-1 pl-2">
                <p className="font-semibold font-sans w-4/6">GST 5%</p>
                <p className="w-2/6 pl-3">₹</p>
              </div>
              */}
                  <div className=" w-full mt-2  mr-6 flex flex-col">
                    <div className="flex h-14  flex-row">
                      {/* <Text className="w-96 mt-0.5" placeholder="Enter promocode" onChange={handleChange}/> */}
                      <input
                        type="text"
                        className="w-96 mt-0.5 border-2 border-button_border text-orange lowercase"
                        onChange={handleDiscount}
                        placeholder="Enter promocode"
                        value={discount.toLocaleLowerCase()}
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
                      )}
                    </div>
                    <hr className=" mt-3 border-2 bord" />
                    <div className="flex justify-between mt-1 pl-2">
                      <p className="font-semibold font-sans w-4/6">Sub Total</p>
                      <p className="w-2/6 pl-3">₹{s}</p>
                    </div>
                    <div className="flex justify-between mt-1 pl-2">
                      <p className="font-semibold font-sans w-4/6">
                        GST @{gst}
                      </p>
                      <p className="w-2/6 pl-3">
                        ₹{((s * gst) / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mt-1 pl-2">
                      <p className="font-semibold font-sans w-4/6">Discount</p>
                      {/* <p className="w-2/6 pl-3">₹</p> */}
                      {afterDiscount.value ? (
                        // <p> &#8377; {afterDiscount.value}</p>
                        <p className="w-2/6 pl-3">₹{afterDiscount.value}</p>
                      ) : (
                        <>
                          {afterDiscount.percentage ? (
                            // <p> &#8377; {(afterDiscount.percentage * s) / 100}</p>
                            <p className="w-2/6 pl-3">
                              ₹{(afterDiscount.percentage * s) / 100}
                            </p>
                          ) : (
                            <p className="w-2/6 pl-3">₹0</p>
                          )}
                        </>
                      )}
                    </div>
                    <hr className=" mt-3 border-2 bord" />
                    <div className="flex justify-between mt-1 pl-2">
                      <p className="font-semibold font-sans w-4/6">
                        Grand Total
                      </p>
                      {/* <p className="w-2/6 pl-3">₹10000</p> */}
                      {afterDiscount.value ? (
                        <p className="w-2/6 pl-3">
                          ₹
                          {(s - afterDiscount.value + s * (gst / 100)).toFixed(
                            2
                          )}
                        </p>
                      ) : (
                        <>
                          {afterDiscount.percentage ? (
                            <p className="w-2/6 pl-3">
                              ₹
                              {(
                                s -
                                (afterDiscount.percentage * s) / 100 +
                                s * (gst / 100)
                              ).toFixed(2)}
                            </p>
                          ) : (
                            <p className="w-2/6 pl-3">
                              &#8377;{(s + s * (gst / 100)).toFixed(2)}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    {/* <div className="flex justify-between mt-1 pl-2">
                      <p className="font-semibold font-sans w-4/6">Discount</p>
                      <p className="w-2/6 pl-3">₹</p>
                    </div>
                    <hr className=" mt-3 border-2 bord" />
                    <div className="flex justify-between mt-1 pl-2">
                    <p className="font-semibold font-sans w-4/6">Grand Total</p>
                    <p className="w-2/6 pl-3">₹</p>
                </div> */}
                    <p className="my-2 font-semibold pl-2 mt-3">
                      Special Instructions
                    </p>
                    {/* <p className="w-full h-28 bg-search">para</p> */}
                    <textarea
                      type="textarea"
                      className="w-full rounded-lg h-20 bg-search outline-none"
                      onChange={handleInstructions}
                    />
                    <div className="w-full h-4/6 mt-4 p-4 rounded-lg"></div>
                  </div>

                  <div className="flex justify-center items-center">
                    {buttonStatus ? (
                      <Button
                        text="Create"
                        className="relative  w-[150px] "
                        onClick={handleClick}
                      />
                    ) : (
                      <Button
                        text="Processing Order"
                        className="relative  w-[200px] "
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
