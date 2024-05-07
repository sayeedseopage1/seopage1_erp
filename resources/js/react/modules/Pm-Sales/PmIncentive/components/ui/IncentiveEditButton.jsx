import React from 'react';
import editIcon from '../../assets/edit.svg'
import editIcon2 from '../../assets/edit_2.svg'

const IncentiveEditButton = ({ children, className, onClick }) => {
    return (
        <button onClick={onClick} className={className}>
            {children}
            <img src={`${className == `chart_button` ? editIcon : editIcon2}`} style={{ width: "20px", height: "20px" }} alt="Edit Icon" />
        </button>
    );
};

export default IncentiveEditButton;