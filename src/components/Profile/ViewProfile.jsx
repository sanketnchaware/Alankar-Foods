import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import StaffProfile from "../../Images/StaffProfile.png";

const fields={
    name:"",
    role:"",
    email:"",
    phone:"",
    image:"",
}

const ViewProfile = () => {
    // const [profile, setProfile] = useState([])
    const [params, setParams] = useState(fields);

    const admin_Id = localStorage.getItem("adminID");
    console.log(admin_Id);

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("alankartoken");

    const stats = () => {
        const res = axios.get(`${BASE_URL}/admin/users/${admin_Id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        });
        res.then((res) => {
            console.log("profile data", res.data)
            setParams(res.data)
        });
        res.catch((err) => {
          console.log(err);
        });
      };

      useEffect(() => {
        stats();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  return (
    <div className="px-9 pt-2 pb-5">
    <p className="font-semibold  text-orange mb-1 text-xl font-sans">Profile</p>
    <p className=" font-semibold text-lg font-sans ">
     Profile &#8250; ViewProfile
    </p>
    <hr className=" mt-3 mb-6 border-2 bord" />
    <div className=''>
       <div className='flex flex-row justify-between'>
         <div></div>
          <div className='flex justify-center items-center'>
           <div>
           <p className='font-sans font-semibold w-[150px] text-center mb-4 text-base'>Image</p>
          <div className='flex items-center justify-center'>
             <img src={StaffProfile} className="h-[120px] w-[120px] rounded-[50%]" alt="profile"/>
           </div>
           </div>
          </div>
           <Link to="/menu/edit-profile">
           {/* <div className='w-12 h-12 flex justify-end items-end'><img src={editProfile} alt="profile edit"/></div> */}
           
           </Link>
       </div>
    </div>
    <form className=" mt-14">
      <div className=" grid grid-rows-2 mr-20 gap-10 grid-flow-col">
       <div className="flex flex-col ">
          <label className="font-sans text-base font-semibold  mb-1">
            Name
          </label>
          <p className=" bg-search pl-4 h-16 rounded-lg py-5 font-sans font-semibold">{params.name}</p>
        </div>
        <div className=" flex flex-col">
          <label className="font-sans text-base font-semibold  mb-1">
            Role
          </label>
          
           <p className=" bg-search h-16 pl-4 rounded-lg py-5 font-sans font-semibold">{params.role?.name}</p>
        </div>

        <div className=" flex flex-col">
          <label className="font-sans font-semibold text-base  mb-1">Email</label>
         
          <p className="bg-search pl-4 h-16 rounded-lg py-5 font-sans font-semibold">{params.email}</p>
        </div>
       

       <div className=" flex flex-col">
          <label className="font-sans font-semibold text-base  mb-1">Phone</label>
         
          <p className="bg-search pl-4 h-16 rounded-lg py-5 font-sans font-semibold">
            {params?.phone}</p>
        </div>
      </div>
    </form>
  </div>
  )
}

export default ViewProfile
