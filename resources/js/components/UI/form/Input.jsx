import './input.css';

const Input = ({ type = "text", className, value, onChange, placeholder = "", ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`sp1_input ${className}`}
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}
export default Input