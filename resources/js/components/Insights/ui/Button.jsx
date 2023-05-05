import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Button = ({
    children, 
    disabled=false, 
    className = '', 
    variant='primary',
    size="sm",
    onClick,
    href="",
    ...props
}) => {
    const navigate = useNavigate();
    const classes = `cnx__btn cnx__btn_${variant} ${disabled ? 'cnx__btn_disabled': ''} cnx__btn_${size} ${className}`

    const handleOnClick = (e) => {
        onClick && onClick(e)
        if(href){
             navigate(href);
        }
        
    }


    return (
        <button className={classes} disabled={disabled} onClick={handleOnClick} {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired || PropTypes.string.isRequired || PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    onClick: PropTypes.func,
    href: PropTypes.string
}

export default Button;