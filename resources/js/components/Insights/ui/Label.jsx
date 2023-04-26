import PropTypes from 'prop-types';

const Label = ({ children,label, className="", ...props }) => {
    return (
        <label className={`cnx__ins__label ${className}`} {...props}>
            <span>{label}</span>
            {children}
        </label>
    );
}

Label.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};


export default Label;