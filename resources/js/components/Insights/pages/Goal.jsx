import * as React from 'react';
import EditAbleBox from "../components/EditAbleBox";
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import { Icon } from '../utils/Icon';
import Tooltip from '../ui/Tooltip';
import StackedBarChart from '../components/Graph/StackedBarChart';
import convertNumberToUnits from '../utils/convertNumberToUnits';
import { relativeTime } from '../utils/relativeTime';
import RelativeTimePeriod from '../components/RelativeTimePeriod';
import DataTable from '../ui/DataTable';
// import { useDealsState } from '../hooks/useDealsState';
import { useGoals } from '../hooks/useGoals';
import { useTeams } from '../hooks/useTeams';
import { useFetcher, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useUsers } from '../hooks/useUsers';

import { openGoalFormModal } from '../services/slices/goalFormModalSlice';
import { useDispatch } from 'react-redux';
import GoalSummaryTable from '../components/GoalSummaryTable';
import { DataTableColumns } from '../components/DataTableColumns';
import GoalStackedBarChart from '../components/Graph/GoalStackedBarChart';
import { stage } from '../utils/constants';
import { useGetTeamsQuery } from '../services/api/teamSliceApi';
import { useEditGoalTitle, useEditGoalTitleMutation, useGetGoalByIdQuery } from '../services/api/goalsApiSlice';
import { useGetDealsByGoalIdQuery } from '../services/api/dealSliceApi';
import { CompareDate } from '../utils/dateController';

// convert to unit
const numberToUnits = (value, decimal = 1) => {
    let c = convertNumberToUnits(value, decimal)
    return `${c}`
}


const Goal = () => {
    const params = useParams(); // get goal id from url
    const location = useLocation(); // get location
    const day = new CompareDate();
    const [goalSummary, setGoalSummary] = React.useState(null); // store goal summary data here

    // custom filter by data
    const [selectedPeriod, setSelectedPeriod] = React.useState('Today');
    const [filter, setFilterValue] = React.useState(null);
    const [applyFilter, setApplyFilter] = React.useState(false);

    // ui helper state
    const [isSummarizing, setIsSummarizing] = React.useState(true);
    const [activeTable, setActiveTable] = React.useState('deals');


    // goal hooks
    const { getTargetPeriod } = useGoals();


    // authorized for edit 
    const isAuthorizedToEdit = () => {
        if(
            goalData?.goal?.added_by === window?.Laravel?.user?.id
        ) {
          // if goal have end date and end date is greater than today
          // disable edit
            if(goalData?.goal?.end_date && day.isAfter(goalData?.goal?.end_date)) {
                return false;
            } else{
                return true;
            }
        }

        return false;
    }


    // get goal deals by goal id
    const {
        data: goalDealsData,
        isFetching: dealsIsFetching,
    } = useGetDealsByGoalIdQuery(params?.goalId, {
        refetchOnMountOrArgChange: true,
    });

    // get goal by id
    const {
        data: goalData,
        isFetching: goalIsFetching,
    } = useGetGoalByIdQuery(params?.goalId, {
        refetchOnMountOrArgChange: true,
    });

    // edit goal title
    const [editGoalTitle] = useEditGoalTitleMutation();
    const dispatch = useDispatch();


    // get filter period
    const handleRelativeTimePeriod = (value) => {
        setSelectedPeriod(value);
        relativeTime(value, setFilterValue);
    }

    // change goal title
     // save title change
     const handleTitleChange = ({id, title}) => {
        editGoalTitle({id, title});
    }
    

    // distribute deals by period
    const distributeDealsByPeriod = (deals, startDate, endDate) => {
        return deals.filter(deal => {
            return day.isSameOrAfter(deal.created_at, startDate) &&
                day.isSameOrBefore(deal.created_at, endDate)
        })
    }


    // get goal summary
    const summarized = (deals, goals, period, index) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let goalProgress = 0;
        let difference = 0;
        let result = 0;
        let yAxis = goalData.trackingValue;
        let target = 0;
        let goal = 0;
        let _deals = deals;


        // fixed decimal place to 2 if not integer
        const fixedDecimalPlace = (_value) => {
            let value = Number(_value);
            return parseInt(value) === value ? value : value.toFixed(1);
        }

        if (_deals.length > 0) {
            totalDeal = _deals.length;

            goal = Number(period.value);
            dealAdded = _deals.reduce((total, deal) => {
                return total + Number(deal.amount);
            }, 0);

            

            // count total deal added value
            _deals.map(deal => {
                if (_.lowerCase(deal.won_lost) === 'yes') {
                    dealWon++;
                }
                if (_.lowerCase(deal.won_lost) === 'no') {
                    dealLost++;
                }
            })


            goalProgress = goal === 0 ? 0 : (dealAdded / goal) * 100;
            goalProgress = goalProgress < 0 ? 0 : goalProgress;
            if (goalProgress % 1 !== 0) {
                goalProgress = goalProgress.toFixed(1);
            };

            target = goal - dealAdded;
            target = fixedDecimalPlace(target);
            goal = fixedDecimalPlace(goal);
            const {goal: _goalData} = goalData;

          

            result = _.lowerCase(_goalData.trackingType) === 'value' ? dealAdded : totalDeal;
            result = fixedDecimalPlace(result);

            if (_.lowerCase(_goalData.trackingType) === 'value') {
                if (goal < dealAdded) {
                    yAxis = dealAdded;
                } else {
                    yAxis = goal;
                }
            } else {
                if (goal < totalDeal) {
                    yAxis = totalDeal;
                } else {
                    yAxis = goal
                }
            }




            /// difference
            if (_.lowerCase(_goalData.trackingType) === 'value') {
                difference = dealAdded - Number(period.value);
            }else{
                difference = totalDeal - Number(period.value);
            }

            
            dealAdded = fixedDecimalPlace(dealAdded);
            difference = fixedDecimalPlace(difference);
        } else {
            totalDeal = 0;
            dealAdded = 0;
            dealWon = 0;
            dealLost = 0;
            dealAddedPercentage = 0;
            dealWonPercentage = 0;
            dealLostPercentage = 0;
            goalProgress = 0;
            difference = 0;
            endDate = '';
            startDate = '';
            result = 0;
            yAxis = goalData?.goal?.trackingValue;
            target = 0;
            goal = 0;
        }

        return {
            deals: _deals,
            ...period,
            id: `${period.index || index} `,
            totalDeal: Number(totalDeal),
            dealAdded: Number(dealAdded),
            dealWon,
            dealLost,
            dealAddedPercentage,
            dealWonPercentage,
            dealLostPercentage,
            goalProgress,
            target,
            difference,
            goal,
            result,
            targetType: _.lowerCase(goalData?.goal.trackingType),
            goalData,
            yAxis,
        }

    }


    // calculate goal summary 
    const calculateGoalSummary = React.useCallback(() => {
        
        
        // create time period for graph view
        if (goalData) {
            const { goal, recurring } = goalData;
            const deals = goalDealsData || [];
            const _targetPeriod = getTargetPeriod({...goal,recurring: recurring || [] }, filter);
            const summarizedData = [];

            if (_targetPeriod) {
                _targetPeriod.map((period, index) => {
                    let startDate = period.start;
                    let endDate = period.end;
                    let _deals = distributeDealsByPeriod(deals, startDate, endDate);
                    

                    if (_deals.length > 0) {
                        summarizedData.push(summarized(_deals, goalData, period, index));
                    } else {
                        _deals = [];
                    }
                })
            }

           

            setIsSummarizing(false);
            setGoalSummary(summarizedData);

        }

    }, [goalDealsData, goalData, filter, applyFilter, location, params]);


    React.useEffect(() => {
        setIsSummarizing(true);
        calculateGoalSummary();
    }, [calculateGoalSummary, location, params])


    // open edit modal
    const handleOpenGoalFormModal = () => {
        if(!goalData?.goal) return null;
        dispatch(openGoalFormModal({
            data: goalData?.goal,
            mode: 'edit',
            entry: goalData?.goal?.entry,
            entryType: goalData?.goal?.entryType,
        }))
    }


    if (goalIsFetching || !goalData) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', "justifyContent": 'center', width: "100%", height: '100vh' }}>
                <div>Loading...</div>
            </div>
        )    
    }


    const { goal } = goalData;

    if(!goal) return <div>Goal not found</div>

    const _title = `${_.upperFirst(goal?.entry)} ${goal?.entryType} ${goal?.name || goal?.team_name}`;

    return (
        <div className="cnx__ins_dashboard">
            {/* navbar */}
            <div className="cnx__ins_dashboard_navbar">
                <EditAbleBox
                    text={`${goal?.title || _title}`}
                    onSave={(title) => handleTitleChange({ id: goal?.id, title })}
                />
                <div className='cnx__ins_dashboard_navbar_btn_group' style={{ border: 0, padding: 0 }}>
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
                        {
                            isAuthorizedToEdit() &&
                            <Button variant='tertiary' onClick={handleOpenGoalFormModal}>
                                <i className='fa-solid fa-pencil' />
                            </Button>
                        }

                        {/* end edit goal */}

                        <div className='filter_options_line'>
                            <span>{goal?.name || goal?.team_name}</span>
                            <span>
                                {goal?.entry} {goal?.entryType}
                            </span>
                            <span>Pipeline</span>
                            <span>
                                {goal?.frequency}
                            </span>
                            <span>
                                {dayjs(goal?.startDate).format('MMM DD, YYYY')}
                            </span>
                            <span>
                                {goal?.endDate ? dayjs(goal?.endDate).format('MMM DD, YYYY') : 'No end date'}
                            </span>
                            <span>
                                {goal?.trackingType === "value" ? numberToUnits(Number(goal?.trackingValue)) : goal?.trackingValue} deals
                            </span>
                        </div>

                        <div>
                            <Button variant='tertiary'>
                                <i className="bi bi-chevron-expand" />
                            </Button>
                        </div>
                    </div>
                    <div className="cnx_divider" style={{ margin: '0' }} />
                    {/* details */}
                    <div className='cnx__ins_details'>
                        <div className='cnx__ins_details_col'>
                            <Tooltip text="Assignee">
                                <div className='cnx__ins_details_item'>
                                    <i className='fa-regular fa-user' />
                                    <span>{goal?.name || goal?.team_name}</span>
                                </div>
                            </Tooltip>

                            <Tooltip text='Goal type'>
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Deal" />
                                    {goal?.entry} {goal?.entryType}
                                </div>
                            </Tooltip>

                            <Tooltip text="Pipeline">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-solid fa-chart-simple" />
                                    Pipeline{goal?.entryType === 'Progressed' ? ', ' + goal?.qualified : ''}
                                </div>
                            </Tooltip>
                        </div>

                        <div className='cnx__ins_details_col'>
                            <Tooltip text="Goal Frequency">
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Activity" />
                                    {goal?.frequency}
                                </div>
                            </Tooltip>

                            <Tooltip text="Goal duration">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-regular fa-clock" />
                                    {dayjs(goal?.startDate).format('MMM DD, YYYY')} - {goal.endDate ? dayjs(goal?.endDate).format('MMM DD, YYYY') : 'No end date'}
                                </div>
                            </Tooltip>

                            <Tooltip text='Expected outcome'>
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Goal" />
                                    {goal?.trackingType === "value" ? numberToUnits(Number(goal?.trackingValue)) : goal?.trackingValue} Deals
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

                            {/* <Button className='cnx__ins_graph_view_button'>
                                <i className="fa-solid fa-chart-pie" />
                            </Button>

                            <Button className='cnx__ins_graph_view_button'>
                                <i className="fa-solid fa-chart-bar"></i>
                            </Button> */}

                            {isSummarizing && <div>
                                <div className="spinner-border" role="status" style={{
                                    width: '1.3rem',
                                    height: '1.3rem',
                                }}>  </div>
                            </div>}
                        </div>
                        {/* <div>
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
                        </div> */}
                        {/* graph view tab end */}
                    </div>
                    {/* end header */}

                    <div className="cnx_divider" />

                    {/* graph */}
                    {!isSummarizing && goalSummary.length > 0 ?
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
                                    barDataKey={["value"]}
                                    offset={-5}
                                    // yDomain={ [0, dataMax => (dataMax + Math.ceil(dataMax * 0.1))]}
                                    labelListFormatter={value => goal?.trackingType === 'value' ? `$${numberToUnits(value, 2)}` : numberToUnits(value, 0)}
                                    yAxisTickFormate={value => goal?.trackingType === 'value' ? `$${numberToUnits(value, 2)}` : numberToUnits(value, 0)}
                                    data={[...goalSummary]}
                                />
                            </div>
                        </div>
                        : null
                    }
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
                                onClick={() => setActiveTable('deals')}
                                className={`cnx__ins_table_view_button ${activeTable === 'deals' ? 'active' : ""}`}>
                                Deals
                            </Button>

                            <Button
                                onClick={() => setActiveTable('summary')}
                                className={`cnx__ins_table_view_button ${activeTable === 'summary' ? 'active' : ""}`}>
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
                        {activeTable === 'deals' && (
                            <DataTable
                                data={goalDealsData ? [...goalDealsData] : []}
                                defaultColumns={DataTableColumns}
                                isLoading={dealsIsFetching}
                            />
                        )}

                        {
                            // activeTable === 'summary' && <GoalSummaryTable deals={dealsData} goal={goal} />
                            activeTable === 'summary' && <GoalSummaryTable data={goalSummary} isLoading={isSummarizing} />
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