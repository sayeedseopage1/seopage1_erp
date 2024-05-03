import React from 'react';
import '../styles/Incentive.css'
import { ButtonComponent } from '../../PointFactors/components/Styles/ui/ui';


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

const periodFilters = [
    {
        id: "monthly",
        title: "Monthly",
        value: "monthly",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    },
    {
        id: "quarterly",
        title: "Quarterly",
        value: "quarterly",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    },
    {
        id: "yearly",
        title: "Yearly",
        value: "yearly",
        activeBackgroundColor: "#1492E6",
        activeTextColor: "#fff",
    }
]


const FilterBar = ({ tab, setTab, filterByPeriod, setFilterByPeriod }) => {

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
                {/* {
                    periodFilters.map(item =>
                        <ButtonComponent
                            key={item.id}
                            color={tab === item.value ? item.activeBackgroundColor : undefined} textColor={tab === item.value ? item.activeTextColor : undefined} onClick={() => setTab(item.value)}
                        >
                            {item.title}
                        </ButtonComponent>
                    )
                } */}
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
        </div>
    );
};

export default FilterBar;