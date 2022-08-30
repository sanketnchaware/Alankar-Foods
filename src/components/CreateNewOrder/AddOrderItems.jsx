import "./createneworder.scss";
import search from "../../Images/ActiveOrder/Search_fill.png";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "../UniversalComponents/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../context/AppContext";
import { addMenuEdit } from "../../helpers/menusFilter";

const customer = {
  name: "",
  phone: "",
  email: "",
  order_type: "",
  total_persons: "",
  table_id: [],
};

const AddOrderItems = () => {
  const [params, setParams] = useState(customer);
  const [discount, setdiscount] = useState("");
  const [categories, setCategories] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [coupstatus, setCoupstatus] = useState(true);
  const [copymenus, setcopymenus] = useState([]);
  const [buttonstatus, setButtonStatus] = useState(true);

  const { show, handleShow } = useContext(AppContext);

  const [instructions, setInstructions] = useState("");

  const { id } = useParams();

  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };
  console.log(afterDiscount);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  const Orders = () => {
    const res = axios.get(`${BASE_URL}/admin/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setParams(res.data.data[0]);
      setCart(res.data.data[0].meta_order);
      setInstructions(res.data.data[0].instructions);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    Orders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const CategoryData = () => {
    axios
      .get(`${BASE_URL}/admin/menus?page=1`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setMenuList(res.data.data);
        setcopymenus(JSON.parse(JSON.stringify(res.data.data)));
      })
      .catch((err) => {
        // console.log("Error in Specfic Category Data :", err);
      });
  };

  useEffect(() => {
    CategoryData();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setButtonStatus(false);
    const customerDetail = {
      name: params.name,
      phone: params.phone,
      email: params.email,
      order_type: params.order_type,
      total_persons: params.total_persons,
      table_id: [params.table_id],
    };
    const i = cart.map((item) => {
      return {
        id: item.id || null,
        menu_id: item.menu_id,
        quantity: item.quantity,
      };
    });

    if (cart.length > 0) {
      const postdata = {
        ...customerDetail,
        items: i,
        instructions: instructions,
      };
      axios
        .put(`${BASE_URL}/admin/orders/${id}`, postdata, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          updateTable(customerDetail.table_id);
          navigate("/menu/dinein/active-order");
          setButtonStatus(true);
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
          setButtonStatus(true);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please add atleast one item",
        showConfirmButton: false,
        timer: 1500,
      });
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
    const key = e.target.value;

    if (key && key !== "all") {
      const data = await axios.get(
        `${BASE_URL}/admin/category-data?id=${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMenuList(data.data.data[0]?.menus);
    } else {
      CategoryData();
    }
  };

  const handleChange = async (e) => {
    const key = e.target.value;
    if (key.length > 0) {
      const data = await axios.get(
        `${BASE_URL}/admin/search-menu?search_key=${key}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMenuList(data.data.data);
    } else {
      CategoryData();
    }
  };

  const AddItem = (menu) => {
    const existInCart = cart.find((x) => x.menu_id === menu.id);

    if (existInCart) {
      if (existInCart.quantity < menu.availability_count) {
        existInCart.quantity += 1;
        setCart([...cart]);
      } else if (existInCart.quantity === menu.availability_count) {
        
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item out of stock",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      setCart([...cart, { ...menu, quantity: 1, id: null, menu_id: menu.id }]);
    }
  };

  const increaseQuantity = (product) => {
    if (product.id === null) {
      const exist = cart.find((x) => x.menu_id === product.menu_id);
      if (exist && exist.quantity < product.availability_count) {
        setCart(
          cart.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
          )
        );
      }
      if (exist && exist.quantity === product.availability_count) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item out of stock",
          showConfirmButton: false,
          timer: 1500,
        });
        //   let removeData = removeMenu(menuList, exist);
        // setMenuList(removeData);
      }
    }
    if (product.id !== null) {
      const exist = cart.find((x) => x.menu_id === product.menu_id);
      // const exist = cart.find((x) => x.id === product.id);
      if (exist && exist.quantity < product.menus.availability_count) {
        setCart(
          cart.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
          )
        );
      }
      if (exist && exist.quantity === product.menus.availability_count) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item out of stock",
          showConfirmButton: false,
          timer: 1500,
        });
        // let removeData = removeMenu(menuList, exist);
        //   setMenuList(removeData);
      }
    }
  };

  const decreaseQuantity = (product) => {
    const i = cart.indexOf(product);
    if (product.id === null) {
      const index = cart.indexOf(product);
      const exist = cart.find((x) => x.menu_id === product.menu_id);
      if (exist.quantity === 1) {
        cart.splice(index, 1);
      }
      if (exist && exist.quantity !== 0) {
        setCart(
          cart.map((x) =>
            x.menu_id === product.menu_id
              ? { ...exist, quantity: exist.quantity - 1 }
              : x
          )
        );
      }

      if (exist && exist.quantity - 1 < product.availability_count) {
        // let addData = addMenuEdit(copymenus, menuList, exist);
        // console.log(addData);
        // setMenuList(addData);
      }
    }

    if (product.id !== null) {
      const exist = cart.find((x) => x.id === product.id);
      if (exist.quantity === 1) {
        cart.splice(i, 1);
        removeItem(exist.id);
      }
      if (exist) {
        setCart(
          cart.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
          )
        );
      }
      if (exist && exist.quantity - 1 < product.availability_count) {
        let addData = addMenuEdit(copymenus, menuList, exist);
        console.log(addData);
        // setMenuList(addData);
      }
    }

    // if (exist && exist.quantity - 1 < product.availability_count) {
    //   let addData = addMenuEdit(copymenus, menuList, exist);
    //   console.log(addData);
    //   // setMenuList(addData);
    // }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/meta/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log("deleted successfully");
    } catch (err) {
      console.log("error while deleting item");
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
        setCoupstatus(true);
        setAfterDiscount(0);
        setdiscount("");
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
    <div className="mt-1 bg-darkwhite">
      <div className=" flex flex-col pl-11 pt-3">
        <p className="font-semibold text-orange text-xl font-sans">
          Edit Order
        </p>
        <p className=" font-semibold text-lg font-sans">
          <Link to="/menu/dinein/active-order">Dine - In</Link> &nbsp; &#8250;
          &nbsp; Add - Items
        </p>
        <hr className=" mt-3 border-2 mr-10 mb-4 border-b-button_border border-t-white border-l-white border-r-white" />
      </div>
      <div className="w-full pl-9 flex flex-row gap-5 lg:gap-8">
        <div className="w-9/12 lg:w-6/12 rounded-lg mb-5">
          <div className="flex flex-row gap-2">
            <div className="searchGrid h-14 w-2/3 my-7 rounded-xl bg-search">
              <input
                className="h-14  text-orange bg-search rounded-xl outline-none pl-3 placeholder:text-darkyellow placeholder:font-semibold"
                type="text"
                placeholder="Search"
                onChange={handleChange}
              />
              <img className=" relative top-3" src={search} alt="search" />
            </div>

            <div className=" flex flex-col float-right mr-4">
              <p className=" font-semibold text-lg ml-9 ">Category</p>

              <div className=" text-xsv w-36 ">
                <select
                  className="border-2 w-36  ml-8 text-lg text-orange border-button_border h-14  pl-3 pr-12 bg-white  outline-none rounded-lg"
                  name="category_id"
                  onChange={handleSelect}
                >
                  <option value="all" key="all" defaultValue>
                    All
                  </option>
                  {categories.map((option, index) => (
                    <option value={option.id} key={index + 1}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className=" clear-both"></div>

          <div className="relative bottom-8    ">
            <h2 className=" text-xl mt-4 font-bold text-darkyellow mb-2">
              All Orders
            </h2>
            {menuList?.length > 0 ? (
              <div className="bg-white pl-2 pb-2 pr-2 rounded-lg w-full h-96 overflow-y-scroll">
                <Table>
                  <Thead className=" h-10 top-0 border-b-1 border-button_border mb-1 z-20 bg-white head ">
                    <Tr className="">
                      <Th className="w-1/4 text-center">Item Name</Th>
                      <Th className="w-1/4 text-center">Stock Left</Th>
                      <Th className="w-1/4 text-center">Price</Th>
                      <Th className=" w-1/4 text-center">Quantity</Th>
                    </Tr>
                  </Thead>
                  <Tbody className="">
                    {menuList.map((item, index) => (
                      <Tr key={index + 1} className="row border-b-2  font-sans">
                        <Td className="py-9 text-center">{item.name}</Td>
                        <Td className="text-center">
                          <p className="">{item.availability_count}</p>
                        </Td>
                        <Td className="text-center ">{item.dinein_price}</Td>
                        <Td>
                          <div className="flex justify-center items-center">
                            {item.availability_count > 0 ? (
                              <div className="">
                                {" "}
                                <Button
                                  text="Add"
                                  className="px-5 py-2"
                                  onClick={() => AddItem(item)}
                                ></Button>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center">
                                <button
                                  disabled
                                  className="px-5 py-2 grayBackground text-white "
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            ) : (
              <div>No Menu Found..</div>
            )}
          </div>
          <div className="lg:hidden add w-11/12 ml-3 h-12 text-right font-sans text-white text-lg py-3 pr-5">
            <p onClick={handleOpen}>View Cart</p>
          </div>
        </div>

        <div className="hidden w-5/12 lg:block bg-white  py-2 px-4 ml-8 rounded-lg outle">
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
            {cart.map((item, index) => {
              return (
                <div
                  key={index + 1}
                  className={` flex gap-2 justify-between mb-2 px-2`}
                >
                  <p className="w-7/12">{item?.menus?.name || item?.name}</p>
                  <p className="w-1/12">×{item?.quantity}</p>
                  <p className="w-1/12">
                    ₹
                    {item.quantity * item.dinein_price ||
                      item?.menus?.dinein_price}
                  </p>
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
          </div> */}

          <div className=" w-full mt-2 mr-6 flex flex-col">
            <div className="flex h-14  flex-row">
              {/* <Text className="w-96 mt-0.5" placeholder="Enter promocode" onChange={handleChange}/> */}
              {coupstatus ? (
                <>
                  <input
                    type="text"
                    className="w-96 mt-0.5 border-2 border-button_border text-orange"
                    value={discount}
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

            <p className="my-2 font-semibold pl-2 mt-3">Special Instructions</p>
            {/* <p className="w-full h-28 bg-search">para</p> */}
            <textarea
              type="textarea"
              className="w-full rounded-lg h-20 bg-search outline-none pl-1"
              onChange={handleInstructions}
              value={instructions}
            />
            <div className="w-full h-4/6 mt-4 p-4 rounded-lg"></div>
          </div>

          <Button
            text="Update"
            className="relative  w-[150px] ml-48 "
            onClick={handleClick}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className={` ${show ? "nav-menu active" : "nav-menu"}`}>
          <div className="w-[100vw] h-[100vh] overflow-y-scroll shadow-lg">
            <div className="flex flex-row">
              <div
                className="w-[30vw] lg:w-[70vw] val"
                onClick={handleClose}
              ></div>
              <div className="w-10/12 lg:w-[530px]  border-2 bg-white">
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
                <div className="bg-white  py-2 px-4 rounded-lg outle h-full ">
                  <div className=" flex gap-2 justify-between mb-2 px-2">
                    <p className="w-7/12 font-sans font-semibold">Name</p>
                    <p className="w-2/12 font-sans font-semibold">Quantity</p>
                    <p className="w-1/12 font-sans font-semibold">Price</p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                    <p className=" w-1/12"></p>
                  </div>
                  <div className="mb-2 h-[350px] overflow-y-scroll">
                    {cart.map((item, index) => {
                      return (
                        <div
                          key={index + 1}
                          className={` flex gap-2 justify-between mb-2 px-2`}
                        >
                          <p className="w-7/12">
                            {item?.menus?.name || item?.name}
                          </p>
                          <p className="w-1/12">×{item?.quantity}</p>
                          <p className="w-1/12">
                            ₹
                            {item.quantity * item.dinein_price ||
                              item?.menus?.dinein_price}
                          </p>
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
                  <div className=" w-full mt-2 mr-6 flex flex-col">
                    <div className="flex h-14  flex-row">
                      {/* <Text className="w-96 mt-0.5" placeholder="Enter promocode" onChange={handleChange}/> */}
                      {coupstatus ? (
                        <>
                          <input
                            type="text"
                            className="w-96 mt-0.5 border-2 border-button_border text-orange"
                            onChange={handleDiscount}
                            value={discount}
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
                      className="w-full rounded-lg h-20 bg-search outline-none pl-1"
                      onChange={handleInstructions}
                      value={instructions}
                    />
                    <div className="w-full h-4/6 mt-4 p-4 rounded-lg"></div>
                  </div>

                  <div className="flex justify-center items-center">
                    {buttonstatus ? (
                      <Button
                        text="Update"
                        className="relative  w-[150px] "
                        onClick={handleClick}
                      />
                    ) : (
                      <Button
                        text="Updating Order"
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

export default AddOrderItems;
