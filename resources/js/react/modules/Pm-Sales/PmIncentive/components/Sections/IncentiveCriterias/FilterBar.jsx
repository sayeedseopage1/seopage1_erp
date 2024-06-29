import React, { useState } from 'react';
import '../../../styles/Incentive.css'
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import PayNowModal from '../../Modals/HeldAmounts/PayNowModal';
import { auth } from '../../../constants';
import PropTypes from "prop-types";

const pointFilters = [
    {
        id: "current",
        title: "Current",
        value: "current",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    },
    {
        id: "held_amount",
        title: "Held amounts",
        value: "held_amount",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    },
    {
        id: "incentive_factors",
        title: "Incentive factors",
        value: "incentive_factors",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    }
]

const FilterBar = ({ tab, setTab, filterByPeriod, setFilterByPeriod, queryStringForIncentiveHeldAmounts, queryForIncentiveHeldAmounts }) => {
    const [isPayNowModalOpen, setIsPayNowModalOpen] = useState(false);

    const showPayNowModal = () => {
        setIsPayNowModalOpen(!isPayNowModalOpen);
    };

    return (
        <div className='filter_bar'>
            <div className='filter_bar_left'>
                {
                    pointFilters.map(item =>
                        <ButtonComponent
                            title={item.title}
                            key={item.id}
                            color={tab === item.value ? item.activeBackgroundColor : undefined} textColor={tab === item.value ? item.activeTextColor : undefined} onClick={() => setTab(item.value)}
                        >
                            {item.title}
                        </ButtonComponent>
                    )
                }
            </div>

            {tab === "current" && <div className='filter_bar_right'>
                <ButtonComponent
                    title={"Monthly"}
                    color={filterByPeriod == "monthly" ? "#1492E6" : undefined} textColor={filterByPeriod == "monthly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("monthly")}
                >
                    Monthly
                </ButtonComponent>

                <ButtonComponent
                    title={"Quarterly"}
                    color={filterByPeriod == "quarterly" ? "#1492E6" : undefined} textColor={filterByPeriod == "quarterly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("quarterly")}
                >
                    Quarterly
                </ButtonComponent>

                <ButtonComponent
                    title={"Yearly"}
                    color={filterByPeriod == "yearly" ? "#1492E6" : undefined} textColor={filterByPeriod == "yearly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("yearly")}
                >
                    Yearly
                </ButtonComponent>
            </div>}

            {
                auth?.isHasRolePermission(1) && tab == "held_amount" && <div className='filter_bar_right'>
                    <button onClick={showPayNowModal} className='incentive_success_btn' style={{ width: "170px" }}>Pay Now</button>
                </div>
            }

            <PayNowModal tab={tab} queryForIncentiveHeldAmounts={queryForIncentiveHeldAmounts} queryStringForIncentiveHeldAmounts={queryStringForIncentiveHeldAmounts} antdModalOpen={isPayNowModalOpen} showPayNowModal={showPayNowModal} />
        </div>
    );
};

export default FilterBar;

FilterBar.propTypes = {
    tab: PropTypes.string,
    setTab: PropTypes.func,
    filterByPeriod: PropTypes.string,
    setFilterByPeriod: PropTypes.func
}