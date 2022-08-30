import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import "./style.scss";
import EditOrder from "../../../Images/ActiveOrder/EditOrder.png";
import ToggleButton from "../../UniversalComponents/ToggleButton";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../UniversalComponents/Button";
import Search from "../../UniversalComponents/Search";
import Refresh from "../../UniversalComponents/Refresh";
import TablePagination from "../../UniversalComponents/TablePagination";

const ManageStaffTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    search: "",
    page: 1,
  });
  const [numberofpages, setnumberofpages] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const [loading, setLoading] = useState(true);
  const stats = (inputs) => {
    const res = axios.get(
      `${BASE_URL}/admin/users?page=${inputs.page}&search_key=${inputs.search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    setData([]);
    res.then((res) => {
      setData([...res.data.data.data]);
      setnumberofpages(res.data.data.meta.last_page);
      setLoading(false);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  


  useEffect(() => {
    stats(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.page, inputs.search]);

  const handleEditStaff = (id) => {
    navigate(`/menu/managestaff/editstaff/${id}`);
  };

  const handlePagination = (e, value) => {
    setInputs({ ...inputs, page: value });
    console.log(value, "value");
  };

  const handleCheck = async (data) => {
    console.log(data, "daa");
    await axios
      .patch(
        `${BASE_URL}/admin/users/status/${data.id}`,
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
    setInputs({ ...inputs, search: "", page: 1 });
    stats(inputs);
  };

  const handleSearch = (e) => {
    setInputs({
      ...inputs,
      search: e.target.value.trim(),
      page: 1,
    });
  };

  return (
    <div>
      <div className="  flex justify-between">
        <Search data={{handleChange:handleSearch,value:inputs.search.toLocaleLowerCase()}}/>
        <div className=" flex ">
          <Link to="/menu/managestaff/addnewstaff">
            <Button
              text="Add New Staff"
              className="pl-2 pr-2 lg:pl-8 lg:pr-8"
            ></Button>
          </Link>
          <Link to="/menu/managestaff/newrole">
            <Button
              text="Add New Role"
              className="pl-2 pr-2 lg:pl-8 lg:pr-8 ml-10"
            ></Button>
          </Link>
        </div>
      </div>
      <div className="flex items-end mt-5 justify-end">
        <Refresh data={{onClick:refreshOrder}}/>
       
      </div>
      <div className=" overflow-y-scroll lg:h-full bg-white   box pt-2 pb-10 pl-5">
        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          <div>
            {data.length > 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-orange mb-3  text-xl font-semibold font-sans">
                    Staff List
                  </div>
                </div>
                <div className="font-sans">
                  <Table className="">
                    <Thead className="border-b-2 mb-1 bg-white head ">
                      <Tr className=" text-left text-base lg:text-lg">
                        <Th className="font-sans ">S.No.</Th>
                        <Th className="font-sans ">Name</Th>
                        <Th className="font-sans ">Email</Th>
                        <Th className="font-sans ">Phone No.</Th>
                        <Th className="font-sans ">Role</Th>
                        <Th className="font-sans ">Status</Th>
                        <Th className="font-sans flex justify-center">
                          Action
                        </Th>
                      </Tr>
                    </Thead>
                    {data.map((item, i) => {
                      return (
                        <Tbody key={i}>
                          <Tr className="row border-b-2 font-sans">
                            <Td className="pt-8 pb-8">
                              {inputs.page * 10 - 10 + (i + 1)}
                            </Td>
                            <Td className="pt-4 text-left  pb-4">
                              {item?.name}
                            </Td>
                            <Td className="pt-4 text-left  pb-4">
                              {item?.email}
                            </Td>
                            <Td className="pt-4 text-left pb-4">
                              {item?.phone}
                            </Td>
                            <Td className="pt-4 text-left  pb-4">
                              {item?.role?.name}
                            </Td>
                            <Td className="">
                              <div onClick={() => handleCheck(item)}>
                                <ToggleButton
                                  defaultChecked={item?.status}
                                  value={item?.status}
                                />
                              </div>
                            </Td>
                            <Td className="pt-6 flex justify-center pb-4">
                              <img
                                onClick={() => {
                                  handleEditStaff(item.id);
                                }}
                                src={EditOrder}
                                alt="edit icon"
                                className="w-7 h-7 lg:w-9 lg:h-9"
                              />
                            </Td>
                          </Tr>
                        </Tbody>
                      );
                    })}
                  </Table>
                </div>
              </div>
            ) : (
              <div className="text-center font-sans text-xl">No User Found</div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-4 mb-28 lg:mb-4">

        {/* Pagination */}

        <TablePagination data={{npages:numberofpages,page:inputs.page,handleChange:handlePagination}}/>
        
      </div>
    </div>
  );
};

export default ManageStaffTable;
