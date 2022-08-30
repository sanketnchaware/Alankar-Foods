import React from "react";
import ManageTable from "../../components/ManageMenu/ManageTable"
import ListOfItems from "../../components/ManageMenu/ListOfItems"

const ManageMenuBody = () => {
  return ( 
    <div className="mt-1 bg-darkwhite px-9">
      <ListOfItems />
      <hr className=" mt-3 mb-6 border-2 border-b-button_border border-t-white border-l-white border-r-white" />
      <ManageTable />
    </div>
  );
};

export default ManageMenuBody;
