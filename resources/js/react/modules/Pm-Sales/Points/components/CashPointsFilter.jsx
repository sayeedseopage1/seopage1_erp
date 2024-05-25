import React, { useEffect, useState } from 'react';
import { setFilterState } from '../../../../services/features/pointPageFilterSlice';
import { useGetAllFilterOptionQuery, useGetProjectsOptionsQuery } from '../../../../services/api/FilterBarOptionsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from './FilterItem';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import DepartmentFilter from './DepartmentFilter';
import _ from 'lodash';
import ShiftFilterOption from './ShiftFilterOption.jsx';
import EmployeeFilterOptions from './EmployeeFilterOptions';
import Button from '../../../../Insights/ui/Button.jsx';

import UserFilter from './UserFilter';
import TypeFilter from './TypeFilter';

import { useUsers } from '../../../../hooks/useUsers.jsx';
import { useAuth } from '../../../../hooks/useAuth.jsx';
import { useGetPmByDeptQuery, useGetPmCashPointsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice.js';
import DeptFilter from './Filter/DeptFilter.jsx';
import EmployeeFilter from './Filter/EmployeeFilter.jsx';
import CreditDebitFilter from './Filter/CreditDebitFilter.jsx';
import pointIcon from '../assets/point1.svg'



export default function CashPointsFilter({
    setData,
    setIsDataFetching
}) {
    const auth = useAuth();
    const [dept, setDept] = useState(1);
    // get pm by department 
    const { data: pmByDept, isFetching: isPmByDeptLoading } = useGetPmByDeptQuery(dept)
    const pmByDeptData = pmByDept?.data
    // const { departments, shift, employees } = useSelector(s => s.pointPageFilterOption);
    const { getUserById, usersObject, usersIsFetching } = useUsers();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [client, setClient] = useState(null);
    const [type, setType] = useState(null);
    const [creditDebit, setCreditDebit] = useState(null);

    // const [selectedShift, setSelectedShift] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState();
    // const [employeeLoading, setEmployeeLoading] = useState(true);
    // const [project, setProject] = useState(null);

    // table data
    const { data: pmCashPoints, isLoading: dataFetchingStateIsLoading } = useGetPmCashPointsQuery()
    const tableData = pmCashPoints?.data

    // set table data
    useEffect(() => {
        setIsDataFetching(dataFetchingStateIsLoading);
        if (tableData && !dataFetchingStateIsLoading) {
            setData(tableData);
            setIsDataFetching(false)
        }
    }, [tableData, dataFetchingStateIsLoading])

    useEffect(() => {
        if (pmByDeptData && !isPmByDeptLoading) {
            setSelectedEmployee(pmByDeptData[0]?.id)
        }
    }, [pmByDeptData, isPmByDeptLoading])

    // console.log(tableData)
    // console.log("start", startDate)
    // console.log("end", endDate)
    // console.log("selectedEmployee", selectedEmployee)
    // console.log("creditDebit", creditDebit)


    // sidebar
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);


    // fetch data
    const {
        data: depAndEmployees,
        isFetching: isDepAndEmployeesFetching
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true,
        // skip: departments?.length && shift?.length && employees.length
    });



    const handleDeptChange = (value) => {
        // console.log(`selected ${value}`);
        setDept(value);
    };
    const handlePmChange = (value) => {
        setSelectedEmployee(value);
    };
    const handleCreditDebitChange = (value) => {
        setCreditDebit(value);
    };

    return (
        <div className='sp1__pp_filter_bar'>
            <FilterItem className='border-right-0'>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    onApply={() => { }}
                />
            </FilterItem>
            <FilterItem className='border-right-0'>
                <DeptFilter department={depAndEmployees?.department} handleChange={handleDeptChange} isFetching={isDepAndEmployeesFetching} />
            </FilterItem>
            <FilterItem className='border-right-0'>
                <EmployeeFilter pmByDeptData={pmByDeptData} handleChange={handlePmChange} isFetching={isPmByDeptLoading} />
            </FilterItem>
            <FilterItem className='border-right-0'>
                <CreditDebitFilter handleChange={handleCreditDebitChange} />
            </FilterItem>
            <FilterItem className='border-right-0'>
                <div className='point_selector_container'>
                    <div className='point_selector_label_container'>
                        <img src={pointIcon} alt="User Icon" style={{ width: '17px', height: '17px' }} />
                        <span className='point_selector_label'>Points gained as:</span>
                    </div>
                    <span className='point_selector_item' style={{ color: '#B1B1B1', marginLeft: '4px' }}>Individual</span>
                </div>
            </FilterItem>

            {/* sidebar */}
            {
                Number(window?.Laravel?.user?.role_id) === 1 &&
                <div className='sp1__pp_filter_sidebar_container'>
                    <div
                        className='sp1__pp_filter_sidebar_toggle'
                        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    >
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </div>

                    {
                        Number(window?.Laravel?.user?.role_id === 1) && sidebarIsOpen && (
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
                                        <DeptFilter depAndEmployees={depAndEmployees} handleChange={handleDeptChange} isFetching={isDepAndEmployeesFetching} />
                                    </FilterItem>


                                    <FilterItem className='hide d-flex align-items-center w-100 border-right-0'>
                                        <span className='mr-2 w-100'>Credit/Debit: <span className='d-block font-weight-bold border py-2 px-2 w-100' >Point Earned </span> </span>
                                    </FilterItem>

                                    <FilterItem className='hide d-flex align-items-center w-100 border-right-0'>
                                        <span className='mr-2 w-100'>Points gained as: <span className='d-block font-weight-bold border py-2 px-2 w-100'>Individual</span> </span>
                                    </FilterItem>

                                </div>
                            </aside>
                        )
                    }
                </div>
            }

            {/* sidebar */}
            {
                _.includes([7, 8], auth.getRoleId()) &&
                <div className='sp1__pp_filter_sidebar_container'>
                    <div
                        className='sp1__pp_filter_sidebar_toggle'
                        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    >
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </div>

                    {
                        _.includes([7, 8], auth.getRoleId()) && sidebarIsOpen && (
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
                                        <UserFilter
                                            title="Client"
                                            state={client}
                                            setState={setClient}
                                            sidebarIsOpen={sidebarIsOpen}
                                            roleIds={null}
                                        />
                                    </FilterItem>
                                    <FilterItem className='w-100 border-right-0'>
                                        <TypeFilter
                                            value={type}
                                            onChange={setType}
                                            sidebarIsOpen={sidebarIsOpen}
                                            data={[
                                                { id: "Bonus", title: "Bonus" },
                                                { id: "Regular", title: "Regular" },
                                                { id: "Authorization", title: "Authorization" }
                                            ]}
                                        />
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
