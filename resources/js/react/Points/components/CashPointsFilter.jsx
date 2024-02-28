import * as React from 'react';
import { setFilterState } from '../../services/features/pointPageFilterSlice';
import {  useGetAllFilterOptionQuery, useGetProjectsOptionsQuery } from '../../services/api/FilterBarOptionsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from './FilterItem';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import DepartmentFilter from './DepartmentFilter';
import _ from 'lodash';
import ShiftFilterOption from './ShiftFilterOption';
import EmployeeFilterOptions from './EmployeeFilterOptions';
import { useUsers } from '../../hooks/useUsers';
import { usePointTableDataMutation } from '../../services/api/PointTableDataApiSlice';
import Button from '../../Insights/ui/Button';

import UserFilter from './UserFilter';
import TypeFilter from './TypeFilter';
import { useAuth } from '../../hooks/useAuth';

export default function CashPointsFilter ({
    setData,
    setIsDataFetching
}) {
    const auth = useAuth();
    const { departments, shift, employees } = useSelector(s => s.pointPageFilterOption);
    const { getUserById, usersObject, usersIsFetching } = useUsers();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [shiftEmployee,setShiftEmployee] = React.useState([]);
    const [client, setClient] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [dept,setDept] = React.useState(null);
    const [selectedShift, setSelectedShift] = React.useState(null);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [employeeLoading, setEmployeeLoading] = React.useState(true);
    const [project, setProject] = React.useState(null);


    // sidebar
    const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);


    // fetch data
    const {
        data,
        isFetching
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true,
        skip: departments.length && shift.length && employees.length
    });

    // fetch project list
    // // projects
    // const {
    //     data: projects,
    //     isFetching: projectsIsFetching
    // } = useGetProjectsOptionsQuery();


    React.useEffect(() => {
        if(data && !isFetching){
            setDept(data?.department[0]);
            dispatch(
                setFilterState(data)
            )
        }
    }, [data, isFetching])

    // table data
    const [
        pointTableData,
        {
            data: tableData,
            isLoading: dataFetchingStateIsLoading
        }
    ] = usePointTableDataMutation();




    // select shift
    React.useEffect(() => {
        if(!dept || isFetching) return;
            setEmployeeLoading(true);
            let _shift = shift?.filter(s => s.department_id === dept.id && s.id !== 1)[0];
            setSelectedShift(_shift);
            setEmployeeLoading(false);
    } , [dept]);




    const getEmployees = (shift) => {
        let users = [];

        if(shift.members){
            let members = shift?.members?.split(',')?.filter(d => d !== '');
            members?.map( m => {
                let user = getUserById(m);
                users.push({
                    id: user?.id,
                    name: user?.name,
                    image_url: user?.image_url,
                });
            });

            users.length && setSelectedEmployee(users[0])
        }
        return users;
    }


    React.useEffect(()=> {
        if(selectedShift){
            let users = getEmployees(selectedShift);
            setShiftEmployee(users)
        }else{
            setShiftEmployee([])
        }
    }, [selectedShift])


    // get employees
    // const handleDateFilter = (start, end, dept, shift, employee) => {
    //      console.log({
    //         dept,shift,employee
    //      })
    //     if(dept && selectedShift && selectedEmployee){
    //         pointTableData({
    //             department_id: dept?.id,
    //             team_id: shift?.id,
    //             user_id: employee?.id,
    //             start_date: start,
    //             end_date: end,
    //             project_id: null
    //         })
    // }

    // const handleDateFilter = (start, end, dept, shift, employee)=>{
    //     console.log({
    //         start,
    //         end,
    //         shift,
    //         dept,
    //         employee
    //     })
    // }





    // handle dept select
    const handleDepartmentSelect = (dept) => {
        setDept(dept);
    }

    // handle shift
    const handleShiftSelection = (shift) => {
        setSelectedShift(shift);
    }


    const _employee = React.useMemo(() => selectedEmployee, [selectedEmployee])
    const _client = React.useMemo(() => client, [client])
    const _bonusType = React.useMemo(() => type, [type])

    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if(Number(user?.role_id) === 1){
            if( selectedEmployee ){
                pointTableData({
                    department_id: dept?.id,
                    team_id: selectedShift?.id,
                    user_id: selectedEmployee?.id,
                    start_date: startDate,
                    end_date: endDate,
                    bonus_type: type?.id ?? null,
                    client_id: client?.id || null,
                    project_id: null
                })
            }else{
                setIsDataFetching(false);
                setData([]);
            }

        }else if(selectedEmployee){
            pointTableData({
                user_id: user?.id,
                start_date: startDate,
                end_date: endDate,
            })
        }
    }, [_employee]);


    React.useEffect(() => {
        const user = window?.Laravel?.user;
      if(Number(user?.role_id) === 1) {
            if(!dept || !selectedEmployee || !selectedShift) return;
            pointTableData({
                department_id: dept?.id,
                team_id: selectedShift?.id,
                user_id: selectedEmployee?.id,
                start_date: startDate,
                end_date: endDate,
                bonus_type: type?.id ?? null,
                client_id: client?.id || null,
                project_id: null
            })
      } else if(selectedEmployee) {
            pointTableData({
                user_id: user?.id,
                start_date: startDate,
                end_date: endDate,
            })
      }
    }, [endDate, startDate, ]);

    // client filter for role 7 and 8 not for role 1
    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if( !_.includes([7,8], auth.getRoleId()))  {
            if(Number(user?.role_id) === 1) {
                    if(!dept || !selectedEmployee || !selectedShift) return;
                    pointTableData({
                        department_id: dept?.id,
                        team_id: selectedShift?.id,
                        user_id: selectedEmployee?.id,
                        start_date: startDate,
                        end_date: endDate,
                        client_id: client?.id ?? null,
                        bonus_type: type?.id ?? null,
                        project_id: null
                    })
            } else if(selectedEmployee) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                    })
            }
        }
    }, [_client]);

    // client filter for role 7 and 8 not for role 1
    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if( !_.includes([1], auth.getRoleId()))  {
            if(_.includes([7, 8], auth.getRoleId())) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                        client_id: client?.id ?? null,
                        bonus_type: type?.id ?? null,
                    })
            } else if(selectedEmployee) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                    })
            }
        }
    }, [_client]);

    // bonus type filter for role 1 not for role 7 and 8
    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if( !_.includes([7,8], auth.getRoleId()))  {
            if(Number(user?.role_id) === 1) {
                    if(!dept || !selectedEmployee || !selectedShift) return;
                    pointTableData({
                        department_id: dept?.id,
                        team_id: selectedShift?.id,
                        user_id: selectedEmployee?.id,
                        start_date: startDate,
                        end_date: endDate,
                        bonus_type: type?.id ?? null,
                        client_id: client?.id ?? null,
                        project_id: null
                    })
            } else if(selectedEmployee) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                    })
            }
        }
    }, [_bonusType]);

    // filter for role 7 and 8 not for role 1
    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if( !_.includes([1], auth.getRoleId()))  {
            if(_.includes([7, 8], auth.getRoleId())) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                        bonus_type: type?.id ?? null,
                        client_id: client?.id ?? null,
                    })
            } else if(selectedEmployee) {
                    pointTableData({
                        user_id: user?.id,
                        start_date: startDate,
                        end_date: endDate,
                    })
            }
        }
    }, [_bonusType]);



    // // handle project filter
    // const handleProjectFilter = (e, project) => {
    //     e.preventDefault();
    //     setProject(project);

    // }

    // set table data
    React.useEffect(() => {
        setIsDataFetching(isFetching || dataFetchingStateIsLoading);
        if(tableData && !dataFetchingStateIsLoading){
            setData(tableData);
        }
    }, [tableData, dataFetchingStateIsLoading])


   


    return (
        <div className='sp1__pp_filter_bar'>
            <FilterItem>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    onApply={() => {}}
                />
            </FilterItem>
          

            {
                Number(window?.Laravel?.user?.role_id) === 1 ? (
                    <>
                        <FilterItem className='hide'>
                            <DepartmentFilter
                                data={departments}
                                selected={dept}
                                setSelectedDept = {setDept}
                                loading = {isFetching}
                                onSelect={handleDepartmentSelect}
                            />
                        </FilterItem>

                        <FilterItem className='hide'>
                            <ShiftFilterOption
                                data={ dept ? shift.filter(s => s.id !== 1 && s.department_id === dept.id) : []}
                                loading = {!dept}
                                selected={selectedShift}
                                onSelect={handleShiftSelection}
                            />
                        </FilterItem>

                        <FilterItem className='hide'>
                            <span className='mr-2'>Credit/Debit: <span className='font-weight-bold' >Point Earned </span> </span>
                        </FilterItem>

                        <FilterItem className=' hide'>
                            <span className='mr-2'>Points gained as: <span className='font-weight-bold'>Individual</span> </span>
                        </FilterItem>


                        <FilterItem className='hide'>
                            <EmployeeFilterOptions
                                selected={selectedEmployee}
                                setSelectedEmployee={setSelectedEmployee}
                                data={shiftEmployee}
                                loading = {employeeLoading || usersIsFetching}
                                onSelect={() => {}}
                            />
                        </FilterItem>
                        <FilterItem className='hide'>
                            <UserFilter
                            title="Client"
                            state={client}
                            setState={setClient}
                            roleIds={null}
                            
                        />
                        </FilterItem>
                        <FilterItem className='hide'>
                            <TypeFilter
                                value={type}
                                onChange={setType}
                                data={[
                                    { id: "Bonus", title: "Bonus" },
                                    { id: "Regular", title: "Regular" },
                                    { id: "Authorization", title: "Authorization" },
                                ]}
                             />
                        </FilterItem>

                        {/* <FilterItem className='hide'>
                            <ProjectFilterOptions
                                selected={project}
                                data={projects || []}
                                loading={projectsIsFetching}
                                onSelect={handleProjectFilter}

                            />
                        </FilterItem> */}



                    </>
                ) : 
                <>
                    <FilterItem className='border-right-0'>
                        Showing Data for: <span className='font-weight-bold'>{window?.Laravel?.user?.name}</span>
                    </FilterItem> 
                    {_.includes([7, 8], auth.getRoleId()) && (
                    <> 
                    <FilterItem className='hide'>
                        <UserFilter
                        title="Client"
                        state={client}
                        setState={setClient}
                        roleIds={null}/>
                    </FilterItem>
                    <FilterItem className='hide'>
                            <TypeFilter
                                value={type}
                                onChange={setType}
                                data={[
                                    { id: "Bonus", title: "Bonus" },
                                    { id: "Regular", title: "Regular" },
                                    { id: "Authorization", title: "Authorization"}
                                ]}
                             />
                    </FilterItem>
                    </>
                    )}
                </>
            }



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
                                    <DepartmentFilter
                                        data={departments}
                                        selected={dept}
                                        setSelectedDept = {setDept}
                                        loading = {isFetching}
                                        onSelect={handleDepartmentSelect}
                                        sidebarItem={true}
                                    />
                                </FilterItem>

                                <FilterItem className='w-100 border-right-0'>
                                    <ShiftFilterOption
                                        data={ dept ? shift.filter(s => s.id !== 1 && s.department_id === dept.id) : []}
                                        loading = {!dept}
                                        selected={selectedShift}
                                        onSelect={handleShiftSelection}
                                        sidebarItem= {true}
                                    />
                                </FilterItem>


                                <FilterItem className='hide d-flex align-items-center w-100 border-right-0'>
                                    <span className='mr-2 w-100'>Credit/Debit: <span className='d-block font-weight-bold border py-2 px-2 w-100' >Point Earned </span> </span>
                                </FilterItem>

                                <FilterItem className='hide d-flex align-items-center w-100 border-right-0'>
                                    <span className='mr-2 w-100'>Points gained as: <span className='d-block font-weight-bold border py-2 px-2 w-100'>Individual</span> </span>
                                </FilterItem>


                                <FilterItem className='w-100 border-right-0'>
                                    <EmployeeFilterOptions
                                        selected={selectedEmployee}
                                        setSelectedEmployee={setSelectedEmployee}
                                        data={shiftEmployee}
                                        loading = {employeeLoading || usersIsFetching}
                                        onSelect={() => {}}
                                        sidebarItem= {true}
                                    />
                                </FilterItem>
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
                                            { id: "Authorization", title: "Authorization"}
                                        ]}
                                    />
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
                                            { id: "Authorization", title: "Authorization"}
                                        ]}
                                    />
                                </FilterItem>
                            </div>
                        </aside>
                        )
                    }
                </div>
           }


        </div>
    )
}
