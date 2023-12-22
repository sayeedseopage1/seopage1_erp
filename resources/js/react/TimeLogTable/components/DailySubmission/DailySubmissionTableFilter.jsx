import * as React from 'react';
import ReactDOM from 'react-dom';
import PersonFilter from '../PersonFilter';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
// import PersonFilterItem from './ProjectFilter';
import JqueryDateRangePicker from '../JqueryDateRangePicker';
import FilterItem from '../FilterBarItem';
import ProjectFilterItem from '../ProjectFilter';
import { setUsers } from '../../../services/features/usersSlice';
import { useGetProjectsOptionsQuery } from '../../../services/api/FilterBarOptionsApiSlice';
import { useLazyGetAllUsersQuery } from '../../../services/api/userSliceApi';


export default function DailySubmissionTableFilter ({onFilter}){
    const { users } = useSelector(s => s.users);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [status, setStatus] = React.useState('in progress');

    // employee
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = React.useState(null);
    const [selectedPMId, setSelectedPMId] = React.useState(null);
    const [selectedPMName, setSelectedPMName] = React.useState(null);
    const [selectedClientId, setSelectedClientId] = React.useState(null);
    const [selectedClientName, setSelectedClientName] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);

    const logged_user = window?.Laravel?.user;
    const top_management = [1, 6, 4, 8].includes(Number(logged_user?.role_id));


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
    const _selectedClientId = React.useMemo(() => selectedClientId, [selectedClientId]);
    const _selectedPMId = React.useMemo(() => selectedPMId, [selectedPMId]); 
    const _status = React.useMemo(() => status, [status]); 
    const _selectedProject = React.useMemo(() => selectedProject, [selectedProject])
    const _startDate = React.useMemo(() => startDate, [startDate]);
    const _endDate = React.useMemo(() => endDate, [endDate]);

    React.useEffect(()=> {
        if(_startDate && endDate){
            onFilter({
                start_date: dayjs(_startDate).format('YYYY-MM-DD'),
                end_date: dayjs(_endDate).format('YYYY-MM-DD'),
                employee_id: _selectedEmployeeId,
                employee_name: selectedEmployeeName,
                pm_id: _selectedPMId,
                pm_name: selectedPMName,
                client_id: _selectedClientId,   
                client_name: selectedClientName,
                // status: _status,
                project_id: _selectedProject ? _selectedProject.id : null,
                project_name:_selectedProject ? _selectedProject.project_name : null
 
            })
        }
    }, [_selectedClientId, _selectedEmployeeId, _selectedPMId, _status, _selectedProject, _startDate, _endDate]);


    const handleStatusFilter = (status) => {
        if(status){
            setStatus(status);
        }else{
            setStatus(null);
        }
    }   
    
    const handleDateFilter = (s, e) => {} 

    const handleProjectFilter = (e, data) => {
        if(data){
            setSelectedProject(data);
        }else{
            setSelectedProject(null)
        }
    }

    const handleEmployeeFilter = (e, data) => { 
        e.preventDefault();
        if(data){
            setSelectedEmployeeId(data.id);
            setSelectedEmployeeName(data.name);
        }else{
            setSelectedEmployeeId(null);
            setSelectedEmployeeName(null);
        }
        
    }

    const handlePMFilter = (e, data) => {
        e.preventDefault();
        if(data){
            setSelectedPMId(data.id);
            setSelectedPMName(data.name);
        }else{
            setSelectedPMId(null);
            setSelectedPMName(null);
        }
    }


    const handleClientFilter = (e, data) => {
        e.preventDefault();
       if(data){
            setSelectedClientId(data.id);
            setSelectedClientName(data.name);
       } else{
            setSelectedClientId(null);
            setSelectedClientName(null);
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
    
        {/* <FilterItem
            title="Status"
            items = {["finished", "canceled", "in progress", "partially finished", "under review"]}
            selected={status}
            isLoading={false}
            onSelect={handleStatusFilter}
        /> */}



    </div>

    if(!content) {
        return null;
    }

    return ReactDOM.createPortal(
        content,
        document.getElementById('timeLogTableFilterBar')
    )
}