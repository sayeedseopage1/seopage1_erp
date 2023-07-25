import "./checkbox.css";

const Checkbox = ({
    value,
    onChange,
    label,
    checked,
    className = "",
    labelClassName = "",
    disabled = false,
    ...props
}) => {
    return (
        <label
            className={`d-flex align-items-center sp1_checkbox--label ${labelClassName}${
                disabled ? " disable" : ""
            }`}
        >
            <input
                type="checkbox"
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className={`sp1_checkbox mr-2 ${className}`}
            />
            {label}
        </label>
    );
};

export default Checkbox;
