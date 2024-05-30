import React, { useState } from 'react';
import FilterItem from './FilterItem';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useUsers } from '../../../../hooks/useUsers';
import { useGetAllFilterOptionQuery } from '../../../../services/api/FilterBarOptionsApiSlice';
import DepartmentFilter from './DepartmentFilter';
import { setFilterState } from '../../../../services/features/pointPageFilterSlice';
import EmployeeFilterOptions from './EmployeeFilterOptions';

const IncentiveFilter = ({ setData,
    setIsDataFetching }) => {
    const { departments, employees } = useSelector(s => s.pointPageFilterOption);
    const { getUserById, usersObject, usersIsFetching, users } = useUsers();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dept, setDept] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    // const [employeeLoading, setEmployeeLoading] = useState([]);

    // console.log(users?.filter(u => u?.role_id == 4));
    // console.log(selectedEmployee)

    const getEmployees = (shift) => {
        let users = [];

        if (shift.members) {
            let members = shift?.members?.split(',')?.filter(d => d !== '');
            members?.map(m => {
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

    // fetch data
    const {
        data,
        isFetching
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true,
        skip: departments.length && employees.length
    });

    React.useEffect(() => {
        if (data && !isFetching) {
            setDept(data?.department[0]);
            dispatch(
                setFilterState(data)
            )
        }
    }, [data, isFetching])


    // handle dept select
    const handleDepartmentSelect = (dept) => {
        setDept(dept);
    }

    // TODO: need to make functionality 
    return (
        <div className='sp1__pp_filter_bar d-flex align-items-center justify-content-between pr-3'>
            <FilterItem>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    onApply={() => { }}
                />
            </FilterItem>

            <FilterItem className='hide'>
                <EmployeeFilterOptions
                    selected={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    data={users?.filter(u => u?.role_id == 4)}
                    loading={usersIsFetching}
                    onSelect={() => { }}
                />
            </FilterItem>

            <FilterItem className='hide'>
                <DepartmentFilter
                    data={departments}
                    selected={dept}
                    setSelectedDept={setDept}
                    loading={isFetching}
                    onSelect={handleDepartmentSelect}
                />
            </FilterItem>
        </div>
    );
};

export default IncentiveFilter;