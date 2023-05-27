import * as React from 'react';
import { setFilterState } from '../../services/features/pointPageFilterSlice';
import {  useGetAllFilterOptionQuery } from '../../services/api/FilterBarOptionsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from './FilterItem';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import DepartmentFilter from './DepartmentFilter';
import _ from 'lodash';
import ShiftFilterOption from './ShiftFilterOption';
import EmployeeFilterOptions from './EmployeeFilterOptions';
import { useUsers } from '../../hooks/useUsers';
import { usePointTableDataMutation } from '../../services/api/PointTableDataApiSlice';

export default function CashPointsFilter ({
    setData,
    setIsDataFetching
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

 
    // fetch data
    const {
        data,
        isFetching
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true, 
        skip: departments.length && shift.length && employees.length
    });
    

    
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

    



    // handle dept select
    const handleDepartmentSelect = (dept) => {
        setDept(dept);
    }

    // handle shift
    const handleShiftSelection = (shift) => {
        setSelectedShift(shift);
    }


    const _employee = React.useMemo(() => selectedEmployee, [selectedEmployee])

    React.useEffect(() => {
        pointTableData({
            department_id: dept?.id,
            team_id: selectedShift?.id,
            user_id: selectedEmployee?.id,
            start_date: startDate,
            end_date: endDate,
            project_id: null
        })
    }, [_employee]);


    const handleDateFilter = (start, end) => {
        pointTableData({
            department_id: dept?.id,
            team_id: selectedShift?.id,
            user_id: selectedEmployee?.id,
            start_date: start,
            end_date: end,
            project_id: null
        })
    }

    // set table data
    React.useEffect(() => {
        setIsDataFetching(dataFetchingStateIsLoading);
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
                    onApply={handleDateFilter}
                />
            </FilterItem>


            {
                Number(window?.Laravel?.user?.role_id) === 1 ? (
                    <>
                        <FilterItem>
                            <DepartmentFilter 
                                data={departments}
                                loading = {isFetching}
                                onSelect={handleDepartmentSelect}
                            />
                        </FilterItem>

                        <FilterItem>
                            <ShiftFilterOption 
                                data={ dept ? shift.filter(s => s.id !== 1 && s.department_id === dept.id) : []}
                                loading = {!dept}
                                selected={selectedShift}
                                onSelect={handleShiftSelection}
                            />
                        </FilterItem>

                       
                         <FilterItem>
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
        </div>
    )
}