import * as React from 'react';
import InnerNavbar from "../../Points/components/InnerNavbar";
import IncentivesFilterBar from '../components/IncentiveFilterBar';
import IncentiveNavbar from '../components/IncentiveNavbar';
import { useParams } from 'react-router-dom';



const IncentiveCurrent = () => {
    const [data, setData] = React.useState([]);
    const [pointTableDataIsLoading, setPointTableDataIsLoading] = React.useState(true);
    const params = useParams(); 

     

    return (
        <div className="">
            <IncentivesFilterBar
                setData={setData}
                setPointTableDataIsLoading={setPointTableDataIsLoading}
                defaultSelectedDate={params.period || 'monthly'}
            />
            <div className='sp1_point_page_container'>
                <IncentiveNavbar />

                <main className="sp1_point_page_main">
                    <InnerNavbar
                        items={[
                            { id: 'incentive_current_item_1', name: 'Monthly', url: "/current/monthly" },
                            { id: 'incentive_current_item_2', name: 'Quarterly', url: "/current/quarterly" },
                            { id: 'incentive_current_item_3', name: 'Yearly', url: "/current/yearly" },
                        ]}
                    />

                    <section className="sp1__incentive_item_container">
                        <div className="sp1__incentive_row">
                            <div className="sp1__incentive_row_item">
                                <div className="sp1__incentive_item">
                                    Minimum goals for your shift: 4
                                </div>
                            </div>
                            <div className="sp1__incentive_row_item">
                                <div className="sp1__incentive_item">
                                    Minimum Goals achieved by your shift: 3
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row">
                            <div className="sp1__incentive_row_item">
                                <div className='sp1__incentive_item'>
                                    Minimum team goal for your shift: 1
                                </div>
                            </div>
                            <div className="sp1__incentive_row_item">
                                <div className="sp1__incentive_item">
                                    Minimum team goal achieved by your team: 0
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row">
                            <div className="sp1__incentive_row_item">
                                <div className='sp1__incentive_item'>
                                    Non-incentive points for your shift: First 400
                                </div>
                            </div>
                            <div className="sp1__incentive_row_item">
                                <div className='sp1__incentive_item'>
                                    Points achieved by your shift so far: 800
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row_1">
                            <div className="sp1__incentive_row_item">
                                <div className='sp1__incentive_item'>
                                    *Approximate incentive amount for your shift (Provided all your shift and team minimum goals are met):(800-400)*100tk = 40000tk
                                </div>
                            </div>
                            <div className="sp1__incentive_row_item">
                                <div className="sp1__incentive_item">
                                    *Your share of approximate incentive: 80% of 40000tk = 32000tk
                                </div>
                            </div>

                            <div className="sp1__incentive_row_item">
                                <div className="sp1__incentive_item">
                                    *Confirmed incentive so far: 0
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>


    );
};

export default IncentiveCurrent;