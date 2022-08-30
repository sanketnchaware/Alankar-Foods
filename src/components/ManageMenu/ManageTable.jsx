import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";
import ToggleButton from "../UniversalComponents/ToggleButton";
import Button from "../UniversalComponents/Button";
import EditOrder from "../../Images/ActiveOrder/EditOrder.png";
import SelectOption from "../UniversalComponents/SelectOption";
import Reset from "../UniversalComponents/Reset";
import Search from "../UniversalComponents/Search";
import Refresh from "../UniversalComponents/Refresh";
import TablePagination from "../UniversalComponents/TablePagination";

const ManageTable = () => {
  const [menu, setMenu] = useState([]);
  const value = true;
  const [value1, setValue1] = useState([]);
  const [update, setupdate] = useState();
  const [loading, setLoading] = useState(true);
  const [numberofpages, setnumberofpages] = useState(1);
  const [kds, setKds] = useState([]);
  const [input, setInput] = useState({
    page: 1,
    search_key: "",
    date: "",
    kd_id: "",
    category: "",
    all: "all",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");
  const stats = (input) => {
    setMenu([]);
    const res = axios.get(
      `${BASE_URL}/admin/menu?key=${input.search_key}&page=${input.page}&kds=${input.kd_id}&category=${input.category}&all=${input.all}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setMenu([]);
    res.then((res) => {
      setMenu([...res.data.data.data]);
      setnumberofpages(res.data.data.meta.last_page);
      setLoading(false);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    stats(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.page, input.search_key, input.kd_id, input.category]);

  

  const handleid = (data) => {};
  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
  };

  const handleUpdate = async (id) => {
    await axios.patch(
      `${BASE_URL}/admin/menus/availability_count/${id}`,
      {
        updated_count: update,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    stats(input);
    setupdate(null);
  };

  const handleCetegory = async (e) => {
    setInput({
      ...input,
      category: e.target.value,
      page: 1,
      search_key: "",
      kd_id: "",
      all: "",
    });
  };

  const handleChange = (e) => {
    if (e.target.value !== " ") {
      setLoading(true);
      setInput({
        ...input,
        search_key: e.target.value,
        page: 1,
        kd_id: "",
        category: "",
        all: "",
      });
    }
  };

  const select = () => {
    setValue1([]);
    const res = axios.get(`${BASE_URL}/admin/category/drop-down`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setValue1(res.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const getKds = () => {
    setKds([]);
    const res = axios.get(`${BASE_URL}/kds`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setKds(res.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    select();
    getKds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const handleCheck = async (data) => {
    console.log(data, "dss");
    await axios
      .patch(
        `${BASE_URL}/admin/update/menu/status/${data.id}`,
        { status: !data.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshOrder = () => {
    stats(input);
  };

  const handleKds = (e) => {
    console.log(e.target.value, "value");
    setInput((input) => ({
      ...input,
      kd_id: e.target.value,
      page: 1,
      search_key: "",
      category: "",
      all: "",
    }));
    console.log(input.kd_id, "valueee");
  };

  const handleChangeStock = (e, id) => {
    setMenu(
      menu.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            availability_count: e.target.value,
          };
        }
        return el;
      })
    );
    // setupdate(e.target.value)
    console.log(e.target.value, id);
    setupdate(parseInt(e.target.value));
  };

  const handleReset = () => {
    select();
    getKds();
    setInput({
      kd_id: "",
      search_key: "",
      category: "",
      all: "all",
      page: 1,
    });
  };

  const width = window.innerWidth;
  return (
    <div className="">
      <div className="flex justify-between">
        <div className=" flex ">
          <div className=" text-xs hidden lg:block ">
            <SelectOption
              data={{
                handleChange: handleKds,
                value,
                data: kds,
                dvalue: "Select KDS",
              }}
            />
          </div>
          <div className=" text-xs hidden lg:block ">
            <SelectOption
              data={{
                handleChange: handleCetegory,
                value,
                data: value1,
                dvalue: "Select Category",
              }}
            />
          </div>
        </div>
        <div className="w-4/6  flex justify-end gap-4">
          {/* Search */}

          <Search
            data={{ handleChange: handleChange, value: input.search_key }}
          />

          <Link to="/menu/manage-menu/add-menu">
            <Button text="Add Item" className=""></Button>
          </Link>
          <Reset className="" data={{ onClick: handleReset, Reset }} />
        </div>
      </div>
      <div className="flex items-end mt-3 justify-end">
        {/* Refresh */}
        <Refresh data={{ onClick: refreshOrder }} />
      </div>
      <div className="mgmenu overflow-y-scroll lg:h-full  bg-white pt-2  mb-5 mt-1 px-4 rounded-lg">
        <div className="text-orange text-xl  mt-2 mb-4 font-semibold font-sans">
          All Items
        </div>
        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          <div>
            {menu.length > 0 ? (
              <div className=" font-sans">
                <Table className="relative">
                  <Thead className=" border-b-2 mb-1 bg-white head ">
                    <Tr className=" text-left text-base lg:text-lg ">
                      <Th className="font-sans pb-2">S. No.</Th>
                      <Th className="font-sans pb-2">Item Name</Th>
                      <Th className="font-sans  pb-2">Price</Th>
                      {width > 1024 && <Th className="font-sans  pb-2">KDS</Th>}
                      {width > 1024 && (
                        <Th className="font-sans  pb-2">Category</Th>
                      )}
                      <Th className="font-sans  pb-2">Today's Stock</Th>
                      <Th className="font-sans pb-2 ">Availability</Th>
                      <Th className="font-sans pb-2 flex justify-center">
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  {menu.map((data, i) => {
                    return (
                      <Tbody key={i + 1}>
                        <Tr className="row border-b-2 font-sans">
                          <Td className="pt-9 pb-9">
                            {input.page * 10 - 10 + (i + 1)}
                          </Td>
                          <Td className=" text-left  ">
                            <img
                              src={data?.image}
                              className="h-12 w-12"
                              alt="item_image"
                            />
                            {data?.name}
                          </Td>
                          <Td className="text-left ">
                            <p className="font-sans text-sm">
                              &#8377; {data?.dinein_price} &#40; Dine - In &#41;
                            </p>
                            <p className="font-sans text-sm">
                              &#8377; {data?.takeaway_price} &#40; Take Away
                              &#41;
                            </p>
                          </Td>
                          {width > 1024 && (
                            <Td className=" text-left ">{data.kd?.name}</Td>
                          )}
                          {width > 1024 && (
                            <Td className=" text-left ">
                              {data.category?.name}
                            </Td>
                          )}
                          <Td className="   ">
                            <div className="flex flex-row update">
                              <input
                                // onChange={(e) => {
                                //   setupdate(e.target.value);
                                // }}
                                onChange={(e) => handleChangeStock(e, data.id)}
                                type="number"
                                className="w-14 h-9 rounded pl-1 pr-1 outline-none border-2 border-button_border text-center"
                                min="0"
                                value={data?.availability_count}
                                onKeyPress={(e) => preventMinus(e, data?.id)}
                                onPaste={preventPasteNegative}
                              ></input>

                              {value ? (
                                <div>
                                  <button
                                    className="add ml-3 text-xs text-white font-semibold pl-1.5 pr-1.5 pt-2.5 pb-2.5 border-2 border-button_border rounded-lg"
                                    onClick={() => {
                                      handleUpdate(data.id);
                                    }}
                                  >
                                    Update
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    className="add ml-3 text-xs text-white font-semibold pl-2 pr-2 pt-2.5 pb-2.5 border-2 border-button_border rounded-lg "
                                    onClick={() => {
                                      handleUpdate(data.id);
                                    }}
                                  >
                                    Update
                                  </button>
                                </div>
                              )}
                            </div>
                          </Td>
                          <Td className="pl-10">
                            <div onClick={() => handleCheck(data)}>
                              <ToggleButton
                                defaultChecked={data?.status}
                                value={data?.status}
                              />
                              {/* {data?.status ? "True" : "False"} */}
                            </div>
                          </Td>
                          <Td className=" flex justify-center pt-6 items-center ">
                            <Link to={`/menu/manage-menu/edit-menu/${data.id}`}>
                              <img
                                src={EditOrder}
                                alt="edit icon"
                                className="w-9 h-9 lg:w-9 lg:h-9 mt-2"
                                onClick={() => {
                                  handleid(data.id);
                                }}
                              />
                            </Link>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
                <div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="text-2xl font-semibold font-sans text-center">
                No data found!
              </div>
            )}
          </div>
        )}
      </div>
      {menu.length <= 0 ? (
        <div>{null}</div>
      ) : (
        <div className="flex mt-4 mb-28 lg:mb-4 justify-center">
          {/* Pagination */}
          <TablePagination
            data={{
              npages: numberofpages,
              page: input.page,
              handleChange: handlePagination,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManageTable;
