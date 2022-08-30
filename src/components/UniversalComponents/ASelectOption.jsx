import React from 'react'

const ASelectOption = (props) => {
  return (
    <div>
      <select className='border-2 w-36 lg:w-44  ml-4 text-lg text-orange border-button_border h-14  pl-1 pr-6  outline-none rounded-lg' onChange={props.data.handleChange}>
      <option value={props.data.dval} selected>
                 {props.data.dvalue} 
              </option>
      {props.data.data.map((option, i) => (
                <option value={option.id} key={i + 1}>
                  {option.name}
                </option>
              ))}
           
      </select>
    </div>
  )
}

export default ASelectOption
