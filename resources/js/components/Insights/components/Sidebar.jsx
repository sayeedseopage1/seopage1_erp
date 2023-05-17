import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGoalModal } from '../services/slices/goalModalSlice';
import { openDashboardModal } from '../services/slices/dashboardModalSlice';
import { openSectionModal } from '../services/slices/sectionModalSlice';
import { openReportModal } from '../services/slices/reportModalSlice';
import SearchBox from '../ui/Searchbox';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import Dropdown from '../ui/Dropdown';
import Accordion from '../ui/Accordion';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../utils/Icon';
import _ from 'lodash';
import TextHighlighter from './TextHighlighter';
import { useSections } from '../hooks/useSection';
import { useDashboards } from '../hooks/useDashboards';
import { useGoals } from '../hooks/useGoals';
import dayjs from 'dayjs';
import { CompareDate } from '../utils/dateController';
import { useUsers } from '../hooks/useUsers';
import { selectAllUsers, selectUserById, useGetUserMutation, useGetUsersQuery } from '../services/api/userSliceApi';
import { useGetGoalsQuery } from '../services/api/goalsApiSlice';
import { useGetTeamsQuery } from '../services/api/teamSliceApi';
import { goal } from '../utils/constants';



const InsightSidebar = () => {
    const [search, setSearch] = React.useState('');
    const {sections, getSectionsByType}  = useSections();
    const {dashboards} = useDashboards();
    const [filteredGoals, setFilteredGoals] = React.useState({active: [], past: []});
    const {reports} = useSelector((state) => state.reports);
    // const { goals } = useSelector((state) => state.goals);
    const [goals, setGoals] = React.useState({
        goals: [],
        recurring: []
    });
    const dispatch = useDispatch();
    const compareDate = new CompareDate();
    const {goals:__goals, goalsIsFetching} = useGoals();
    const {users, usersIsLoading} = useUsers();
    const location =  useLocation();


    React.useEffect(() => {
        // check if goals and __goals are not equal
        

        setGoals({...__goals})
    }, [__goals,  goalsIsFetching])


    React.useEffect(() => {
        const _filteredGoals = {
            active: [],
            past: []
        };


        if(goals?.goals && goals?.goals?.length > 0){
            let _goals = goals?.goals?.map((goal) => {
                let title = goal?.title;
                
                if(goal.endDate && compareDate.isAfter(dayjs(), goal.endDate)){
                    return {...goal, title, status: 'Past' };
                } else if(!goal.endDate || !compareDate.isAfter(dayjs(), goal.endDate)){
                    return {...goal, title, status: 'Active'};
                }
            }) 

            _filteredGoals.active = _goals.filter((goal) => goal.status === 'Active');
            _filteredGoals.past = _goals.filter((goal) => goal.status === 'Past');
        }
        setFilteredGoals(_filteredGoals);
    }, [goalsIsFetching, goals])

    // get all unique sections
    const getDashboardSections = () => {
        return getSectionsByType('DASHBOARD_SECTION');
    }

    // get all unique report sections

    const getReportSections = () => {
        const sections = reports.map((item) => item.section);
        return [...new Set(sections)];
    }

    // get all reports by section
    const getReportsBySection = (section) => {
        return reports.filter((item) => item.section === section);
    }


    // get goals 
    const getGoals = (goals, type, search) => {
        let goalsList = [];

        

        return goals.map(goal => {
            const user = _.find(users.users, {id: goal.added_by});
            let title = `${goal.entry} ${goal.entryType} by ${user?.name || ''}`;
            if(type === "Past"){
                if(goal.endDate && compareDate.isAfter(dayjs(), goal.endDate)){
                    return {...goal, title, user } 
                } else return;
            } else if(type === "Active"){
                if(!goal.endDate || !compareDate.isAfter(dayjs(), goal.endDate)){
                    if(_.toLower(title).includes(search) ){
                        return { ...goal, title, user } 
                    }
                }else return;
                
            }else return;
        })
    }
    

    return(
        <aside className='cnx_ins__sidebar'> 

            {/* search box  */}
            <div className='cnx_ins__sidebar_header'>
                <SearchBox 
                    value={search} 
                    onChange={setSearch} 
                    placeholder="Search from Insights"
                />

               <Dropdown>
                    <Dropdown.Toggle icon={false}>
                        <Tooltip text="Add New" >
                            <Button aria-label="GoalAddButton" variant='success' className='cnx_ins__sidebar_btn'>
                                <i className="fas fa-plus cnx__btn_icon"/>
                            </Button>
                        </Tooltip>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                        <Dropdown.Item onClick={() => dispatch(openReportModal())} className="cnx_ins__sidebar_header_dd_item">
                            <i className="fa-solid fa-chart-column" />
                            <span>Report</span>
                        </Dropdown.Item>
                        
                        <Dropdown.Item onClick={() => dispatch(openDashboardModal())} className="cnx_ins__sidebar_header_dd_item">
                            <i className="fa-solid fa-chart-pie" />
                            <span>Dashboard</span>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => dispatch(openGoalModal())} className="cnx_ins__sidebar_header_dd_item">
                            <Icon type="Goal" />
                            <span>Goal</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
               </Dropdown>
            </div>

            {/* sidebar content */}
            <div className='cnx_ins__sidebar_content'>
            {/* dashboards */}
                <Accordion>
                    <Accordion.Item defaultActive={false}>
                        <div className='cnx_ins__sidebar_dashboards_header'>
                            <Accordion.Item.Header icon={false} className='__accordion'>
                                {(active) => <div className='cnx_ins__sidebar_dashboards_title'>
                                    Dashboards
                                    <i className={`fa-solid fa-chevron-${active ? 'down': 'right'}`}/>
                                </div>}
                            </Accordion.Item.Header>

                            <Dropdown className='cnx_ins__sidebar_dashboards_dd'>
                                    <Dropdown.Toggle icon={false}>
                                        <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                            <i className="fa-solid fa-ellipsis-h" />
                                        </Button>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                        <Dropdown.Item onClick={() => dispatch(openDashboardModal())} className="cnx_ins__sidebar_header_dd_item">
                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                            <span>Dashboard</span>
                                        </Dropdown.Item>
                                        
                                        <Dropdown.Item
                                        onClick={() => dispatch(openSectionModal({  type: 'DASHBOARD_SECTION', from: '' }))} 
                                        className="cnx_ins__sidebar_header_dd_item">
                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                            <span>Section</span>
                                        </Dropdown.Item>

                                        <div className='cnx_divider'/>

                                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                            <i className="fa-solid fa-trash-can cnx_font_sm" />
                                            <span>Bulk delete dashboard</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Accordion.Item.Body>
                            {/* dashboard section */}
                            {getDashboardSections()?.map((section) => (
                                <Accordion key={section.id}>
                                    <Accordion.Item defaultActive={false}>
                                        <div className='cnx_ins__sidebar_dashboards_header __inner'>
                                            <Accordion.Item.Header icon={false} className='__accordion'>
                                            {(active) => <>
                                                    <div className='cnx_ins__sidebar_dashboards_title __inner'>
                                                        <i className={`fa-solid fa-chevron-${active? 'down': 'right'}`}/>
                                                        {section.section_name}
                                                    </div>
                                            </>} 
                                            </Accordion.Item.Header>

                                            <Dropdown className='cnx_ins__sidebar_dashboards_dd __inner'>
                                                    <Dropdown.Toggle icon={false}>
                                                        <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                                            <i className="fa-solid fa-ellipsis-h" />
                                                        </Button>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                                        <Dropdown.Item onClick={() => dispatch(openDashboardModal())} className="cnx_ins__sidebar_header_dd_item">
                                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                                            <span>Dashboard</span>
                                                        </Dropdown.Item>
                                                        
                                                        <Dropdown.Item 
                                                            onClick={() => dispatch(openSectionModal({
                                                                type: 'DASHBOARD_SECTION',
                                                                from: ''
                                                            }))} 
                                                        className="cnx_ins__sidebar_header_dd_item">
                                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                                            <span>Section</span>
                                                        </Dropdown.Item>

                                                        <div className='cnx_divider'/>

                                                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                                            <i className="fa-solid fa-trash-can cnx_font_sm" />
                                                            <span>Bulk delete dashboard</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <Accordion.Item.Body>
                                            {/* dashboard */}
                                                {dashboards.filter(i=> i.section_id === section.id)?.map((dashboard) => (
                                                    dashboard.dashboard_name ? (
                                                    <div key={dashboard.dashboard_id} className='cnx_ins__sidebar_item'>
                                                         
                                                        <NavLink 
                                                            to={`dashboards/${dashboard.dashboard_id}`}
                                                            className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link active' : 'cnx_ins__sidebar_item_link'}
                                                        > 
                                                        
                                                            <span>
                                                                <i className="fa-solid fa-chart-pie" />
                                                                    <TextHighlighter
                                                                        searchWords={search}
                                                                        textToHighlight={dashboard.dashboard_name}
                                                                    />
                                                            </span> 
                                                        
                                                            <button aria-label='moveItem' className="cnx_ins__sidebar_item_move">
                                                                <Icon type="Move" />
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                    ): null
                                                ))}
                                            {/*end dashboard*/}
                                        </Accordion.Item.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                            {/* end dashboard section */}



                        </Accordion.Item.Body>
                    </Accordion.Item>
                </Accordion>
            {/* end dashboards */}

            {/* Goal */}
                <Accordion>
                        <Accordion.Item defaultActive={true}>
                            <div className='cnx_ins__sidebar_dashboards_header'>
                                <Accordion.Item.Header icon={false} className='__accordion'>
                                    {(active) => <div className='cnx_ins__sidebar_dashboards_title'>
                                        Goals
                                        <i className={`fa-solid fa-chevron-${active ? 'down': 'right'}`}/>
                                    </div>}
                                </Accordion.Item.Header>

                                <Dropdown className='cnx_ins__sidebar_dashboards_dd'>
                                        <Dropdown.Toggle icon={false}>
                                            <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                                <i className="fa-solid fa-ellipsis-h" />
                                            </Button>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                            <Dropdown.Item onClick={() => dispatch(openGoalModal())} className="cnx_ins__sidebar_header_dd_item">
                                                <Icon type="Goal" />
                                                <span>Goals</span>
                                            </Dropdown.Item>
                                        
                                            <div className='cnx_divider'/>
                                            {/* <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                                <i className="fa-solid fa-trash-can cnx_font_sm" />
                                                <span>Bulk delete goal</span>
                                            </Dropdown.Item> */}
                                        </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <Accordion.Item.Body>

                                

                                {/* goal section */}
                                {["Active", "Past"]?.map((section) => (
                                    <Accordion key={section}>
                                        <Accordion.Item defaultActive={section === 'Active'}>
                                            <div className='cnx_ins__sidebar_dashboards_header __inner'>
                                                <Accordion.Item.Header icon={false} className='__accordion'>
                                                {(active) => <>
                                                        <div className='cnx_ins__sidebar_dashboards_title __inner'>
                                                            <i className={`fa-solid fa-chevron-${active? 'down': 'right'}`}/>
                                                            {section}

                                                            {goalsIsFetching && 
                                                                <div>
                                                                    <div className="spinner-border" role="status" style={{
                                                                        width: '.85rem',
                                                                        height: '.85rem',
                                                                        border : '0.1em solid currentcolor',
                                                                        borderRightColor: 'transparent',
                                                                    }}/>  
                                                                </div>
                                                            }
                                                        </div>
                                                </>} 
                                                </Accordion.Item.Header>

                                                <Dropdown className='cnx_ins__sidebar_dashboards_dd __inner'>
                                                        <Dropdown.Toggle icon={false}>
                                                            <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                                                <i className="fa-solid fa-ellipsis-h" />
                                                            </Button>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                                            <Dropdown.Item className="cnx_ins__sidebar_header_dd_item">
                                                                <i className="fa-solid fa-plus cnx_font_sm" />
                                                                <span>Dashboard</span>
                                                            </Dropdown.Item>
                                                            
                                                            <Dropdown.Item className="cnx_ins__sidebar_header_dd_item">
                                                                <i className="fa-solid fa-plus cnx_font_sm" />
                                                                <span>Section</span>
                                                            </Dropdown.Item>

                                                            <div className='cnx_divider'/>

                                                            <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                                                <i className="fa-solid fa-trash-can cnx_font_sm" />
                                                                <span>Bulk delete goal</span>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <Accordion.Item.Body>
                                                {/* {goalsIsFetching && 
                                                    <div  className='cnx_ins__sidebar_item_link cnx_ins__sidebar_item'>
                                                        <span>
                                                            loading...
                                                        </span> 
                                                    </div>
                                                } */}
                                                {/* goals */}
                                                    
                                                    { goals.goals.length > 0 ? 
                                                            <GoalItem goals={filteredGoals[_.toLower(section)]} search={search}/> :

                                                        goalsIsFetching ? 
                                                        <></> :
                                                            <div  className='cnx_ins__sidebar_item_link cnx_ins__sidebar_item'>
                                                                <span>
                                                                    No active goals
                                                                </span> 
                                                            </div> 
                                                        
                                                    }
                                                {/*end goals*/}
                                            </Accordion.Item.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))}
                                {/* end goal section */}



                            </Accordion.Item.Body>
                        </Accordion.Item>
                </Accordion>
            {/* end Goal */}

            {/* Reports */}
                <Accordion>
                    <Accordion.Item defaultActive={false}>
                        <div className='cnx_ins__sidebar_dashboards_header'>
                            <Accordion.Item.Header icon={false} className='__accordion'>
                                {(active) => <div className='cnx_ins__sidebar_dashboards_title'>
                                    Reports
                                    <i className={`fa-solid fa-chevron-${active ? 'down': 'right'}`}/>
                                </div>}
                            </Accordion.Item.Header>

                            <Dropdown className='cnx_ins__sidebar_dashboards_dd'>
                                    <Dropdown.Toggle icon={false}>
                                        <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                            <i className="fa-solid fa-ellipsis-h" />
                                        </Button>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                        <Dropdown.Item onClick={() => dispatch(openReportModal())} className="cnx_ins__sidebar_header_dd_item">
                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                            <span>Reports</span>
                                        </Dropdown.Item>
                                        
                                        <Dropdown.Item onClick={() => dispatch(openSectionModal({  type: 'REPORT_SECTION', from: '' }))} className="cnx_ins__sidebar_header_dd_item">
                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                            <span>Section</span>
                                        </Dropdown.Item>

                                        <div className='cnx_divider'/>

                                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                            <i className="fa-solid fa-trash-can cnx_font_sm" />
                                            <span>Bulk delete dashboard</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Accordion.Item.Body>
                            {/* dashboard section */}
                            {getReportSections()?.map((section) => (
                                <Accordion key={section}>
                                    <Accordion.Item defaultActive={false}>
                                        <div className='cnx_ins__sidebar_dashboards_header __inner'>
                                            <Accordion.Item.Header icon={false} className='__accordion'>
                                            {(active) => <>
                                                    <div className='cnx_ins__sidebar_dashboards_title __inner'>
                                                        <i className={`fa-solid fa-chevron-${active? 'down': 'right'}`}/>
                                                        {section}
                                                    </div>
                                            </>} 
                                            </Accordion.Item.Header>

                                            <Dropdown className='cnx_ins__sidebar_dashboards_dd __inner'>
                                                    <Dropdown.Toggle icon={false}>
                                                        <Button aria-label="GoalAddButton" className='cnx_ins__sidebar_dashboards_dd_btn'>
                                                            <i className="fa-solid fa-ellipsis-h" />
                                                        </Button>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                                                        <Dropdown.Item onClick={() => dispatch(openReportModal())} className="cnx_ins__sidebar_header_dd_item">
                                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                                            <span>Report</span>
                                                        </Dropdown.Item>
                                                        
                                                        <Dropdown.Item
                                                        onClick={() => dispatch(openSectionModal({  type: 'REPORT_SECTION', from: '' }))}
                                                        className="cnx_ins__sidebar_header_dd_item">
                                                            <i className="fa-solid fa-plus cnx_font_sm" />
                                                            <span>Section</span>
                                                        </Dropdown.Item>

                                                        <div className='cnx_divider'/>

                                                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                                            <i className="fa-solid fa-trash-can cnx_font_sm" />
                                                            <span>Bulk delete reports</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <Accordion.Item.Body>
                                            {/* dashboard */}
                                                {getReportsBySection(section)?.filter(g => _.lowerCase(g.title).includes(_.lowerCase(search))).map((report) => (
                                                    <div key={report.id} className='cnx_ins__sidebar_item'>
                                                        <NavLink 
                                                            to={`reports/${report.id}`}
                                                            className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link active' : 'cnx_ins__sidebar_item_link'}
                                                        > 
                                                            <span>
                                                                <Icon type={report.type} />
                                                                <TextHighlighter
                                                                    searchWords={search}
                                                                    textToHighlight={report.title}
                                                                />
                                                            </span> 
                                                        
                                                            <button aria-label='moveItem' className="cnx_ins__sidebar_item_move">
                                                                <Icon type="Move" />
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                ))}
                                            {/*end dashboard*/}
                                        </Accordion.Item.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                            {/* end dashboard section */}



                        </Accordion.Item.Body>
                    </Accordion.Item>
                </Accordion>

            {/* end Reports */}
            </div>


        </aside>
    )
}

export default InsightSidebar;






const GoalItem = ({goals, search}) => {


    return goals.length > 0  && goals !== undefined ?  
        goals
        .sort((a, b) => b.id - a.id )
        .map((goal) => (
           goal &&  
           <div key={goal.id} className='cnx_ins__sidebar_item'>
                <Tooltip text={goal.title} style={{width: '100%'}}>
                    <NavLink
                        to={`goals/${goal.id}`}
                        className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link __goal_item active' : 'cnx_ins__sidebar_item_link __goal_item'}
                    >
                        

                         <TextHighlighter
                            searchWords={search}
                            textToHighlight={goal.title}
                            totalChars={36}
                        />
                        <button aria-label='moveItem' className="cnx_ins__sidebar_item_move">
                            <Icon type="Move" />
                        </button>
                    </NavLink>
                </Tooltip>
            </div>
        )) : 
        <div className='cnx_ins__sidebar_item_link cnx_ins__sidebar_item'>
            <span> No active goals</span>
        </div>
}