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
import DataTable from '../components/DataTable';


// convert to unit
const numberToUnits = (value,decimal= 1) => {
    let c = convertNumberToUnits(value, decimal)
    return `$${c}`
}


const Goal = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('Today');
    const [filter, setFilterValue] = React.useState('');

    const handleRelativeTimePeriod =(value) => {
        setSelectedPeriod(value);
        relativeTime(value, setFilterValue);
    }

    console.log(filter)
    return(
        <div className="cnx__ins_dashboard">
            {/* navbar */}
            <div className="cnx__ins_dashboard_navbar">
                <EditAbleBox text="Deals added" onSave={() => {}} />
                <div className='cnx__ins_dashboard_navbar_btn_group' style={{border: 0, padding:0}}>
                    {/* user */}
                    <div className='cnx__period_filter'>
                        <div className='cnx__period_filter__title'>
                            <Dropdown>
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
                            </Dropdown>
                        </div>
                    </div>

                    {/* user */}
                    <div className='cnx__period_filter'>
                        {/* actions */}
                            <Dropdown>
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
                            </Dropdown>
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

                        <Button variant='tertiary'>
                            <i className='fa-solid fa-pencil'/>
                        </Button>

                        <div className='filter_options_line'>
                            <span>Abu sayeed</span>
                            <span>Deals added</span>
                            <span>Pipeline</span>
                            <span>Monthly</span>
                            <span>04/01/2023</span>
                            <span>No end date</span>
                            <span>500 deals</span>
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
                                    Abu Sayeed
                                </div>
                            </Tooltip>
                            
                           <Tooltip text='Goal type'>
                             <div className='cnx__ins_details_item'>
                                <Icon type="Deal" />
                                Deals Added
                            </div>
                           </Tooltip>

                            <Tooltip text="Pipeline">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-solid fa-chart-simple" />
                                    Pipeline
                                </div>
                            </Tooltip>
                        </div>

                        <div className='cnx__ins_details_col'> 
                            <Tooltip text="Goal Frequency">
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Activity" />
                                    Monthly
                                </div>
                            </Tooltip>

                            <Tooltip text="Goal duration">
                                <div className='cnx__ins_details_item'>
                                    <i className="fa-regular fa-clock"/>
                                    04/01/2023 - No end date
                                </div>
                            </Tooltip>

                            <Tooltip text='Expected outcome'>
                                <div className='cnx__ins_details_item'>
                                    <Icon type="Goal" />
                                    500 Deals
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
                                />
                            </div>
                            <div className='__graph'>
                                <StackedBarChart
                                    footer={false}
                                    XAxisLabel="name"
                                    leftSideLabel="Number of deals"
                                    barDataKey={["open", "won"]}
                                    offset={-5}
                                    labelListFormatter={value => numberToUnits(value, 0)}
                                    yAxisTickFormate={value => numberToUnits(value, 0)}
                                    data = {[ 
                                        { name: 'Jan', open: 0, won: 0},
                                        { name: 'Feb', open: 0, won: 0 },
                                        { name: 'Mar', open: 0, won: 0 },
                                        { name: 'Apr', open: 119, won: 100 },
                                        { name: 'May', open: 119, won: 100 },
                                        { name: 'Jun', open: 119, won: 100 },
                                        { name: 'Jul', open: 119, won: 100 },
                                        { name: 'Aug', open: 119, won: 100 },
                                        { name: 'Sep', open: 119, won: 100 },
                                        { name: 'Oct', open: 119, won: 100 },
                                        { name: 'Nov', open: 119, won: 100 },
                                        { name: 'Dec', open: 119, won: 100 },
                                    ]} 
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
                            <Button className='cnx__ins_table_view_button active'>
                                Activities
                            </Button>

                            <Button className='cnx__ins_table_view_button'>
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

                    <div className="cnx_divider" />

                    {/* graph table */}
                    <div className='cnx__ins_table'>
                        <DataTable />
                    </div>
                    {/* end graph table */}
                    
                </div>
                {/* end table container */}
            </div>
            
        </div>
    )
}

export default Goal;