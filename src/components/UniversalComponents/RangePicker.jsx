import React from 'react'
import DatePicker from "react-datepicker";
import calender from "../../Images/calender.svg";

const RangePicker = (props) => {
  return (
    <div>
      <div className="h-14 w-44 lg:w-48 bg-white relative border-2 border-button_border text-orange rounded-lg">
                  
                  <div className="w-full">
                    <DatePicker
                      className="text-sm w-40 lg:w-44 pt-4 placeholder:text-orange"
                      // w-32 lg:w-36
                      id="datepicker"
                      selected={props.data.startDate}
                      onChange={props.data.onChange}
                      startDate={props.data.startDate}
                      endDate={props.data.endDate}
                      selectsRange
                      maxDate={new Date()}
                      autoComplete="off"
                      placeholderText="Date Range"
                      calendarAriaLabel="Toggle calendar"
                      disabledKeyboardNavigation
                      onKeyDown={((e)=>{
                        e.preventDefault();
                      })
                     
                      }
                    />
                    <label htmlFor="datepicker">
                      <img
                        className=" absolute top-4 right-1 w-4 "
                        src={calender}
                        alt="date"
                      />
                    </label>
                  </div>
                </div>
    </div>
  )
}

export default RangePicker
