import PropTypes from 'prop-types';

const Button = ({
    children, 
    type="button",
    disabled=false, 
    className = '', 
    variant='primary',
    size="sm",
    onClick,
    ...props
}) => {
    const classes = `cnx__btn cnx__btn_${variant} ${disabled ? 'cnx__btn_disabled': ''} cnx__btn_${size} ${className}`

    const handleOnClick = (e) => {
        onClick && onClick(e)
    }


    return (
        <button 
            type='button' 
            className={classes} 
            disabled={disabled} 
            onClick={handleOnClick} 
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired || PropTypes.string.isRequired || PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    onClick: PropTypes.func,
    href: PropTypes.string
}

export default Button;