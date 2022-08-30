import React from "react";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../ActiveOrder/superadmin.scss";
import "../ActiveOrder/orderdetail.scss";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";
import  Button  from "../UniversalComponents/Button";
import axios from "axios";
import isTouchDevice from "../../helpers/isTouchDevice";
const to12Hours = require("to12hours");

export const DetailOrder = ({ showOrderDetail }) => {
  const {
    show,
    handleShow,
    detailOrder,
    handleActiveData,
    handleNumberOfPages,
  } = useContext(AppContext);
  // const [table, setTable] = useState(0);
  const [isbutton, setIsButton] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("alankartoken");

  let list = [];

  console.log(detailOrder,"detailorder")

  const orderId = detailOrder[0]?.id;

  const handleClose = () => {
    handleShow(false);
  };

  const handleTableTransfer = (e, name) => {
    // setTable(e);
    transfer(e, name);
    getAllOrderscount();
  };

  const getAllOrderscount = async () => {
    const token = localStorage.getItem("alankartoken");
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/active-orders?order_type=1&key=&date=&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    // setActiveOrder(data.data.data.data);
    handleActiveData(data.data.data.data);
    handleNumberOfPages(data.data.data.meta.last_page);
  };

  const transfer = async (id, name) => {
    list = [];
    await axios
      .get(`${BASE_URL}/admin/tables/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        res.data.data.map((item) => {
          return list.push(item);
        });
        transferTable(id, name);
      });
  };

  const transferTable = async (id, name) => {
    Swal.fire({
      title: "<strong>Table Transfer</strong>",
      html: `<div>
      <p class="value">Existing Table :<b>${name}</b></p>
      <select name = "table" id = "table" class="swal2-select" 
      style="text-align:center"; style="display:block;" >
      <option value="">Select a Table</option>
      ${list.map((item) => {
        return `<option value="${item.id}">${item.name}</option>`;
      })}
      <div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Submit",
      confirmButtonClass: "confirm_btn",
      preConfirm: async () => {
        return new Promise((resolve) => {
          resolve([document.getElementById("table").value]);
        });
      },
    }).then((result) => {
      console.log(result.value, "value");
      if (result.value) {
        axios
          .patch(
            `${BASE_URL}/admin/table/transfer/${orderId}`,
            {
              table_id: result.value[0],
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Releasetable(id);
            UpdateTableOccupied(result.value[0]);

            handleClose();
            // window.location.reload();
            getAllOrderscount();

            Swal.fire({
              title: "Success",
              text: "Table transfer successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire({
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkitK8NiMeQBgpqD77bYCmZN60jvMG_JHwVw&usqp=CAU",
              imageWidth: 200,
              imageHeight: 200,
              text: `${err.response.data.errors.table_id}`,
              confirmButtonText: "OK",
              confirmButtonClass: "confirm_btn",
            });
          });
      }
    });
  };

  const Releasetable = async (id) => {
    await axios.patch(
      `${BASE_URL}/admin/tables/status/${id}`,
      {
        status: 1,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };

  const UpdateTableOccupied = async (id) => {
    await axios.patch(
      `${BASE_URL}/admin/tables/status/${id}`,
      {
        status: 2,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };

  const handleSendBill = async (id, table_id) => {
    await axios
      .patch(
        `${BASE_URL}/admin/orders/payment/status/${id}`,
        {
          payment_status: "PENDING",
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateTable(table_id);
        getAllOrderscount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTable = async (table_id) => {
    await axios.patch(
      `${BASE_URL}/admin/tables/status/${table_id}`,
      {
        status: 1,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };

  
  const updateItemStatus = async (id) => {
    console.log(id,"ifkdjf")
    axios.patch(`${BASE_URL}/item/status/update/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    
  };

  const handleSend = () => {
    setIsButton(false);
    Swal.fire({
      title: "Payment",
      html: `<div class="name"><div>Name</div><div class="fieldn"><b>:${detailOrder[0]?.name}</b></div></div>
      <p></p>
      <div class="name"><div>Phone No</div><div class="fieldp"><b>:${detailOrder[0]?.phone}</b></div></div>
      <div class="nam"><b>Are you sure to send bill?</b></div>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `NC`,
      cancelButtonText: "NO",
      confirmButtonClass: "confirm_btn",
      denyButtonClass: "cancel_btn",
      cancelButtonClass: "cancel_btn",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Bill sent successfully",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          confirmButtonClass: "confirm_btn",
          timer: 2000,
        });
        handleSendBill(detailOrder[0]?.id, detailOrder[0]?.table_id);
        setIsButton(true);

        handleClose();
        getAllOrderscount();

        // window.location.reload();
      } else if (result.isDismissed) {
        setIsButton(true);
        Swal.fire({
          icon: "info",
          title: "Bill not sent",
          showConfirmButton: false,
          confirmButtonText: "Ok",
          confirmButtonClass: "confirm_btn",
          timer: 1000,
        });
      } else if (result.isDenied) {
        setIsButton(true);
        Swal.fire({
          input: "textarea",
          inputLabel: "Message",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          confirmButtonText: "Okay",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonClass: "confirm_btn",
          denyButtonClass: "cancel_btn",
        }).then((result) => {
          setIsButton(true);
          if (result.isConfirmed) {
            handleSendNC(detailOrder[0]?.id, detailOrder[0]?.table_id);
            updateItemStatus(detailOrder[0]?.id);
            getAllOrderscount();
            window.location.reload();
          }
        });
      }
    });
  };

  const handleSendNC = async (id, table_id) => {
    await axios
      .patch(
        `${BASE_URL}/admin/orders/payment/status/${id}`,
        {
          payment_status: "PAID",
          total: "0",
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateTable(table_id);
        handleClose();
        getAllOrderscount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrintBill = async (id) => {
    await axios
      .get(`${BASE_URL}/print-bills?id=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        //const linkSource = `data:application/pdf;base64,${res.data.data}`;
        let contentType = "application/pdf";
        const content = res.data.data;
        // console.log(content)
        const sliceSize = 512;
        // method which converts base64 to binary
        const byteCharacters = window.atob(content);

        const byteArrays = [];
        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          // console.log(slice)
          const byteNumbers = new Array(slice.length);
          // console.log(byteNumbers)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          // console.log(byteNumbers)
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        // console.log(byteArrays)
        const blob = new Blob(byteArrays, {
          type: contentType,
        });

        // console.log(blob)
        const blobURL = URL.createObjectURL(blob);
        if (isTouchDevice()) {
          var printWindow = window.open(blobURL, "", "width=800,height=500");
          printWindow.print();
        } else {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = blobURL;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <div className={` ${show ? "nav-menu active" : "nav-menu"}`}>
        {detailOrder.map((e, i) => (
          <div
            className="w-[100vw] h-[100vh] overflow-y-scroll shadow-lg"
            key={i + 1}
          >
            <div className="flex flex-row">
              <div
                className="w-[30vw] lg:w-[70vw] val"
                onClick={handleClose}
              ></div>
              <div className="w-10/12 lg:w-[530px]  border-2 bg-white">
                <div className="flex justify-between">
                  <h1 className=" mt-3 ml-11 font-bold text-2xl">
                    Detail Order
                  </h1>
                  <CloseIcon
                    fontSize="large"
                    className="mt-4"
                    onClick={handleClose}
                  />
                </div>
                <div className="flex justify-around text-xl font-semibold  mt-2">
                  <p>Table No : {detailOrder[0]?.table?.name} </p>
                  <p>Order ID : #{detailOrder[0]?.id} </p>
                  <div className="flex flex-row">
                    <div className="out w-5 h-5 rounded-xl mt-1 mr-1">
                      <div className="in h-2 w-2 rounded-lg ml-1.5 mt-1.5"></div>
                    </div>
                    Live
                  </div>
                </div>
                <h3 className=" font-semibold text-xl py-[7px] mt-4 pl-[50px] bg-bggray">
                  Customer Details
                </h3>
                <div className="flex flex-col gap-3 ml-14">
                  <p className=" mt-4">
                    Name :
                    <span className=" font-semibold pl-16">
                      {" "}
                      {detailOrder[0]?.name}
                    </span>
                  </p>
                  <p className=" mb-4">
                    Phone No :{" "}
                    <span className=" font-semibold pl-9">
                      {" "}
                      {detailOrder[0]?.phone}
                    </span>
                  </p>
                </div>
                <h3 className=" font-semibold text-xl py-[7px]  pl-[50px] bg-bggray">
                  Order Details
                </h3>
                <div className="flex flex-col gap-3 ml-14">
                  <p className="mt-4">
                    Captain Name : {detailOrder[0]?.table?.users[0]?.name}
                  </p>
                  <p>
                    Waiter Name :{" "}
                    <span className=" font-semibold pl-4">
                      {" "}
                      {detailOrder[0]?.table?.users[0]?.name}
                    </span>
                  </p>
                  <p className="mb-4">
                    Session:
                    <span className=" font-semibold pl-14">
                      {" "}
                      {to12Hours(detailOrder[0].created_at?.slice(11, 16))}
                    </span>
                  </p>
                </div>
                <h3 className=" font-semibold text-xl py-[7px]  pl-[50px] bg-bggray">
                  Table Summary
                </h3>
                {detailOrder[0].meta_order.map((e, i) => (
                  <div key={i + 1} className="flex gap-5 mt-4 ml-11">
                    <p className=" relative top-1 flex justify-center pt-[6px] w-9 h-9 rounded-[50%] bg-gray-300 font-medium ">
                      {i + 1}
                    </p>

                    <p className="relative top-3 w-3/12">{e?.menus?.name}</p>
                    <p className="relative top-3 w-1/12">x {e.quantity}</p>
                    <p className="relative top-3 w-1/12">₹ {e.menus.dinein_price}</p>
                    <div className=" ml-7  font-semibold">
                      {e.status === 1 ? (
                        <div className="one h-10 w-28 text-center pt-1.5 rounded-lg">
                          New
                        </div>
                      ) : (
                        <div>
                          {e.status === 2 ? (
                            <div className="two h-10 w-28 text-center pt-1.5  rounded-lg">
                              Cooking
                            </div>
                          ) : (
                            <div>
                              {e.status === 3 ? (
                                <div className="three h-10 w-28 text-center pt-1.5 rounded-lg">
                                  Ready to serve
                                </div>
                              ) : (
                                <div className="four h-10 w-28 text-center pt-1.5 rounded-lg">
                                  Served
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <h3 className="font-semibold text-xl py-[7px] mt-4 pl-[50px] bg-bggray">
                  Bill
                </h3>
                <div className="flex justify-between mx-14 mt-4 mb-5">
                  <p className="font-semibold">Subtotal</p>
                  <p className="">₹ {detailOrder[0]?.sub_toal}</p>
                </div>
                <div className="flex justify-between mx-14">
                  <p className="">GST</p>
                  <p className="">₹ {detailOrder[0].tax}</p>
                </div>
                <div className="flex justify-between mx-14">
                  <p className="">Discount </p>
                  <p className="">₹ {detailOrder[0]?.discount}</p>
                </div>
                <p className="border-b-2 mt-7 border-darkyellow mx-14"></p>
                <div className="flex text-2xl font-bold mt-6 justify-between mx-14">
                  <p className="">Total Bill</p>
                  <p className="">₹{detailOrder[0].total} </p>
                </div>
                <div className="mt-28 mb-28  lg:mt-36 flex justify-evenly lg:mb-3 ">
                  {isbutton ? (
                    <Button
                      onClick={handleSend}
                      text="Send Bill"
                      className=" w-[150px] py-3"
                    />
                  ) : (
                    <Button text="Sending Bill.." className=" w-[150px] py-3" />
                  )}
                  {/* <Link to="print-bill">  */}
                  <Button
                    onClick={() => {
                      handlePrintBill(orderId);
                    }}
                    text="Print Bill"
                    className=" w-[150px] py-3 Btn"
                  />
                  {/* </Link> */}
                  <Button
                    className=" w-[150px] py-3 text-white font-semibold Btn px-1"
                    text="Table Transfer"
                    onClick={() => {
                      handleTableTransfer(
                        detailOrder[0]?.table_id,
                        detailOrder[0]?.table?.name
                      );
                    }}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
