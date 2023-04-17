import "./input.css";

const Input = ({
    type = "text",
    className = "",
    value,
    onChange,
    onBlur,
    placeholder = "",
    ...props
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`sp1_input ${className}`}
            value={value}
            onChange={onChange}
            onBlur={(e) => (onBlur ? onBlur(e) : null)}
            {...props}
        />
    );
};
export default Input;
