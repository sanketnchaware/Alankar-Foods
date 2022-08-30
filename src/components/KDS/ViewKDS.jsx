import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import KDSCard from "../UniversalComponents/KDSCard";

export const ViewKDS = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem("alankartoken");
  const [kdsData, setkdsData] = useState([]);

  useEffect(() => {
    getKitchens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKitchens = () => {
    axios
      .get(`${BASE_URL}/kds-id?kitchen_id=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        setkdsData(res.data.data);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const handleClick = async (id, stats) => {
    if (stats === 1) var status = 2;
    else if (stats === 2) status = 3;
    else if (stats === 3) status = 4;
    await axios
      .patch(
        `${BASE_URL}/meta/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getKitchens();
      });
  };

  return (
    <div className="pt-2 mt-1  bg-darkwhite px-9">
      {kdsData.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
          {kdsData.map((item) => (
            <KDSCard data={{ item ,handleClick}} />
            
          ))}
        </div>
      ) : (
        <div className="text-2xl text-center">
          <div className="my-56">No data found!</div>
        </div>
      )}
    </div>
  );
};
