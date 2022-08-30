import { AppContext } from "../../context/AppContext";
import React, {useEffect, useContext,useState } from "react";
import axios from "axios";
import "./managetables.scss";
import ManageDetailOrder from "./ManageDetailOrder";
import { Link } from "react-router-dom";
import ManageTableCard from "../UniversalComponents/ManageTableCard";


export const ManageTables = () => {
  // const [manageData, setManageData] = useState([]);
  const { handleShow, handleDetailOrder,handleActiveTables,activeTables } = useContext(AppContext);
  const token = localStorage.getItem("alankartoken");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const[loading,setLoading] = useState(true)

  const stats = () => {
    const res = axios.get(`${BASE_URL}/admin/tables?page=1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      handleActiveTables(res.data.data);
      setLoading(false)

    });
    res.catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    stats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (el) => {
    handleShow(true);

    axios
      .get(`${BASE_URL}/admin/list-tab?id=${el}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        handleDetailOrder(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-9 mt-1 pb-10 bg-darkwhite ">
      <div>
        <div className="">
          <p className="font-semibold text-orange text-xl font-sans">
            Manage Table
          </p>
          <p className=" font-semibold text-lg font-sans">
            <Link to="/menu/dinein/active-order">Dine - In </Link> &#8250;
             Active Tables
          </p>
        </div>
        <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
        <div className="py-4 lg:pt-8 lg:pb-20 overflow-y-scroll lg:overflow-y-hidden grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-24 ">
          {
            loading ? <>Loading..</> : <>
              {activeTables.map((data, index) => (
                <ManageTableCard data={{data:data,onClick:handleClick}}/>
            // <div className=" box h-56 mb-16 lg:mb-1" key={index + 1}>
            //   <div className="h-16 bg-orange rounded-t-lg pt-4 flex flex-row justify-between pl-2 pr-2">
            //     <div className="text-white mt-1 font-sans font-semibold text-left">
            //       Table: {data.table?.name}
            //     </div>
            //     <div className="text-white font-sans font-semibold mt-1">
            //       Waiter:{data.table?.users[0]?.name}
            //     </div>
            //   </div>
            //   <div className="h-48 flex flex-col gap-3 bg-white pt-2 pl-2 pr-2">
            //     <div className="flex flex-row gap-1">
            //       <div className="w-3/6 text-left font-semibold">Status:</div>
            //       <div className="w-3/6 text-left">Occupied</div>
            //     </div>
            //     <div className="flex flex-row gap-1">
            //       <div className="w-3/6 text-left font-semibold">Members:</div>
            //       <div className="w-3/6 text-left">{data.total_persons}</div>
            //     </div>
            //     <div className="flex flex-row gap-1">
            //       <div className="w-3/6 text-left font-semibold">
            //         Order Status:
            //       </div>
            //       <div className="w-3/6 text-left">
            //         {data.payment_status === "INPROGRESS" ? (
            //           <div className="text-green-600 font-sans font-semibold">
            //             In Progress
            //           </div>
            //         ) : (
            //           <div className="text-orange font-sans font-semibold">
            //             Payment Pending
            //           </div>
            //         )}
            //       </div>
            //     </div>
            //     <div className="flex flex-row gap-1">
            //       <div className="w-3/6 text-left font-sans font-semibold">
            //         Payment Status:
            //       </div>
            //       <div className="w-3/6 text-left">
            //         {data.payment_status === "INPROGRESS" ? (
            //           <div className="text-red-500 font-sans font-semibold">
            //             Bill not generated
            //           </div>
            //         ) : (
            //           <div className="text-green-600 font-sans font-semibold">
            //             Bill generated
            //           </div>
            //         )}
            //       </div>
            //     </div>
            //   </div>
            //   <div
            //     className="h-10 add text-center font-sans font-semibold pt-2 text-white rounded-lg cursor-pointer"
            //     onClick={() => {
            //       handleClick(data.id);
            //     }}
            //   >
            //     View
            //   </div>
            // </div>
          ))}
            </>
          }
        </div>
      </div>
      <ManageDetailOrder />
    </div>
  );
};
