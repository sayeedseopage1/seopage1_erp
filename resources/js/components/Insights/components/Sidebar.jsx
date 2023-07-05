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
import SidebarItems from './SidebarItems'; 
import { useTeams } from '../hooks/useTeams';




const InsightSidebar = () => {
    const [search, setSearch] = React.useState('');
    const {sections, getSectionsByType}  = useSections();
    const { teams } = useTeams();
    const {dashboards} = useDashboards();
    const [filteredGoals, setFilteredGoals] = React.useState({active: [], past: []});
    const {reports} = useSelector((state) => state.reports);
    const [goals, setGoals] = React.useState({
        goals: [],
        recurring: []
    });
    const dispatch = useDispatch();
    const compareDate = new CompareDate();
    const {goals:__goals, fetchGoals, goalsIsFetching} = useGoals();

    // filter items 
    const [selectedTeam, setSelectedTeam] = React.useState(null);
    const [selectedMonth, setSelectedMonth] = React.useState(null);
    const [selectedYear, setSelectedYear] = React.useState(2023);
    


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
                let today =  dayjs().format('YYYY-MM-DD');

                if(!goal.endDate || compareDate.isSameOrBefore(today, goal.endDate)){
                    return {...goal, title, status: 'Active'};
                }else{
                    return {...goal, title, status: 'Past' };
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


    // get date
    const getMonth = (index, year) => ({
        name: dayjs().year(year).month(index).format('MMMM'),
        short_name: dayjs().year(year).month(index).format('MMM'),
        start: dayjs().year(year).month(index).startOf('month').format('YYYY-MM-DD'),
        end: dayjs().year(year).month(index).endOf('month').format('YYYY-MM-DD'),
        duration: function(){ return `${this.start.format('MMM DD, YYYY')} - ${this.end.format('MMM DD, YYYY')}`},  
    }) 

    React.useEffect(() => {
        let month = {
            name: dayjs().format('MMMM'),
            short_name: dayjs().format('MMM'),
            start: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            end: dayjs().endOf('month').format('YYYY-MM-DD'),
            duration: function(){ 
                return `${this.start.format('MMM DD, YYYY')} - ${this.end.format('MMM DD, YYYY')}`
            },  
        }

        let filter = {
            start_date: month.start,
            end_date: month.end,
            shift_id: selectedTeam?.id || null
        } 
         
        setSelectedMonth(month);
        fetchGoals(filter);
    }, [])


    // handle goal month filter 
    const handleGoalMonthFilter = (month) => {
        setSelectedMonth(month);

        let filter = {
            start_date: month.start,
            end_date: month.end,
            shift_id: selectedTeam?.id || null
        } 
  
        fetchGoals(filter);
    }

    // handle goal month filter 
    const handleGoalShiftFilter = (team) => { 
        setSelectedTeam(team);
        const month = selectedMonth;

        let filter = {
            start_date: month?.start,
            end_date: month?.end,
            shift_id: team?.id || null
        } 
 
        fetchGoals(filter);
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

                                {/* goal filter options */}
                                
                                {/* date filter */}
                                <Dropdown className='cnx_ins--goal-filter-dd mr-2'>
                                    <Dropdown.Toggle icon={false} className="cnx_ins--goal-filter-dd-toggle">
                                        <Button 
                                            aria-label="GoalAddButton"  
                                            className='cnx_ins__sidebar_dashboards_dd_btn' 
                                        >
                                            <span className='__goal-date-filter'>
                                                {selectedMonth?.short_name}
                                            </span>
                                        </Button> 
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="cnx_ins--goal-filter-dd-menu">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <Button 
                                                aria-label="GoalAddButton"  
                                                className='cnx_ins__sidebar_dashboards_dd_btn px-2' 
                                                onClick={() => setSelectedYear(prevState => prevState - 1)}
                                            >
                                                <span className='__goal-date-filter'> 
                                                    <i className='fa-solid fa-chevron-left' />  
                                                </span>
                                            </Button> 


                                            <div className='w-100 text-center'> {selectedYear} </div>
                                            
                                            <Button 
                                                aria-label="GoalAddButton"  
                                                className='cnx_ins__sidebar_dashboards_dd_btn px-2' 
                                                onClick={() => setSelectedYear(prevState => prevState + 1)}
                                            >
                                                <span className='__goal-date-filter'> 
                                                    <i className='fa-solid fa-chevron-right' />  
                                                </span>
                                            </Button> 
                                        </div>
                                        <div className='cnx_ins--goal-filter-dd-menu--options'>
                                        {
                                            [...Array(12)].map((_, i) => (
                                                    <Dropdown.Item
                                                        key={getMonth(i, selectedYear).name}  
                                                        onClick={() => handleGoalMonthFilter(getMonth(i, selectedYear))}
                                                        className={selectedMonth?.name === getMonth(i, selectedYear).name ? 'goal-filter--dd-list selected' : 'goal-filter--dd-list'}
                                                    >  
                                                        {getMonth(i, selectedYear).name}  
                                                    </Dropdown.Item>
                                                )) 
                                        }
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* end date filter */}

                                {/* team filter */}
                                {[1, 8].includes(Number(window?.Laravel?.user?.role_id)) && 
                                    <Dropdown className='cnx_ins--goal-filter-dd mr-2'>
                                        <Dropdown.Toggle icon={false} className="cnx_ins--goal-filter-dd-toggle">
                                            <Button 
                                                aria-label="GoalAddButton" 
                                                data-toggle='tooltip'
                                                data-placeholder='top'
                                                title={selectedTeam?.team_name}
                                                className={selectedTeam ? 'cnx_ins__sidebar_dashboards_dd_btn active' : 'cnx_ins__sidebar_dashboards_dd_btn'}
                                            >
                                                <i className='fa-solid fa-user-group' />
                                            </Button> 
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="cnx_ins--goal-filter-dd-menu">
                                            {teams && (
                                                <Dropdown.Item   
                                                    onClick={() => handleGoalShiftFilter(null)}
                                                    className={selectedTeam === null ? 'goal-filter--dd-list selected' : 'goal-filter--dd-list'}
                                                >  
                                                    All Teams
                                                </Dropdown.Item>
                                            )}
                                            {
                                                teams? 
                                                    teams.map(team => (
                                                        <Dropdown.Item
                                                            key={team.id}  
                                                            onClick={() => handleGoalShiftFilter(team)}
                                                            className={selectedTeam?.id === team.id ? 'goal-filter--dd-list selected' : 'goal-filter--dd-list'}
                                                        >  
                                                            {team.team_name}  
                                                        </Dropdown.Item>
                                                    ))
                                                : <span>Loading...</span>
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                {/* end team filter */}
                                {/* end goal filter options */}
                                 
                                <Button 
                                    aria-label="GoalAddButton" 
                                    className='cnx_ins__sidebar_dashboards_dd_btn'
                                    onClick={() => dispatch(openGoalModal())}
                                >
                                    <i className="fa-solid fa-plus" />
                                </Button>
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
                                                            

                                                            {goalsIsFetching ? 
                                                                <div>
                                                                    <div className="spinner-border" role="status" style={{
                                                                        width: '.85rem',
                                                                        height: '.85rem',
                                                                        border : '0.1em solid currentcolor',
                                                                        borderRightColor: 'transparent',
                                                                    }}/>  
                                                                </div>:
                                                                <span className='cnx_ins__sidebar_dashboards_title_badge'>
                                                                    {filteredGoals[_.toLower(section)].filter(d => _.toLower(d.title).includes(_.lowerCase(search))).length || 0}
                                                                </span>
                                                            }
                                                        </div>
                                                </>} 
                                                </Accordion.Item.Header>

                                                {/* <Dropdown className='cnx_ins__sidebar_dashboards_dd __inner'>
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
                                                </Dropdown> */}
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
                                                    
                                                    {/* { goals.goals.length > 0 ?
                                                            <GoalItem goals={filteredGoals[_.toLower(section)]} search={search}/> :

                                                        goalsIsFetching ? 
                                                        <></> :
                                                            <div  className='cnx_ins__sidebar_item_link cnx_ins__sidebar_item'>
                                                                <span>
                                                                    No active goals
                                                                </span> 
                                                            </div> 
                                                        
                                                    } */}

                                                        { goals.goals.length > 0 ?
                                                            <SidebarItems 
                                                                goals={filteredGoals[_.toLower(section)]} 
                                                                search={search}
                                                            /> :

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
    const [expended, setExpended] = React.useState(false);


    const length = expended ? goals.length : 12;


    return goals.length > 0  && goals !== undefined ?  
        <>
            {
                goals
                .sort((a, b) => b.id - a.id )
                .filter(goal => _.lowerCase(goal.title).includes(_.lowerCase(search)) )
                .slice(0, length) 
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
                                    totalChars={41}
                                />
                                {/* <button aria-label='moveItem' className="cnx_ins__sidebar_item_move">
                                    <Icon type="Move" />
                                </button> */}
                            </NavLink>
                        </Tooltip>
                    </div>
                ))
            }


            {
                goals.length > 12 && 
                <div 
                    onClick={() => setExpended(!expended)}
                    className='cnx_ins__sidebar_item  cnx_ins__sidebar_item_see_more'
                >
                    {expended ? 'Hide' : 'See more'}
                </div>
                
            }
        </>
         : 
        <div className='cnx_ins__sidebar_item_link cnx_ins__sidebar_item'>
            <span> No active goals</span>
        </div>
}