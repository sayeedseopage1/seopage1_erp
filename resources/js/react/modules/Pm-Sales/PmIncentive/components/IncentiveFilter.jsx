import React, { useEffect, useState } from 'react';
import FilterItem from './FilterItem.jsx';
import userIcon from '../assets/tag-user.svg'
import { useGetPmByDeptQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice.js';
import { useGetAllFilterOptionQuery } from '../../../../services/api/FilterBarOptionsApiSlice.js';
import { auth } from '../../Points/constants/index.js';
import Button from '../../../../Insights/ui/Button.jsx';
import DateFilter from './ui/DateFilter.jsx';
import PropTypes from 'prop-types';
import DeptFilter from './Filter/DeptFilter.jsx';
import EmployeeFilter from './Filter/EmployeeFilter.jsx';
import useIncentive from '../hooks/useIncentive.jsx';

export default function IncentiveFilter({ filterByPeriod, setQueryForAchievedIncentive, setQueryForIncentiveHeldAmounts, tab }) {
    const { setQuery } = useIncentive();
    const [dept, setDept] = useState(1);
    const { data: pmByDept, isFetching: isPmByDeptLoading } = useGetPmByDeptQuery(dept)
    const pmByDeptData = pmByDept?.data
    const [startDate, setStartDate] = useState(null);
    const [startDateQuarterAndYear, setStartDateQuarterAndYear] = useState(null);
    const [startDateYear, setStartDateYear] = useState(null);
    const [endDateYear, setEndDateYear] = useState(null);
    const [endDateQuarterAndYear, setEndDateQuarterAndYear] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState("");

    useEffect(() => {
        if (auth?.isHasRolePermission(1) && pmByDeptData && !isPmByDeptLoading) {
            setSelectedEmployee(pmByDeptData[0]?.id);
        }
    }, [pmByDeptData, isPmByDeptLoading]);

    // sidebar
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    // fetch data
    const {
        data: depAndEmployees,
        isFetching: isDepAndEmployeesFetching
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true,
    });

    // for monthly incentive
    useEffect(() => {
        setQuery(prevQuery => ({
            ...prevQuery,
            start_date: startDate,
            end_date: endDate,
            // dept_id: dept,
            user_id: selectedEmployee
        }));
    }, [startDate, endDate, selectedEmployee]);

    // for achieved quarterly and yearly incentive history table
    useEffect(() => {
        setQueryForAchievedIncentive(prevQuery => ({
            ...prevQuery,
            start_date: startDateQuarterAndYear,
            end_date: endDateQuarterAndYear,
            user_id: selectedEmployee
        }));
    }, [startDateQuarterAndYear, endDateQuarterAndYear, selectedEmployee]);

    // for held amount table
    useEffect(() => {
        setQueryForIncentiveHeldAmounts(prevQuery => ({
            ...prevQuery,
            start_date: startDateYear,
            end_date: endDateYear,
            user_id: selectedEmployee
        }));
    }, [startDateYear, endDateYear, selectedEmployee]);

    useEffect(() => {
        if (auth?.isHasRolePermission(4)) {
            setQuery(prevQuery => ({ ...prevQuery, user_id: auth?.userId }));
            setQueryForAchievedIncentive(prevQuery => ({ ...prevQuery, user_id: auth?.userId }));
            setQueryForIncentiveHeldAmounts(prevQuery => ({ ...prevQuery, user_id: auth?.userId }));
        }
    }, [auth?.userId, startDate]);

    const handleDeptChange = (value) => {
        setDept(value);
        setSelectedEmployee("");
        setQuery(prevQuery => ({ ...prevQuery, user_id: "" }));
        setQueryForAchievedIncentive(prevQuery => ({ ...prevQuery, user_id: "" }));
        setQueryForIncentiveHeldAmounts(prevQuery => ({ ...prevQuery, user_id: "" }));
    };

    const handlePmChange = (value) => {
        setSelectedEmployee(value);
        setQuery(prevQuery => ({ ...prevQuery, user_id: value }));
        setQueryForAchievedIncentive(prevQuery => ({ ...prevQuery, user_id: value }));
        setQueryForIncentiveHeldAmounts(prevQuery => ({ ...prevQuery, user_id: value }));
    };

    return (
        <div className='sp1__pp_filter_bar justify-content-between'>
            <FilterItem className='border-right-0'>
                {
                    tab != "held_amount" && filterByPeriod == "monthly" && <DateFilter
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        type={'monthly'}
                    />
                }
                {
                    tab != "held_amount" && filterByPeriod != "monthly" && <DateFilter
                        startDate={startDateQuarterAndYear}
                        endDate={endDateQuarterAndYear}
                        setStartDate={setStartDateQuarterAndYear}
                        setEndDate={setEndDateQuarterAndYear}
                        type={filterByPeriod}
                    />
                }
                {
                    tab == "held_amount" && <DateFilter
                        startDate={startDateYear}
                        endDate={endDateYear}
                        setStartDate={setStartDateYear}
                        setEndDate={setEndDateYear}
                        type={"yearly"}
                    />
                }

            </FilterItem>

            {
                auth?.isHasRolePermission(1) && <>
                    <FilterItem className='border-right-0 hide'>
                        <DeptFilter department={depAndEmployees?.department} handleChange={handleDeptChange} isFetching={isDepAndEmployeesFetching} />
                    </FilterItem>
                    <FilterItem className='border-right-0 hide'>
                        <EmployeeFilter pmByDeptData={pmByDeptData} handleChange={handlePmChange} isFetching={isPmByDeptLoading} />
                    </FilterItem>

                </>
            }
            {
                auth?.isHasRolePermission(4) &&
                <FilterItem className='border-right-0 hide'>
                    <div className='point_selector_container'>
                        <div className='point_selector_label_container'>
                            <img src={userIcon} alt="User Icon" style={{ width: '17px', height: '17px' }} />
                            <span className='point_selector_label'>Employee:</span>
                        </div>
                        <span className='point_selector_item' style={{ color: '#B1B1B1', marginLeft: '4px' }}>{auth?.name}</span>
                    </div>
                </FilterItem>
            }

            {/* sidebar */}
            {
                auth?.isHasRolePermission(1) &&
                <div className='sp1__pp_filter_sidebar_container'>
                    <button
                        className='sp1__pp_filter_sidebar_toggle bg-transparent'
                        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    >
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </button>

                    {
                        auth?.isHasRolePermission(1) && sidebarIsOpen && (
                            <aside className='sp1__pp_filter_sidebar'>
                                <div className='sp1__pp_filter_sidebar_header'>
                                    <span>Filters</span>

                                    <Button
                                        aria-label="Close"
                                        variant='tertiary'
                                        onClick={() => setSidebarIsOpen(false)}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </Button>
                                </div>

                                <div className="sp1__pp_filter_sidebar_items">
                                    <FilterItem className='w-100 border-right-0'>
                                        <DeptFilter department={depAndEmployees?.department} handleChange={handleDeptChange} isFetching={isDepAndEmployeesFetching} />
                                    </FilterItem>
                                    <FilterItem className='w-100 border-right-0'>
                                        <EmployeeFilter pmByDeptData={pmByDeptData} handleChange={handlePmChange} isFetching={isPmByDeptLoading} />
                                    </FilterItem>
                                </div>
                            </aside>
                        )
                    }
                </div>
            }

            {/* sidebar */}
            {
                auth?.isHasRolePermission(4) &&
                <div className='sp1__pp_filter_sidebar_container'>
                    <button
                        className='sp1__pp_filter_sidebar_toggle bg-transparent'
                        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    >
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </button>

                    {
                        auth?.isHasRolePermission(4) && sidebarIsOpen && (
                            <aside className='sp1__pp_filter_sidebar'>
                                <div className='sp1__pp_filter_sidebar_header'>
                                    <span>Filters</span>

                                    <Button
                                        aria-label="Close"
                                        variant='tertiary'
                                        onClick={() => setSidebarIsOpen(false)}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </Button>
                                </div>
                                <div className="sp1__pp_filter_sidebar_items">
                                    <FilterItem className='w-100 border-right-0'>
                                        <div className='point_selector_container'>
                                            <div className='point_selector_label_container'>
                                                <img src={userIcon} alt="User Icon" style={{ width: '17px', height: '17px' }} />
                                                <span className='point_selector_label'>Employee:</span>
                                            </div>
                                            <span className='point_selector_item' style={{ color: '#B1B1B1', marginLeft: '4px' }}>{auth?.name}</span>
                                        </div>
                                    </FilterItem>
                                </div>
                            </aside>
                        )
                    }
                </div>
            }


        </div >
    )
}

IncentiveFilter.propTypes = {
    filterByPeriod: PropTypes.string,
    setQueryForAchievedIncentive: PropTypes.func,
    setQueryForIncentiveHeldAmounts: PropTypes.func,
    tab: PropTypes.string
}