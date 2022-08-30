import React from "react";
import ManageStaffList from '../../components/ManageStaff/Managestaff/ManageStaffList';
import ManageStaffTable from '../../components/ManageStaff/Managestaff/ManageStaffTable'
import '../../components/ManageStaff/Managestaff/style.scss';



const ManageStaffBody = () => {

  return (
    <div className="px-9 pb-5 pt-2">
      <ManageStaffList/>
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <div className="flex items-end justify-end">   
        </div>
      <ManageStaffTable/>
    </div>
  );
};

export default ManageStaffBody;
