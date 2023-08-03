import React from 'react'
import JqueryDateRangePicker from './JqueryDateRangePicker'
import LiveSearch from './LiveSearch';
import UserFilter from './UserFilter'; 
import _ from 'lodash';
import StatusFilter from './StatusFilter';
import FilterSidebar from './FilterSidebar';
import { useWindowSize } from 'react-use';
import DateTypeFilter from './DateTypeFilter';

const Filterbar = ({onFilter}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [developer, setDeveloper] = React.useState(null);
    const [client, setClient] = React.useState(null);
    const [leadDeveloper, setLeadDeveloper] = React.useState(null);
    const [pm, setPm] = React.useState(null);
    const [status, setStatus] = React.useState('Hide completed task');
    const [dateType, setDateType] = React.useState('Due Date');

    const {width} = useWindowSize();




    // MEMORIZE VALUES
    const start_date = React.useMemo(() => startDate, [startDate]);
    const end_date = React.useMemo(() => endDate, [endDate]);
    const _search = React.useMemo(() => search, [search]);
    const _developer = React.useMemo(() => developer, [developer]);
    const _client = React.useMemo(() => client, [client]);
    const _leadDeveloper = React.useMemo(() => leadDeveloper, [leadDeveloper]);
    const _pm = React.useMemo(() => pm, [pm]);
    const _status = React.useMemo(() => status, [status]);
    const date_filter_by = React.useMemo(() => dateType, [dateType]);

    
    React.useEffect(() => {
        const filter = {
            start_date,
            end_date,
            search: _search,
            assignee_to: _developer?.id,
            client_id: _client?.id,
            assignee_by: _leadDeveloper?.id,
            pm_id: _pm?.id,
            status: _status,
            date_filter_by
        }


        onFilter(filter);

    }, [start_date, end_date, _search, _developer, _client, _leadDeveloper, _pm, _status, date_filter_by])



  return (
    <div className='sp1_task_filter_bar'>
        <JqueryDateRangePicker 
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onApply={() => null}
        />
        <HDivider />

        {width > 1400 && 
            <React.Fragment>
            <UserFilter 
                title="Assignee To" 
                state={developer}
                setState={setDeveloper}
                roleIds={[4, 6, 9, 10]}
            />
            
            <HDivider />

            <UserFilter 
                title="Client" 
                state={client}
                setState={setClient}
                roleIds={null}
            />
            
            
            <HDivider />

            <UserFilter 
                title="Assignee By" 
                state={leadDeveloper}
                setState={setLeadDeveloper}
                roleIds={[1, 4]}
            />
                    
            
            <HDivider />

            <UserFilter 
                title="Project Manager" 
                state={pm}
                setState={setPm}
                roleIds={[4]}
            />

            <HDivider />
            <StatusFilter state={status} setState={setStatus} />
            <HDivider />
            <DateTypeFilter state={dateType} setState={setDateType} />
            <HDivider />
            </React.Fragment> 
        }

        {/* <div className='search_container'>
            <LiveSearch 
                handleSearch={data => setSearch(data)}  
                searchTerm={searchQuery}
                setSearchTerm={setSearchQuery}
            />
        </div> */}
        
        {width < 1400 && 
            <React.Fragment>
                <HDivider className='ml-auto'/>
                <div>
                    <div className="sp1_filter_button" onClick={() => setIsOpen(true)} style={{gap: '10px'}}>
                        <i className="fa-solid fa-filter"></i>
                        <span>Filter</span>
                    </div>

                    {isOpen && (
                        <FilterSidebar
                            developer={developer}
                            setDeveloper={setDeveloper}
                            client={client}
                            setClient={setClient}
                            leadDeveloper={leadDeveloper}
                            setLeadDeveloper={setLeadDeveloper}
                            pm={pm}
                            setPm={setPm}
                            status={status}
                            setStatus={setStatus}
                            search={search}
                            setSearch={setSearch}
                            dateType={dateType}
                            setDateType={setDateType}
                            close={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </React.Fragment> 
        }

    </div>
  )
}

export default Filterbar

const HDivider = ({className=''}) =>{
    return(
        <div className={`filter_divider ${className}`} />
    )
}