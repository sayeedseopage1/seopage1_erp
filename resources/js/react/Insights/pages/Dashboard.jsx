import * as React from 'react';
import EditAbleBox from "../components/EditAbleBox";
import PeriodFilter from "../components/PeriodFilter";
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import ReactGridLayout from '../components/ReactGridLayout';


const Dashboard = () => {
    const [filterValue, setFilterValue] = React.useState({});
    const [filteredUser, setFilteredUser] = React.useState("");
    return(
        <div className="cnx__ins_dashboard"
            style={{
                height: '100vh',
                overflow: 'hidden',     
            }}
        >
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',
                    fontSize: '20px',
                    fontWeight: 'bold',     
                    zIndex: 1,
                    background: 'rgba(255, 255, 255, 0.8)'               
                }} 
            >
                <h5 style={{padding: '40px 20px', background: '#fff', boxShadow: '0 0 6px rgba(0, 0, 0, .1)'}}>
                    These graphs are static, please ignore them. We are currently working on it.
                </h5>
            </div>

            {/* navbar */}
            <div className="cnx__ins_dashboard_navbar">
                <EditAbleBox text="My Dashboard" onSave={() => {}} />
                
                <div className='cnx__ins_dashboard_navbar_btn_group'>
                    <PeriodFilter 
                        filterValue={filterValue} 
                        setFilterValue={setFilterValue} 
                    />

                    {/* user */}
                    <div className='cnx__period_filter'>
                    <div className='cnx__period_filter__title'>
                            <Dropdown>
                                <Dropdown.Toggle
                                    className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn ${filteredUser ? 'active': ''}`}
                                >
                                    <i className="fa-solid fa-user" />
                                    <span style={{marginRight: '10px'}}>
                                        { filteredUser || "User" }
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu offset={[0, 8]} className="cnx__period_filter_dd_menu">
                                    {[
                                        "User 1",
                                        "User 2",
                                        "User 3",
                                    ].map(d => (
                                        <Dropdown.Item 
                                            key={d} 
                                            onClick={() => setFilteredUser(d)} className={`cnx_select_box_option cnx__relative_time__menu__item ${filteredUser === d? 'active' : ''}`}
                                        > 
                                            {d}
                                            {filteredUser === d && <i className="fa-solid fa-check" />}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {filteredUser && 
                                <Button 
                                    onClick={() => setFilteredUser('')} variant='tertiary' 
                                    className={`cnx__period_filter__title_btn __close ${filteredUser ? 'active': ''}`}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            }

                                </div>
                    </div>
                </div>
            </div>
            {/* end navbar */}

            {/* dashboard content */}
            <div className='cnx__ins_dashboard_container'>
                <ReactGridLayout />
            </div>
            {/* end dashboard content */}
        </div>
    )
}

export default Dashboard;