import classNames from "classnames";
import React from "react";

export const SearchField = ({ children, className = "", onChange,value }) => {
  const searchfieldClasses = classNames("searchfield", className);

  const commonProps = {
    className: searchfieldClasses,
    onChange,
    value
  };

  return React.createElement(
    "input",
    { ...commonProps, type: "text", placeholder:"Search" },
    children
  );
};