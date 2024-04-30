import React from 'react';
import '../styles/Incentive.css'
import { ButtonComponent } from '../../PointFactors/components/Styles/ui/ui';

const FilterBar = ({ tab, setTab, filterByPeriod, setFilterByPeriod }) => {
    return (
        <div className='filter_bar'>
            <div className='filter_bar_left'>
                <ButtonComponent color={tab == "current" ? "#1492E6" : undefined} textColor={tab == "current" ? "#fff" : undefined} onClick={() => setTab("current")}>Current</ButtonComponent>
                <ButtonComponent color={tab == "held_amount" ? "#1492E6" : undefined} textColor={tab == "held_amount" ? "#fff" : undefined} onClick={() => setTab("held_amount")}>Held amounts</ButtonComponent>
                <ButtonComponent color={tab == "incentive_factors" ? "#1492E6" : undefined} textColor={tab == "incentive_factors" ? "#fff" : undefined} onClick={() => setTab("incentive_factors")}>Incentive factors</ButtonComponent>
            </div>

            <div className='filter_bar_right'>
                <ButtonComponent
                    color={filterByPeriod == "monthly" ? "#1492E6" : undefined} textColor={filterByPeriod == "monthly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("monthly")}
                >
                    Monthly
                </ButtonComponent>

                <ButtonComponent
                    color={filterByPeriod == "quarterly" ? "#1492E6" : undefined} textColor={filterByPeriod == "quarterly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("quarterly")}
                >
                    Quarterly
                </ButtonComponent>

                <ButtonComponent
                    color={filterByPeriod == "yearly" ? "#1492E6" : undefined} textColor={filterByPeriod == "yearly" ? "#fff" : undefined} onClick={() => setFilterByPeriod("yearly")}
                >
                    Yearly
                </ButtonComponent>
            </div>
        </div>
    );
};

export default FilterBar;