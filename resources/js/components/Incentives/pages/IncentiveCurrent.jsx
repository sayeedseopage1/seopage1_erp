import * as React from 'react';
import InnerNavbar from "../../Points/components/InnerNavbar";
import IncentivesFilterBar from '../components/IncentiveFilterBar';
import IncentiveNavbar from '../components/IncentiveNavbar';



const IncentiveCurrent = () => {
    const [data, setData] = React.useState([]);
    const [pointTableDataIsLoading, setPointTableDataIsLoading] = React.useState(true);


    return (
        <div className="sp1_point_page_container">
            <IncentivesFilterBar
                setData={setData}
                setPointTableDataIsLoading={setPointTableDataIsLoading}
            />
            <IncentiveNavbar />

            <main className="sp1_point_page_main">
                <InnerNavbar
                    items={[
                        {id: 'incentive_current_item_1', name: 'Monthly', url: "/current/monthly"},
                        // {id: 'incentive_current_item_2', name: 'Quarterly', url: "/incentive/current/quarterly"},
                        // {id: 'incentive_current_item_3', name: 'Yearly', url: "/incentive/current/yearly"},
                    ]}
                />
                
                <section className="sp1__incentive_item_container">
                    IncentiveCurrent
                </section>
            </main>
        </div>

        
    );
};

export default IncentiveCurrent;