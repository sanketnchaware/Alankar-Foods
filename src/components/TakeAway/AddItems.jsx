import "./createneworder.scss";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Button from "../UniversalComponents/Button";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { addMenu, removeMain, removeMenu } from "../../helpers/menusFilter";
import Search from "../UniversalComponents/Search";
import ASelectOption from "../UniversalComponents/ASelectOption";

const AddItems = () => {
  const [categories, setCategories] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [copymenus, setcopymenus] = useState([]);
  const { show, handleShow, handleStep, activeobj, handleObj } =
    useContext(AppContext);

  const [instructions, setInstructions] = useState("");

  const [input, setInput] = useState({
    search_key: "",
    category: "",
  });
  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCategory();
    specficCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.search_key]);

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
        console.log("Error in getting categories Data", error);
      });
  };

  const specficCategoryData = () => {
    axios
      .get(`${BASE_URL}/admin/menus`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setMenuList(res.data.data);
        setcopymenus(JSON.parse(JSON.stringify(res.data.data)));
      })
      .catch((err) => {
        console.log("Error in Specfic Category Data :", err);
      });
  };

  const handleClick = () => {
    if (cart.length > 0) {
      handleStep(3);
      const data = activeobj;
      const postdata = {
        ...data,
        items: cart,
        instructions: instructions,
        email: "admin@scube.me",
      };
      handleObj({ ...postdata });
    } else {
      Swal.fire({
        title: "Add atleast one item",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonClass: "confirm_btn",
        timer: 1500,
      });
    }
  };

  const handleSelect = async (e) => {
    const key = e.target.value;
    if (key !== "all") {
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
      specficCategoryData();
    }
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

  const handleChange = async (e) => {
    setInput({
      ...input,
      search_key: e.target.value,
      category: "all",
    });
    if (input.search_key.length > 0) {
      const data = await axios.get(
        `${BASE_URL}/admin/search-menu?search_key=${input.search_key}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMenuList(data.data.data);
    } else {
      specficCategoryData();
    }
  };

  const handleOpen = () => {
    handleShow(true);
  };

  const handleClose = () => {
    handleShow(false);
  };

  return (
    <div className="px-9 pb-5 pt-2">
      <div>
        <p className="font-semibold text-orange text-xl font-sans">
          Manage Order
        </p>
        <p className=" font-semibold text-lg font-sans">
          <Link to="/menu/take-away">Take Away</Link> &#8250;
          <Link to="/menu/take-away"> Manage Order</Link> &#8250; Create New
          Order
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

          <Button text="Add Items" className="w-44" />
          <button className="button text-white font-sans font-semibold  h-14 w-44">
            Manage Payment
          </button>
        </div>

        <div className="w-full pl-9 flex flex-row gap-5 lg:gap-8">
          <div className="w-9/12 lg:w-6/12 rounded-lg mb-5">
            <div className="flex justify-between mr-6">
              <div className="mt-7 mb-2">
                <Search data={{ handleChange: handleChange }} />
              </div>

              <div className=" flex flex-col w-40">
                <p className=" font-semibold text-lg">Category</p>
                <div className=" text-xsv ">
                  <ASelectOption data={{handleChange:handleSelect,data:categories,dvalue:"All",dval:"all"}}/>
                 
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
                            {item.takeaway_price}
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
                <p className="w-6/12 font-sans font-semibold">Name</p>
                <p className="w-2/12 font-sans text-left font-semibold">
                  Quantity
                </p>
                <p className="w-2/12 font-sans text-left  font-semibold">
                  Price
                </p>
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
                      <p className="w-6/12">{item.name}</p>
                      <p className="w-2/12 text-left ">×{item.quantity}</p>
                      <p className="w-2/12 text-left ">
                        ₹{item.quantity * item.takeaway_price}
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

              <div className=" w-full mt-2 mr-6 flex flex-col">
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

              <Button
                text="Next"
                onClick={handleClick}
                className="ml-44 mt-18 pl-14 pr-14"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For tab view */}
      <div className="lg:hidden">
        <div className={` ${show ? "nav-menu active" : "nav-menu"}`}>
          <div className="w-[100vw] h-[100vh] overflow-y-scroll shadow-lg">
            <div className="flex flex-row">
              <div
                className="w-[50vw] lg:w-[70vw] val"
                onClick={handleClose}
              ></div>
              <div className="bg-white w-[80vw]  py-2 px-4 rounded-lg outle h-[1100px] ">
                <div className="flex justify-between">
                  <p className=" text-2xl font-semibold text-darkyellow">
                    Items Selected
                  </p>
                  <CloseIcon
                    fontSize="large"
                    className="mt-3"
                    onClick={handleClose}
                  />
                </div>
                <div className=" flex gap-2 justify-between mb-2 px-2">
                  <p className="w-7/12 font-sans font-semibold">Name</p>
                  <p className="w-2/12 font-sans font-semibold">Quantity</p>
                  <p className="w-1/12 font-sans font-semibold">Price</p>
                  <p className=" w-1/12"></p>
                  <p className=" w-1/12"></p>
                  <p className=" w-1/12"></p>
                </div>
                <div className="mb-2 h-[450px] overflow-y-scroll">
                  {cart.map((item) => {
                    return (
                      <div
                        className={` flex gap-2 justify-between mb-2 px-2`}
                        key={item}
                      >
                        <p className="w-7/12">{item.name}</p>
                        <p className="w-1/12">×{item.quantity}</p>
                        <p className="w-1/12">
                          ₹{item.quantity * item.takeaway_price}
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

                <div className=" w-full mt-2 mr-6 flex flex-col">
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

                <Button
                  text="Next"
                  onClick={handleClick}
                  className="ml-44 mt-18 pl-14 pr-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AddItems;
