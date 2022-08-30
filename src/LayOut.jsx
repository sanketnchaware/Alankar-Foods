import { Routes, Route, Navigate, Link } from "react-router-dom";
import { ActiveOrder } from "./Pages/ActiveOrder/ActiveOrder";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import { Feedback } from "./Pages/Feedback/Feedback";
import ManageMenuBody from "./Pages/ManageMenu/ManageMenuBody";
import ManageCategoryBody from "./Pages/ManageCategory/ManageCategoryBody";
import ManageStaffBody from "./Pages/ManageStaff/ManageStaffBody";
import { PastOrders } from "./Pages/PastOrders/PastOrders";
import { ManageTables } from "./components/ManageTables/ManageTables";

import { KDS } from "./Pages/KDS/KDS";
import { ViewKDS } from "./components/KDS/ViewKDS";
import { CreateKDS } from "./Pages/KDS/CreateKDS";
import AddNewCategoryBody from "./components/ManageCategory/AddNewCategory/AddNewCategoryBody";
import CategoryBody from "./components/ManageCategory/EditCategory/CategoryBody";
import AddMenuBody from "./components/ManageMenu/AddMenuBody";
import EditMenuBody from "./components/ManageMenu/EditMenuBody";
import { CreateNewOrder } from "./Pages/CreateNewOrder/CreateNewOrder";
import AddItems from "./components/TakeAway/AddItems";
import CustomerDetails from "./components/TakeAway/CustomerDetails";
import PaymentBody from "./components/TakeAway/PaymentBody";
import SalesBody from "./Pages/Reports/SalesBody";
import AddNewStaffBody from "./components/ManageStaff/AddNewStaff/AddNewStaffBody";
import RollBody from "./components/ManageStaff/AddRole/RollBody";
import EditStaffBody from "./components/ManageStaff/EditStaff/EditStaffBody";
import StoreBody from "./Pages/Settings/StoreBody";
import TableBody from "./components/StoreSetting/TableBody";
import DiscountBody from "./components/StoreSetting/DiscountBody";
import CouponBody from "./components/StoreSetting/CouponBody";
import StaffBody from "./components/Reports/StaffReport/StaffBody";
import PartyBody from "./components/PartyOrder/PartyBody";
import PastOrderBody from "./components/PartyOrder/PastOrderBody";
import PCustomer from "./components/PartyOrder/PCustomer";
import PPayment from "./components/PartyOrder/PPayment";
import Takeaway from "./Pages/TakeAway/Takeaway";
import Customer from "./components/CreateNewOrder/Customer";
import DineDashboard from "./components/ActiveOrder/DineDashboard";
import TakeDashboard from "./components/TakeAway/TakeDashboard";
import ViewProfile from "./components/Profile/ViewProfile";
import AddOrderItems from "./components/CreateNewOrder/AddOrderItems";
import SideMenu from "./components/UniversalComponents/SideMenu";
import { useState } from "react";
import StaffProfile from "./Images/StaffProfile.png";
import Homepage from "./components/MobileView/Homepage";
import CategoryList from "./components/MobileView/CategoryList";
import SubCategoryList from "./components/MobileView/SubCategoryList";
import ViewItems from "./components/MobileView/ViewItems";
import FeedbackForm from "./components/MobileView/FeedbackForm";
import TablesList from "./components/StoreSetting/TablesList";


const PrivateRoute = ({ children, role }) => {
  const adminData = localStorage.getItem("adminDetails");
  const [display, setDisplay] = useState(false);
  const token = localStorage.getItem("alankartoken");
  
  console.log(JSON.parse(adminData).role,"roledta")

  let user = "";
  if (adminData) {
    user = JSON.parse(adminData);
  }
  if (!token) {
    return <Navigate to="/login" />;
  }if(role==="Waiter"){
    return <Navigate to="/menu/dinein"/>
  }

  const handleDisplay = () => {
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div
      className="
     fixed w-full h-full"
    >
      <div className="fixed  md:w-12 lg:w-52 bg-white">
        <SideMenu />
      </div>
      <div>
        <section className="inline-block w-full h-full md:pl-12 lg:pl-52">
          <div className="w-full py-2 text-center mb-1 md:h-14 bg-white md:py-0 headerShadow">
            <div className="justify-end hidden w-full  pr-4 md:flex">
              <div className="relative h-0 group ">
                <div onMouseLeave={handleClose}>
                  <div className="flex flex-row px-4  truncate rounded cursor-pointer">
                    <div
                      className="flex flex-row w-full items-center pb-5"
                      onMouseOver={handleDisplay}
                    >
                      <div className=" w-9 h-9 rounded-[50%] mr-4 bg-slate-600 ">
                        <img
                          className="w-9 h-9 rounded-[50%]"
                          alt="profile"
                          src={StaffProfile}
                        ></img>
                      </div>

                      <div className="">
                        <p className=" text-base font-semibold my-1">
                          {user?.name}
                        </p>
                        <p className=" text-xs font-normal mb-1">
                          {user?.role}
                        </p>
                      </div>
                     
                    </div>
                  </div>

                  {!display ? (
                    <div className="hidden"></div>
                  ) : (
                    <div
                      onMouseLeave={handleClose}
                      className="absolute  z-10 py-2 bg-white rounded-lg flex-col top-14 border-2 border-button_border text-orange"
                    >
                      <Link to="/menu/view-profile">
                        <div className="hover:bg-amber-200 px-8 py-1">
                          Profile
                        </div>
                      </Link>
                      <div className="hover:bg-amber-200 px-8 py-1 cursor-pointer">
                        <p onClick={logout}>Logout</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pb-4 pt-1 ml-14 md:ml-4 pb-8  overflow-auto bg-darkwhite h-[calc(100vh_-_2.5rem)] ">
            {children}
          </div>
        </section>
      </div>

      
    </div>
  );
};

function LayOut() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>

        {/* Routes for mobile view */}

        <Route exact path="/meal_type/:id" element={<CategoryList />}></Route>

        <Route
          exact
          path="/meal_type/:mealType/category/:id"
          element={<SubCategoryList />}
        ></Route>

        <Route
          exact
          path="/meal_type/:mealType/category/:cateId/subcategory/:id"
          element={<ViewItems/>}
        ></Route>

        <Route
          exact
          path="/feedback"
          element={<FeedbackForm/>}
        ></Route>

        {/* Login Route */}
        <Route exact path="/login" element={<Login />} />

        <Route>
          <Route exact path="/menu">
            <Route
              exact
              path="dashboard"
              element={
                <PrivateRoute role={["Admin"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Profile Routes */}
            <Route
              exact
              path="view-profile"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <ViewProfile />
                </PrivateRoute>
              }
            />

            {/* Dinein Routes */}
            <Route
              exact
              path="dinein"
              element={
                <PrivateRoute role={["Admin"]}>
                  <DineDashboard />
                </PrivateRoute>
              }
            />

          <Route
              exact
              path="dinein/active"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                 <ActiveOrder />
                </PrivateRoute>
              }
            />

            

            <Route
              exact
              path="dinein/dashboard"
              element={
                <PrivateRoute role={["Admin"]}>
                  <DineDashboard />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/active-order"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <ActiveOrder />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/active-order/add-items/:id"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <AddOrderItems />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/create-new-order"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <CreateNewOrder />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/customer"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <Customer />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/past-order"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <PastOrders />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="dinein/manage-table"
              element={
                <PrivateRoute role={["Admin","Waiter"]}>
                  <ManageTables />
                </PrivateRoute>
              }
            />

            {/* KDS Routes */}
            <Route
              exact
              path="kds"
              element={
                <PrivateRoute role={["admin"]}>
                  <KDS />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="kds/view-kds"
              element={
                <PrivateRoute role={["admin"]}>
                  <KDS />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="kds/view-kds/:id"
              element={
                <PrivateRoute role={["admin"]}>
                  <ViewKDS />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="kds/create-kds"
              element={
                <PrivateRoute role={["admin"]}>
                  <CreateKDS />
                </PrivateRoute>
              }
            />

            {/* ManageMenu Routes */}
            <Route
              exact
              path="manage-menu"
              element={
                <PrivateRoute role={["admin"]}>
                  <ManageMenuBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="manage-menu/add-menu"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddMenuBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="manage-menu/edit-menu/:id"
              element={
                <PrivateRoute role={["admin"]}>
                  <EditMenuBody />
                </PrivateRoute>
              }
            />

            {/* ManageCategory Routes */}
            <Route
              exact
              path="manage-category"
              element={
                <PrivateRoute role={["admin"]}>
                  <ManageCategoryBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="manage-category/add-new-category"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddNewCategoryBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="manage-category/edit-category/:id"
              element={
                <PrivateRoute role={["admin"]}>
                  <CategoryBody />
                </PrivateRoute>
              }
            />

            {/* Take away Route */}

            <Route
              exact
              path="take-away"
              element={
                <PrivateRoute role={["admin"]}>
                  <TakeDashboard />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/order"
              element={
                <PrivateRoute role={["waiter"]}>
                  <Takeaway />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/item-details"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddItems />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/item-details"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddItems />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/add-items"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddItems />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/manage-payment"
              element={
                <PrivateRoute role={["admin"]}>
                  <PaymentBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/dashboard"
              element={
                <PrivateRoute role={["admin"]}>
                  <TakeDashboard />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/create"
              element={
                <PrivateRoute role={["admin"]}>
                  <CustomerDetails />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="take-away/manage-order"
              element={
                <PrivateRoute role={["admin"]}>
                  <Takeaway />
                </PrivateRoute>
              }
            />

            {/* Party Order Route*/}

            <Route
              exact
              path="party-order"
              element={
                <PrivateRoute role={["admin"]}>
                  <PCustomer />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="party-order/active-order"
              element={
                <PrivateRoute role={["admin"]}>
                  <PartyBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="party-order/customer"
              element={
                <PrivateRoute role={["admin"]}>
                  <PCustomer />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="party-order/payment"
              element={
                <PrivateRoute role={["admin"]}>
                  <PPayment />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="party-order/past-order"
              element={
                <PrivateRoute role={["admin"]}>
                  <PastOrderBody />
                </PrivateRoute>
              }
            />

            {/* Manage Staff Route */}

            <Route
              exact
              path="managestaff"
              element={
                <PrivateRoute role={["admin"]}>
                  <ManageStaffBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="managestaff/addnewstaff"
              element={
                <PrivateRoute role={["admin"]}>
                  <AddNewStaffBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="managestaff/newrole"
              element={
                <PrivateRoute role={["admin"]}>
                  <RollBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="managestaff/editstaff/:id"
              element={
                <PrivateRoute role={["admin"]}>
                  <EditStaffBody />
                </PrivateRoute>
              }
            />

            {/* FeedBack Route */}

            <Route
              exact
              path="feedback"
              element={
                <PrivateRoute role={["admin"]}>
                  <Feedback />
                </PrivateRoute>
              }
            />

            {/* Reports Route*/}

            <Route
              exact
              path="reports"
              element={
                <PrivateRoute role={["admin"]}>
                  <SalesBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="reports/staff-report"
              element={
                <PrivateRoute role={["admin"]}>
                  <StaffBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="reports/sales-report"
              element={
                <PrivateRoute role={["admin"]}>
                  <SalesBody />
                </PrivateRoute>
              }
            />

            {/*Setting Routes */}

            <Route
              exact
              path="setting"
              element={
                <PrivateRoute role={["admin"]}>
                  <StoreBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="setting/store"
              element={
                <PrivateRoute role={["admin"]}>
                  <StoreBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="setting/table"
              element={
                <PrivateRoute role={["admin"]}>
                  <TablesList/>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="setting/create"
              element={
                <PrivateRoute role={["admin"]}>
                  <TableBody/>
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="setting/discount"
              element={
                <PrivateRoute role={["admin"]}>
                  <DiscountBody />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="setting/coupon"
              element={
                <PrivateRoute role={["admin"]}>
                  <CouponBody />
                </PrivateRoute>
              }
            />
          </Route>

          
          
        </Route>
      </Routes>
    </>
  );

  
}

export default LayOut;
