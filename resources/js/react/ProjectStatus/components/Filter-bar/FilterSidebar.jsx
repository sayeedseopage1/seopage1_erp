import React from 'react'
import Button from '../Button';
import UserFilter from './UserFilter';
import StatusFilter from './StatusFilter';
import DateTypeFilter from './DateTypeFilter';
import { useAuth } from '../../../hooks/useAuth';
import _ from 'lodash';

const FilterSidebar = ({
    page,
    developer,
    setDeveloper,
    client,
    setClient,
    leadDeveloper,
    setLeadDeveloper,
    pm,
    setPm,
    status,
    setStatus,
    search,
    setSearch,
    dateType,
    setDateType,
    close,
    isDev
}) => {
    const auth = useAuth();
  return (
    <div className='sp1_filter_sidebar'>
        <div className='sp1_filter_sidebar_header'>
            <h4>Filter</h4>
            <Button variant='tertiary' onClick={close}>
                <i className='fa-solid fa-xmark' />
            </Button>
        </div>


        <div className='p-3 d-flex flex-column' style={{gap: '10px'}}>
            <DateTypeFilter state={dateType} setState={setDateType} />

            <UserFilter
                title="Client"
                state={client}
                setState={setClient}
                roleIds={null}
            />


            <UserFilter
                title="Project Manager"
                state={pm}
                setState={setPm}
                roleIds={[4]}
            />

            {page === "subtasks" ? 
                <UserFilter
                    title="Assigned By"
                    state={leadDeveloper}
                    setState={setLeadDeveloper}
                    roleIds={[1, 6]}
                /> :
                <UserFilter
                    title="Assigned By"
                    state={leadDeveloper}
                    setState={setLeadDeveloper}
                    roleIds={[1, 4]}
                />
            }
            

            {page === "subtasks" ? (
                !isDev &&  <UserFilter
                    title="Assigned To"
                    state={developer}
                    setState={setDeveloper}
                    roleIds={[5, 9, 10]}
                />
            ): (
                <UserFilter
                    title="Assigned To"
                    state={developer}
                    setState={setDeveloper}
                    roleIds={[4, 6, 9, 10]}
                />
            )}

            <StatusFilter state={status} setState={setStatus} />
        </div>
    </div>
  )
}

export default FilterSidebar
