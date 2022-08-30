import { useState } from "react";
import { Link, useLocation} from "react-router-dom";
import "./style.scss";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
//images
import poweredbyscube from "../../Images/Sidenavbar/poweredbyscube.svg";
import alankarnav from "../../Images/alan.png";

const SideMenu = () => {
  const [openSubMenu, setOpenMenuStatus] = useState(false);
  const [openWSubMenu, setOpenWMenuStatus] = useState(false);
  const role = localStorage.getItem("role").toLocaleLowerCase();
 // const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [isActive, setIsActive] = useState(false);
  const [isWActive, setIsWActive] = useState(false);
  const [kds, setKds] = useState(false);

  const [takeaway, setTakeaway] = useState(false);
  const [wtakeaway, setWTakeaway] = useState(false);

  const [partyorder, setPartyorder] = useState(false);
  const [wpartyorder, setWPartyorder] = useState(false);
  const [report, setReport] = useState(false);
  const [setting, setSetting] = useState(false);

  const handleMenuActive = () => {
    setIsActive(true);
    setOpenMenuStatus(true);
  };

  const handleMenuInActive = () => {
    setIsActive(false);
  };

  //waiter dinein
  const handleMenuWActive = () => {
    setIsWActive(true);
    setOpenWMenuStatus(true);
  };

  const handleMenuInWActive = () => {
    setIsWActive(false);
  };

  //for kds
  const handleKDS = () => {
    setKds(true);
    setOpenMenuStatus(true);
  };

  const handleDKDS = () => {
    setKds(false);
  };

  //for takeaway
  const handleTakeaway = () => {
    setTakeaway(true);
    setOpenMenuStatus(true);
  };

  const handleDTakeaway = () => {
    setTakeaway(false);
  };

   //for waiter takeaway
   const handleWTakeaway = () => {
    setWTakeaway(true);
    setOpenWMenuStatus(true);
  };

  const handleWDTakeaway = () => {
    setWTakeaway(false);
  };

  //for partyorder
  const handlePartyorder = () => {
    setPartyorder(true);
    setOpenMenuStatus(true);
  };

  const handleDPartyorder = () => {
    setPartyorder(false);
  };

  //for Waiter partyorder
  const handleWPartyorder = () => {
    setWPartyorder(true);
    setOpenWMenuStatus(true);
  };

  const handleWDPartyorder = () => {
    setWPartyorder(false);
  };

  //for report
  const handleReport = () => {
    setReport(true);
    setOpenMenuStatus(true);
  };

  const handleDReport = () => {
    setReport(false);
  };

  //for report
  const handleSetting = () => {
    setSetting(true);
    setOpenMenuStatus(true);
  };

  const handleDSetting = () => {
    setSetting(false);
  };



  return (
    <>
      <aside className="side-bar h-screen">
        <div className="header-logo">
          <span>
            <img className="h-14 lg:h-40" src={alankarnav} alt="navbar" />
          </span>
        </div>

        <div className=" silder-links p-2 mb-16 flex flex-col h-full ">
          <nav className="">
            {role === "admin" ? (
              <div>
                {/* Dashboard */}
                <div className="w-full mb-0.5">
                  <Link
                    to={`/menu/dashboard`}
                    onClick={() => setOpenMenuStatus(true)}
                  >
                    <div
                      onClick={() => setOpenMenuStatus(true)}
                      className={`flex place-items-start lg:gap-4 w-full lg:px-0  lg:p-1 ${
                        pathname.includes("/menu/dashboard")
                          ? "text-white bg-darkyellow py-2  lg:px-2 lg:py-2 flex justify-center lg:justify-start rounded-md"
                          : ""
                      }`}
                    >
                      {pathname.includes("/menu/dashboard") ? (
                        <svg
                          width="18"
                          height="18"
                          className="mt-1"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          className="mt-1 ml-1"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                            fill="black"
                          />
                        </svg>
                      )}
                      <div
                        className={`hidden lg:block text-base 2xl:text-base  ml-1  ${
                          pathname.includes("/menu/dashboard")
                            ? "text-white"
                            : ""
                        }`}
                      >
                        Dashboard
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Dinein */}
                <div className="w-full">
                  <div
                    onClick={handleMenuActive}
                    className={`flex place-items-start lg:gap-8 mt-1 lg:mt-0 w-full py-2  lg:px-0 lg:pb-2 gap-3 lg:pt-1 lg:p-1 ${
                      pathname.includes("/menu/dinein")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/dinein`} onClick={handleMenuActive}>
                      <div className="flex mt-1 lg:gap-4">
                        {/* Image */}
                        <div>
                          {pathname.includes("/menu/dinein") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9582 22H19.3164C20.0036 22 20.5682 21.4761 20.65 20.8049L22 7.31514H17.9091V4H16.2973V7.31514H12.2309L12.4764 9.23056C13.8755 9.61528 15.1845 10.3111 15.97 11.0805C17.1482 12.2428 17.9582 13.4461 17.9582 15.4106V22ZM4 21.1814V20.3711H16.2973V21.1814C16.2973 21.6317 15.9291 22 15.4709 22H4.82636C4.36818 22 4 21.6317 4 21.1814ZM16.2973 15.4516C16.2973 8.90314 4 8.90314 4 15.4516H16.2973ZM4.01636 17.0969H16.2891V18.734H4.01636V17.0969Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              className="ml-1"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.9582 18H15.3164C16.0036 18 16.5682 17.4761 16.65 16.8049L18 3.31514H13.9091V0H12.2973V3.31514H8.23091L8.47636 5.23056C9.87545 5.61528 11.1845 6.31105 11.97 7.08049C13.1482 8.24284 13.9582 9.44611 13.9582 11.4106V18ZM0 17.1814V16.3711H12.2973V17.1814C12.2973 17.6317 11.9291 18 11.4709 18H0.826364C0.368182 18 0 17.6317 0 17.1814ZM12.2973 11.4516C12.2973 4.90314 0 4.90314 0 11.4516H12.2973ZM0.0163636 13.0969H12.2891V14.734H0.0163636V13.0969Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-base ml-1 mr-1.5 2xl:text-base ${
                            pathname.includes("/menu/dinein")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Dine - In
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                          className={`lg:mr-3 lg:ml-16 ml-3 mt-1 lg:mt-2 mr-3  cursor-pointer ${
                            pathname.includes("dinein")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("dinein") && openSubMenu ? (
                    <div className="bg-search py-1 rounded-lg ml-1 ">
                      {/* Dashboard data    */}
                      <Link
                        to={`/menu/dinein/${"Dashboard"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setIsActive(true)}
                          style={{
                            backgroundColor: isActive ? "#F7BF41" : "",
                            borderRadius: isActive ? "8px" : "",
                          }}
                          className={`flex w-full py-2 justify-center   lg:justify-start   ${
                            pathname.includes(
                              "Dashboard".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-5 lg:pl-5">
                            <div>
                              {isActive ? (
                                <svg
                                  width="18"
                                  className="mt-1"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: isActive ? "white" : "",
                              }}
                              className={`hidden lg:block text-sm  2xl:text-base ${
                                pathname.includes("/menu/dinein/dashboard")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Dashboard
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Active order data */}
                      <Link
                        to={
                          `/menu/dinein/${"Active Order"
                            .toLowerCase()
                            .replace(" ", "-")}` ||
                          `/menu/dinein/${"Create New Order"
                            .toLowerCase()
                            .replace(" ", "-")}`
                        }
                      >
                        <div
                          onClick={handleMenuInActive}
                          className={`flex  py-2 w-full justify-center lg:justify-start ${
                            pathname.includes(
                              "Active Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/active-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block  text-sm 2xl:text-base ${
                                pathname.includes("/menu/dinein/active-order")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Active Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Create Order */}
                      <Link to={`/menu/dinein/${"create-new-order"}`}>
                        <div
                          onClick={handleMenuInActive}
                          className={`flex  py-2 w-full justify-center lg:justify-start ${
                            pathname.includes("create-new-order")
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/create-new-order"
                              ) ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block ml-2  text-sm 2xl:text-base ${
                                pathname.includes(
                                  "/menu/dinein/create-new-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Past order */}
                      <Link
                        to={`/menu/dinein/${"Past Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleMenuInActive}
                          className={`flex  py-2 w-full  justify-center lg:justify-start    ${
                            pathname.includes(
                              "Past Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/dinein/past-order") ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/dinein/past-order")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Past Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Manage Table */}
                      <Link
                        to={`/menu/dinein/${"Manage Table"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleMenuInActive}
                          className={`flex w-full  py-2   justify-center lg:justify-start    ${
                            pathname.includes(
                              "Manage Table".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-5 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/manage-table"
                              ) ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.63158 7.02H11.3684V18H6.63158V7.02ZM13.2632 18H16.1053C17.1474 18 18 17.1 18 16V7H13.2632V18ZM16.1053 0H1.89474C0.852632 0 0 0.9 0 2V5H18V2C18 0.9 17.1474 0 16.1053 0ZM0 16C0 17.1 0.852632 18 1.89474 18H4.73684V7H0V16Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.63158 7.02H11.3684V18H6.63158V7.02ZM13.2632 18H16.1053C17.1474 18 18 17.1 18 16V7H13.2632V18ZM16.1053 0H1.89474C0.852632 0 0 0.9 0 2V5H18V2C18 0.9 17.1474 0 16.1053 0ZM0 16C0 17.1 0.852632 18 1.89474 18H4.73684V7H0V16Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/dinein/manage-table")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Manage Tables
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* KDS */}
                <div className="w-full  mb-1">
                  <div
                    onClick={handleKDS}
                    className={`flex place-items-start lg:gap-16 w-full py-2  lg:px-0 gap-3 lg:pt-2 lg:pb-1 lg:pl-1 ${
                      pathname.includes("/menu/kds")
                        ? "text-white bg-darkyellow lg:px-2 py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/kds`} onClick={handleKDS}>
                      <div className="flex pl-1 lg:pl-0 lg:gap-6">
                        {/* Image */}
                        <div>
                          {pathname.includes("/menu/kds") ? (
                            <svg
                              width="18"
                              height="19"
                              className="mt-1"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6.60375V13.2092H3.90233H7.80465V14.1702V15.1313L7.53392 15.1536C4.99206 15.3874 3.66318 16.0293 3.93392 16.894C4.03586 17.2168 4.58082 17.5879 5.25233 17.792C6.4688 18.1594 8.44806 18.3339 10.0969 18.2188C12.3609 18.0592 13.7812 17.5916 14.0519 16.92C14.1293 16.7308 14.0942 16.4673 13.9711 16.2817C13.6019 15.7325 12.3399 15.3244 10.4696 15.1536L10.1953 15.1313V14.1702V13.2092H14.0977H18V6.60375V-0.00165338H9H0V6.60375ZM17.4023 6.56653V12.5783H9H0.597673V6.56653V0.554775H9H17.4023V6.56653Z"
                                fill="white"
                              />
                              <path
                                d="M1.19531 6.56443V11.9453H8.99996H16.8046V6.56443V1.18355H8.99996H1.19531V6.56443ZM4.41199 2.87203C4.46819 2.93136 4.49996 3.00193 4.49996 3.08355C4.49996 3.18747 4.42264 3.28402 3.82496 3.91858C3.06915 4.71639 3.01294 4.75361 2.81954 4.57912C2.73156 4.50118 2.70694 4.44923 2.70694 4.34531C2.70694 4.21909 2.75268 4.15977 3.38543 3.49554C4.02535 2.82027 4.0709 2.77936 4.19396 2.77936C4.28911 2.77936 4.35229 2.80534 4.41199 2.87203ZM5.8957 2.86098C6.00113 2.98351 6.02225 3.0948 5.96256 3.21345C5.93445 3.26909 5.69182 3.5475 5.42458 3.82571C4.97109 4.30072 4.92535 4.33775 4.80229 4.33775C4.6335 4.33775 4.49996 4.20416 4.49996 4.03724C4.49996 3.93332 4.56682 3.84433 5.03427 3.34703C5.52652 2.82376 5.57923 2.77936 5.69513 2.77936C5.78311 2.77936 5.84647 2.80534 5.8957 2.86098ZM7.40035 2.87203C7.46005 2.93136 7.48833 3.00193 7.48833 3.08723C7.48833 3.19484 7.45325 3.25048 7.25286 3.462C7.05578 3.66247 6.9926 3.70706 6.89764 3.70706C6.73582 3.70706 6.60927 3.56611 6.60927 3.39162C6.60927 3.27278 6.64086 3.22082 6.83427 3.01686C7.02768 2.8127 7.0769 2.77936 7.18931 2.77936C7.27729 2.77936 7.34066 2.80534 7.40035 2.87203ZM6.51082 3.81098C6.5459 3.84433 6.58117 3.92595 6.59513 3.98915C6.62672 4.1524 6.47207 4.33794 6.30676 4.33794C5.99378 4.33794 5.89901 3.91122 6.16974 3.74797C6.25772 3.69601 6.43349 3.72567 6.51082 3.81098ZM4.42613 4.4752C4.58776 4.66811 4.45074 4.96882 4.19415 4.96882C3.95868 4.96882 3.82496 4.69429 3.95868 4.49382C4.07807 4.31564 4.28194 4.30828 4.42613 4.4752ZM5.92031 4.44923C5.96605 4.49382 5.99066 4.57176 5.99066 4.65338C5.99066 4.77959 5.90984 4.87227 4.57031 6.2899C3.78639 7.11369 3.11837 7.80021 3.08329 7.81145C2.90403 7.87078 2.70713 7.70385 2.70713 7.49601C2.70713 7.37348 2.79143 7.27344 4.0676 5.9225C4.81992 5.12838 5.48078 4.44554 5.53717 4.40851C5.66005 4.32301 5.81837 4.33794 5.92031 4.44923ZM3.82496 5.1024C3.97962 5.28794 3.91992 5.42152 3.46992 5.88547C3.17458 6.19354 3.12535 6.23057 3.00945 6.23057C2.83717 6.23057 2.70713 6.09699 2.70713 5.9225C2.70713 5.8149 2.75635 5.74801 3.11139 5.38061C3.49454 4.97987 3.51915 4.96126 3.62825 4.98355C3.69143 4.9948 3.77923 5.04676 3.82496 5.1024Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="19"
                              className="mt-1"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6.60375V13.2092H3.90233H7.80465V14.1702V15.1313L7.53392 15.1536C4.99206 15.3874 3.66318 16.0293 3.93392 16.894C4.03586 17.2168 4.58082 17.5879 5.25233 17.792C6.4688 18.1594 8.44806 18.3339 10.0969 18.2188C12.3609 18.0592 13.7812 17.5916 14.0519 16.92C14.1293 16.7308 14.0942 16.4673 13.9711 16.2817C13.6019 15.7325 12.3399 15.3244 10.4696 15.1536L10.1953 15.1313V14.1702V13.2092H14.0977H18V6.60375V-0.00165338H9H0V6.60375ZM17.4023 6.56653V12.5783H9H0.597673V6.56653V0.554775H9H17.4023V6.56653Z"
                                fill="black"
                              />
                              <path
                                d="M1.19531 6.56443V11.9453H8.99996H16.8046V6.56443V1.18355H8.99996H1.19531V6.56443ZM4.41199 2.87203C4.46819 2.93136 4.49996 3.00193 4.49996 3.08355C4.49996 3.18747 4.42264 3.28402 3.82496 3.91858C3.06915 4.71639 3.01294 4.75361 2.81954 4.57912C2.73156 4.50118 2.70694 4.44923 2.70694 4.34531C2.70694 4.21909 2.75268 4.15977 3.38543 3.49554C4.02535 2.82027 4.0709 2.77936 4.19396 2.77936C4.28911 2.77936 4.35229 2.80534 4.41199 2.87203ZM5.8957 2.86098C6.00113 2.98351 6.02225 3.0948 5.96256 3.21345C5.93445 3.26909 5.69182 3.5475 5.42458 3.82571C4.97109 4.30072 4.92535 4.33775 4.80229 4.33775C4.6335 4.33775 4.49996 4.20416 4.49996 4.03724C4.49996 3.93332 4.56682 3.84433 5.03427 3.34703C5.52652 2.82376 5.57923 2.77936 5.69513 2.77936C5.78311 2.77936 5.84647 2.80534 5.8957 2.86098ZM7.40035 2.87203C7.46005 2.93136 7.48833 3.00193 7.48833 3.08723C7.48833 3.19484 7.45325 3.25048 7.25286 3.462C7.05578 3.66247 6.9926 3.70706 6.89764 3.70706C6.73582 3.70706 6.60927 3.56611 6.60927 3.39162C6.60927 3.27278 6.64086 3.22082 6.83427 3.01686C7.02768 2.8127 7.0769 2.77936 7.18931 2.77936C7.27729 2.77936 7.34066 2.80534 7.40035 2.87203ZM6.51082 3.81098C6.5459 3.84433 6.58117 3.92595 6.59513 3.98915C6.62672 4.1524 6.47207 4.33794 6.30676 4.33794C5.99378 4.33794 5.89901 3.91122 6.16974 3.74797C6.25772 3.69601 6.43349 3.72567 6.51082 3.81098ZM4.42613 4.4752C4.58776 4.66811 4.45074 4.96882 4.19415 4.96882C3.95868 4.96882 3.82496 4.69429 3.95868 4.49382C4.07807 4.31564 4.28194 4.30828 4.42613 4.4752ZM5.92031 4.44923C5.96605 4.49382 5.99066 4.57176 5.99066 4.65338C5.99066 4.77959 5.90984 4.87227 4.57031 6.2899C3.78639 7.11369 3.11837 7.80021 3.08329 7.81145C2.90403 7.87078 2.70713 7.70385 2.70713 7.49601C2.70713 7.37348 2.79143 7.27344 4.0676 5.9225C4.81992 5.12838 5.48078 4.44554 5.53717 4.40851C5.66005 4.32301 5.81837 4.33794 5.92031 4.44923ZM3.82496 5.1024C3.97962 5.28794 3.91992 5.42152 3.46992 5.88547C3.17458 6.19354 3.12535 6.23057 3.00945 6.23057C2.83717 6.23057 2.70713 6.09699 2.70713 5.9225C2.70713 5.8149 2.75635 5.74801 3.11139 5.38061C3.49454 4.97987 3.51915 4.96126 3.62825 4.98355C3.69143 4.9948 3.77923 5.04676 3.82496 5.1024Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-sm lg:mr-3 2xl:text-base ${
                            pathname.includes("/menu/kds") ? "text-white" : ""
                          }`}
                        >
                          KDS
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                          
                          className={`lg:mr-4 lg:ml-20 ml-3 mt-0.5 mr-3  cursor-pointer ${
                            pathname.includes("kds")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("kds") && openSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">
                      {/* View KDS    */}
                      <Link
                        to={`/menu/kds/${"View KDS"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setKds(true)}
                          style={{
                            backgroundColor: kds ? "#F7BF41" : "",
                            borderRadius: kds ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "View KDS".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-6 lg:pl-4">
                            <div>
                              {kds ? (
                                <svg
                                  width="18"
                                  height="12"
                                  className="mt-1.5"
                                  viewBox="0 0 18 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.5406 6C17.5406 5.64119 17.3465 5.40556 16.9583 4.93429C15.5382 3.21014 12.406 0 8.77027 0C5.13454 0 2.00233 3.21014 0.582243 4.93429C0.194081 5.40556 9.86529e-09 5.64119 0 6C-9.86529e-09 6.35881 0.194081 6.59444 0.582243 7.06571C2.00233 8.78986 5.13454 12 8.77027 12C12.406 12 15.5382 8.78986 16.9583 7.06571C17.3465 6.59444 17.5406 6.35881 17.5406 6ZM8.77027 9C10.4271 9 11.7703 7.65685 11.7703 6C11.7703 4.34315 10.4271 3 8.77027 3C7.11342 3 5.77027 4.34315 5.77027 6C5.77027 7.65685 7.11342 9 8.77027 9Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="12"
                                  className="mt-1.5"
                                  viewBox="0 0 18 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.5406 6C17.5406 5.64119 17.3465 5.40556 16.9583 4.93429C15.5382 3.21014 12.406 0 8.77027 0C5.13454 0 2.00233 3.21014 0.582243 4.93429C0.194081 5.40556 9.86529e-09 5.64119 0 6C-9.86529e-09 6.35881 0.194081 6.59444 0.582243 7.06571C2.00233 8.78986 5.13454 12 8.77027 12C12.406 12 15.5382 8.78986 16.9583 7.06571C17.3465 6.59444 17.5406 6.35881 17.5406 6ZM8.77027 9C10.4271 9 11.7703 7.65685 11.7703 6C11.7703 4.34315 10.4271 3 8.77027 3C7.11342 3 5.77027 4.34315 5.77027 6C5.77027 7.65685 7.11342 9 8.77027 9Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: kds ? "white" : "",
                              }}
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/kds/view-kds")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              View KDS
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Create KDS */}
                      <Link
                        to={`/menu/kds/${"Create KDS"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDKDS}
                          className={`flex w-full justify-center lg:justify-start py-2 ${
                            pathname.includes(
                              "Create KDS".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes("/menu/kds/create-kds") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>
                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/kds/create-kds")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create KDS
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Manage Menu */}
                <div className="w-full mb-2.5 mt-2.5 ">
                  <Link
                    to={`/menu/manage-menu`}
                    onClick={() => setOpenMenuStatus(true)}
                  >
                    <div
                      onClick={() => setOpenMenuStatus(true)}
                      className={`flex place-items-start lg:gap-4 w-full  lg:px-0  ${
                        pathname.includes("/menu/manage-menu")
                          ? "text-white bg-darkyellow py-2 flex justify-center lg:justify-start  rounded-md"
                          : ""
                      }`}
                    >
                      {pathname.includes("/menu/manage-menu") ? (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.15825 6.25279H9.41904C10.5236 6.25279 11.419 7.14822 11.419 8.25279C11.419 9.35736 10.5236 10.2528 9.41904 10.2528H7.13097V11.6323H9.41904C10.5236 11.6323 11.419 12.5277 11.419 13.6323C11.419 14.7368 10.5236 15.6323 9.41904 15.6323H7.13097V17.0117H9.41904C10.5236 17.0117 11.419 17.9072 11.419 19.0117C11.419 20.1163 10.5236 21.0117 9.41904 21.0117H7.33107C7.41722 21.2687 7.54046 21.4773 7.71676 21.6536C8.30254 22.2394 9.24535 22.2394 11.131 22.2394H18.0005C19.8861 22.2394 20.8289 22.2394 21.4147 21.6536C22.0005 21.0678 22.0005 20.125 22.0005 18.2394V7.94922C22.0005 6.0636 22.0005 5.12079 21.4147 4.53501C20.8289 3.94922 19.8861 3.94922 18.0005 3.94922H11.131C9.24535 3.94922 8.30254 3.94922 7.71676 4.53501C7.34173 4.91003 7.2068 5.43139 7.15825 6.25279ZM17.4253 11.4051C16.873 11.4051 16.4253 10.9574 16.4253 10.4051V8.25336C16.4253 7.70107 16.873 7.25336 17.4253 7.25336C17.9776 7.25336 18.4253 7.70107 18.4253 8.25336V10.4051C18.4253 10.9574 17.9776 11.4051 17.4253 11.4051ZM4.84277 7.25392C4.29049 7.25392 3.84277 7.70164 3.84277 8.25392C3.84277 8.8062 4.29049 9.25392 4.84277 9.25392H9.418C9.97029 9.25392 10.418 8.8062 10.418 8.25392C10.418 7.70164 9.97029 7.25392 9.418 7.25392H4.84277ZM4.84277 12.6334C4.29049 12.6334 3.84277 13.0811 3.84277 13.6334C3.84277 14.1857 4.29049 14.6334 4.84277 14.6334H9.418C9.97029 14.6334 10.418 14.1857 10.418 13.6334C10.418 13.0811 9.97029 12.6334 9.418 12.6334H4.84277ZM4.84277 18.0128C4.29049 18.0128 3.84277 18.4606 3.84277 19.0128C3.84277 19.5651 4.29049 20.0128 4.84277 20.0128H9.418C9.97029 20.0128 10.418 19.5651 10.418 19.0128C10.418 18.4606 9.97029 18.0128 9.418 18.0128H4.84277Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.15825 6.25279H9.41904C10.5236 6.25279 11.419 7.14822 11.419 8.25279C11.419 9.35736 10.5236 10.2528 9.41904 10.2528H7.13097V11.6323H9.41904C10.5236 11.6323 11.419 12.5277 11.419 13.6323C11.419 14.7368 10.5236 15.6323 9.41904 15.6323H7.13097V17.0117H9.41904C10.5236 17.0117 11.419 17.9072 11.419 19.0117C11.419 20.1163 10.5236 21.0117 9.41904 21.0117H7.33107C7.41722 21.2687 7.54046 21.4773 7.71676 21.6536C8.30254 22.2394 9.24535 22.2394 11.131 22.2394H18.0005C19.8861 22.2394 20.8289 22.2394 21.4147 21.6536C22.0005 21.0678 22.0005 20.125 22.0005 18.2394V7.94922C22.0005 6.0636 22.0005 5.12079 21.4147 4.53501C20.8289 3.94922 19.8861 3.94922 18.0005 3.94922H11.131C9.24535 3.94922 8.30254 3.94922 7.71676 4.53501C7.34173 4.91003 7.2068 5.43139 7.15825 6.25279ZM17.4253 11.4051C16.873 11.4051 16.4253 10.9574 16.4253 10.4051V8.25336C16.4253 7.70107 16.873 7.25336 17.4253 7.25336C17.9776 7.25336 18.4253 7.70107 18.4253 8.25336V10.4051C18.4253 10.9574 17.9776 11.4051 17.4253 11.4051ZM4.84277 7.25392C4.29049 7.25392 3.84277 7.70164 3.84277 8.25392C3.84277 8.8062 4.29049 9.25392 4.84277 9.25392H9.418C9.97029 9.25392 10.418 8.8062 10.418 8.25392C10.418 7.70164 9.97029 7.25392 9.418 7.25392H4.84277ZM4.84277 12.6334C4.29049 12.6334 3.84277 13.0811 3.84277 13.6334C3.84277 14.1857 4.29049 14.6334 4.84277 14.6334H9.418C9.97029 14.6334 10.418 14.1857 10.418 13.6334C10.418 13.0811 9.97029 12.6334 9.418 12.6334H4.84277ZM4.84277 18.0128C4.29049 18.0128 3.84277 18.4606 3.84277 19.0128C3.84277 19.5651 4.29049 20.0128 4.84277 20.0128H9.418C9.97029 20.0128 10.418 19.5651 10.418 19.0128C10.418 18.4606 9.97029 18.0128 9.418 18.0128H4.84277Z"
                            fill="black"
                          />
                        </svg>
                      )}
                      <div
                        className={`hidden lg:block text-base 2xl:text-base  ml-1  ${
                          pathname.includes("/menu/manage-menu")
                            ? "text-white"
                            : ""
                        }`}
                      >
                        Manage Menu
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Manage Category */}
                <div className="w-full mb-3 mt-3">
                  <Link
                    to={`/menu/manage-category`}
                    onClick={() => setOpenMenuStatus(true)}
                  >
                    <div
                      onClick={() => setOpenMenuStatus(true)}
                      className={`flex place-items-start lg:gap-4 w-full   lg:px-0  ${
                        pathname.includes("/menu/manage-category")
                          ? "text-white bg-darkyellow py-1 lg:py-2 flex justify-center lg:justify-start rounded-md"
                          : ""
                      }`}
                    >
                      {pathname.includes("/menu/manage-category") ? (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          className=""
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5744 4L7.33496 12.5736H17.8139L12.5744 4Z"
                            fill="white"
                          />
                          <path
                            d="M17.8132 23.0502C20.1807 23.0502 22.1 21.1309 22.1 18.7634C22.1 16.3958 20.1807 14.4766 17.8132 14.4766C15.4456 14.4766 13.5264 16.3958 13.5264 18.7634C13.5264 21.1309 15.4456 23.0502 17.8132 23.0502Z"
                            fill="white"
                          />
                          <path
                            d="M4 14.957H11.621V22.5781H4V14.957Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5744 4L7.33496 12.5736H17.8139L12.5744 4Z"
                            fill="black"
                          />
                          <path
                            d="M17.8132 23.0502C20.1807 23.0502 22.1 21.1309 22.1 18.7634C22.1 16.3958 20.1807 14.4766 17.8132 14.4766C15.4456 14.4766 13.5264 16.3958 13.5264 18.7634C13.5264 21.1309 15.4456 23.0502 17.8132 23.0502Z"
                            fill="black"
                          />
                          <path
                            d="M4 14.957H11.621V22.5781H4V14.957Z"
                            fill="black"
                          />
                        </svg>
                      )}
                      <div
                        className={`hidden lg:block text-base 2xl:text-base  ml-1  ${
                          pathname.includes("/menu/manage-category")
                            ? "text-white"
                            : ""
                        }`}
                      >
                        Manage category
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Take Away */}
                <div className="w-full mt-1">
                  <div
                    onClick={handleTakeaway}
                    className={`flex place-items-start lg:gap-6 w-full py-2  lg:px-0 gap-2 lg:py-2 lg:p-1 ${
                      pathname.includes("/menu/take-away")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/take-away`} onClick={handleTakeaway}>
                      <div className="flex lg:gap-4 ">
                        <div>
                          {/* Image */}
                          {pathname.includes("/menu/take-away") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6394 7.85119C12.4848 8.15394 12.4238 8.49624 12.4641 8.83413C12.5004 9.09206 12.6028 9.33607 12.7611 9.54227C12.9194 9.74847 13.1282 9.90978 13.3671 10.0104C13.6061 10.1111 13.8669 10.1476 14.124 10.1163C14.3812 10.0851 14.6259 9.98729 14.8342 9.8324C15.3409 9.4626 15.8249 9.06597 16.3202 8.68276C16.3679 8.64636 16.4193 8.61378 16.5107 8.55055C16.3202 9.20584 16.143 9.81324 15.9639 10.4206C15.7163 11.2637 15.468 12.1055 15.219 12.946C15.1552 13.1656 15.1244 13.3936 15.1276 13.6224C15.1276 16.6561 15.1276 19.688 15.1276 22.7179C15.1276 22.8961 15.1009 22.9593 14.9008 22.9574C11.2962 22.9574 7.69157 22.9574 4.08693 22.9574C3.89641 22.9574 3.85449 22.9114 3.85449 22.7236C3.85449 19.6873 3.85449 16.6536 3.85449 13.6224C3.85469 13.4444 3.88101 13.2675 3.93261 13.0974C4.43431 11.4061 4.93157 9.71488 5.42438 8.02364C5.46248 7.89335 5.5063 7.83203 5.6511 7.83203C7.93734 7.83203 10.2198 7.83203 12.4984 7.83203C12.5403 7.84353 12.5803 7.84736 12.6394 7.85119ZM9.32051 14.1339C9.32051 13.8044 9.32051 13.5745 9.32051 13.3464C9.32051 13.3017 9.31174 13.2573 9.2947 13.2159C9.27766 13.1745 9.25268 13.137 9.22119 13.1053C9.18969 13.0736 9.15231 13.0485 9.11117 13.0313C9.07002 13.0142 9.02592 13.0054 8.98139 13.0054C8.93685 13.0054 8.89275 13.0142 8.85161 13.0313C8.81046 13.0485 8.77308 13.0736 8.74159 13.1053C8.7101 13.137 8.68512 13.1745 8.66808 13.2159C8.65103 13.2573 8.64226 13.3017 8.64226 13.3464C8.64226 13.517 8.64226 13.6894 8.64226 13.8619C8.64226 14.3849 8.64226 14.3811 8.11262 14.3696C7.99259 14.3696 7.95258 14.3351 7.95639 14.2125C7.95639 13.927 7.95639 13.6377 7.95639 13.3541C7.95903 13.3073 7.95202 13.2605 7.93577 13.2166C7.91953 13.1727 7.89442 13.1326 7.86202 13.099C7.82962 13.0653 7.79064 13.0388 7.74753 13.021C7.70442 13.0033 7.65812 12.9947 7.61155 12.9958C7.56608 12.9975 7.5214 13.0083 7.48016 13.0277C7.43892 13.047 7.40194 13.0744 7.3714 13.1084C7.34086 13.1423 7.31739 13.182 7.30235 13.2252C7.28731 13.2684 7.28103 13.3142 7.28385 13.3599C7.28385 13.5246 7.28385 13.6894 7.28385 13.8523C7.28385 14.3926 7.28385 14.3888 6.74087 14.3696C6.62656 14.3696 6.59608 14.3294 6.59989 14.2202C6.59989 13.9558 6.59989 13.6913 6.59989 13.4269C6.59989 13.1625 6.46462 12.9958 6.25314 12.9958C6.04166 12.9958 5.92926 13.1529 5.90449 13.4173C5.78683 14.3015 5.98973 15.1986 6.47605 15.9446C6.47605 15.9561 6.48748 15.9695 6.4951 15.981C6.56291 16.0964 6.58852 16.2319 6.5675 16.3642C6.47224 17.6193 6.37698 18.8724 6.29696 20.1274C6.28581 20.2698 6.30434 20.413 6.35137 20.5479C6.3984 20.6827 6.4729 20.8062 6.57009 20.9105C6.66727 21.0147 6.78502 21.0974 6.9158 21.1532C7.04658 21.2091 7.18751 21.2369 7.32958 21.2349C7.5201 21.2349 7.69919 21.2349 7.88209 21.2349C8.02669 21.2382 8.17036 21.2107 8.30364 21.1542C8.43693 21.0977 8.55682 21.0135 8.65544 20.9071C8.75405 20.8007 8.82916 20.6745 8.87581 20.5368C8.92247 20.3991 8.93962 20.253 8.92614 20.1082C8.85374 19.0314 8.78706 17.9546 8.68608 16.8816C8.6152 16.4178 8.7068 15.9437 8.94519 15.5403C9.23097 15.0786 9.43864 14.5938 9.32051 14.1339ZM12.3936 15.7147C12.3936 14.7969 12.3765 14.1608 12.3936 13.5246C12.4107 13.0169 12.1478 12.9498 11.7877 13.0131C11.1228 13.1299 10.7132 13.5706 10.3912 14.1282C9.97918 14.93 9.73229 15.8072 9.66535 16.7072C9.65221 16.786 9.66619 16.8669 9.70499 16.9366C9.7438 17.0063 9.80509 17.0605 9.87874 17.0904C9.95186 17.1353 10.029 17.1732 10.1093 17.2035C10.3379 17.2667 10.355 17.4181 10.3322 17.6288C10.2407 18.4451 10.1664 19.2632 10.0864 20.0795C10.0653 20.3436 10.1324 20.6072 10.2769 20.8286C10.6008 21.3881 12.1116 21.3766 12.4469 20.8421C12.6216 20.5556 12.6892 20.216 12.6375 19.884C12.4736 18.401 12.3155 16.9237 12.3936 15.7147Z"
                                fill="white"
                              />
                              <path
                                d="M10.3926 5.05326C11.1547 4.64131 11.9167 4.22552 12.6788 3.8174C12.82 3.74909 12.9757 3.71684 13.1323 3.72352C15.4426 3.72352 17.7536 3.72352 20.0653 3.72352C20.1986 3.72352 20.2558 3.75226 20.2558 3.89788C20.2558 4.4727 20.2558 5.04751 20.2558 5.62233C20.2558 5.76987 20.2082 5.80244 20.0653 5.79669C19.8595 5.79669 19.6538 5.79669 19.448 5.79669C19.3745 5.79307 19.3011 5.80444 19.2322 5.83011C19.1632 5.85578 19.1001 5.89523 19.0467 5.94607C18.9933 5.99691 18.9507 6.0581 18.9214 6.12595C18.8922 6.1938 18.8769 6.2669 18.8764 6.34085C18.8193 7.08045 18.3563 7.54988 17.6209 7.50007C17.3224 7.47083 17.0212 7.50709 16.738 7.60633C16.4548 7.70557 16.1963 7.86543 15.9805 8.07488C15.5195 8.49833 15.0013 8.85855 14.504 9.24176C14.0982 9.55408 13.6257 9.52342 13.3228 9.16895C13.0198 8.81448 13.0618 8.36038 13.4218 7.99633L15.6128 5.77945C15.7443 5.64916 15.8624 5.51695 15.7767 5.31193C15.6909 5.10691 15.5195 5.09541 15.3328 5.09541C13.7692 5.09541 12.2044 5.09541 10.6383 5.09541H10.4059L10.3926 5.05326Z"
                                fill="white"
                              />
                              <path
                                d="M15.8442 22.4391C15.8071 22.3659 15.7945 22.2826 15.808 22.2015C15.808 19.3466 15.808 16.493 15.808 13.6406C15.8079 13.455 15.8349 13.2703 15.8881 13.0926C16.292 11.722 16.694 10.3526 17.094 8.98457C17.1112 8.92326 17.1321 8.86386 17.155 8.79297C17.2446 8.83129 17.235 8.91368 17.2522 8.97499C17.6573 10.3584 18.0619 11.7418 18.4658 13.1252C18.5158 13.2891 18.5415 13.4595 18.542 13.631C18.542 16.4923 18.542 19.353 18.542 22.213C18.5553 22.2843 18.5439 22.3581 18.5096 22.4219L17.557 21.4639C17.4846 21.391 17.5132 21.301 17.5132 21.2186C17.5132 18.9015 17.5132 16.5843 17.5132 14.2671V14.1177C17.5132 13.8284 17.3893 13.6693 17.1703 13.6693C16.9512 13.6693 16.8292 13.8284 16.8292 14.1177C16.8292 16.4566 16.8292 18.7954 16.8292 21.1343C16.8366 21.2301 16.8215 21.3264 16.7851 21.4152C16.7487 21.5041 16.692 21.5831 16.6196 21.6459C16.3567 21.895 16.1091 22.1671 15.8442 22.4391Z"
                                fill="white"
                              />
                              <path
                                d="M14.6437 5.78906C14.1769 6.25658 13.7501 6.68386 13.3272 7.11114C13.3006 7.13231 13.27 7.14767 13.2371 7.15624C13.2043 7.16482 13.1701 7.16643 13.1367 7.16096C10.4224 7.16096 7.70748 7.16096 4.99193 7.16096C4.9251 7.1652 4.85852 7.14922 4.8008 7.11507C4.74307 7.08092 4.69684 7.03017 4.66805 6.96935C4.56471 6.77182 4.52604 6.54651 4.55755 6.32556C4.61089 5.90594 4.74807 5.78906 5.1634 5.78906H14.6513H14.6437Z"
                                fill="white"
                              />
                              <path
                                d="M20.9277 4.90339C20.9277 4.34581 20.9277 3.78824 20.9277 3.23067C20.9277 3.09271 20.9468 3.03906 21.1183 3.03906C21.6898 3.04864 22.2614 3.03906 22.8329 3.03906C22.9606 3.03906 23.0006 3.06972 23.0006 3.20384C23.0006 4.35348 23.0006 5.50311 23.0006 6.65275C23.0006 6.78879 22.9568 6.81753 22.831 6.81561C22.2595 6.81561 21.6879 6.81561 21.1259 6.81561C20.9887 6.81561 20.9354 6.78112 20.9468 6.63742C20.9334 6.06069 20.9277 5.48204 20.9277 4.90339Z"
                                fill="white"
                              />
                              <path
                                d="M16.3252 22.8983C16.5805 22.6473 16.8358 22.4002 17.0873 22.1472C17.154 22.0802 17.1978 22.0821 17.2606 22.1472C17.5121 22.4021 17.7655 22.6512 18.0646 22.9501H16.35L16.3252 22.8983Z"
                                fill="white"
                              />
                              <path
                                d="M7.61365 20.5465H7.56983C7.03066 20.5465 6.96207 20.4641 6.99827 19.9161C7.09353 18.8258 7.16212 17.7356 7.2269 16.6377C7.23833 16.4576 7.29548 16.402 7.46695 16.4193C7.63842 16.4365 7.83275 16.3714 7.94325 16.4499C8.05375 16.5285 7.9966 16.7565 8.00994 16.9174C8.09186 17.9809 8.16807 19.0423 8.24428 20.1058C8.25746 20.162 8.25702 20.2205 8.24299 20.2765C8.22895 20.3325 8.20174 20.3843 8.16363 20.4275C8.12553 20.4707 8.07766 20.5041 8.02405 20.5248C7.97045 20.5455 7.91268 20.5529 7.85561 20.5465H7.61365Z"
                                fill="white"
                              />
                              <path
                                d="M6.80957 15.0625H8.42708C8.31849 15.2809 8.21751 15.4859 8.11273 15.691C8.08034 15.7542 8.01366 15.7369 7.96031 15.7389H7.27253C7.20776 15.7389 7.14489 15.7389 7.10869 15.6718C7.01343 15.4745 6.91436 15.279 6.80957 15.0625Z"
                                fill="white"
                              />
                              <path
                                d="M11.7123 15.4354C11.7123 15.9355 11.7123 16.4356 11.7123 16.9357C11.7123 17.0717 11.6818 17.1273 11.537 17.1158C11.4451 17.1081 11.3527 17.1081 11.2607 17.1158C11.1293 17.1158 11.034 17.1158 10.9731 16.9549C10.9121 16.7939 10.6739 16.7307 10.5082 16.6368C10.4129 16.5851 10.3691 16.5352 10.3882 16.4222C10.4722 15.7342 10.6753 15.0662 10.9883 14.4487C11.1185 14.1934 11.3113 13.9758 11.5484 13.8164C11.6666 13.7416 11.7161 13.7455 11.7142 13.9083C11.7066 14.4218 11.7123 14.9277 11.7123 15.4354Z"
                                fill="white"
                              />
                              <path
                                d="M11.3544 20.5453H11.143C10.88 20.5453 10.7467 20.4035 10.7619 20.1391C10.8038 19.6141 10.861 19.0891 10.9124 18.5641C10.9315 18.3591 10.9639 18.1541 10.9734 17.9471C10.9734 17.8207 11.0286 17.7862 11.1411 17.7996C11.183 17.7996 11.2268 17.7996 11.2687 17.7996C11.7488 17.7996 11.7431 17.7996 11.7869 18.2709C11.8384 18.8457 11.9031 19.4206 11.9565 19.9954C11.9965 20.4437 11.8974 20.5453 11.4554 20.5453H11.3544Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6394 7.85119C12.4848 8.15394 12.4238 8.49624 12.4641 8.83413C12.5004 9.09206 12.6028 9.33607 12.7611 9.54227C12.9194 9.74847 13.1282 9.90978 13.3671 10.0104C13.6061 10.1111 13.8669 10.1476 14.124 10.1163C14.3812 10.0851 14.6259 9.98729 14.8342 9.8324C15.3409 9.4626 15.8249 9.06597 16.3202 8.68276C16.3679 8.64636 16.4193 8.61378 16.5107 8.55055C16.3202 9.20584 16.143 9.81324 15.9639 10.4206C15.7163 11.2637 15.468 12.1055 15.219 12.946C15.1552 13.1656 15.1244 13.3936 15.1276 13.6224C15.1276 16.6561 15.1276 19.688 15.1276 22.7179C15.1276 22.8961 15.1009 22.9593 14.9008 22.9574C11.2962 22.9574 7.69157 22.9574 4.08693 22.9574C3.89641 22.9574 3.85449 22.9114 3.85449 22.7236C3.85449 19.6873 3.85449 16.6536 3.85449 13.6224C3.85469 13.4444 3.88101 13.2675 3.93261 13.0974C4.43431 11.4061 4.93157 9.71488 5.42438 8.02364C5.46248 7.89335 5.5063 7.83203 5.6511 7.83203C7.93734 7.83203 10.2198 7.83203 12.4984 7.83203C12.5403 7.84353 12.5803 7.84736 12.6394 7.85119ZM9.32051 14.1339C9.32051 13.8044 9.32051 13.5745 9.32051 13.3464C9.32051 13.3017 9.31174 13.2573 9.2947 13.2159C9.27766 13.1745 9.25268 13.137 9.22119 13.1053C9.18969 13.0736 9.15231 13.0485 9.11117 13.0313C9.07002 13.0142 9.02592 13.0054 8.98139 13.0054C8.93685 13.0054 8.89275 13.0142 8.85161 13.0313C8.81046 13.0485 8.77308 13.0736 8.74159 13.1053C8.7101 13.137 8.68512 13.1745 8.66808 13.2159C8.65103 13.2573 8.64226 13.3017 8.64226 13.3464C8.64226 13.517 8.64226 13.6894 8.64226 13.8619C8.64226 14.3849 8.64226 14.3811 8.11262 14.3696C7.99259 14.3696 7.95258 14.3351 7.95639 14.2125C7.95639 13.927 7.95639 13.6377 7.95639 13.3541C7.95903 13.3073 7.95202 13.2605 7.93577 13.2166C7.91953 13.1727 7.89442 13.1326 7.86202 13.099C7.82962 13.0653 7.79064 13.0388 7.74753 13.021C7.70442 13.0033 7.65812 12.9947 7.61155 12.9958C7.56608 12.9975 7.5214 13.0083 7.48016 13.0277C7.43892 13.047 7.40194 13.0744 7.3714 13.1084C7.34086 13.1423 7.31739 13.182 7.30235 13.2252C7.28731 13.2684 7.28103 13.3142 7.28385 13.3599C7.28385 13.5246 7.28385 13.6894 7.28385 13.8523C7.28385 14.3926 7.28385 14.3888 6.74087 14.3696C6.62656 14.3696 6.59608 14.3294 6.59989 14.2202C6.59989 13.9558 6.59989 13.6913 6.59989 13.4269C6.59989 13.1625 6.46462 12.9958 6.25314 12.9958C6.04166 12.9958 5.92926 13.1529 5.90449 13.4173C5.78683 14.3015 5.98973 15.1986 6.47605 15.9446C6.47605 15.9561 6.48748 15.9695 6.4951 15.981C6.56291 16.0964 6.58852 16.2319 6.5675 16.3642C6.47224 17.6193 6.37698 18.8724 6.29696 20.1274C6.28581 20.2698 6.30434 20.413 6.35137 20.5479C6.3984 20.6827 6.4729 20.8062 6.57009 20.9105C6.66727 21.0147 6.78502 21.0974 6.9158 21.1532C7.04658 21.2091 7.18751 21.2369 7.32958 21.2349C7.5201 21.2349 7.69919 21.2349 7.88209 21.2349C8.02669 21.2382 8.17036 21.2107 8.30364 21.1542C8.43693 21.0977 8.55682 21.0135 8.65544 20.9071C8.75405 20.8007 8.82916 20.6745 8.87581 20.5368C8.92247 20.3991 8.93962 20.253 8.92614 20.1082C8.85374 19.0314 8.78706 17.9546 8.68608 16.8816C8.6152 16.4178 8.7068 15.9437 8.94519 15.5403C9.23097 15.0786 9.43864 14.5938 9.32051 14.1339ZM12.3936 15.7147C12.3936 14.7969 12.3765 14.1608 12.3936 13.5246C12.4107 13.0169 12.1478 12.9498 11.7877 13.0131C11.1228 13.1299 10.7132 13.5706 10.3912 14.1282C9.97918 14.93 9.73229 15.8072 9.66535 16.7072C9.65221 16.786 9.66619 16.8669 9.70499 16.9366C9.7438 17.0063 9.80509 17.0605 9.87874 17.0904C9.95186 17.1353 10.029 17.1732 10.1093 17.2035C10.3379 17.2667 10.355 17.4181 10.3322 17.6288C10.2407 18.4451 10.1664 19.2632 10.0864 20.0795C10.0653 20.3436 10.1324 20.6072 10.2769 20.8286C10.6008 21.3881 12.1116 21.3766 12.4469 20.8421C12.6216 20.5556 12.6892 20.216 12.6375 19.884C12.4736 18.401 12.3155 16.9237 12.3936 15.7147Z"
                                fill="black"
                              />
                              <path
                                d="M10.3926 5.05326C11.1547 4.64131 11.9167 4.22552 12.6788 3.8174C12.82 3.74909 12.9757 3.71684 13.1323 3.72352C15.4426 3.72352 17.7536 3.72352 20.0653 3.72352C20.1986 3.72352 20.2558 3.75226 20.2558 3.89788C20.2558 4.4727 20.2558 5.04751 20.2558 5.62233C20.2558 5.76987 20.2082 5.80244 20.0653 5.79669C19.8595 5.79669 19.6538 5.79669 19.448 5.79669C19.3745 5.79307 19.3011 5.80444 19.2322 5.83011C19.1632 5.85578 19.1001 5.89523 19.0467 5.94607C18.9933 5.99691 18.9507 6.0581 18.9214 6.12595C18.8922 6.1938 18.8769 6.2669 18.8764 6.34085C18.8193 7.08045 18.3563 7.54988 17.6209 7.50007C17.3224 7.47083 17.0212 7.50709 16.738 7.60633C16.4548 7.70557 16.1963 7.86543 15.9805 8.07488C15.5195 8.49833 15.0013 8.85855 14.504 9.24176C14.0982 9.55408 13.6257 9.52342 13.3228 9.16895C13.0198 8.81448 13.0618 8.36038 13.4218 7.99633L15.6128 5.77945C15.7443 5.64916 15.8624 5.51695 15.7767 5.31193C15.6909 5.10691 15.5195 5.09541 15.3328 5.09541C13.7692 5.09541 12.2044 5.09541 10.6383 5.09541H10.4059L10.3926 5.05326Z"
                                fill="black"
                              />
                              <path
                                d="M15.8442 22.4391C15.8071 22.3659 15.7945 22.2826 15.808 22.2015C15.808 19.3466 15.808 16.493 15.808 13.6406C15.8079 13.455 15.8349 13.2703 15.8881 13.0926C16.292 11.722 16.694 10.3526 17.094 8.98457C17.1112 8.92326 17.1321 8.86386 17.155 8.79297C17.2446 8.83129 17.235 8.91368 17.2522 8.97499C17.6573 10.3584 18.0619 11.7418 18.4658 13.1252C18.5158 13.2891 18.5415 13.4595 18.542 13.631C18.542 16.4923 18.542 19.353 18.542 22.213C18.5553 22.2843 18.5439 22.3581 18.5096 22.4219L17.557 21.4639C17.4846 21.391 17.5132 21.301 17.5132 21.2186C17.5132 18.9015 17.5132 16.5843 17.5132 14.2671V14.1177C17.5132 13.8284 17.3893 13.6693 17.1703 13.6693C16.9512 13.6693 16.8292 13.8284 16.8292 14.1177C16.8292 16.4566 16.8292 18.7954 16.8292 21.1343C16.8366 21.2301 16.8215 21.3264 16.7851 21.4152C16.7487 21.5041 16.692 21.5831 16.6196 21.6459C16.3567 21.895 16.1091 22.1671 15.8442 22.4391Z"
                                fill="black"
                              />
                              <path
                                d="M14.6437 5.78906C14.1769 6.25658 13.7501 6.68386 13.3272 7.11114C13.3006 7.13231 13.27 7.14767 13.2371 7.15624C13.2043 7.16482 13.1701 7.16643 13.1367 7.16096C10.4224 7.16096 7.70748 7.16096 4.99193 7.16096C4.9251 7.1652 4.85852 7.14922 4.8008 7.11507C4.74307 7.08092 4.69684 7.03017 4.66805 6.96935C4.56471 6.77182 4.52604 6.54651 4.55755 6.32556C4.61089 5.90594 4.74807 5.78906 5.1634 5.78906H14.6513H14.6437Z"
                                fill="black"
                              />
                              <path
                                d="M20.9277 4.90339C20.9277 4.34581 20.9277 3.78824 20.9277 3.23067C20.9277 3.09271 20.9468 3.03906 21.1183 3.03906C21.6898 3.04864 22.2614 3.03906 22.8329 3.03906C22.9606 3.03906 23.0006 3.06972 23.0006 3.20384C23.0006 4.35348 23.0006 5.50311 23.0006 6.65275C23.0006 6.78879 22.9568 6.81753 22.831 6.81561C22.2595 6.81561 21.6879 6.81561 21.1259 6.81561C20.9887 6.81561 20.9354 6.78112 20.9468 6.63742C20.9334 6.06069 20.9277 5.48204 20.9277 4.90339Z"
                                fill="black"
                              />
                              <path
                                d="M16.3252 22.8983C16.5805 22.6473 16.8358 22.4002 17.0873 22.1472C17.154 22.0802 17.1978 22.0821 17.2606 22.1472C17.5121 22.4021 17.7655 22.6512 18.0646 22.9501H16.35L16.3252 22.8983Z"
                                fill="black"
                              />
                              <path
                                d="M7.61365 20.5465H7.56983C7.03066 20.5465 6.96207 20.4641 6.99827 19.9161C7.09353 18.8258 7.16212 17.7356 7.2269 16.6377C7.23833 16.4576 7.29548 16.402 7.46695 16.4193C7.63842 16.4365 7.83275 16.3714 7.94325 16.4499C8.05375 16.5285 7.9966 16.7565 8.00994 16.9174C8.09186 17.9809 8.16807 19.0423 8.24428 20.1058C8.25746 20.162 8.25702 20.2205 8.24299 20.2765C8.22895 20.3325 8.20174 20.3843 8.16363 20.4275C8.12553 20.4707 8.07766 20.5041 8.02405 20.5248C7.97045 20.5455 7.91268 20.5529 7.85561 20.5465H7.61365Z"
                                fill="black"
                              />
                              <path
                                d="M6.80957 15.0625H8.42708C8.31849 15.2809 8.21751 15.4859 8.11273 15.691C8.08034 15.7542 8.01366 15.7369 7.96031 15.7389H7.27253C7.20776 15.7389 7.14489 15.7389 7.10869 15.6718C7.01343 15.4745 6.91436 15.279 6.80957 15.0625Z"
                                fill="black"
                              />
                              <path
                                d="M11.7123 15.4354C11.7123 15.9355 11.7123 16.4356 11.7123 16.9357C11.7123 17.0717 11.6818 17.1273 11.537 17.1158C11.4451 17.1081 11.3527 17.1081 11.2607 17.1158C11.1293 17.1158 11.034 17.1158 10.9731 16.9549C10.9121 16.7939 10.6739 16.7307 10.5082 16.6368C10.4129 16.5851 10.3691 16.5352 10.3882 16.4222C10.4722 15.7342 10.6753 15.0662 10.9883 14.4487C11.1185 14.1934 11.3113 13.9758 11.5484 13.8164C11.6666 13.7416 11.7161 13.7455 11.7142 13.9083C11.7066 14.4218 11.7123 14.9277 11.7123 15.4354Z"
                                fill="black"
                              />
                              <path
                                d="M11.3544 20.5453H11.143C10.88 20.5453 10.7467 20.4035 10.7619 20.1391C10.8038 19.6141 10.861 19.0891 10.9124 18.5641C10.9315 18.3591 10.9639 18.1541 10.9734 17.9471C10.9734 17.8207 11.0286 17.7862 11.1411 17.7996C11.183 17.7996 11.2268 17.7996 11.2687 17.7996C11.7488 17.7996 11.7431 17.7996 11.7869 18.2709C11.8384 18.8457 11.9031 19.4206 11.9565 19.9954C11.9965 20.4437 11.8974 20.5453 11.4554 20.5453H11.3544Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-base 2xl:text-base ${
                            pathname.includes("/menu/take-away")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Take Away
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon 
                          className={`lg:mr-4 lg:ml-14 ml-2 mt-1 mr-3  cursor-pointer ${
                            pathname.includes("take-away")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("take-away") && openSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">
                      {/* Dashboard    */}
                      <Link
                        to={`/menu/take-away/${"Dashboard"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setTakeaway(true)}
                          style={{
                            backgroundColor: takeaway ? "#F7BF41" : "",
                            borderRadius: takeaway ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes(
                              "Dashboard".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-5 lg:pl-6">
                            <div>
                              {takeaway ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: takeaway ? "white" : "",
                              }}
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/take-away/dashboard")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Dashboard
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Create order */}
                      <Link to={`/menu/take-away/${"create"}`}>
                        <div
                          onClick={handleDTakeaway}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes("create")
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes("/menu/take-away/create") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden ml-2 lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/take-away/create")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Manage order */}
                      <Link
                        to={`/menu/take-away/${"Manage Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDTakeaway}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes(
                              "Manage Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/take-away/manage-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/take-away/manage-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Manage Orders
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Party Order */}
                <div className="w-full ">
                  <div
                    onClick={handlePartyorder}
                    className={`flex place-items-start lg:gap-6 w-full py-2  lg:px-0 gap-2 lg:py-2  lg:p-1 ${
                      pathname.includes("/menu/party-order")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/party-order`} onClick={handlePartyorder}>
                      <div className="flex lg:gap-4">
                        <div>
                          {/* Image */}
                          {pathname.includes("/menu/party-order") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.01 16.38C19.78 16.38 18.59 16.18 17.48 15.82C17.13 15.7 16.74 15.79 16.47 16.06L14.9 18.03C12.07 16.68 9.42 14.13 8.01 11.2L9.96 9.54C10.23 9.26 10.31 8.87 10.2 8.52C9.83 7.41 9.64 6.22 9.64 4.99C9.64 4.45 9.19 4 8.65 4H5.19C4.65 4 4 4.24 4 4.99C4 14.28 11.73 22 21.01 22C21.72 22 22 21.37 22 20.82V17.37C22 16.83 21.55 16.38 21.01 16.38Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.01 16.38C19.78 16.38 18.59 16.18 17.48 15.82C17.13 15.7 16.74 15.79 16.47 16.06L14.9 18.03C12.07 16.68 9.42 14.13 8.01 11.2L9.96 9.54C10.23 9.26 10.31 8.87 10.2 8.52C9.83 7.41 9.64 6.22 9.64 4.99C9.64 4.45 9.19 4 8.65 4H5.19C4.65 4 4 4.24 4 4.99C4 14.28 11.73 22 21.01 22C21.72 22 22 21.37 22 20.82V17.37C22 16.83 21.55 16.38 21.01 16.38Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block lg:mr-0.5 text-base 2xl:text-base ${
                            pathname.includes("/menu/party-order")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Party Orders
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                          className={`lg:mr-4 mt-1 mr-3 lg:ml-10 ml-2 cursor-pointer ${
                            pathname.includes("party-order")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("party-order") && openSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">

                       {/* create Order*/}
                       <Link
                        to={`/menu/party-order/${"customer"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setPartyorder(true)}
                          style={{
                            backgroundColor: partyorder ? "#F7BF41" : "",
                            borderRadius: partyorder ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Customer".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {partyorder || pathname.includes("/menu/party-order/customer") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: partyorder ? "white" : "",
                              }}
                              className={`hidden ml-2 lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/party-order/customer")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Active order  */}
                      <Link
                        to={`/menu/party-order/${"Active Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div      
                          onClick={handleDPartyorder} 
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Active Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              { pathname.includes(
                                  "/menu/party-order/active-order"
                                ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/party-order/active-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Active Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                     

                      {/* Past Order*/}
                      <Link
                        to={`/menu/party-order/${"Past Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDPartyorder}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Past Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/party-order/past-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/party-order/past-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Past Orders
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Manage Staff */}
                <div className="w-full mb-2">
                  <Link
                    to={`/menu/managestaff`}
                    onClick={() => setOpenMenuStatus(true)}
                  >
                    <div
                      onClick={() => setOpenMenuStatus(true)}
                      className={`flex place-items-start lg:gap-4 w-full  lg:px-0  lg:p-1 ${
                        pathname.includes("/menu/managestaff")
                          ? "text-white bg-darkyellow flex justify-center lg:justify-start lg:px-2 py-1 lg:py-2 rounded-md"
                          : ""
                      }`}
                    >
                      {pathname.includes("/menu/managestaff") ? (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.9545 12.1429C18.3882 12.1429 19.5368 10.9943 19.5368 9.57143C19.5368 8.14857 18.3882 7 16.9545 7C15.5209 7 14.3636 8.14857 14.3636 9.57143C14.3636 10.9943 15.5209 12.1429 16.9545 12.1429ZM10.0455 12.1429C11.4791 12.1429 12.6277 10.9943 12.6277 9.57143C12.6277 8.14857 11.4791 7 10.0455 7C8.61182 7 7.45455 8.14857 7.45455 9.57143C7.45455 10.9943 8.61182 12.1429 10.0455 12.1429ZM10.0455 13.8571C8.03318 13.8571 4 14.86 4 16.8571V19H16.0909V16.8571C16.0909 14.86 12.0577 13.8571 10.0455 13.8571ZM16.9545 13.8571C16.7041 13.8571 16.4191 13.8743 16.1168 13.9C17.1186 14.62 17.8182 15.5886 17.8182 16.8571V19H23V16.8571C23 14.86 18.9668 13.8571 16.9545 13.8571Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.9545 12.1429C18.3882 12.1429 19.5368 10.9943 19.5368 9.57143C19.5368 8.14857 18.3882 7 16.9545 7C15.5209 7 14.3636 8.14857 14.3636 9.57143C14.3636 10.9943 15.5209 12.1429 16.9545 12.1429ZM10.0455 12.1429C11.4791 12.1429 12.6277 10.9943 12.6277 9.57143C12.6277 8.14857 11.4791 7 10.0455 7C8.61182 7 7.45455 8.14857 7.45455 9.57143C7.45455 10.9943 8.61182 12.1429 10.0455 12.1429ZM10.0455 13.8571C8.03318 13.8571 4 14.86 4 16.8571V19H16.0909V16.8571C16.0909 14.86 12.0577 13.8571 10.0455 13.8571ZM16.9545 13.8571C16.7041 13.8571 16.4191 13.8743 16.1168 13.9C17.1186 14.62 17.8182 15.5886 17.8182 16.8571V19H23V16.8571C23 14.86 18.9668 13.8571 16.9545 13.8571Z"
                            fill="black"
                          />
                        </svg>
                      )}
                      <div
                        className={`hidden lg:block text-base 2xl:text-base  ml-1  ${
                          pathname.includes("/menu/managestaff")
                            ? "text-white"
                            : ""
                        }`}
                      >
                        Manage Staff
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Reports */}
                <div className="w-full mt-1 mb-1">
                  <div
                    onClick={handleReport}
                    className={`flex place-items-start lg:gap-6 w-full py-2  lg:px-0 gap-2 lg:py-2 lg:p-1 ${
                      pathname.includes("/menu/reports")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/reports`} onClick={handleReport}>
                      <div className="flex lg:gap-5 ">
                        <div>
                          {/* Image */}
                          {pathname.includes("/menu/reports") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.4442 4H10.5553L10.5553 6.22005C10.5553 7.32462 9.65985 8.22005 8.55528 8.22005C7.45071 8.22005 6.55528 7.32462 6.55528 6.22005L6.55528 4.06496C5.34818 4.16032 4.557 4.39563 3.97631 4.97631C3 5.95262 3 7.52397 3 10.6667V16.2222C3 19.3649 3 20.9363 3.97631 21.9126C4.95262 22.8889 6.52397 22.8889 9.66667 22.8889H16.3333C19.476 22.8889 21.0474 22.8889 22.0237 21.9126C23 20.9363 23 19.3649 23 16.2222V16.2222V10.6667V10.6666C23 7.52396 23 5.95262 22.0237 4.97631C21.4429 4.39554 20.6516 4.16025 19.4442 4.06492V6.22005C19.4442 7.32462 18.5487 8.22005 17.4442 8.22005C16.3396 8.22005 15.4442 7.32462 15.4442 6.22005L15.4442 4ZM7.55583 12.8917C7.55583 12.3394 8.00354 11.8917 8.55583 11.8917L17.4447 11.8917C17.997 11.8917 18.4447 12.3394 18.4447 12.8917C18.4447 13.444 17.997 13.8917 17.4447 13.8917L8.55583 13.8917C8.00354 13.8917 7.55583 13.444 7.55583 12.8917ZM8.55583 16.3351C8.00354 16.3351 7.55583 16.7828 7.55583 17.3351C7.55583 17.8874 8.00354 18.3351 8.55583 18.3351L17.4447 18.3351C17.997 18.3351 18.4447 17.8874 18.4447 17.3351C18.4447 16.7828 17.997 16.3351 17.4447 16.3351L8.55583 16.3351Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.4442 4H10.5553L10.5553 6.22005C10.5553 7.32462 9.65985 8.22005 8.55528 8.22005C7.45071 8.22005 6.55528 7.32462 6.55528 6.22005L6.55528 4.06496C5.34818 4.16032 4.557 4.39563 3.97631 4.97631C3 5.95262 3 7.52397 3 10.6667V16.2222C3 19.3649 3 20.9363 3.97631 21.9126C4.95262 22.8889 6.52397 22.8889 9.66667 22.8889H16.3333C19.476 22.8889 21.0474 22.8889 22.0237 21.9126C23 20.9363 23 19.3649 23 16.2222V16.2222V10.6667V10.6666C23 7.52396 23 5.95262 22.0237 4.97631C21.4429 4.39554 20.6516 4.16025 19.4442 4.06492V6.22005C19.4442 7.32462 18.5487 8.22005 17.4442 8.22005C16.3396 8.22005 15.4442 7.32462 15.4442 6.22005L15.4442 4ZM7.55583 12.8917C7.55583 12.3394 8.00354 11.8917 8.55583 11.8917L17.4447 11.8917C17.997 11.8917 18.4447 12.3394 18.4447 12.8917C18.4447 13.444 17.997 13.8917 17.4447 13.8917L8.55583 13.8917C8.00354 13.8917 7.55583 13.444 7.55583 12.8917ZM8.55583 16.3351C8.00354 16.3351 7.55583 16.7828 7.55583 17.3351C7.55583 17.8874 8.00354 18.3351 8.55583 18.3351L17.4447 18.3351C17.997 18.3351 18.4447 17.8874 18.4447 17.3351C18.4447 16.7828 17.997 16.3351 17.4447 16.3351L8.55583 16.3351Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block lg:mr-1 text-base 2xl:text-base ${
                            pathname.includes("/menu/reports")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Reports
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                         
                          className={`lg:mr-4 mt-1 mr-3 lg:ml-16 ml-2 cursor-pointer ${
                            pathname.includes("reports")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("reports") && openSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">
                      {/* Sales report  */}
                      <Link
                        to={`/menu/reports/${"Sales Report"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setReport(true)}
                          style={{
                            backgroundColor: report ? "#F7BF41" : "",
                            borderRadius: report ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes(
                              "Sales Report".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {report ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.58579 3.58579C4 4.17157 4 5.11438 4 7V17C4 19.8284 4 21.2426 4.87868 22.1213C5.52011 22.7628 6.44692 22.9359 8.00093 22.9827V20.0015C8.00093 19.4492 8.44865 19.0015 9.00093 19.0015C9.55321 19.0015 10.0009 19.4492 10.0009 20.0015V23H16C16.0003 23 16.0006 23 16.0009 23V20.0015C16.0009 19.4492 16.4486 19.0015 17.0009 19.0015C17.5532 19.0015 18.0009 19.4492 18.0009 20.0015V22.9826C19.5538 22.9358 20.4801 22.7625 21.1213 22.1213C22 21.2426 22 19.8284 22 17V7C22 5.11438 22 4.17157 21.4142 3.58579C20.8284 3 19.8856 3 18 3H8C6.11438 3 5.17157 3 4.58579 3.58579ZM9.00093 9.00149C8.44865 9.00149 8.00093 9.4492 8.00093 10.0015C8.00093 10.5538 8.44865 11.0015 9.00093 11.0015H17.0009C17.5532 11.0015 18.0009 10.5538 18.0009 10.0015C18.0009 9.4492 17.5532 9.00149 17.0009 9.00149H9.00093ZM9.00093 15.0015H17.0009C17.5532 15.0015 18.0009 14.5538 18.0009 14.0015C18.0009 13.4492 17.5532 13.0015 17.0009 13.0015H9.00093C8.44865 13.0015 8.00093 13.4492 8.00093 14.0015C8.00093 14.5538 8.44865 15.0015 9.00093 15.0015Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.58579 3.58579C4 4.17157 4 5.11438 4 7V17C4 19.8284 4 21.2426 4.87868 22.1213C5.52011 22.7628 6.44692 22.9359 8.00093 22.9827V20.0015C8.00093 19.4492 8.44865 19.0015 9.00093 19.0015C9.55321 19.0015 10.0009 19.4492 10.0009 20.0015V23H16C16.0003 23 16.0006 23 16.0009 23V20.0015C16.0009 19.4492 16.4486 19.0015 17.0009 19.0015C17.5532 19.0015 18.0009 19.4492 18.0009 20.0015V22.9826C19.5538 22.9358 20.4801 22.7625 21.1213 22.1213C22 21.2426 22 19.8284 22 17V7C22 5.11438 22 4.17157 21.4142 3.58579C20.8284 3 19.8856 3 18 3H8C6.11438 3 5.17157 3 4.58579 3.58579ZM9.00093 9.00149C8.44865 9.00149 8.00093 9.4492 8.00093 10.0015C8.00093 10.5538 8.44865 11.0015 9.00093 11.0015H17.0009C17.5532 11.0015 18.0009 10.5538 18.0009 10.0015C18.0009 9.4492 17.5532 9.00149 17.0009 9.00149H9.00093ZM9.00093 15.0015H17.0009C17.5532 15.0015 18.0009 14.5538 18.0009 14.0015C18.0009 13.4492 17.5532 13.0015 17.0009 13.0015H9.00093C8.44865 13.0015 8.00093 13.4492 8.00093 14.0015C8.00093 14.5538 8.44865 15.0015 9.00093 15.0015Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: report ? "white" : "",
                              }}
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/reports/sales-report")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Sales Report
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Staff Report*/}
                      <Link
                        to={`/menu/reports/${"Staff Report"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDReport}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes(
                              "Staff Report".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/reports/staff-report"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.58579 3.58579C4 4.17157 4 5.11438 4 7V17C4 19.8284 4 21.2426 4.87868 22.1213C5.52011 22.7628 6.44692 22.9359 8.00093 22.9827V20.0015C8.00093 19.4492 8.44865 19.0015 9.00093 19.0015C9.55321 19.0015 10.0009 19.4492 10.0009 20.0015V23H16C16.0003 23 16.0006 23 16.0009 23V20.0015C16.0009 19.4492 16.4486 19.0015 17.0009 19.0015C17.5532 19.0015 18.0009 19.4492 18.0009 20.0015V22.9826C19.5538 22.9358 20.4801 22.7625 21.1213 22.1213C22 21.2426 22 19.8284 22 17V7C22 5.11438 22 4.17157 21.4142 3.58579C20.8284 3 19.8856 3 18 3H8C6.11438 3 5.17157 3 4.58579 3.58579ZM9.00093 9.00149C8.44865 9.00149 8.00093 9.4492 8.00093 10.0015C8.00093 10.5538 8.44865 11.0015 9.00093 11.0015H17.0009C17.5532 11.0015 18.0009 10.5538 18.0009 10.0015C18.0009 9.4492 17.5532 9.00149 17.0009 9.00149H9.00093ZM9.00093 15.0015H17.0009C17.5532 15.0015 18.0009 14.5538 18.0009 14.0015C18.0009 13.4492 17.5532 13.0015 17.0009 13.0015H9.00093C8.44865 13.0015 8.00093 13.4492 8.00093 14.0015C8.00093 14.5538 8.44865 15.0015 9.00093 15.0015Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.58579 3.58579C4 4.17157 4 5.11438 4 7V17C4 19.8284 4 21.2426 4.87868 22.1213C5.52011 22.7628 6.44692 22.9359 8.00093 22.9827V20.0015C8.00093 19.4492 8.44865 19.0015 9.00093 19.0015C9.55321 19.0015 10.0009 19.4492 10.0009 20.0015V23H16C16.0003 23 16.0006 23 16.0009 23V20.0015C16.0009 19.4492 16.4486 19.0015 17.0009 19.0015C17.5532 19.0015 18.0009 19.4492 18.0009 20.0015V22.9826C19.5538 22.9358 20.4801 22.7625 21.1213 22.1213C22 21.2426 22 19.8284 22 17V7C22 5.11438 22 4.17157 21.4142 3.58579C20.8284 3 19.8856 3 18 3H8C6.11438 3 5.17157 3 4.58579 3.58579ZM9.00093 9.00149C8.44865 9.00149 8.00093 9.4492 8.00093 10.0015C8.00093 10.5538 8.44865 11.0015 9.00093 11.0015H17.0009C17.5532 11.0015 18.0009 10.5538 18.0009 10.0015C18.0009 9.4492 17.5532 9.00149 17.0009 9.00149H9.00093ZM9.00093 15.0015H17.0009C17.5532 15.0015 18.0009 14.5538 18.0009 14.0015C18.0009 13.4492 17.5532 13.0015 17.0009 13.0015H9.00093C8.44865 13.0015 8.00093 13.4492 8.00093 14.0015C8.00093 14.5538 8.44865 15.0015 9.00093 15.0015Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/reports/staff-report")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Staff Report
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Feedback */}
                <div className="w-full mb-2">
                  <Link
                    to={`/menu/feedback`}
                    onClick={() => setOpenMenuStatus(true)}
                  >
                    <div
                      onClick={() => setOpenMenuStatus(true)}
                      className={`flex place-items-start lg:gap-4 w-full lg:px-0   lg:p-1 ${
                        pathname.includes("/menu/feedback")
                          ? "text-white bg-darkyellow flex justify-center lg:justify-start lg:px-2 py-1 lg:py-2 rounded-md"
                          : ""
                      }`}
                    >
                      {pathname.includes("/menu/feedback") ? (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 3H5C3.9 3 3.01 3.9 3.01 5L3 23L7 19H21C22.1 19 23 18.1 23 17V5C23 3.9 22.1 3 21 3ZM14 15H12V13H14V15ZM14 11H12V7H14V11Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 3H5C3.9 3 3.01 3.9 3.01 5L3 23L7 19H21C22.1 19 23 18.1 23 17V5C23 3.9 22.1 3 21 3ZM14 15H12V13H14V15ZM14 11H12V7H14V11Z"
                            fill="black"
                          />
                        </svg>
                      )}
                      <div
                        className={`hidden lg:block text-base 2xl:text-base  ml-1  ${
                          pathname.includes("/menu/feedback")
                            ? "text-white"
                            : ""
                        }`}
                      >
                        Feedback
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Setting */}
                <div className="w-full">
                  <div
                    onClick={handleSetting}
                    className={`flex place-items-start  lg:gap-10 w-full py-2  lg:px-0 gap-2 lg:py-2  lg:p-1 ${
                      pathname.includes("/menu/setting")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/setting`} onClick={handleSetting}>
                      <div className="flex lg:gap-4">
                        {/* Image */}
                        <div>
                          {pathname.includes("/menu/setting") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.9442 13.975C19.9812 13.6625 20.0059 13.3375 20.0059 13C20.0059 12.6625 19.9812 12.3375 19.9318 12.025L22.0178 10.375C22.203 10.225 22.2523 9.95 22.1413 9.7375L20.1663 6.275C20.0429 6.05 19.7837 5.975 19.5615 6.05L17.1052 7.05C16.5868 6.65 16.0437 6.325 15.4389 6.075L15.0686 3.425C15.0316 3.175 14.8218 3 14.5749 3H10.6251C10.3782 3 10.1807 3.175 10.1437 3.425L9.77342 6.075C9.16861 6.325 8.61316 6.6625 8.1071 7.05L5.65081 6.05C5.42863 5.9625 5.16943 6.05 5.04599 6.275L3.07109 9.7375C2.94766 9.9625 2.99703 10.225 3.19452 10.375L5.28051 12.025C5.23114 12.3375 5.19411 12.675 5.19411 13C5.19411 13.325 5.2188 13.6625 5.26817 13.975L3.18218 15.625C2.99703 15.775 2.94766 16.05 3.05875 16.2625L5.03365 19.725C5.15708 19.95 5.41629 20.025 5.63847 19.95L8.09475 18.95C8.61316 19.35 9.15626 19.675 9.76108 19.925L10.1314 22.575C10.1807 22.825 10.3782 23 10.6251 23H14.5749C14.8218 23 15.0316 22.825 15.0563 22.575L15.4266 19.925C16.0314 19.675 16.5868 19.3375 17.0929 18.95L19.5492 19.95C19.7714 20.0375 20.0306 19.95 20.154 19.725L22.1289 16.2625C22.2523 16.0375 22.203 15.775 22.0055 15.625L19.9442 13.975ZM12.6 16.75C10.5634 16.75 8.89706 15.0625 8.89706 13C8.89706 10.9375 10.5634 9.25 12.6 9.25C14.6366 9.25 16.3029 10.9375 16.3029 13C16.3029 15.0625 14.6366 16.75 12.6 16.75Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.9442 13.975C19.9812 13.6625 20.0059 13.3375 20.0059 13C20.0059 12.6625 19.9812 12.3375 19.9318 12.025L22.0178 10.375C22.203 10.225 22.2523 9.95 22.1413 9.7375L20.1663 6.275C20.0429 6.05 19.7837 5.975 19.5615 6.05L17.1052 7.05C16.5868 6.65 16.0437 6.325 15.4389 6.075L15.0686 3.425C15.0316 3.175 14.8218 3 14.5749 3H10.6251C10.3782 3 10.1807 3.175 10.1437 3.425L9.77342 6.075C9.16861 6.325 8.61316 6.6625 8.1071 7.05L5.65081 6.05C5.42863 5.9625 5.16943 6.05 5.04599 6.275L3.07109 9.7375C2.94766 9.9625 2.99703 10.225 3.19452 10.375L5.28051 12.025C5.23114 12.3375 5.19411 12.675 5.19411 13C5.19411 13.325 5.2188 13.6625 5.26817 13.975L3.18218 15.625C2.99703 15.775 2.94766 16.05 3.05875 16.2625L5.03365 19.725C5.15708 19.95 5.41629 20.025 5.63847 19.95L8.09475 18.95C8.61316 19.35 9.15626 19.675 9.76108 19.925L10.1314 22.575C10.1807 22.825 10.3782 23 10.6251 23H14.5749C14.8218 23 15.0316 22.825 15.0563 22.575L15.4266 19.925C16.0314 19.675 16.5868 19.3375 17.0929 18.95L19.5492 19.95C19.7714 20.0375 20.0306 19.95 20.154 19.725L22.1289 16.2625C22.2523 16.0375 22.203 15.775 22.0055 15.625L19.9442 13.975ZM12.6 16.75C10.5634 16.75 8.89706 15.0625 8.89706 13C8.89706 10.9375 10.5634 9.25 12.6 9.25C14.6366 9.25 16.3029 10.9375 16.3029 13C16.3029 15.0625 14.6366 16.75 12.6 16.75Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-base lg:mr-1 2xl:text-base ${
                            pathname.includes("/menu/setting")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Settings
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                         
                          className={`lg:mr-4 mt-1 mr-3 lg:ml-16 ml-1.5 cursor-pointer ${
                            pathname.includes("setting")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("setting") && openSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec rounded-lg ">
                      {/* Store  */}
                      <Link
                        to={`/menu/setting/${"Store"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setSetting(true)}
                          style={{
                            backgroundColor: setting ? "#F7BF41" : "",
                            borderRadius: setting ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start  py-2  ${
                            pathname.includes(
                              "Store".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {setting ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.5455 4H4.09091V6.25H21.5455V4ZM22.6364 15.25V13L21.5455 7.375H4.09091L3 13V15.25H4.09091V22H15V15.25H19.3636V22H21.5455V15.25H22.6364ZM12.8182 19.75H6.27273V15.25H12.8182V19.75Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.5455 4H4.09091V6.25H21.5455V4ZM22.6364 15.25V13L21.5455 7.375H4.09091L3 13V15.25H4.09091V22H15V15.25H19.3636V22H21.5455V15.25H22.6364ZM12.8182 19.75H6.27273V15.25H12.8182V19.75Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              style={{
                                color: setting ? "white" : "",
                              }}
                              className={`hidden lg:block text-sm  2xl:text-base ${
                                pathname.includes("/menu/setting/store")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Store
                            </p>
                          </div>
                        </div>
                      </Link>

                       {/*Create Table */}
                       <Link to={`/menu/setting/${"create"}`}>
                        <div
                          onClick={handleDSetting}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes("create")
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/setting/create") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block ml-2 text-sm 2xl:text-base ${
                                pathname.includes("/menu/setting/create")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Table
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Table */}
                      <Link
                        to={`/menu/setting/${"Table"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDSetting}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Table".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/setting/table") ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.6316 11.02H15.3684V22H10.6316V11.02ZM17.2632 22H20.1053C21.1474 22 22 21.1 22 20V11H17.2632V22ZM20.1053 4H5.89474C4.85263 4 4 4.9 4 6V9H22V6C22 4.9 21.1474 4 20.1053 4ZM4 20C4 21.1 4.85263 22 5.89474 22H8.73684V11H4V20Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.6316 11.02H15.3684V22H10.6316V11.02ZM17.2632 22H20.1053C21.1474 22 22 21.1 22 20V11H17.2632V22ZM20.1053 4H5.89474C4.85263 4 4 4.9 4 6V9H22V6C22 4.9 21.1474 4 20.1053 4ZM4 20C4 21.1 4.85263 22 5.89474 22H8.73684V11H4V20Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block  text-sm 2xl:text-base ${
                                pathname.includes("/menu/setting/table")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Tables
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Create Coupon */}
                      <Link
                        to={`/menu/setting/${"Coupon"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDSetting}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Coupon".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/setting/coupon") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden ml-2 lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/setting/coupon")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Coupon
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Discount */}
                      <Link
                        to={`/menu/setting/${"Discount"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleDSetting}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Discount".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/setting/discount") ? (
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="10" cy="10" r="10" fill="white" />
                                  <path
                                    d="M6.79899 12.168C6.14566 12.168 5.60433 11.9113 5.17499 11.398C4.74566 10.8846 4.53099 10.1706 4.53099 9.25597C4.53099 8.3413 4.74566 7.63197 5.17499 7.12797C5.60433 6.62397 6.14566 6.37197 6.79899 6.37197C7.46166 6.37197 8.00766 6.62397 8.43699 7.12797C8.86633 7.63197 9.08099 8.3413 9.08099 9.25597C9.08099 10.1706 8.86633 10.8846 8.43699 11.398C8.00766 11.9113 7.46166 12.168 6.79899 12.168ZM6.79899 11.02C7.03233 11.02 7.22833 10.8893 7.38699 10.628C7.55499 10.3666 7.63899 9.9093 7.63899 9.25597C7.63899 8.60264 7.55499 8.14997 7.38699 7.89797C7.22833 7.64597 7.03233 7.51997 6.79899 7.51997C6.56566 7.51997 6.36499 7.64597 6.19699 7.89797C6.03833 8.14997 5.95899 8.60264 5.95899 9.25597C5.95899 9.9093 6.03833 10.3666 6.19699 10.628C6.36499 10.8893 6.56566 11.02 6.79899 11.02ZM7.10699 15.836L12.035 6.37197H13.225L8.29699 15.836H7.10699ZM13.533 15.836C12.8797 15.836 12.3383 15.5793 11.909 15.066C11.4797 14.5526 11.265 13.8386 11.265 12.924C11.265 12.0093 11.4797 11.3 11.909 10.796C12.3383 10.292 12.8797 10.04 13.533 10.04C14.1957 10.04 14.7417 10.292 15.171 10.796C15.6003 11.3 15.815 12.0093 15.815 12.924C15.815 13.8386 15.6003 14.5526 15.171 15.066C14.7417 15.5793 14.1957 15.836 13.533 15.836ZM13.533 14.688C13.7663 14.688 13.9623 14.5573 14.121 14.296C14.289 14.0346 14.373 13.5773 14.373 12.924C14.373 12.2706 14.289 11.818 14.121 11.566C13.9623 11.314 13.7663 11.188 13.533 11.188C13.2997 11.188 13.099 11.314 12.931 11.566C12.7723 11.818 12.693 12.2706 12.693 12.924C12.693 13.5773 12.7723 14.0346 12.931 14.296C13.099 14.5573 13.2997 14.688 13.533 14.688Z"
                                    fill="black"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="13" cy="13" r="10" fill="black" />
                                  <path
                                    d="M9.79899 15.168C9.14566 15.168 8.60433 14.9113 8.17499 14.398C7.74566 13.8846 7.53099 13.1706 7.53099 12.256C7.53099 11.3413 7.74566 10.632 8.17499 10.128C8.60433 9.62397 9.14566 9.37197 9.79899 9.37197C10.4617 9.37197 11.0077 9.62397 11.437 10.128C11.8663 10.632 12.081 11.3413 12.081 12.256C12.081 13.1706 11.8663 13.8846 11.437 14.398C11.0077 14.9113 10.4617 15.168 9.79899 15.168ZM9.79899 14.02C10.0323 14.02 10.2283 13.8893 10.387 13.628C10.555 13.3666 10.639 12.9093 10.639 12.256C10.639 11.6026 10.555 11.15 10.387 10.898C10.2283 10.646 10.0323 10.52 9.79899 10.52C9.56566 10.52 9.36499 10.646 9.19699 10.898C9.03833 11.15 8.95899 11.6026 8.95899 12.256C8.95899 12.9093 9.03833 13.3666 9.19699 13.628C9.36499 13.8893 9.56566 14.02 9.79899 14.02ZM10.107 18.836L15.035 9.37197H16.225L11.297 18.836H10.107ZM16.533 18.836C15.8797 18.836 15.3383 18.5793 14.909 18.066C14.4797 17.5526 14.265 16.8386 14.265 15.924C14.265 15.0093 14.4797 14.3 14.909 13.796C15.3383 13.292 15.8797 13.04 16.533 13.04C17.1957 13.04 17.7417 13.292 18.171 13.796C18.6003 14.3 18.815 15.0093 18.815 15.924C18.815 16.8386 18.6003 17.5526 18.171 18.066C17.7417 18.5793 17.1957 18.836 16.533 18.836ZM16.533 17.688C16.7663 17.688 16.9623 17.5573 17.121 17.296C17.289 17.0346 17.373 16.5773 17.373 15.924C17.373 15.2706 17.289 14.818 17.121 14.566C16.9623 14.314 16.7663 14.188 16.533 14.188C16.2997 14.188 16.099 14.314 15.931 14.566C15.7723 14.818 15.693 15.2706 15.693 15.924C15.693 16.5773 15.7723 17.0346 15.931 17.296C16.099 17.5573 16.2997 17.688 16.533 17.688Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/setting/discount")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Discount
                            </p>
                          </div>
                        </div>
                      </Link>
                  
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div>

                  {/* Dinein */}
                <div className="w-full">
                  <div
                    onClick={handleMenuWActive}
                    className={`flex place-items-start lg:gap-8 mt-1 lg:mt-0 w-full py-2  lg:px-0 lg:pb-2 gap-3 lg:pt-1 lg:p-1 ${
                      pathname.includes("/menu/dinein")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/dinein`} onClick={handleMenuWActive}>
                      <div className="flex mt-1 lg:gap-4">
                        {/* Image */}
                        <div>
                          {pathname.includes("/menu/dinein") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9582 22H19.3164C20.0036 22 20.5682 21.4761 20.65 20.8049L22 7.31514H17.9091V4H16.2973V7.31514H12.2309L12.4764 9.23056C13.8755 9.61528 15.1845 10.3111 15.97 11.0805C17.1482 12.2428 17.9582 13.4461 17.9582 15.4106V22ZM4 21.1814V20.3711H16.2973V21.1814C16.2973 21.6317 15.9291 22 15.4709 22H4.82636C4.36818 22 4 21.6317 4 21.1814ZM16.2973 15.4516C16.2973 8.90314 4 8.90314 4 15.4516H16.2973ZM4.01636 17.0969H16.2891V18.734H4.01636V17.0969Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              className="ml-1"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.9582 18H15.3164C16.0036 18 16.5682 17.4761 16.65 16.8049L18 3.31514H13.9091V0H12.2973V3.31514H8.23091L8.47636 5.23056C9.87545 5.61528 11.1845 6.31105 11.97 7.08049C13.1482 8.24284 13.9582 9.44611 13.9582 11.4106V18ZM0 17.1814V16.3711H12.2973V17.1814C12.2973 17.6317 11.9291 18 11.4709 18H0.826364C0.368182 18 0 17.6317 0 17.1814ZM12.2973 11.4516C12.2973 4.90314 0 4.90314 0 11.4516H12.2973ZM0.0163636 13.0969H12.2891V14.734H0.0163636V13.0969Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-base ml-1 mr-1.5 2xl:text-base ${
                            pathname.includes("/menu/dinein")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Dine - In
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                          className={`lg:mr-3 lg:ml-16 ml-3 mt-1 lg:mt-2 mr-3  cursor-pointer ${
                            pathname.includes("dinein")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("dinein") && openWSubMenu ? (
                    <div className="bg-search py-1 rounded-lg ml-1 ">
                      
                       {/* Create Order */}
                       <Link to={`/menu/dinein/${"create-new-order"}`}>
                        <div
                          onClick={() => setIsWActive(true)}
                          style={{
                            backgroundColor: isWActive ? "#F7BF41" : "",
                            borderRadius: isWActive ? "8px" : "",
                          }}
                          className={`flex  py-2 w-full justify-center lg:justify-start ${
                            pathname.includes("create-new-order")
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/create-new-order"
                              ) || isWActive ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p 
                              style={{
                                color: isWActive ? "white" : "",
                              }}
                              className={`hidden lg:block ml-2  text-sm 2xl:text-base ${
                                pathname.includes(
                                  "/menu/dinein/create-new-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Active order data */}
                      <Link
                        to={
                          `/menu/dinein/${"Active Order"
                            .toLowerCase()
                            .replace(" ", "-")}` 
                        } 
                      >
                        <div
                          onClick={handleMenuInWActive}
                          className={`flex  py-2 w-full justify-center lg:justify-start ${
                            pathname.includes(
                              "Active Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/active-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              
                              className={`hidden lg:block  text-sm 2xl:text-base ${
                                pathname.includes("/menu/dinein/active-order")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Active Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Past order */}
                      <Link
                        to={`/menu/dinein/${"Past Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleMenuInWActive}
                          className={`flex  py-2 w-full  justify-center lg:justify-start    ${
                            pathname.includes(
                              "Past Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-4">
                            <div>
                              {pathname.includes("/menu/dinein/past-order") ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/dinein/past-order")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Past Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Manage Table */}
                      <Link
                        to={`/menu/dinein/${"Manage Table"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleMenuInWActive}
                          className={`flex w-full  py-2   justify-center lg:justify-start    ${
                            pathname.includes(
                              "Manage Table".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-5 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/dinein/manage-table"
                              ) ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.63158 7.02H11.3684V18H6.63158V7.02ZM13.2632 18H16.1053C17.1474 18 18 17.1 18 16V7H13.2632V18ZM16.1053 0H1.89474C0.852632 0 0 0.9 0 2V5H18V2C18 0.9 17.1474 0 16.1053 0ZM0 16C0 17.1 0.852632 18 1.89474 18H4.73684V7H0V16Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.63158 7.02H11.3684V18H6.63158V7.02ZM13.2632 18H16.1053C17.1474 18 18 17.1 18 16V7H13.2632V18ZM16.1053 0H1.89474C0.852632 0 0 0.9 0 2V5H18V2C18 0.9 17.1474 0 16.1053 0ZM0 16C0 17.1 0.852632 18 1.89474 18H4.73684V7H0V16Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/dinein/manage-table")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Manage Tables
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                  {/* Take Away */}
                  <div className="w-full mt-1">
                  <div
                    onClick={handleWTakeaway}
                    className={`flex place-items-start lg:gap-6 w-full py-2  lg:px-0 gap-2 lg:py-2 lg:p-1 ${
                      pathname.includes("/menu/take-away")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/take-away`} onClick={handleWTakeaway}>
                      <div className="flex lg:gap-4 ">
                        <div>
                          {/* Image */}
                          {pathname.includes("/menu/take-away") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6394 7.85119C12.4848 8.15394 12.4238 8.49624 12.4641 8.83413C12.5004 9.09206 12.6028 9.33607 12.7611 9.54227C12.9194 9.74847 13.1282 9.90978 13.3671 10.0104C13.6061 10.1111 13.8669 10.1476 14.124 10.1163C14.3812 10.0851 14.6259 9.98729 14.8342 9.8324C15.3409 9.4626 15.8249 9.06597 16.3202 8.68276C16.3679 8.64636 16.4193 8.61378 16.5107 8.55055C16.3202 9.20584 16.143 9.81324 15.9639 10.4206C15.7163 11.2637 15.468 12.1055 15.219 12.946C15.1552 13.1656 15.1244 13.3936 15.1276 13.6224C15.1276 16.6561 15.1276 19.688 15.1276 22.7179C15.1276 22.8961 15.1009 22.9593 14.9008 22.9574C11.2962 22.9574 7.69157 22.9574 4.08693 22.9574C3.89641 22.9574 3.85449 22.9114 3.85449 22.7236C3.85449 19.6873 3.85449 16.6536 3.85449 13.6224C3.85469 13.4444 3.88101 13.2675 3.93261 13.0974C4.43431 11.4061 4.93157 9.71488 5.42438 8.02364C5.46248 7.89335 5.5063 7.83203 5.6511 7.83203C7.93734 7.83203 10.2198 7.83203 12.4984 7.83203C12.5403 7.84353 12.5803 7.84736 12.6394 7.85119ZM9.32051 14.1339C9.32051 13.8044 9.32051 13.5745 9.32051 13.3464C9.32051 13.3017 9.31174 13.2573 9.2947 13.2159C9.27766 13.1745 9.25268 13.137 9.22119 13.1053C9.18969 13.0736 9.15231 13.0485 9.11117 13.0313C9.07002 13.0142 9.02592 13.0054 8.98139 13.0054C8.93685 13.0054 8.89275 13.0142 8.85161 13.0313C8.81046 13.0485 8.77308 13.0736 8.74159 13.1053C8.7101 13.137 8.68512 13.1745 8.66808 13.2159C8.65103 13.2573 8.64226 13.3017 8.64226 13.3464C8.64226 13.517 8.64226 13.6894 8.64226 13.8619C8.64226 14.3849 8.64226 14.3811 8.11262 14.3696C7.99259 14.3696 7.95258 14.3351 7.95639 14.2125C7.95639 13.927 7.95639 13.6377 7.95639 13.3541C7.95903 13.3073 7.95202 13.2605 7.93577 13.2166C7.91953 13.1727 7.89442 13.1326 7.86202 13.099C7.82962 13.0653 7.79064 13.0388 7.74753 13.021C7.70442 13.0033 7.65812 12.9947 7.61155 12.9958C7.56608 12.9975 7.5214 13.0083 7.48016 13.0277C7.43892 13.047 7.40194 13.0744 7.3714 13.1084C7.34086 13.1423 7.31739 13.182 7.30235 13.2252C7.28731 13.2684 7.28103 13.3142 7.28385 13.3599C7.28385 13.5246 7.28385 13.6894 7.28385 13.8523C7.28385 14.3926 7.28385 14.3888 6.74087 14.3696C6.62656 14.3696 6.59608 14.3294 6.59989 14.2202C6.59989 13.9558 6.59989 13.6913 6.59989 13.4269C6.59989 13.1625 6.46462 12.9958 6.25314 12.9958C6.04166 12.9958 5.92926 13.1529 5.90449 13.4173C5.78683 14.3015 5.98973 15.1986 6.47605 15.9446C6.47605 15.9561 6.48748 15.9695 6.4951 15.981C6.56291 16.0964 6.58852 16.2319 6.5675 16.3642C6.47224 17.6193 6.37698 18.8724 6.29696 20.1274C6.28581 20.2698 6.30434 20.413 6.35137 20.5479C6.3984 20.6827 6.4729 20.8062 6.57009 20.9105C6.66727 21.0147 6.78502 21.0974 6.9158 21.1532C7.04658 21.2091 7.18751 21.2369 7.32958 21.2349C7.5201 21.2349 7.69919 21.2349 7.88209 21.2349C8.02669 21.2382 8.17036 21.2107 8.30364 21.1542C8.43693 21.0977 8.55682 21.0135 8.65544 20.9071C8.75405 20.8007 8.82916 20.6745 8.87581 20.5368C8.92247 20.3991 8.93962 20.253 8.92614 20.1082C8.85374 19.0314 8.78706 17.9546 8.68608 16.8816C8.6152 16.4178 8.7068 15.9437 8.94519 15.5403C9.23097 15.0786 9.43864 14.5938 9.32051 14.1339ZM12.3936 15.7147C12.3936 14.7969 12.3765 14.1608 12.3936 13.5246C12.4107 13.0169 12.1478 12.9498 11.7877 13.0131C11.1228 13.1299 10.7132 13.5706 10.3912 14.1282C9.97918 14.93 9.73229 15.8072 9.66535 16.7072C9.65221 16.786 9.66619 16.8669 9.70499 16.9366C9.7438 17.0063 9.80509 17.0605 9.87874 17.0904C9.95186 17.1353 10.029 17.1732 10.1093 17.2035C10.3379 17.2667 10.355 17.4181 10.3322 17.6288C10.2407 18.4451 10.1664 19.2632 10.0864 20.0795C10.0653 20.3436 10.1324 20.6072 10.2769 20.8286C10.6008 21.3881 12.1116 21.3766 12.4469 20.8421C12.6216 20.5556 12.6892 20.216 12.6375 19.884C12.4736 18.401 12.3155 16.9237 12.3936 15.7147Z"
                                fill="white"
                              />
                              <path
                                d="M10.3926 5.05326C11.1547 4.64131 11.9167 4.22552 12.6788 3.8174C12.82 3.74909 12.9757 3.71684 13.1323 3.72352C15.4426 3.72352 17.7536 3.72352 20.0653 3.72352C20.1986 3.72352 20.2558 3.75226 20.2558 3.89788C20.2558 4.4727 20.2558 5.04751 20.2558 5.62233C20.2558 5.76987 20.2082 5.80244 20.0653 5.79669C19.8595 5.79669 19.6538 5.79669 19.448 5.79669C19.3745 5.79307 19.3011 5.80444 19.2322 5.83011C19.1632 5.85578 19.1001 5.89523 19.0467 5.94607C18.9933 5.99691 18.9507 6.0581 18.9214 6.12595C18.8922 6.1938 18.8769 6.2669 18.8764 6.34085C18.8193 7.08045 18.3563 7.54988 17.6209 7.50007C17.3224 7.47083 17.0212 7.50709 16.738 7.60633C16.4548 7.70557 16.1963 7.86543 15.9805 8.07488C15.5195 8.49833 15.0013 8.85855 14.504 9.24176C14.0982 9.55408 13.6257 9.52342 13.3228 9.16895C13.0198 8.81448 13.0618 8.36038 13.4218 7.99633L15.6128 5.77945C15.7443 5.64916 15.8624 5.51695 15.7767 5.31193C15.6909 5.10691 15.5195 5.09541 15.3328 5.09541C13.7692 5.09541 12.2044 5.09541 10.6383 5.09541H10.4059L10.3926 5.05326Z"
                                fill="white"
                              />
                              <path
                                d="M15.8442 22.4391C15.8071 22.3659 15.7945 22.2826 15.808 22.2015C15.808 19.3466 15.808 16.493 15.808 13.6406C15.8079 13.455 15.8349 13.2703 15.8881 13.0926C16.292 11.722 16.694 10.3526 17.094 8.98457C17.1112 8.92326 17.1321 8.86386 17.155 8.79297C17.2446 8.83129 17.235 8.91368 17.2522 8.97499C17.6573 10.3584 18.0619 11.7418 18.4658 13.1252C18.5158 13.2891 18.5415 13.4595 18.542 13.631C18.542 16.4923 18.542 19.353 18.542 22.213C18.5553 22.2843 18.5439 22.3581 18.5096 22.4219L17.557 21.4639C17.4846 21.391 17.5132 21.301 17.5132 21.2186C17.5132 18.9015 17.5132 16.5843 17.5132 14.2671V14.1177C17.5132 13.8284 17.3893 13.6693 17.1703 13.6693C16.9512 13.6693 16.8292 13.8284 16.8292 14.1177C16.8292 16.4566 16.8292 18.7954 16.8292 21.1343C16.8366 21.2301 16.8215 21.3264 16.7851 21.4152C16.7487 21.5041 16.692 21.5831 16.6196 21.6459C16.3567 21.895 16.1091 22.1671 15.8442 22.4391Z"
                                fill="white"
                              />
                              <path
                                d="M14.6437 5.78906C14.1769 6.25658 13.7501 6.68386 13.3272 7.11114C13.3006 7.13231 13.27 7.14767 13.2371 7.15624C13.2043 7.16482 13.1701 7.16643 13.1367 7.16096C10.4224 7.16096 7.70748 7.16096 4.99193 7.16096C4.9251 7.1652 4.85852 7.14922 4.8008 7.11507C4.74307 7.08092 4.69684 7.03017 4.66805 6.96935C4.56471 6.77182 4.52604 6.54651 4.55755 6.32556C4.61089 5.90594 4.74807 5.78906 5.1634 5.78906H14.6513H14.6437Z"
                                fill="white"
                              />
                              <path
                                d="M20.9277 4.90339C20.9277 4.34581 20.9277 3.78824 20.9277 3.23067C20.9277 3.09271 20.9468 3.03906 21.1183 3.03906C21.6898 3.04864 22.2614 3.03906 22.8329 3.03906C22.9606 3.03906 23.0006 3.06972 23.0006 3.20384C23.0006 4.35348 23.0006 5.50311 23.0006 6.65275C23.0006 6.78879 22.9568 6.81753 22.831 6.81561C22.2595 6.81561 21.6879 6.81561 21.1259 6.81561C20.9887 6.81561 20.9354 6.78112 20.9468 6.63742C20.9334 6.06069 20.9277 5.48204 20.9277 4.90339Z"
                                fill="white"
                              />
                              <path
                                d="M16.3252 22.8983C16.5805 22.6473 16.8358 22.4002 17.0873 22.1472C17.154 22.0802 17.1978 22.0821 17.2606 22.1472C17.5121 22.4021 17.7655 22.6512 18.0646 22.9501H16.35L16.3252 22.8983Z"
                                fill="white"
                              />
                              <path
                                d="M7.61365 20.5465H7.56983C7.03066 20.5465 6.96207 20.4641 6.99827 19.9161C7.09353 18.8258 7.16212 17.7356 7.2269 16.6377C7.23833 16.4576 7.29548 16.402 7.46695 16.4193C7.63842 16.4365 7.83275 16.3714 7.94325 16.4499C8.05375 16.5285 7.9966 16.7565 8.00994 16.9174C8.09186 17.9809 8.16807 19.0423 8.24428 20.1058C8.25746 20.162 8.25702 20.2205 8.24299 20.2765C8.22895 20.3325 8.20174 20.3843 8.16363 20.4275C8.12553 20.4707 8.07766 20.5041 8.02405 20.5248C7.97045 20.5455 7.91268 20.5529 7.85561 20.5465H7.61365Z"
                                fill="white"
                              />
                              <path
                                d="M6.80957 15.0625H8.42708C8.31849 15.2809 8.21751 15.4859 8.11273 15.691C8.08034 15.7542 8.01366 15.7369 7.96031 15.7389H7.27253C7.20776 15.7389 7.14489 15.7389 7.10869 15.6718C7.01343 15.4745 6.91436 15.279 6.80957 15.0625Z"
                                fill="white"
                              />
                              <path
                                d="M11.7123 15.4354C11.7123 15.9355 11.7123 16.4356 11.7123 16.9357C11.7123 17.0717 11.6818 17.1273 11.537 17.1158C11.4451 17.1081 11.3527 17.1081 11.2607 17.1158C11.1293 17.1158 11.034 17.1158 10.9731 16.9549C10.9121 16.7939 10.6739 16.7307 10.5082 16.6368C10.4129 16.5851 10.3691 16.5352 10.3882 16.4222C10.4722 15.7342 10.6753 15.0662 10.9883 14.4487C11.1185 14.1934 11.3113 13.9758 11.5484 13.8164C11.6666 13.7416 11.7161 13.7455 11.7142 13.9083C11.7066 14.4218 11.7123 14.9277 11.7123 15.4354Z"
                                fill="white"
                              />
                              <path
                                d="M11.3544 20.5453H11.143C10.88 20.5453 10.7467 20.4035 10.7619 20.1391C10.8038 19.6141 10.861 19.0891 10.9124 18.5641C10.9315 18.3591 10.9639 18.1541 10.9734 17.9471C10.9734 17.8207 11.0286 17.7862 11.1411 17.7996C11.183 17.7996 11.2268 17.7996 11.2687 17.7996C11.7488 17.7996 11.7431 17.7996 11.7869 18.2709C11.8384 18.8457 11.9031 19.4206 11.9565 19.9954C11.9965 20.4437 11.8974 20.5453 11.4554 20.5453H11.3544Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6394 7.85119C12.4848 8.15394 12.4238 8.49624 12.4641 8.83413C12.5004 9.09206 12.6028 9.33607 12.7611 9.54227C12.9194 9.74847 13.1282 9.90978 13.3671 10.0104C13.6061 10.1111 13.8669 10.1476 14.124 10.1163C14.3812 10.0851 14.6259 9.98729 14.8342 9.8324C15.3409 9.4626 15.8249 9.06597 16.3202 8.68276C16.3679 8.64636 16.4193 8.61378 16.5107 8.55055C16.3202 9.20584 16.143 9.81324 15.9639 10.4206C15.7163 11.2637 15.468 12.1055 15.219 12.946C15.1552 13.1656 15.1244 13.3936 15.1276 13.6224C15.1276 16.6561 15.1276 19.688 15.1276 22.7179C15.1276 22.8961 15.1009 22.9593 14.9008 22.9574C11.2962 22.9574 7.69157 22.9574 4.08693 22.9574C3.89641 22.9574 3.85449 22.9114 3.85449 22.7236C3.85449 19.6873 3.85449 16.6536 3.85449 13.6224C3.85469 13.4444 3.88101 13.2675 3.93261 13.0974C4.43431 11.4061 4.93157 9.71488 5.42438 8.02364C5.46248 7.89335 5.5063 7.83203 5.6511 7.83203C7.93734 7.83203 10.2198 7.83203 12.4984 7.83203C12.5403 7.84353 12.5803 7.84736 12.6394 7.85119ZM9.32051 14.1339C9.32051 13.8044 9.32051 13.5745 9.32051 13.3464C9.32051 13.3017 9.31174 13.2573 9.2947 13.2159C9.27766 13.1745 9.25268 13.137 9.22119 13.1053C9.18969 13.0736 9.15231 13.0485 9.11117 13.0313C9.07002 13.0142 9.02592 13.0054 8.98139 13.0054C8.93685 13.0054 8.89275 13.0142 8.85161 13.0313C8.81046 13.0485 8.77308 13.0736 8.74159 13.1053C8.7101 13.137 8.68512 13.1745 8.66808 13.2159C8.65103 13.2573 8.64226 13.3017 8.64226 13.3464C8.64226 13.517 8.64226 13.6894 8.64226 13.8619C8.64226 14.3849 8.64226 14.3811 8.11262 14.3696C7.99259 14.3696 7.95258 14.3351 7.95639 14.2125C7.95639 13.927 7.95639 13.6377 7.95639 13.3541C7.95903 13.3073 7.95202 13.2605 7.93577 13.2166C7.91953 13.1727 7.89442 13.1326 7.86202 13.099C7.82962 13.0653 7.79064 13.0388 7.74753 13.021C7.70442 13.0033 7.65812 12.9947 7.61155 12.9958C7.56608 12.9975 7.5214 13.0083 7.48016 13.0277C7.43892 13.047 7.40194 13.0744 7.3714 13.1084C7.34086 13.1423 7.31739 13.182 7.30235 13.2252C7.28731 13.2684 7.28103 13.3142 7.28385 13.3599C7.28385 13.5246 7.28385 13.6894 7.28385 13.8523C7.28385 14.3926 7.28385 14.3888 6.74087 14.3696C6.62656 14.3696 6.59608 14.3294 6.59989 14.2202C6.59989 13.9558 6.59989 13.6913 6.59989 13.4269C6.59989 13.1625 6.46462 12.9958 6.25314 12.9958C6.04166 12.9958 5.92926 13.1529 5.90449 13.4173C5.78683 14.3015 5.98973 15.1986 6.47605 15.9446C6.47605 15.9561 6.48748 15.9695 6.4951 15.981C6.56291 16.0964 6.58852 16.2319 6.5675 16.3642C6.47224 17.6193 6.37698 18.8724 6.29696 20.1274C6.28581 20.2698 6.30434 20.413 6.35137 20.5479C6.3984 20.6827 6.4729 20.8062 6.57009 20.9105C6.66727 21.0147 6.78502 21.0974 6.9158 21.1532C7.04658 21.2091 7.18751 21.2369 7.32958 21.2349C7.5201 21.2349 7.69919 21.2349 7.88209 21.2349C8.02669 21.2382 8.17036 21.2107 8.30364 21.1542C8.43693 21.0977 8.55682 21.0135 8.65544 20.9071C8.75405 20.8007 8.82916 20.6745 8.87581 20.5368C8.92247 20.3991 8.93962 20.253 8.92614 20.1082C8.85374 19.0314 8.78706 17.9546 8.68608 16.8816C8.6152 16.4178 8.7068 15.9437 8.94519 15.5403C9.23097 15.0786 9.43864 14.5938 9.32051 14.1339ZM12.3936 15.7147C12.3936 14.7969 12.3765 14.1608 12.3936 13.5246C12.4107 13.0169 12.1478 12.9498 11.7877 13.0131C11.1228 13.1299 10.7132 13.5706 10.3912 14.1282C9.97918 14.93 9.73229 15.8072 9.66535 16.7072C9.65221 16.786 9.66619 16.8669 9.70499 16.9366C9.7438 17.0063 9.80509 17.0605 9.87874 17.0904C9.95186 17.1353 10.029 17.1732 10.1093 17.2035C10.3379 17.2667 10.355 17.4181 10.3322 17.6288C10.2407 18.4451 10.1664 19.2632 10.0864 20.0795C10.0653 20.3436 10.1324 20.6072 10.2769 20.8286C10.6008 21.3881 12.1116 21.3766 12.4469 20.8421C12.6216 20.5556 12.6892 20.216 12.6375 19.884C12.4736 18.401 12.3155 16.9237 12.3936 15.7147Z"
                                fill="black"
                              />
                              <path
                                d="M10.3926 5.05326C11.1547 4.64131 11.9167 4.22552 12.6788 3.8174C12.82 3.74909 12.9757 3.71684 13.1323 3.72352C15.4426 3.72352 17.7536 3.72352 20.0653 3.72352C20.1986 3.72352 20.2558 3.75226 20.2558 3.89788C20.2558 4.4727 20.2558 5.04751 20.2558 5.62233C20.2558 5.76987 20.2082 5.80244 20.0653 5.79669C19.8595 5.79669 19.6538 5.79669 19.448 5.79669C19.3745 5.79307 19.3011 5.80444 19.2322 5.83011C19.1632 5.85578 19.1001 5.89523 19.0467 5.94607C18.9933 5.99691 18.9507 6.0581 18.9214 6.12595C18.8922 6.1938 18.8769 6.2669 18.8764 6.34085C18.8193 7.08045 18.3563 7.54988 17.6209 7.50007C17.3224 7.47083 17.0212 7.50709 16.738 7.60633C16.4548 7.70557 16.1963 7.86543 15.9805 8.07488C15.5195 8.49833 15.0013 8.85855 14.504 9.24176C14.0982 9.55408 13.6257 9.52342 13.3228 9.16895C13.0198 8.81448 13.0618 8.36038 13.4218 7.99633L15.6128 5.77945C15.7443 5.64916 15.8624 5.51695 15.7767 5.31193C15.6909 5.10691 15.5195 5.09541 15.3328 5.09541C13.7692 5.09541 12.2044 5.09541 10.6383 5.09541H10.4059L10.3926 5.05326Z"
                                fill="black"
                              />
                              <path
                                d="M15.8442 22.4391C15.8071 22.3659 15.7945 22.2826 15.808 22.2015C15.808 19.3466 15.808 16.493 15.808 13.6406C15.8079 13.455 15.8349 13.2703 15.8881 13.0926C16.292 11.722 16.694 10.3526 17.094 8.98457C17.1112 8.92326 17.1321 8.86386 17.155 8.79297C17.2446 8.83129 17.235 8.91368 17.2522 8.97499C17.6573 10.3584 18.0619 11.7418 18.4658 13.1252C18.5158 13.2891 18.5415 13.4595 18.542 13.631C18.542 16.4923 18.542 19.353 18.542 22.213C18.5553 22.2843 18.5439 22.3581 18.5096 22.4219L17.557 21.4639C17.4846 21.391 17.5132 21.301 17.5132 21.2186C17.5132 18.9015 17.5132 16.5843 17.5132 14.2671V14.1177C17.5132 13.8284 17.3893 13.6693 17.1703 13.6693C16.9512 13.6693 16.8292 13.8284 16.8292 14.1177C16.8292 16.4566 16.8292 18.7954 16.8292 21.1343C16.8366 21.2301 16.8215 21.3264 16.7851 21.4152C16.7487 21.5041 16.692 21.5831 16.6196 21.6459C16.3567 21.895 16.1091 22.1671 15.8442 22.4391Z"
                                fill="black"
                              />
                              <path
                                d="M14.6437 5.78906C14.1769 6.25658 13.7501 6.68386 13.3272 7.11114C13.3006 7.13231 13.27 7.14767 13.2371 7.15624C13.2043 7.16482 13.1701 7.16643 13.1367 7.16096C10.4224 7.16096 7.70748 7.16096 4.99193 7.16096C4.9251 7.1652 4.85852 7.14922 4.8008 7.11507C4.74307 7.08092 4.69684 7.03017 4.66805 6.96935C4.56471 6.77182 4.52604 6.54651 4.55755 6.32556C4.61089 5.90594 4.74807 5.78906 5.1634 5.78906H14.6513H14.6437Z"
                                fill="black"
                              />
                              <path
                                d="M20.9277 4.90339C20.9277 4.34581 20.9277 3.78824 20.9277 3.23067C20.9277 3.09271 20.9468 3.03906 21.1183 3.03906C21.6898 3.04864 22.2614 3.03906 22.8329 3.03906C22.9606 3.03906 23.0006 3.06972 23.0006 3.20384C23.0006 4.35348 23.0006 5.50311 23.0006 6.65275C23.0006 6.78879 22.9568 6.81753 22.831 6.81561C22.2595 6.81561 21.6879 6.81561 21.1259 6.81561C20.9887 6.81561 20.9354 6.78112 20.9468 6.63742C20.9334 6.06069 20.9277 5.48204 20.9277 4.90339Z"
                                fill="black"
                              />
                              <path
                                d="M16.3252 22.8983C16.5805 22.6473 16.8358 22.4002 17.0873 22.1472C17.154 22.0802 17.1978 22.0821 17.2606 22.1472C17.5121 22.4021 17.7655 22.6512 18.0646 22.9501H16.35L16.3252 22.8983Z"
                                fill="black"
                              />
                              <path
                                d="M7.61365 20.5465H7.56983C7.03066 20.5465 6.96207 20.4641 6.99827 19.9161C7.09353 18.8258 7.16212 17.7356 7.2269 16.6377C7.23833 16.4576 7.29548 16.402 7.46695 16.4193C7.63842 16.4365 7.83275 16.3714 7.94325 16.4499C8.05375 16.5285 7.9966 16.7565 8.00994 16.9174C8.09186 17.9809 8.16807 19.0423 8.24428 20.1058C8.25746 20.162 8.25702 20.2205 8.24299 20.2765C8.22895 20.3325 8.20174 20.3843 8.16363 20.4275C8.12553 20.4707 8.07766 20.5041 8.02405 20.5248C7.97045 20.5455 7.91268 20.5529 7.85561 20.5465H7.61365Z"
                                fill="black"
                              />
                              <path
                                d="M6.80957 15.0625H8.42708C8.31849 15.2809 8.21751 15.4859 8.11273 15.691C8.08034 15.7542 8.01366 15.7369 7.96031 15.7389H7.27253C7.20776 15.7389 7.14489 15.7389 7.10869 15.6718C7.01343 15.4745 6.91436 15.279 6.80957 15.0625Z"
                                fill="black"
                              />
                              <path
                                d="M11.7123 15.4354C11.7123 15.9355 11.7123 16.4356 11.7123 16.9357C11.7123 17.0717 11.6818 17.1273 11.537 17.1158C11.4451 17.1081 11.3527 17.1081 11.2607 17.1158C11.1293 17.1158 11.034 17.1158 10.9731 16.9549C10.9121 16.7939 10.6739 16.7307 10.5082 16.6368C10.4129 16.5851 10.3691 16.5352 10.3882 16.4222C10.4722 15.7342 10.6753 15.0662 10.9883 14.4487C11.1185 14.1934 11.3113 13.9758 11.5484 13.8164C11.6666 13.7416 11.7161 13.7455 11.7142 13.9083C11.7066 14.4218 11.7123 14.9277 11.7123 15.4354Z"
                                fill="black"
                              />
                              <path
                                d="M11.3544 20.5453H11.143C10.88 20.5453 10.7467 20.4035 10.7619 20.1391C10.8038 19.6141 10.861 19.0891 10.9124 18.5641C10.9315 18.3591 10.9639 18.1541 10.9734 17.9471C10.9734 17.8207 11.0286 17.7862 11.1411 17.7996C11.183 17.7996 11.2268 17.7996 11.2687 17.7996C11.7488 17.7996 11.7431 17.7996 11.7869 18.2709C11.8384 18.8457 11.9031 19.4206 11.9565 19.9954C11.9965 20.4437 11.8974 20.5453 11.4554 20.5453H11.3544Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block text-base 2xl:text-base ${
                            pathname.includes("/menu/take-away")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Take Away
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon 
                          className={`lg:mr-4 lg:ml-14 ml-2 mt-1 mr-3  cursor-pointer ${
                            pathname.includes("take-away")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("take-away") && openWSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">
                     

                      {/* Create order */}
                      <Link to={`/menu/take-away/${"create"}`}>
                        <div
                          onClick={() => setWTakeaway(true)}
                          style={{
                            backgroundColor: wtakeaway ? "#F7BF41" : "",
                            borderRadius: wtakeaway ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes("create")
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {wtakeaway || pathname.includes("take-away/create") ? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                            style={{
                              color: wtakeaway ? "white" : "",
                            }}
                              className={`hidden ml-2 lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/take-away/create")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Manage order */}
                      <Link
                        to={`/menu/take-away/${"Manage Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleWDTakeaway}
                          className={`flex w-full justify-center lg:justify-start   py-2  ${
                            pathname.includes(
                              "Manage Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/take-away/manage-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/take-away/manage-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Manage Orders
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                 {/* Party Order */}
                 <div className="w-full ">
                  <div
                    onClick={handleWPartyorder}
                    className={`flex place-items-start lg:gap-6 w-full py-2  lg:px-0 gap-2 lg:py-2  lg:p-1 ${
                      pathname.includes("/menu/party-order")
                        ? "text-white bg-darkyellow  py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link to={`/menu/party-order`} onClick={handleWPartyorder}>
                      <div className="flex lg:gap-4">
                        <div>
                          {/* Image */}
                          {pathname.includes("/menu/party-order") ? (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.01 16.38C19.78 16.38 18.59 16.18 17.48 15.82C17.13 15.7 16.74 15.79 16.47 16.06L14.9 18.03C12.07 16.68 9.42 14.13 8.01 11.2L9.96 9.54C10.23 9.26 10.31 8.87 10.2 8.52C9.83 7.41 9.64 6.22 9.64 4.99C9.64 4.45 9.19 4 8.65 4H5.19C4.65 4 4 4.24 4 4.99C4 14.28 11.73 22 21.01 22C21.72 22 22 21.37 22 20.82V17.37C22 16.83 21.55 16.38 21.01 16.38Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.01 16.38C19.78 16.38 18.59 16.18 17.48 15.82C17.13 15.7 16.74 15.79 16.47 16.06L14.9 18.03C12.07 16.68 9.42 14.13 8.01 11.2L9.96 9.54C10.23 9.26 10.31 8.87 10.2 8.52C9.83 7.41 9.64 6.22 9.64 4.99C9.64 4.45 9.19 4 8.65 4H5.19C4.65 4 4 4.24 4 4.99C4 14.28 11.73 22 21.01 22C21.72 22 22 21.37 22 20.82V17.37C22 16.83 21.55 16.38 21.01 16.38Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Name */}
                        <div
                          className={`hidden lg:block lg:mr-0.5 text-base 2xl:text-base ${
                            pathname.includes("/menu/party-order")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          Party Orders
                        </div>
                      </div>

                      <div>
                        <ArrowDropDownRoundedIcon
                          className={`lg:mr-4 mt-1 mr-3 lg:ml-10 ml-2 cursor-pointer ${
                            pathname.includes("party-order")
                              ? "rotateAnimation text-white"
                              : ""
                          }`}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* SubMenu */}
                  {pathname.includes("party-order") && openWSubMenu ? (
                    <div className="bg-search py-1 sub-menu-sec ml-0 rounded-lg ">

                      {/* create Order*/}
                      <Link
                        to={`/menu/party-order/${"customer"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={() => setWPartyorder(true)}
                          style={{
                            backgroundColor: wpartyorder ? "#F7BF41" : "",
                            borderRadius: wpartyorder ? "8px" : "",
                          }}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Customer".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/party-order/customer"
                              ) || wpartyorder? (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  className="mt-1"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.4343 7.21542L16.3029 5.34687C16.9028 4.74691 17.2028 4.44693 17.3528 4.11786C17.5929 3.59098 17.5929 2.98589 17.3528 2.45902C17.2028 2.12994 16.9028 1.82996 16.3029 1.23001C15.7029 0.630048 15.4029 0.330069 15.0739 0.180093C14.547 -0.060031 13.9419 -0.060031 13.415 0.180093C13.0859 0.330069 12.786 0.630048 12.186 1.23001L10.2936 3.12243C11.2869 4.82027 12.7135 6.23557 14.4343 7.21542ZM8.83919 4.57682L2.56155 10.8545C2.2292 11.1868 2.06303 11.353 1.94061 11.5511C1.81818 11.7492 1.74387 11.9721 1.59524 12.418L0.15164 16.7488C0.0136574 17.1627 -0.0553338 17.3697 0.0539202 17.479C0.163174 17.5882 0.370148 17.5192 0.784096 17.3812L5.11489 15.9376C5.56078 15.789 5.78372 15.7147 5.98181 15.5923C6.17989 15.4698 6.34606 15.3037 6.67839 14.9714L6.67839 14.9713L6.67841 14.9713L12.9761 8.67367C11.3063 7.62934 9.89415 6.22726 8.83919 4.57682Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p  
                              style={{
                                color: wpartyorder ? "white" : "",
                              }}
                              className={`hidden ml-2 lg:block text-base 2xl:text-base ${
                                pathname.includes("/menu/party-order/customer")
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Create Order
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Active order  */}
                      <Link
                        to={`/menu/party-order/${"Active Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleWDPartyorder}
                          
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Active Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes("party-order/active-order")? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1051 5.84766H18.3286C18.3286 5.8497 18.3286 5.8497 18.3286 5.85174V6.80444C18.3286 7.85506 17.5308 8.70779 16.5521 8.70779H9.44413C8.46352 8.70779 7.66762 7.85302 7.66762 6.80444V5.85378C7.66762 5.85174 7.66762 5.85174 7.66762 5.8497H5.89301C5.40176 5.8497 5 6.2781 5 6.80648V22.0333C5 22.5597 5.39986 22.9901 5.89301 22.9901H20.107C20.6001 22.9901 21 22.5597 21 22.0333V6.80444C20.9981 6.27607 20.5982 5.84766 20.1051 5.84766Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M16.553 4.90132H15.6638C15.1744 4.90132 14.7764 4.47291 14.7764 3.95066C14.7764 3.42637 14.3766 3 13.8872 3H12.1126C11.6233 3 11.2253 3.42841 11.2253 3.95066C11.2253 4.47495 10.8255 4.90132 10.338 4.90132H9.44883C8.95948 4.90132 8.56152 5.32973 8.56152 5.85198V6.80263C8.56152 7.32692 8.96138 7.75329 9.44883 7.75329H16.5549C17.0442 7.75329 17.4422 7.32488 17.4422 6.80263V5.85198C17.4422 5.32973 17.0423 4.90132 16.553 4.90132ZM12.998 5.85198C12.5087 5.85198 12.1107 5.42561 12.1107 4.90132C12.1107 4.37499 12.5087 3.95066 12.998 3.95066C13.4893 3.95066 13.8853 4.37703 13.8853 4.90132C13.8872 5.42561 13.4893 5.85198 12.998 5.85198Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/party-order/active-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Active Orders
                            </p>
                          </div>
                        </div>
                      </Link>

                      

                      {/* Past Order*/}
                      <Link
                        to={`/menu/party-order/${"Past Order"
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <div
                          onClick={handleWDPartyorder}
                          className={`flex w-full justify-center lg:justify-start py-2  ${
                            pathname.includes(
                              "Past Order".toLowerCase().replace(" ", "-")
                            )
                              ? "rounded-md subname-active"
                              : ""
                          }`}
                        >
                          <div className="flex lg:gap-4 lg:pl-5">
                            <div>
                              {pathname.includes(
                                "/menu/party-order/past-order"
                              ) ? (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="white"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13.0799 6.06601C13.0002 6.14016 13.0002 6.25956 13.0002 6.49836V12.7097C13.0002 12.8506 13.0002 12.921 12.9667 12.979C12.9332 13.037 12.8722 13.0723 12.7502 13.1427L7.37104 16.2484C7.16424 16.3678 7.06084 16.4275 7.03644 16.5335C7.01205 16.6396 7.07579 16.7337 7.20328 16.9221C7.79598 17.7978 8.58072 18.5297 9.50021 19.0605C10.5643 19.6749 11.7714 19.9984 13.0002 19.9984C14.229 19.9984 15.4361 19.6749 16.5002 19.0605C17.5643 18.4462 18.448 17.5625 19.0624 16.4984C19.6768 15.4342 20.0002 14.2271 20.0002 12.9984C20.0002 11.7696 19.6768 10.5625 19.0624 9.49836C18.448 8.43422 17.5643 7.55056 16.5002 6.93618C15.5807 6.40532 14.5545 6.09167 13.4998 6.0162C13.2729 5.99997 13.1595 5.99186 13.0799 6.06601Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>

                            <p
                              className={`hidden lg:block text-base 2xl:text-base ${
                                pathname.includes(
                                  "/menu/party-order/past-order"
                                )
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Past Orders
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </nav>
          <div className="sidebar-footer">
            <img src={poweredbyscube} alt="powered" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
