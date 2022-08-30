import React from 'react'

const SalesCard = (props) => {
    console.log(props.data,"props for repor");
  return (
    <div>
      <div className="flex pt-1 flex-col h-14 w-36 lg:w-44 box">
              <p className="text-center font-semibold font-sans text-base">
                Rs.{props.data.count || 0}
              </p>
              <p className="text-xs text-center font-semibold text-orange font-sans">
                {props.data.data}
              </p>
            </div>
    </div>
  )
}

export default SalesCard
