import { Divider } from 'antd';
import React from 'react';

const LgDataCardWithHeader = ({ title, actionCompo, children }) => {
    return (
        <div className='lg_data_card_with_header'>
            <div className='lg_data_card_header_wrapper'>
                <h3 className='lg_data_card_title'>{title}</h3>
                {actionCompo}
            </div>
            <Divider />
            <div>
                {children}
            </div>
        </div>
    );
};

export default LgDataCardWithHeader;