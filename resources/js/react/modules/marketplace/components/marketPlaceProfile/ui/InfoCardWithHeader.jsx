import React from 'react';

const InfoCardWithHeader = ({ title, children }) => {
    return (
        <div className='info_card_with_header'>
            <div className='info_card_with_header_title'>{title}</div>
            <div className='info_card_with_header_content'>
                {children}
            </div>
        </div>
    );
};

export default InfoCardWithHeader;