import { Divider } from 'antd';
import React from 'react';

const IncentiveCriteriaFactorCard = ({ item }) => {
    const { title, factorsData } = item || {};

    console.log(factorsData)
    return (
        <div className='criteria_card'>
            <p className='criteria_card_title'>{title}</p>
            <Divider style={{ color: "#55BBFF" }} />
            <div className='factor_header'>
                <div>Ratio</div>
                <div>Obtainable Points</div>
            </div>
            <div className='factor_body'>
                {factorsData?.map((item) => (
                    <div key={item?.id} className='factor_card'>
                        <div className='factor_title'>{item?.factorLimit}</div>
                        <div className='factor_description'>{item?.idealValue} Points</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncentiveCriteriaFactorCard;