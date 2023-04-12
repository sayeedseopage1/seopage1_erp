import './input.css';

const Input = ({ type = "text", className, placeholder = "", ...props }) => {
    return (
        <input type={type} placeholder={placeholder} className={`sp1_input ${className}`} {...props} />
    )
}
export default Input