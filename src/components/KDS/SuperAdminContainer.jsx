import { Kitchen } from "../UniversalComponents/Kitchen";
import { useEffect, useState } from "react";
import axios from "axios";

export const SuperAdminContainer = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");
  const [kdsData, setkdsData] = useState([]);

  useEffect(() => {
    getKitchens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKitchens = () => {
    axios
      .get(`${BASE_URL}/kds`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        setkdsData(res.data);
        console.log(res.data,"data");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" bg-darkwhite px-9 mt-1">
      <div className="flex flex-col pt-2">
        <p className="font-semibold text-orange text-xl font-sans">View KDS</p>
        <p className=" font-semibold text-lg font-sans">KDS &#8250; View KDS</p>
        <hr className=" mt-3 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      </div>
      <div className="kd   pb-3 flex gap-10  mt-6 flex-wrap">
        {kdsData.map((item, i) => (
          <Kitchen
            key={i + 1}
            data={{
              img: `${item.image}`,
              type: `${item.name}`,
              id: item.id,
            }}
          />
        ))}
      </div>
    </div>
  );
};
