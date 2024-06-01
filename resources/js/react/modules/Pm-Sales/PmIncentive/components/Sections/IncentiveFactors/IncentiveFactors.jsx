import React from 'react';
import IncentiveFactorCard from './IncentiveFactorCard';

const incentivesFactorsConditions = [
    {
        id: 1,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            }
        ]
    },
    {
        id: 2,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            },
            {
                id: 4,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 5,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 6,
                title: "Client retention rate (21-100%)"
            }
        ]
    },
    {
        id: 3,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            }
        ]
    },
    {
        id: 4,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            }
        ]
    },
    {
        id: 5,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            }
        ]
    },
    {
        id: 6,
        title: "You will get 120% of the incentive if the following conditions are met:",
        conditions: [
            {
                id: 1,
                title: "Milestone cancellation rate (0-3%)"
            },
            {
                id: 2,
                title: "Percentage of delayed projects (0-30%)"
            },
            {
                id: 3,
                title: "Client retention rate (21-100%)"
            }
        ]
    }
];

const IncentiveFactors = () => {
    return (
        <div>
            <h2 className='incentive_factors_title'>To calculate actual regular points, the following conditions are being followed</h2>

            <div className='incentive_factors_wrapper'>
                {
                    incentivesFactorsConditions?.map((item) => {
                        return (
                            <IncentiveFactorCard key={item?.id} item={item} />
                        )
                    })
                }
            </div>
            <div className='incentive_factors_bottom'>
                <div className='incentive_factors_bottom_text'>
                    <span>**</span>
                    <p>For regular points, if you fail to maintain the minimum incentive
                        slab for any of the criteria, your overall incentive percentage will zero</p>
                </div>
                <div className='custom_divider'></div>
                <div className='incentive_factors_bottom_text'>
                    <span>**</span>
                    <p>For regular points, if you fail to maintain the minimum incentive
                        slab for any of the criteria, your overall incentive percentage will zero</p>
                </div>
            </div>
        </div>
    );
};

export default IncentiveFactors;