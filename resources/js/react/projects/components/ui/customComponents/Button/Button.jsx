import PropTypes from "prop-types";

// Styles
import style from "./button.module.css";


const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    ...rest
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${style.button} ${className}`}
            disabled={disabled || loading}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    rest: PropTypes.any,
};
