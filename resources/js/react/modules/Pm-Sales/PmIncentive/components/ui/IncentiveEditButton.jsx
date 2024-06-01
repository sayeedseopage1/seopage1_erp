import React from 'react';
import editIcon from '../../assets/edit.svg'
import editIcon2 from '../../assets/edit_2.svg'
import PropTypes from "prop-types";

const IncentiveEditButton = ({ children, className, onClick }) => {
    const baseStyle = {
        padding: children ? '' : '7px',
    };

    return (
        <button
            onClick={onClick}
            className={className}
            style={baseStyle} // Apply the style object
        >
            {children}
            <img
                src={className === 'chart_button' ? editIcon : editIcon2}
                style={{ width: "20px", height: "20px" }}
                alt="Edit Icon"
            />
        </button>
    );
};

export default IncentiveEditButton;

IncentiveEditButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
}