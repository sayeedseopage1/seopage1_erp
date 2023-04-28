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
import { NavLink } from 'react-router-dom';
import { Icon } from '../utils/Icon';
import _ from 'lodash';
import TextHighlighter from './TextHighlighter';
import { useSections } from '../hooks/useSection';


const InsightSidebar = () => {
    const [search, setSearch] = React.useState('');
    const {sections}  = useSections();
    const {dashboards} = useSelector((state) => state.dashboards);
    const {reports} = useSelector((state) => state.reports);
    const { goals } = useSelector((state) => state.goals);
    const dispatch = useDispatch();


    // get all unique sections
    const getDashboardSections = () => {
        const sections = dashboards.map((item) => item.section);
        return [...new Set(sections)];
    }

    // get all dashboards by section
    const getDashboardsBySection = (section) => {
        return dashboards.filter((item) => item.section === section);
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
                    <Accordion.Item defaultActive={true}>
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
                                <Accordion key={section}>
                                    <Accordion.Item defaultActive={true}>
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
                                                {getDashboardsBySection(section)?.map((dashboard) => (
                                                    dashboard.title ? (
                                                    <div key={dashboard.id} className='cnx_ins__sidebar_item'>
                                                         
                                                        <NavLink 
                                                            to={`dashboards/${dashboard.id}`}
                                                            className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link active' : 'cnx_ins__sidebar_item_link'}
                                                        > 
                                                        
                                                            <span>
                                                                <i className="fa-solid fa-chart-pie" />
                                                                    <TextHighlighter
                                                                        searchWords={search}
                                                                        textToHighlight={dashboard.title}
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
                                            <Dropdown.Item className="cnx_ins__sidebar_header_dd_item disabled">
                                                <i className="fa-solid fa-trash-can cnx_font_sm" />
                                                <span>Bulk delete goal</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <Accordion.Item.Body>
                                {/* goal section */}
                                {["Active", "Past"]?.map((section) => (
                                    <Accordion key={section}>
                                        <Accordion.Item defaultActive={true}>
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
                                                {/* goals */}
                                                    {goals.filter(g => g.status === _.lowerCase(section))?.filter(g => _.lowerCase(g.title).includes(_.lowerCase(search))).map((goal) => (
                                                        <div key={goal.id} className='cnx_ins__sidebar_item'>
                                                            <NavLink 
                                                                to={`goals/${goal.id}`}
                                                                className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link active' : 'cnx_ins__sidebar_item_link'}
                                                            > 
                                                            
                                                                <span>
                                                                    <Icon type={goal.type} />
                                                                    <TextHighlighter
                                                                        searchWords={search}
                                                                        textToHighlight={goal.title}
                                                                    />
                                                                </span> 
                                                            
                                                                <button aria-label='moveItem' className="cnx_ins__sidebar_item_move">
                                                                    <Icon type="Move" />
                                                                </button>
                                                            </NavLink>
                                                        </div>
                                                    ))}
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
                    <Accordion.Item defaultActive={true}>
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
                                    <Accordion.Item defaultActive={true}>
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

