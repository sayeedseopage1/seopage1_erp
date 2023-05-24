import * as React from 'react';
import ReactDOM from 'react-dom';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import PersonFilter from './PersonFilter';
import { useLazyGetAllUsersQuery } from '../../services/api/userSliceApi';


export default function TimeLogTableFilterBar ({handleDataRequest}){
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // employee
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedPMId, setSelectedPMId] = React.useState(null);
    const [selectedClientId, setSelectedClientId] = React.useState(null);
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);



    // fetch all users
    const [getAllUsers, {data:users, isFetching:userIsFetching}] = useLazyGetAllUsersQuery();

    

    React.useEffect(() => {
        if(!userIsFetching){
            (async () => { await getAllUsers().unwrap(); })()
        }
    }, [])


  


    let content = null;
    
    const handleDateFilter = (s, e) => {
        handleDataRequest({
            start_date: s,
            end_date: e ,
            employee_id: selectedEmployeeId,
            pm_id: selectedPMId,
            client_id: selectedClientId,   
        })
    }

    const handleEmployeeFilter = (e, data) => {
        setSelectedEmployeeId(data.id);
        handleDataRequest({
            start_date: startDate,
            end_date: endDate ,
            employee_id: data.id,
            pm_id: selectedPMId,
            client_id: selectedClientId,   
        })
    }

    const handlePMFilter = (e, data) => {
        setSelectedPMId(data.id);
        handleDataRequest({
            start_date: startDate,
            end_date: endDate ,
            employee_id: selectedEmployeeId,
            pm_id: data.id,
            client_id: selectedClientId,   
        })
    }


    const handleClientFilter = (e, data) => {
        setSelectedClientId(data.id);
        handleDataRequest({
            start_date: startDate,
            end_date: endDate ,
            employee_id: selectedEmployeeId,
            pm_id: selectedPMId,
            client_id: data.id,
        })
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
            items={users ? [...users?.filter(user => user.role_id && Number(user.role_id) !== 4)] : []}
            selected={users?.find(u => Number(u.id) === selectedEmployeeId)}
            isLoading={userIsFetching}
            onSelect={handleEmployeeFilter}
        />


        {/* project manager */}
        <PersonFilter
            title="Project Manager"
            items={users ? [...users?.filter(user => user.role_id && Number(user.role_id) === 4)] : []}
            selected={users?.find(u => Number(u.id) === selectedPMId)}
            isLoading={userIsFetching}
            onSelect={handlePMFilter}
        />

        {/* client */}
        <PersonFilter
            title="Client"
            items={users ? [...users?.filter(user => !user.role_id)] : []}
            selected={users?.find(u => Number(u.id) === selectedClientId)}
            isLoading={userIsFetching}
            onSelect={handleClientFilter}
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