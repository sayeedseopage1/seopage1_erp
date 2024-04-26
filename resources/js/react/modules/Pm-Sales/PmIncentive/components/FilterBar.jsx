import React from 'react';
import '../styles/Incentive.css'
import { ButtonComponent } from '../../PointFactors/components/Styles/ui/ui';

const FilterBar = ({ tab, setTab }) => {
    return (
        <div className='filter_bar'>
            <div className='filter_bar_left'>
                <ButtonComponent color={tab == 1 ? "#1492E6" : undefined} textColor={tab == 1 ? "#fff" : undefined} onClick={() => setTab(1)}>Current</ButtonComponent>
                <ButtonComponent color={tab == 2 ? "#1492E6" : undefined} textColor={tab == 2 ? "#fff" : undefined} onClick={() => setTab(2)}>Held amounts</ButtonComponent>
                <ButtonComponent color={tab == 3 ? "#1492E6" : undefined} textColor={tab == 3 ? "#fff" : undefined} onClick={() => setTab(3)}>Incentive factors</ButtonComponent>
            </div>
            <div className='filter_bar_right'>
                <ButtonComponent color={tab == 4 ? "#1492E6" : undefined} textColor={tab == 4 ? "#fff" : undefined} onClick={() => setTab(4)}>Monthly</ButtonComponent>
                <ButtonComponent color={tab == 5 ? "#1492E6" : undefined} textColor={tab == 5 ? "#fff" : undefined} onClick={() => setTab(5)}>Quarterly</ButtonComponent>
                <ButtonComponent color={tab == 6 ? "#1492E6" : undefined} textColor={tab == 6 ? "#fff" : undefined} onClick={() => setTab(6)}>Yearly</ButtonComponent>
            </div>
        </div>
    );
};

export default FilterBar;