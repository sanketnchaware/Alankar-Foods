import classNames from "classnames";

 export const Text = ({
    children,
    name,
    type="text",
    placeholder = "",
    value,
    onChange,
    error = "",
    maxLength = '100',
    handleChange,
    errorClasses,
    className = '',
}) => {
    const styleClasses = classNames(
        "textfield",
        className
    );

    const commonProps = {
      className: styleClasses,
      onChange,
    };

    const textErrorClasses = classNames(
        "base-text-error",
        className
    );
    
    const commProps = {
        className: textErrorClasses,
        onChange,
      };


    return (
        <div className="relative mb-4">
            <input
                {...commonProps}
                {...commProps}
                type={type}
                name={name}
                id={name}
                value={value}
                maxLength={maxLength}
                onChange={handleChange}
                placeholder={placeholder}
                className={styleClasses}
            />
            {error.length > 0 && (
                <p className={textErrorClasses}>
                    {error}
                </p>
            )}
        </div>
    );
};


