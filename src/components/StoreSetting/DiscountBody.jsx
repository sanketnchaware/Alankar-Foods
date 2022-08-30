import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import ToggleButton from "../UniversalComponents/ToggleButton";

const DiscountBody = () => {
  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  var numb = 1;
  const coup = () => {
    const res = axios.get(`${BASE_URL}/admin/coupons`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    res.then((res) => {
      setCoupon(res.data.data);
      console.log(res.data, "res");
      setLoading(false);
    });
    res.catch((err) => {
      console.log(err);
    });
  };

  const handleCheck = async (data) => {
    await axios
      .patch(
        `${BASE_URL}/admin/updateCouponStatus/${data.id}`,
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

  useEffect(() => {
    coup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-2 pb-5 px-9">
      <p className="font-semibold text-xl text-orange mb-1 font-sans">
        Discount
      </p>
      <p className=" font-semibold text-lg font-sans">
        <Link to="/menu/setting"> Setting</Link> &#8250; Discount
      </p>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />

      <div className="font-sans font-semibold text-orange text-lg">
        Coupons List
      </div>

      <div className="bg-white pb-4 mt-2 mb-16 lg:mb-4 pt-10 box ">
        <div className=" overflow-y-scroll  pl-10 pr-10 pb-10  font-sans">
          {loading ? (
            <div>Loading..</div>
          ) : (
            <div>
              {coupon.length > 0 ? (
                <Table className="">
                  <Thead className="sticky top-0 border-b-2 z-20 mb-1 bg-white head ">
                    <Tr className="text-base text-left lg:text-lg">
                      <Th className="font-sans  pb-4 w-1/12">S. No.</Th>
                      <Th className="font-sans pb-4 w-3/12 text-center">
                        Name
                      </Th>
                      <Th className="font-sans pb-4 text-center w-3/12">
                        Expiry Date
                      </Th>
                      <Th className="font-sans pb-4 text-center w-3/12">
                        Percentage/Amount
                      </Th>
                      <Th className="font-sans pb-4 w-2/12  text-center">Status</Th>
                    </Tr>
                  </Thead>
                  {coupon.map((data, i) => {
                    return (
                      <Tbody key={data.id}>
                        <Tr className="row border-b-2 font-sans">
                          <Td className="pt-8 pb-8">{numb++}.</Td>
                          <Td className=" text-center  ">{data.code}</Td>
                          <Td className="text-center">
                            {data.expires_at.substring(0, 10)}
                          </Td>
                          <Td className="text-center">
                            {data.percent === "percentage" ? (
                              <div>{data.value} %</div>
                            ) : (
                              <div>₹ {data.value}</div>
                            )}
                          </Td>
                          <Td className=" text-center">
                            <div onClick={() => handleCheck(data)}>
                              <ToggleButton
                                defaultChecked={data?.status}
                                value={data?.status}
                              />
                            </div>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              ) : (
                <div className="text-2xl font-sans text-center">
                  No data fount!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <Logo/> */}
    </div>
  );
};

export default DiscountBody;
