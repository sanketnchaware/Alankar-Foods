import React from 'react'
import refresh from "../../Images/ActiveOrder/refresh.png";


const Refresh = (props) => {
  return (
    <div>
      <div
          onClick={props.data.onClick}
          className="cursor-pointer flex justify-end items-end"
        >
          <span className="mb-2.5 font-semibold text-base 2xl:text-xl text-darkyellow underline justify-self-end">
            {/* text-xl */}
            Refresh
          </span>
          <img
            className=" justify-self-start relative bottom-1"
            src={refresh}
            alt="refresh"
          />
        </div>
    </div>
  )
}

export default Refresh
