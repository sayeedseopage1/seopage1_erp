import * as React from 'react';
import ReactDOM from 'react-dom';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import PersonFilter from './PersonFilter';
import { useLazyGetAllUsersQuery } from '../../services/api/userSliceApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../services/features/usersSlice';
import FilterItem from './FilterBarItem';
import dayjs from 'dayjs';
import { useGetProjectsOptionsQuery } from '../../services/api/FilterBarOptionsApiSlice';
import PersonFilterItem from './ProjectFilter';
import ProjectFilterItem from './ProjectFilter';


export default function TimeLogTableFilterBar ({handleDataRequest, handleTimeFilter}){
    const { users } = useSelector(s => s.users);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [status, setStatus] = React.useState('in progress');

    // employee
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedPMId, setSelectedPMId] = React.useState(null);
    const [selectedClientId, setSelectedClientId] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);



    // fetch all users
    const [getAllUsers, {  isFetching:userIsFetching}] = useLazyGetAllUsersQuery('', {
        skip: users.length
    });

    const { data: getProjectsOptions, isFetching } = useGetProjectsOptionsQuery('');

    
    React.useEffect(() => {
        if( !users.length && !userIsFetching){
            (async () => { 
                let res = await getAllUsers().unwrap(); 
                if(res){
                    dispatch(setUsers(res))
                }
            })()
        }
    }, []) 
   

    let content = null;


    const handleStatusFilter = (status) => {
        if(status){
            setStatus(status); 
            handleTimeFilter({
                start_date: dayjs(startDate).format('YYYY-MM-DD'),
                end_date: dayjs(endDate).format('YYYY-MM-DD'),
                employee_id: selectedEmployeeId,
                pm_id: selectedPMId,
                client_id: selectedClientId,   
                status: status,
                project_id: selectedProject ? selectedProject.id : null
            })
        }else{
            setStatus(null)
        }
    }   
    
    const handleDateFilter = (s, e) => { 
        handleTimeFilter({
            start_date: s,
            end_date: e ,
            employee_id: selectedEmployeeId,
            pm_id: selectedPMId,
            client_id: selectedClientId,
            status: status,
            project_id: selectedProject ? selectedProject.id : null
        })
    } 

    const handleProjectFilter = (e, data) => {
        if(data){
            setSelectedProject(data);
            handleTimeFilter({
                start_date: dayjs(startDate).format('YYYY-MM-DD'),
                end_date: dayjs(endDate).format('YYYY-MM-DD'),
                employee_id: selectedEmployeeId,
                pm_id: selectedPMId,
                client_id: selectedClientId,   
                status: status,
                project_id: data.id
            })
        }else{
            setSelectedProject(null)
        }
    }

    const handleEmployeeFilter = (e, data) => { 
        e.preventDefault();
        if(data){
            setSelectedEmployeeId(data.id);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: data.id,
                pm_id: selectedPMId,
                client_id: selectedClientId,   
            })
        }else{
            setSelectedEmployeeId(null);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: null,
                pm_id: selectedPMId,
                client_id: selectedClientId,   
            })
        }
        
    }

    const handlePMFilter = (e, data) => {
        e.preventDefault();
        if(data){
            setSelectedPMId(data.id);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: selectedEmployeeId,
                pm_id: data.id,
                client_id: selectedClientId,   
            })
        }else{
            setSelectedPMId(null);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: selectedEmployeeId,
                pm_id: null,
                client_id: selectedClientId,   
            })
        }
    }


    const handleClientFilter = (e, data) => {
        e.preventDefault();
       if(data){
        setSelectedClientId(data.id);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: selectedEmployeeId,
                pm_id: selectedPMId,
                client_id: data.id,
            })
       } else{
            setSelectedClientId(null);
            handleDataRequest({
                start_date: startDate,
                end_date: endDate ,
                employee_id: selectedEmployeeId,
                pm_id: selectedPMId,
                client_id: null,
            })
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
            items={users ? [...users?.filter(user => user.role_id && Number(user.role_id) !== 4)] : []}
            selected={selectedEmployeeId ? users?.find(u => Number(u.id) === selectedEmployeeId) : null}
            isLoading={userIsFetching}
            onSelect={handleEmployeeFilter}
        />


        {/* project manager */}
        <PersonFilter
            title="Project Manager"
            items={users ? [...users?.filter(user => user.role_id && Number(user.role_id) === 4)] : []}
            selected={selectedPMId ? users?.find(u => Number(u.id) === selectedPMId): null}
            isLoading={userIsFetching}
            onSelect={handlePMFilter}
        />

        {/* client */}
        <PersonFilter
            title="Client"
            items={users ? [...users?.filter(user => !user.role_id)] : []}
            selected={selectedClientId ? users?.find(u => Number(u.id) === selectedClientId): null}
            isLoading={userIsFetching}
            onSelect={handleClientFilter}
        />
 

        <ProjectFilterItem
            title="Project"
            items={getProjectsOptions ? [...getProjectsOptions]: []}
            isLoading={isFetching}
            selected={selectedProject}
            onSelect={handleProjectFilter}
        />
    
        <FilterItem
            title="Status"
            items = {["finished", "canceled", "in progress", "partially finished", "under review"]}
            selected={status}
            isLoading={false}
            onSelect={handleStatusFilter}
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