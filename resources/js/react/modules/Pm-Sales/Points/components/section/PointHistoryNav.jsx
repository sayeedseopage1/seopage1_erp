import { Divider } from 'antd';
import React from 'react';
import { Placeholder } from '../../../../../global/Placeholder';
import { ButtonComponent } from '../../../PointFactors/components/Styles/ui/ui';

const PointHistoryNav = ({ navActive, setNavActive, data, isLoading }) => {
    // const balancePoints = data?.reduce((prev, curr) => prev + Number(curr?.cumulative_balance), 0);
    const balancePoints = data?.length ? data[0]?.cumulative_balance : 0;
    const posPoints = data?.reduce((prev, curr) => prev + Number(curr?.total_points_earn), 0);
    const negPoints = data?.reduce((prev, curr) => prev + Number(curr?.total_points_lost), 0);
    return (
        <div className='point_history_nav_container'>
            <div className='point_history_banner'>
                <h4 className='point_history_banner_item'>Balance points: {isLoading ? <Placeholder width="50px" height={18} /> : <span className={`${balancePoints > 0 ? '' : 'point_table_data_neg'}`} style={{ fontSize: '20px' }}>{balancePoints?.toFixed(2)}</span>}</h4>
                <h4 className='point_history_banner_item'>Positive points: {isLoading ? <Placeholder width="50px" height={18} /> : <span className={`${posPoints > 0 ? 'point_table_data_pos' : 'point_table_data_neg'}`}>{posPoints?.toFixed(2)}</span>}</h4>
                <Divider type="vertical" />
                <h4 className='point_history_banner_item'>Negative points: {isLoading ? <Placeholder width="50px" height={18} /> : <span className={`${negPoints > 0 ? 'point_table_data_neg' : 'point_table_data_pos'}`}>{negPoints?.toFixed(2)}</span>}</h4>
                <a href="/account/pm-point-factors">
                    <ButtonComponent
                        title={"Point Criteria"}

                    >
                        Point Criteria
                    </ButtonComponent>
                </a>
            </div>

            <div className='point_history_nav'>
                <ButtonComponent
                    title={"Cash Point"}
                    color={navActive == "Cash Point" ? "#1492E6" : undefined} textColor={navActive == "Cash Point" ? "#fff" : undefined} onClick={() => setNavActive("Cash Point")}
                >
                    Cash Point
                </ButtonComponent>
                <ButtonComponent
                    title={"Non Cash Point"}
                    color={navActive == "Non Cash Point" ? "#1492E6" : undefined} textColor={navActive == "Non Cash Point" ? "#fff" : undefined} onClick={() => setNavActive("Non Cash Point")}
                >
                    Non Cash Point
                </ButtonComponent>
                <ButtonComponent
                    title={"Redeem Points"}
                    color={navActive == "Redeem Points" ? "#1492E6" : undefined} textColor={navActive == "Redeem Points" ? "#fff" : undefined} onClick={() => setNavActive("Redeem Points")}
                >
                    Redeem Points
                </ButtonComponent>
            </div>
        </div>
    );
};

export default PointHistoryNav;