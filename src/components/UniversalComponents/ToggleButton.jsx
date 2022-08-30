import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./togglebutton.scss";

const ToggleButton = (props) => {
  const [toggle, setToggle] = useState(false);
  const { defaultChecked, onChange, disabled, className } = props;

  useEffect(() => {
    setToggle(defaultChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerToggle = () => {
    if (disabled) {
      return;
    }

    setToggle(!toggle);
    if (typeof onChange === "function") {
      onChange(!defaultChecked);
    }
  };
  const toggleClasses = classNames(
    "wrg-toggle",
    {
      "wrg-toggle--checked": toggle,
      "wrg-toggle--disabled": disabled,
    },
    className
  );

  return (
    <div onClick={triggerToggle} className={toggleClasses}>
      <div
        // className={`${
        //   changebg ? "wrg-toggle-container-black" : "wrg-toggle-container"
        // } ${toggle ? "orange_border" : "gray_border"}`}

        className={`wrg-toggle-container ${
          toggle ? "orange_border" : "gray_border"
        }`}
      >
        <div className="wrg-toggle-check"></div>
        <div className="wrg-toggle-uncheck "></div>
      </div>
      <div
        className={`wrg-toggle-circle ${toggle ? "bg-orange" : "bg-gray"}`}
      ></div>
      <input
        type="checkbox"
        aria-label="Toggle Button"
        className="wrg-toggle-input"
      />
    </div>
  );
};

ToggleButton.propTypes = {
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
};

export default ToggleButton;