import classNames from "classnames";

const Button = ({
  text,
  className = "",
  onClick,
  onChange,
  disabled,
}) => {
  const styleClasses = classNames("btn", className);

  const commonProps = {
    className: styleClasses,
    onChange,
    onClick,
    disabled,
  };

  return (
    <button {...commonProps} className={styleClasses}>
      {text}
    </button>
  );
};

export default Button;