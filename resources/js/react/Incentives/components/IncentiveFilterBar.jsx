import * as React from 'react';
import { setFilterState } from '../../services/features/pointPageFilterSlice';
import {  useGetAllFilterOptionQuery, useGetProjectsOptionsQuery } from '../../services/api/FilterBarOptionsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from '../../Points/components/FilterItem';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import DepartmentFilter from '../../Points/components/DepartmentFilter';
import _ from 'lodash';
import ShiftFilterOption from '../../Points/components/ShiftFilterOption';
import EmployeeFilterOptions from '../../Points/components/EmployeeFilterOptions';
import { useUsers } from '../../hooks/useUsers';
import Button from '../../Insights/ui/Button';
import { useIncentiveCurrentDataMutation } from '../../services/api/IncentiveApiSlice';
import DatePicker from './DatePicker';


export default function CashPointsFilter ({
    setData,
    setIsDataFetching,
    defaultSelectedDate
}) {
    const { departments, shift, employees } = useSelector(s => s.pointPageFilterOption);
    const { getUserById, usersObject, usersIsFetching } = useUsers();
    const dispatch = useDispatch();

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [shiftEmployee,setShiftEmployee] = React.useState([]);

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
    // projects
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
    }, [isFetching])

    // table data
    const [
        incentiveCurrentData,
        {
            data: tableData,
            isLoading: dataFetchingStateIsLoading
        }
    ] = useIncentiveCurrentDataMutation();




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



    // handle dept select
    const handleDepartmentSelect = (dept) => {
        setDept(dept);
    }

    // handle shift
    const handleShiftSelection = (shift) => {
        setSelectedShift(shift);
    }


    const _employee = React.useMemo(() => selectedEmployee, [selectedEmployee])
    //console.log({selectedEmployee})

    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if(Number(user?.role_id) === 1){
            if(_employee){
                incentiveCurrentData({
                    team_id: selectedShift?.id,
                    user_id: selectedEmployee?.id,
                    start_date: startDate,
                    end_date: endDate,
                    period: _.startCase(defaultSelectedDate)
                })
            }else{
                setIsDataFetching(false);
                setData(null);
            }
        }else if(_employee){
            incentiveCurrentData({
                user_id: user?.id,
                start_date: startDate,
                end_date: endDate,
                period: _.startCase(defaultSelectedDate)
            })
        }

    }, [_employee, defaultSelectedDate]);


    React.useEffect(() => {
        const user = window?.Laravel?.user;
        if(Number(user?.role_id) === 1){
            if(!dept || !selectedEmployee || !selectedShift) return;

            incentiveCurrentData({
                team_id: selectedShift?.id,
                user_id: selectedEmployee?.id,
                start_date: startDate,
                end_date: endDate,
                period: defaultSelectedDate
            })
        }else if(selectedEmployee){
            incentiveCurrentData({
                user_id: user?.id,
                start_date: startDate,
                end_date: endDate,
                period: defaultSelectedDate
            })
        }
    }, [endDate]);



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
                <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </FilterItem>


            {
                Number(window?.Laravel?.user?.role_id) === 1 ? (
                    <>


                        <FilterItem className='hide'>
                            <ShiftFilterOption
                                data={ dept ? shift.filter(s => s.id !== 1 && s.department_id === dept.id) : []}
                                loading = {!dept}
                                selected={selectedShift}
                                onSelect={handleShiftSelection}
                            />
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


                    </>
                ) :
                <FilterItem className='border-right-0'>
                    Showing Data for: <span className='font-weight-bold'>{window?.Laravel?.user?.name}</span>
                </FilterItem>
            }



            {/* sidebar */}
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
                                    <ShiftFilterOption
                                        data={ dept ? shift.filter(s => s.id !== 1 && s.department_id === dept.id) : []}
                                        loading = {!dept}
                                        selected={selectedShift}
                                        onSelect={handleShiftSelection}
                                        sidebarItem= {true}
                                    />
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
                            </div>
                        </aside>
                    )
                }
            </div>


        </div>
    )
}
