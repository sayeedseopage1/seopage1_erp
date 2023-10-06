import PropTypes from "prop-types";
import styles from "./button.module.css";
import Loader from "./Loader";

const Button = ({
    children,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary",
    size = "sm",
    onClick,
    isLoading = false,
    loaderTitle = "Loading...",
    ...props
}) => {
    const variantClass = {
        primary: styles.cnx__btn_primary,
        secondary: styles.cnx__btn_secondary,
        tertiary: styles.cnx__btn_tertiary,
        success: styles.cnx__btn_success,
        danger: styles.cnx__btn_danger,
    };

    const sizeObject = {
        sm: styles.cnx__btn_sm,
        md: styles.cnx__btn_md,
        lg: styles.cnx__btn_lg,
    };
    const classes = `${styles.cnx__btn} ${variantClass[variant]} ${
        disabled ? styles.cnx__btn_disabled : ""
    } ${sizeObject[size]} ${className}`;

    const handleOnClick = (e) => {
        onClick && onClick(e);
    };

    return (
        <button
            type="button"
            className={`${classes} ${ isLoading ? styles.cnx__btn_loading: ''}`}
            disabled={disabled || isLoading}
            onClick={(disabled || isLoading)? null : handleOnClick}
            {...props}
        > 
            {isLoading ? <Loader title={loaderTitle} borderRightColor="white" /> : children}
        </button>
    );
};

Button.propTypes = {
    children:
        PropTypes.node.isRequired ||
        PropTypes.string.isRequired ||
        PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "tertiary",
        "success",
        "danger",
    ]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    onClick: PropTypes.func,
    href: PropTypes.string,
    isLoading: PropTypes.bool,
    loaderTitle: PropTypes.string,
};

export default Button;
