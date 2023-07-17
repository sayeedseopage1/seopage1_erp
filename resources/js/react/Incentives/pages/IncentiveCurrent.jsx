import * as React from 'react';
import InnerNavbar from "../../Points/components/InnerNavbar";
import IncentivesFilterBar from '../components/IncentiveFilterBar';
import IncentiveNavbar from '../components/IncentiveNavbar';
import { useParams } from 'react-router-dom';
import IncentiveCurrentFilterBar from '../components/IncentiveCurrentFilterbar';
import { useIncentiveCurrentDataMutation } from '../../services/api/IncentiveApiSlice';
import Dropdown from '../components/Dropdown';



const IncentiveCurrent = () => {
    const [data, setData] = React.useState(null);
    const [firstLoading, setFirstLoading] = React.useState(true); 
    const params = useParams(); 
    const [incentiveCurrentData, {isLoading: tableDataIsFetching}] = useIncentiveCurrentDataMutation();
 

    const handleDataRequest = (filter) => { 
        let data = {
            team_id: filter?.shift_id,
            user_id: filter?.employee_id,
            start_date: filter?._startDate,
            end_date: filter?._endDate,
            period: _.startCase(params.period)
        }  

        incentiveCurrentData(data).unwrap().then(res => {
            setData(res)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setFirstLoading(false);
        })
    }


    let isLoading = firstLoading || tableDataIsFetching; 

    let diff = Number(data?.point_achieve_by_your_shift - data?.non_incentive_point_above);
    let approximateIncentive = diff > 0 ? diff * Number(data?.point_value) : 0;

    return (
        <div className="">
            {/* <IncentivesFilterBar
                setData={setData}
                setIsDataFetching={setTableDataIsFetching}
                defaultSelectedDate={params.period || 'monthly'}
            /> */}

            <IncentiveCurrentFilterBar 
                handleDataRequest={handleDataRequest}
                type={params.period || 'monthly'}
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
                                
                            {
                                !isLoading? (
                                    <div className="sp1__incentive_item d-flex align-items-center" style={{gap: "8px"}}>
                                        <div> 
                                            Minimum goals for your shift:   
                                        </div>
                                        <Dropdown hoverAble={true}>
                                            <Dropdown.Toggle icon={false}> <span className='p-2'>{data?.minimum_user_goals_shift}</span> </Dropdown.Toggle>
                                            {
                                                data?.minimum_goals_of_your_shift?.length > 0 && (
                                                    <Dropdown.Menu className="p-3">
                                                        <ol className='sp1-order-list'>
                                                            {
                                                                data?.minimum_goals_of_your_shift?.map(d => (
                                                                    <li key={d.id} className='font-weight-normal' style={{listStyle: 'unset'}}>
                                                                        {d.title} - <a href={`/account/insights/goals/${d.id}`}> View</a>
                                                                    </li>
                                                                ))
                                                            } 
                                                        </ol> 
                                                    </Dropdown.Menu>
                                                )
                                            }
                                            
                                        </Dropdown>
                                    </div>
                                ): null
                            } 
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <div className="sp1__incentive_item d-flex align-items-center" style={{gap: "8px"}}>
                                            <div> 
                                                Minimum Goals achieved by your shift:   
                                            </div>
                                            <Dropdown hoverAble={true}>
                                                <Dropdown.Toggle icon={false}> <span>{data?.minimum_user_achieve_goals_shift}</span> </Dropdown.Toggle>
                                                {data?.minimum_goals_of_your_shift_achieve?.length > 0 && (
                                                    <Dropdown.Menu className="px-3 py-1">
                                                    <ol className='sp1-order-list'>
                                                        {
                                                            data?.minimum_goals_of_your_shift_achieve
                                                            ?.map(d => (
                                                                <li key={d.id} className='font-weight-normal' style={{listStyle: 'unset'}}>
                                                                    {d.title} {d.goal_status ? <span className='badge badge-success'> Achieved </span>: <span className='badge badge-danger'> Not Achieved </span>} - <a href={`/account/insights/goals/${d.id}`}>  View</a>
                                                                </li>
                                                            ))
                                                        }
                                                            
                                                        </ol> 
                                                    </Dropdown.Menu>
                                                )}
                                            </Dropdown>
                                        </div> 
                                    )} 
                                </div>
                            </div>
                        </div>

                        <div className="sp1__incentive_row">
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className='sp1__incentive_item'>
                                    {!isLoading && (
                                        <div className="sp1__incentive_item d-flex align-items-center" style={{gap: "8px"}}>
                                            <div> 
                                                Minimum Team goal: 
                                            </div>
                                            <Dropdown hoverAble={true}>
                                                <Dropdown.Toggle icon={false}>
                                                    <span> {data?.minimum_team_goal}</span> 
                                                </Dropdown.Toggle>
                                                {
                                                     data?.minimum_team_goal_get?.length > 0 && (
                                                        <Dropdown.Menu className="px-3 py-1">
                                                            <ol className='sp1-order-list'>
                                                                {
                                                                    data?.minimum_team_goal_get
                                                                    ?.map(d => (
                                                                        <li key={d.id} className='font-weight-normal' style={{listStyle: 'unset'}}>
                                                                            {d.title} - <a href={`/account/insights/goals/${d.id}`}> View</a>
                                                                        </li>
                                                                    ))
                                                                }  
                                                            </ol> 
                                                        </Dropdown.Menu> 
                                                     )
                                                }
                                            </Dropdown>
                                        </div>  
                                    )}  
                                </div>
                            </div>
                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <div className="sp1__incentive_item d-flex align-items-center" style={{gap: "8px"}}>
                                            <div> 
                                            Minimum Team goal achieved: 
                                            </div>
                                            <Dropdown hoverAble={true}>
                                                <Dropdown.Toggle icon={false}>
                                                    <span> {data?.mimimum_team_achieve_goal}</span> 
                                                </Dropdown.Toggle>
                                                {data?.minimum_team_goal_get_achieved?.length > 0 && (
                                                <Dropdown.Menu className="px-3 py-1">
                                                    <ol className='sp1-order-list'>
                                                    {
                                                        data?.minimum_team_goal_get_achieved
                                                        ?.map(d => (
                                                            <li key={d.id} className='font-weight-normal' style={{listStyle: 'unset'}}>
                                                                {d.title} {d.goal_status ? <span className='badge badge-success'> Achieved </span>: <span className='badge badge-danger'> Not Achieved </span>} - <a href={`/account/insights/goals/${d.id}`}> View</a>
                                                            </li>
                                                        ))
                                                    }
                                                        
                                                    </ol> 
                                                </Dropdown.Menu> 
                                                )}
                                            </Dropdown>
                                        </div>   
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
                                            *Your share of approximate incentive: {data?.percentage_of_share ? Number(data?.percentage_of_share).toFixed(2): 0}% of BDT  {approximateIncentive.toFixed(2)} = BDT { (approximateIncentive * (Number(data?.percentage_of_share) || 0)/100).toFixed(2)} 
                                        </span>
                                    )} 
                                    
                                </div>
                            </div>

                            <div className={`${!isLoading ? 'sp1__incentive_row_item' : 'sp1__incentive_row_item animate-pulse'}`}>
                                <div className="sp1__incentive_item">
                                    {!isLoading && (
                                        <span>
                                            *Confirmed incentive so far: BDT {data?.incentive_final_amount?.final_payable_incentive_amount? Number(data?.incentive_final_amount?.final_payable_incentive_amount).toFixed(2):0}
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