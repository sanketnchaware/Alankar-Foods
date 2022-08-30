import React from 'react'
import { SearchField } from "./SearchField";
import search from "../../Images/ActiveOrder/search.svg";


const Search = (props) => {
    console.log(props.data,"search data");
  return (
    <div>
       <div className="h-14 w-72 displayGrid bg-search border border-button_border rounded-lg">
              <SearchField
                className=" border-0 w-full  bg-search placeholder:text-darkyellow placeholder:font-semibold"
                placeholder="Search..."
                 onChange={props.data.handleChange}
                value={props.data.value}
              />
              <img
                className=" justify-self-end mr-2 object-contain relative top-2"
                src={search}
                alt="search"
              />
            </div>
    </div>
  )
}

export default Search
