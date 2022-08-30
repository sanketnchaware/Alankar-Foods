import React, { useEffect, useContext } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { AuthContext } from "../../../context/AuthContext";
import edit from "../../../Images/ManageMenu/EDIT ICON.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";
// import ToggleButton from '../../ToggleButton/ToggleButton'
import Logo from "../../FooterLogo/Logo"
import ToggleButton from "../ToggleButton/ToggleButton";


const ManageCategoryTable = () => {
  const { data, handleData } = useContext(AuthContext);

  var number = 1;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("alankartoken");
  const stats = () => {
    const res = axios.get(`${BASE_URL}/admin/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      handleData(res.data.data.data);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    stats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCategory = (data) => {
    localStorage.setItem("editcategory", JSON.stringify(data));
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


  

  return (
    <div className=" box pl-6 pt-4 bg-white rounded-lg  mt-10">
      <div className="text-orange w-full text-xl  mb-3 font-semibold font-sans">
        All Items
      </div>
      <div className=" font-sans">
        <Table className="">
          <Thead className="sticky top-0 border-b-2 mb-1 z-20 bg-white head ">
            <Tr className=" text-left text-lg">
              <Th className="font-sans pb-2 pr-5">S. No.</Th>
              <Th className="font-sans pb-2 ">Name</Th>
              <Th className="font-sans pb-2 ">Image</Th>
              <Th className="font-sans pb-2 pl-5">Availability</Th>
              <Th className="font-sans pb-2 pl-3">Action</Th>
            </Tr>
          </Thead>
          {data.map((data, i) => {
            return (
              <Tbody>
                <Tr className="row border-b-2 font-sans">
                  <Td key={i} className="pt-2  pr-5 pb-2">
                    {number++}.
                  </Td>
                  <Td key={i} className="pt-2  text-left pb-2">
                    {data.name}
                  </Td>
                  <Td key={i} className="pt-2   text-left  pb-2">
                    <img
                      src={data.image}
                      className="h-16 w-16 p-2"
                      alt="food_icon"
                    />
                  </Td>
                  <Td key={i} className="pt-2  pl-5 pb-2">
                    {/* <ToggleButton defaultChecked={data?.status}
                    onChange={() => handleCheck(data)}
                    changebg="true"
                    value={data?.status}/> */}
                    <div onClick={() => handleCheck(data)}>
                      <ToggleButton
                        defaultChecked={data?.status}
                        value={data?.status}
                      />
                      {/* {data?.status ? "True" : "False"} */}
                    </div>
                  </Td>
                  <Td className="pt-5 flex justify-center  float-left pr-10  pb-2">
                    <Link to={`/menu/edit-category/${data.id}`}>
                      <img
                        src={edit}
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
      <Logo/>
    </div>
  );
};

export default ManageCategoryTable;
