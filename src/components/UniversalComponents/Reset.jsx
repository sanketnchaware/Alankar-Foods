import React from 'react'

const Reset = (props) => {
    console.log(props.data,"props")
  return (
    <div>
      <p
                onClick={props.data.onClick}
              className="w-1/12 flex cursor-pointer text-orange font-sans mt-4 lg:ml-4"
            >
              <u>Reset</u>
            </p>
    </div>
  )
}

export default Reset
