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
import { useGetPmCashPointsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice.js';
import DeptFilter from './Filter/DeptFilter.jsx';
import EmployeeFilter from './Filter/EmployeeFilter.jsx';



export default function CashPointsFilter({
    setData,
    setIsDataFetching
}) {
    const auth = useAuth();
    // const { departments, shift, employees } = useSelector(s => s.pointPageFilterOption);
    const { getUserById, usersObject, usersIsFetching } = useUsers();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shiftEmployee, setShiftEmployee] = useState([]);
    const [client, setClient] = useState(null);
    const [type, setType] = useState(null);
    const [dept, setDept] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeLoading, setEmployeeLoading] = useState(true);
    const [project, setProject] = useState(null);

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

    // console.log(tableData)
    // console.log("start", startDate)
    // console.log("end", endDate)


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

    console.log("depAndEmployees", depAndEmployees)

    const handleDeptChange = (value) => {
        console.log(`selected ${value}`);
        setDept(value);
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
                <DeptFilter depAndEmployees={depAndEmployees} handleChange={handleDeptChange} isFetching={isDepAndEmployeesFetching} />
            </FilterItem>
            <FilterItem className='border-right-0'>
                {/* <EmployeeFilter depAndEmployees={depAndEmployees} handleChange={handleDeptChange} /> */}
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
