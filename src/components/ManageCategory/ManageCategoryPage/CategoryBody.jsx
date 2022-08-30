import Button from "../../UniversalComponents/Button";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import EditOrder from "../../../Images/ActiveOrder/EditOrder.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import ToggleButton from "../../UniversalComponents/ToggleButton";

import TablePagination from "../../UniversalComponents/TablePagination";
import Search from "../../UniversalComponents/Search";
import Refresh from "../../UniversalComponents/Refresh";

const CategoryBody = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    key: "",
    page: 1,
  });
  const [numberofpages, setnumberofpages] = useState(1);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");


  const stats = (input) => {
    const res = axios.get(
      `${BASE_URL}/admin/categories?search_key=${input.key}&page=${input.page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setCategory([]);
    res.then((res) => {
      setCategory([...res.data.data.data]);
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
  }, [input.page, input.key]);


  const handlePagination = (e, value) => {
    setInput({ ...input, page: value });
  };

  const handleEditCategory = (data) => {
    localStorage.setItem("editcategory", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const key = e.target.value;
    if(key!==" "){
       setInput({ ...input, key: key, page: 1 });
      setLoading(true);
    }  
  };

  const handleCheck = async (data) => {
    await axios
      .patch(
        `${BASE_URL}/admin/categories/status/${data.id}`,
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

  return (
    <div className="">
      <div className="">
        <p className="font-semibold text-orange mb-1 text-xl font-sans">
          Manage Category
        </p>
        <p className=" font-semibold text-lg font-sans">
          This is your all category list
        </p>
      </div>
      <hr className="mt-1 mb-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex justify-end">
        {/* Search */}

        <Search data={{handleChange:handleChange, value:input.key}}/>
        
        <Link to="/menu/manage-category/add-new-category">
          <Button text="Add New Category" className="ml-6 mt-0.5"></Button>
        </Link>

      </div>
      <div className="flex items-end justify-end mt-5">
        <Refresh data={{onClick:refreshOrder}}/>
      </div>
      <div className=" overflow-y-scroll lg:h-full box pl-6 pt-4 bg-white rounded-lg  mt-1">
        <div className="text-orange w-full text-xl  mb-3 font-semibold font-sans">
          All Categories
        </div>
        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          <div>
            {category.length > 0 ? (
              <div className="font-sans">
                <Table className="">
                  <Thead className=" border-b-2 mb-1  bg-white head ">
                    <Tr className=" text-left text-base lg:text-lg">
                      <Th className="font-sans pb-2 pr-5">S. No.</Th>
                      <Th className="font-sans pb-2 ">Name</Th>
                      <Th className="font-sans pb-2 ">Image</Th>
                      <Th className="font-sans pb-2 pl-5">Availability</Th>
                      <Th className="font-sans pb-2">Action</Th>
                    </Tr>
                  </Thead>
                  {category.map((data, i) => {
                    return (
                      <Tbody key={i + 1}>
                        <Tr className="row border-b-2 font-sans">
                          <Td className="pt-2  pr-5 pb-2">
                            {input.page * 10 - 10 + (i + 1)}.
                          </Td>
                          <Td className="pt-2  text-left pb-2">{data.name}</Td>
                          <Td className="pt-2   text-left  pb-2">
                            <img
                              src={data.image}
                              className="h-16 w-16 p-2"
                              alt="food_icon"
                            />
                          </Td>
                          <Td className="pt-2  pl-5 pb-2">
                            <div className="h-6 w-12 flex">
                              <ToggleButton
                                defaultChecked={data?.status}
                                onChange={() => handleCheck(data)}
                                changebg="true"
                              />
                            </div>
                          </Td>
                          <Td className="pt-5 flex justify-center items-center  float-left  pb-2">
                            <Link to={`/menu/manage-category/edit-category/${data.id}`}>
                              <img
                                className="h-10 w-10"
                                src={EditOrder}
                                alt="edit icon"
                                onClick={() => {
                                  handleEditCategory(data);
                                }}
                              />
                            </Link>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              </div>
            ) : (
              <div className="text-center top-56 text-2xl">No data found!</div>
            )}
          </div>
        )}
      </div>
      {category.length <= 0 ? (
        <div>{null}</div>
      ) : (
        <div className="flex mt-4 mb-28 lg:mb-4 justify-center">   
          {/* Pagination */}
          <TablePagination data={{npages:numberofpages, page:input.page, handleChange:handlePagination}}/>
        </div>
      )}
    </div>
  );
};

export default CategoryBody;
