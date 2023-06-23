import * as React from 'react';
import InnerNavbar from "../../Points/components/InnerNavbar";
import IncentivesFilterBar from '../components/IncentiveFilterBar';
import IncentiveNavbar from '../components/IncentiveNavbar';
import { useParams } from 'react-router-dom';



const IncentiveCurrent = () => {
    const [data, setData] = React.useState(null);
    const [firstLoading, setFirstLoading] = React.useState(true);
    const [tableDataIsFetching, setTableDataIsFetching] = React.useState(true);
    const params = useParams(); 

    React.useEffect(() => {
        setFirstLoading(true);
        let timeOut = setTimeout(() => {
            setFirstLoading(false);
        }, 1000);


        return () => clearTimeout(timeOut)
    }, [])


    let isLoading = firstLoading || tableDataIsFetching; 

    let diff = Number(data?.point_achieve_by_your_shift - data?.non_incentive_point_above);
    let approximateIncentive = diff > 0 ? diff * Number(data?.point_value) : 0;

    return (
        <div className="">
            <IncentivesFilterBar
                setData={setData}
                setIsDataFetching={setTableDataIsFetching}
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
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item ">
                                    {
                                        !isLoading? (
                                            <span> 
                                                Minimum goals for your shift: {data?.minimum_user_goals_shift} 
                                            </span>
                                        ): null
                                    }
                                </div>
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <span>Minimum Goals achieved by your shift: {data?.minimum_user_achieve_goals_shift}</span>
                                    )} 
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row">
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className='sp1__incentive_item'>
                                    {!isLoading && (
                                        <span> Minimum Team goal:  {data?.minimum_team_goal} </span>
                                    )}  
                                </div>
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <span> Minimum Team goal achieved:   {data?.mimimum_team_achieve_goal} </span>
                                    )} 
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row">
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className='sp1__incentive_item'>
                                    {!isLoading && (
                                        <span> Non-incentive points for your shift: First {data?.non_incentive_point_above} </span>
                                    )}  
                                </div>
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className='sp1__incentive_item'>
                                    {!isLoading && (
                                        <span> Points achieved by your shift so far:  {data?.point_achieve_by_your_shift} </span>
                                    )}   
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row_1">
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className='sp1__incentive_item'>
                                    {!isLoading && (
                                        <span>
                                            *Approximate incentive amount for your shift (Provided all your shift and team minimum goals are met): {diff > 0 ? diff.toFixed(2) : 0} X {data?.point_value} =  BDT {approximateIncentive.toFixed(2)}
                                        </span>
                                    )}    
                                </div> 
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <span>
                                            *Your share of approximate incentive: {Number(data?.percentage_of_share).toFixed(2)}% of BDT {approximateIncentive.toFixed(2)} = BDT { (approximateIncentive * Number(data?.percentage_of_share)/100).toFixed(2)} 
                                        </span>
                                    )} 
                                    
                                </div>
                            </div>

                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <span>
                                            *Confirmed incentive so far: {data?.incentive_final_amount?.incentive_earned? Number(data?.incentive_final_amount?.incentive_earned).toFixed(2):0} BDT
                                        </span>
                                    )}
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