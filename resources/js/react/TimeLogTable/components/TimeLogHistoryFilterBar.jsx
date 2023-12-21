import * as React from 'react';
import ReactDOM from 'react-dom';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import PersonFilter from './PersonFilter';
import { useLazyGetAllUsersQuery } from '../../services/api/userSliceApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../services/features/usersSlice';
import FilterItem from './FilterBarItem';
import dayjs from 'dayjs';



export default function TimeLogHistoryTableFilterBar ({onFilter}){
    const { users } = useSelector(s => s.users);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // employee
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = React.useState(null);
   

    const logged_user = window?.Laravel?.user;
    const top_management = [1, 6, 4, 8].includes(Number(logged_user?.role_id));


    // fetch all users
    const [getAllUsers, {  isFetching:userIsFetching}] = useLazyGetAllUsersQuery('', {
        skip: users.length
    });

    
    React.useEffect(() => {
        if( !users.length && !userIsFetching){
            (async () => { 
                let res = await getAllUsers().unwrap(); 
                if(res){
                    dispatch(setUsers(res));
                }
            })()
        }
    }, []) 


    
    React.useEffect(() => {
        if(users?.length){
            if(!top_management){
                setSelectedEmployeeId(logged_user?.id)
            }
        }
    }, [users]);

   

    let content = null;

    // filter options
    const _selectedEmployeeId = React.useMemo(() => selectedEmployeeId, [selectedEmployeeId]);
    const _startDate = React.useMemo(() => startDate, [startDate]);
    const _endDate = React.useMemo(() => endDate, [endDate]);

    React.useEffect(()=> {
        if(_startDate && endDate){
            onFilter({
                start_date: dayjs(_startDate).format('YYYY-MM-DD'),
                end_date: dayjs(_endDate).format('YYYY-MM-DD'),
                employee_id: _selectedEmployeeId,
                employee_name: selectedEmployeeName,
            })
        }
    }, [_selectedEmployeeId, _startDate, _endDate]);

    
    const handleDateFilter = (s, e) => {} 


    const handleEmployeeFilter = (e, data) => { 
        e.preventDefault();
        if(data){
            setSelectedEmployeeName(data.name);
            setSelectedEmployeeId(data.id);
        }else{
            setSelectedEmployeeId(null);
            setSelectedEmployeeName(null);
        }
        
    }


 
    content =  <div className='d-flex flex-wrap bg-white p-1'>
        <div className='border-right pr-1'>
            <JqueryDateRangePicker 
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onApply={handleDateFilter}
            />
        </div>

        {/* employee */}
        <PersonFilter
            title="Employee"
            items={users ? [...users?.filter(user => {
                if(top_management){
                    return user.role_id && Number(user.role_id) !== 4
                }else{
                    return user.id === logged_user.id
                }
            })]:[]}
            selected={selectedEmployeeId ? users?.find(u => Number(u.id) === selectedEmployeeId) : null}
            isLoading={userIsFetching}
            onSelect={handleEmployeeFilter}
            selectedAllButton = {top_management}
        />

    </div>

    if(!content) {
        return null;
    }

    return ReactDOM.createPortal(
        content,
        document.getElementById('timeLogTableFilterBar')
    )
}