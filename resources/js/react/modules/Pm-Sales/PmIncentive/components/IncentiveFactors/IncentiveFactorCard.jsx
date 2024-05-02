import React from 'react';

const IncentiveFactorCard = ({ item }) => {
    return (
        <div className='incentive_factors_card'>
            <div className='incentive_factors_card_header'>
                <h3 className='incentive_factors_card_title'>{item?.title}</h3>
            </div>
            <ul className='incentive_factors_card_list'>
                {
                    item?.conditions.map((condition) => <li>{condition}</li>)
                }
            </ul>

        </div>
    );
};

export default IncentiveFactorCard;