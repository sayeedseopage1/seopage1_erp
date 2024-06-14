import PropTypes from "prop-types";

const Switch = ({ children }) => {
    return <> {children} </>;
};

const Case = ({ children, condition }) => {
    if (!condition) return null;
    return <>{children}</>;
};

Switch.Case = Case;
export default Switch;

Switch.propTypes = {
    children: PropTypes.node.isRequired,
};

Case.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
}