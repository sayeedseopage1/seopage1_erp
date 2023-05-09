import * as React from 'react';
import EditAbleBox from "../components/EditAbleBox";
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import {Icon} from '../utils/Icon';
import Tooltip from '../ui/Tooltip';
import StackedBarChart from '../components/Graph/StackedBarChart';
import convertNumberToUnits from '../utils/convertNumberToUnits';
import { relativeTime } from '../utils/relativeTime';
import RelativeTimePeriod from '../components/RelativeTimePeriod';
import DataTable from '../ui/DataTable';
import { useDealsState } from '../hooks/useDealsState';
import { useGoals } from '../hooks/useGoals';
import { useTeams } from '../hooks/useTeams';
import { useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useUsers } from '../hooks/useUsers';

import { openGoalFormModal } from '../services/slices/goalFormModalSlice';
import { useDispatch } from 'react-redux';
import GoalSummaryTable from '../components/GoalSummaryTable';
import { DataTableColumns } from '../components/DataTableColumns';
import GoalStackedBarChart from '../components/Graph/GoalStackedBarChart';
import { stage } from '../utils/constants';

// convert to unit
const numberToUnits = (value,decimal= 1) => {
    let c = convertNumberToUnits(value, decimal)
    return `${c}`
}


const Goal = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('Today');
    const [filter, setFilterValue] = React.useState(null);
    const [applyFilter, setApplyFilter] = React.useState(false);
    const [summarizedData, setSummarizedData] = React.useState([]); 
    const [goal, setGoal] = React.useState(null);
    const {deals, getDeals, getSummary} = useDealsState(); 
    const [dealsData, setDealsData] = React.useState([]);
    const [isLoading , setIsLoading] = React.useState(true);
    const {goals, getGoalById, goalsIsLoading, goalStateStatus} = useGoals();
    const [activeTable, setActiveTable] = React.useState('activities');
    const params = useParams();
    const location = useLocation();
    const {users} = useUsers();
    const {teams} = useTeams();
    const usersData = users && users.users;
    const [isSummarizing, setIsSummarizing] = React.useState(false);
    

    const dispatch = useDispatch();

    const handleRelativeTimePeriod =(value) => {
        setSelectedPeriod(value);
        relativeTime(value, setFilterValue);
    }


    // const getGoal = React.useCallback(() => {
    //     if(goals && goals.length > 0){
    //         let goal = getGoalById(Number(params.goalId));
    //         if(!goal) return;
    //         let user = _.find(usersData, {id: goal?.added_by});
    //         let assignedUser = _.find(usersData, {id: goal?.user_id});
    //         let team = _.find(teams, {id: goal?.team_id});
    //         setGoal({
    //             ...goal,
    //             user: user,
    //             assignedUser: assignedUser,
    //             team: team
    //         });
    //     }
    // }, [goals, params.goalId , usersData, teams, goalStateStatus, dispatch]);


    // React.useEffect(() => {
    //     getGoal();
    // }, [getGoal])


    // // get goal data
    React.useEffect(()=> {
        if(usersData && usersData.length > 0){
            if(goalsIsLoading) return <div>Loading...</div>
            let goal = getGoalById(Number(params.goalId));
            if(!goal) return;
            let user = _.find(usersData, {id: goal?.added_by});
            let assignedUser = _.find(usersData, {id: Number(goal?.user_id)});
            let team = _.find(teams, {id: goal?.team_id});
            setGoal({
                ...goal,
                user: user,
                assignedUser: assignedUser,
                team: team
            });
        }
    }, [params.goalId, goals, usersData, goalsIsLoading, teams, goalStateStatus, location]);


    // get deals data
    React.useEffect(() => {
        if(deals && deals.length > 0 && goal){
            let endDate;
            let startDate;
            if(filter?.end && filter?.start && applyFilter){
                startDate = filter.start;
                endDate = filter.end;
            }else{
                endDate = goal.endDate;
                startDate = goal.startDate;
            }

            let _deals = getDeals(deals, goal, startDate, endDate);
            setDealsData([..._deals]);
            setIsLoading(false);
        }
         
    }, [goal, location, params.goalId, filter, applyFilter]);


    React.useEffect (() => {
        setIsSummarizing(true);

        if(deals && deals.length > 0 && goal){
            let sum = getSummary(deals, goal, filter, applyFilter);
            
            if(sum) {
                setSummarizedData([...sum]);
                setIsSummarizing(false);
            } else {
                setIsSummarizing(false);
            }
        }

    }, [goal, dealsData, filter, location, goalStateStatus, applyFilter])


    const handleOpenGoalFormModal = () => {
        dispatch(openGoalFormModal({
            data: goal,
            mode: 'edit',
            entry: goal.entry,
            entryType: goal.entryType,
        }))
    }
    


    if(!goal) return  (
        <div style={{display: 'flex', alignItems: 'center', "justifyContent": 'center', width: "100%", height: '100vh'}}>
            <div>Loading...</div>
        </div>
    )

    return(
        <div className="cnx__ins_dashboard">
            {/* navbar */}
            <div className="cnx__ins_dashboard_navbar">
                <EditAbleBox 
                    text={`${_.upperFirst(goal?.entry)} ${goal?.entryType} ${goal?.name || goal?.team_name}`} 
                    onSave={() => {}} 
                />
                <div className='cnx__ins_dashboard_navbar_btn_group' style={{border: 0, padding:0}}>
                    {/* user */}
                    <div className='cnx__period_filter'>
                        <div className='cnx__period_filter__title'>
                            {/* <Dropdown>
                                <Dropdown.Toggle
                                    className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn`}
                                >
                                    <span style={{marginRight: '10px'}}>
                                        Add to Dashboard
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu offset={[0, 8]} className="cnx__period_filter_dd_menu">
                                    {[
                                        "My Dashboard 1",
                                        "My Dashboard 2",
                                        "Other Dashboard",
                                    ].map(d => (
                                        <Dropdown.Item 
                                            key={d} 
                                            className={`cnx_select_box_option cnx__relative_time__menu__item`}
                                        > 
                                            {d}
                                        </Dropdown.Item>
                                    ))}
                                    <div className='cnx_divider'/>
                                    <Dropdown.Item 
                                        style={{justifyContent: 'flex-start', gap: '8px'}}
                                        className={`cnx_select_box_option cnx__relative_time__menu__item`}
                                    > 
                                        <i className='fa-solid fa-plus' />
                                        <span>New Dashboard</span>
                                    </Dropdown.Item>
 

                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                    </div>

                    {/* user */}
                    <div className='cnx__period_filter'>
                        {/* actions */}
                            {/* <Dropdown>
                                <Dropdown.Toggle
                                    icon={false}
                                    className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn`}
                                >
                                    <span>
                                       <i className='fa-solid fa-ellipsis-h' />
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu offset={[0, 8]} placement='bottom-end' className="cnx__period_filter_dd_menu">
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        Duplicate
                                    </Dropdown.Item>
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        <i className='fa-solid fa-trash-can' />
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                    </div>

                     
                </div>
            </div>
            {/* end navbar */}

            <div className='cnx__ins_container'>
                {/* details bar */}
                <div className='cnx__ins_details_bar'>
                    <div className='cnx__ins_details_bar_header'>
                        <h4 className=''>
                            Goal Details
                        </h4>
                        {/* edit goal */}
                        {/* <Button variant='tertiary' onClick={handleOpenGoalFormModal}>
                            <i className='fa-solid fa-pencil'/>
                        </Button> */}
                        {/* end edit goal */}

                        <div className='filter_options_line'>
                            <span>{ goal?.name || goal?.team_name }</span>
                            <span>
                                {goal.entry} {goal.entryType}
                            </span>
                            <span>Pipeline</span>
                            <span>
                                {goal.frequency}
                            </span>
                            <span>
                                {dayjs(goal.startDate).format('MMM DD, YYYY')}
                            </span>
                            <span>
                                {goal.endDate ? dayjs(goal.endDate).format('MMM DD, YYYY') : 'No end date'}
                            </span>
                            <span>
                                {goal.trackingType === "value" ? numberToUnits(Number(goal.trackingValue)) : goal.trackingValue} deals
                            </span>
                        </div>

                        <div>
                            <Button variant='tertiary'>
                                <i className="bi bi-chevron-expand" />
                            </Button>
                        </div>
                    </div>
                    <div className="cnx_divider" style={{margin: '0'}} />
                    {/* details */}
                     <div className='cnx__ins_details'>
                        <div className='cnx__ins_details_col'> 
                            <Tooltip text="Assignee">
                                <div className='cnx__ins_details_item'>
                                    <i className='fa-regular fa-user'/>
                                    <span>{ goal?.name || goal?.team_name }</span>
                                </div>
                            </Tooltip>
                            
                           <Tooltip text='Goal type'>
                             <div className='cnx__ins_details_item'>
                                <Icon type="Deal" />
                                {goal.entry} {goal.entryType}
                            </div>
                           </Tooltip>

                            <Tooltip text="Pipeline">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-solid fa-chart-simple" />
                                    Pipeline{goal?.entryType === 'Progressed' ? ', ' + goal?.qualified :''}
                                </div>
                            </Tooltip>
                        </div>

                        <div className='cnx__ins_details_col'> 
                            <Tooltip text="Goal Frequency">
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Activity" />
                                    {goal.frequency}
                                </div>
                            </Tooltip>

                            <Tooltip text="Goal duration">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-regular fa-clock"/>
                                    {dayjs(goal.startDate).format('MMM DD, YYYY')} - {goal.endDate ? dayjs(goal.endDate).format('MMM DD, YYYY') : 'No end date'}
                                </div>
                            </Tooltip>

                            <Tooltip text='Expected outcome'>
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Goal" />
                                    {goal.trackingType === "value" ? numberToUnits(Number(goal.trackingValue)) : goal.trackingValue} Deals 
                                </div>
                            </Tooltip>
                        </div>
                     </div>
                   {/* end details */}

                </div>
                {/* end details bar */}

            
                {/* graph container */}
                <div className="cnx__ins_graph_container">
                    {/* header */}
                    <div className="cnx__ins_graph_container_header">
                        {/* graph view tab */}
                        <div className='cnx__ins_graph_views'>
                            <Button className='cnx__ins_graph_view_button active'>
                                <i className="fa-solid fa-chart-simple" />
                            </Button>

                            <Button className='cnx__ins_graph_view_button'>
                                <i className="fa-solid fa-chart-pie" />
                            </Button>

                            <Button className='cnx__ins_graph_view_button'>
                               <i className="fa-solid fa-chart-bar"></i>
                            </Button>
                        </div>
                        <div>
                           <Dropdown>
                                <Dropdown.Toggle
                                    className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn`}
                                >
                                    <span>
                                       Export
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu offset={[0, 8]} placement='bottom-end' className="cnx__period_filter_dd_menu">
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        Pdf
                                    </Dropdown.Item>
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        PNG
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* graph view tab end */}
                    </div>
                    {/* end header */}

                    <div className="cnx_divider" />

                    {/* graph */}
                        <div className='cnx__ins_graph'>
                            <div className='__time_filter'>
                                <RelativeTimePeriod
                                    setSelectedPeriod={handleRelativeTimePeriod}
                                    selectedPeriod={selectedPeriod}
                                    defaultPeriod={"Goal Period"}
                                    setApplyFilter={setApplyFilter}
                                />
                            </div>
                            <div className='__graph'>
                                <GoalStackedBarChart
                                    footer={false}
                                    XAxisLabel="title"
                                    actualFillColor={"#1d8603"}
                                    targetFillColor={"#E5E5E5"}
                                    leftSideLabel="Number of deals"
                                    barDataKey={[ "value" ]}
                                    offset={-5}
                                    // yDomain={ [0, dataMax => (dataMax + Math.ceil(dataMax * 0.1))]}
                                    labelListFormatter={value => goal.trackingType === 'value' ? `$${numberToUnits(value, 2)}` : numberToUnits(value, 2)  }
                                    yAxisTickFormate={value => goal.trackingType === 'value' ? `$${numberToUnits(value, 2)}` : numberToUnits(value, 2)  }
                                    data = {[...summarizedData]} 
                                />
                            </div>
                        </div> 
                    {/* end graph */}
                    
                </div>
                {/* end graph container */}



                 {/* table container */}
                <div className="cnx__ins_graph_container">
                    {/* header */}
                    <div className="cnx__ins_graph_container_header">
                        {/* graph view tab */}
                        <div className='cnx__ins_graph_views'>
                            <Button
                                onClick={() => setActiveTable('activities')}
                                className={`cnx__ins_table_view_button ${activeTable === 'activities' ? 'active': ""}`}>
                                Activities
                            </Button>

                            <Button 
                                onClick={() => setActiveTable('summary')}
                                className={`cnx__ins_table_view_button ${activeTable === 'summary' ? 'active': ""}`}>
                                Summary
                            </Button>
                        </div>
                        <div>
                           <Dropdown>
                                <Dropdown.Toggle
                                    className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn`}
                                >
                                    <span>
                                       Export
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu offset={[0, 8]} placement='bottom-end' className="cnx__period_filter_dd_menu">
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        Pdf
                                    </Dropdown.Item>
                                    <Dropdown.Item className={`cnx_select_box_option cnx__relative_time__menu__item`}> 
                                        PNG
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* graph view tab end */}
                    </div>
                    {/* end header */}

                    

                    {/* graph table */}
                    <div className='cnx__ins_table pb-3'>
                       {activeTable === 'activities' && (
                            <DataTable 
                                data={dealsData} 
                                defaultColumns={DataTableColumns}
                                isLoading={goalsIsLoading || isLoading} 
                            />
                        )}
                        
                    { 
                        // activeTable === 'summary' && <GoalSummaryTable deals={dealsData} goal={goal} />
                         activeTable === 'summary' && <GoalSummaryTable data={summarizedData} isLoading={isSummarizing}/>
                    }
                    </div>
                    {/* end graph table */}
                    
                </div>
                {/* end table container */}
            </div>
            
        </div>
    )
}

export default Goal;